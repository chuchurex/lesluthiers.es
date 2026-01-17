#!/bin/bash
# Script para actualizar estadísticas del dashboard LHDLN

echo "╔══════════════════════════════════════════════════════════════╗"
echo "║                                                              ║"
echo "║   🔄 Actualización de Estadísticas                          ║"
echo "║   La Hora de la Nostalgia                                   ║"
echo "║                                                              ║"
echo "╚══════════════════════════════════════════════════════════════╝"

# Colores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Activar entorno virtual
echo -e "\n${BLUE}[1/4]${NC} Activando entorno virtual..."
source venv/bin/activate

# Actualizar datos del canal (scraper)
echo -e "\n${BLUE}[2/4]${NC} Obteniendo videos actualizados del canal..."
python3 scraper_lhdln.py

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓${NC} Videos actualizados"
else
    echo -e "${YELLOW}⚠${NC}  Error al actualizar videos (continuando con datos existentes)"
fi

# Analizar canal completo con estadísticas de YouTube
echo -e "\n${BLUE}[3/4]${NC} Analizando canal y obteniendo estadísticas de YouTube..."
python3 analizar_canal_completo.py

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓${NC} Análisis completado"
else
    echo "❌ Error al analizar canal"
    exit 1
fi

# Actualizar dashboard
echo -e "\n${BLUE}[4/4]${NC} Actualizando dashboard..."
cp analisis_canal.json dist/

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓${NC} Dashboard actualizado"
else
    echo "❌ Error al actualizar dashboard"
    exit 1
fi

# Resumen
echo ""
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║                                                              ║"
echo "║   ✅ ACTUALIZACIÓN COMPLETADA                               ║"
echo "║                                                              ║"
echo "╚══════════════════════════════════════════════════════════════╝"

# Mostrar estadísticas clave
echo ""
echo "📊 Estadísticas actualizadas:"
echo ""

# Leer y mostrar datos del JSON
python3 << 'EOF'
import json
with open('analisis_canal.json', 'r') as f:
    data = json.load(f)
    canal = data['canal']
    promedios = data['promedios']

    print(f"   Videos totales:      {canal['total_videos']:,}")
    print(f"   Vistas totales:      {canal['total_vistas']:,}")
    print(f"   Likes totales:       {canal['total_likes']:,}")
    print(f"   Comentarios totales: {canal['total_comentarios']:,}")
    print(f"")
    print(f"   Promedio vistas:     {promedios['vistas_por_video']:,}")
    print(f"   Engagement rate:     {promedios['engagement_rate']}%")
EOF

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Próximos pasos:"
echo ""
echo "  1. Probar localmente:"
echo "     cd dist && python3 -m http.server 8000"
echo ""
echo "  2. Subir a producción:"
echo "     scp dist/analisis_canal.json usuario@chuchurex.cl:/var/www/lhdln/"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
