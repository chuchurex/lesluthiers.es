#!/bin/bash
# Deploy automático a Cloudflare Pages via Git

echo "╔══════════════════════════════════════════════════════════════╗"
echo "║                                                              ║"
echo "║   🚀 Deploy Dashboard LHDLN a Cloudflare Pages             ║"
echo "║                                                              ║"
echo "╚══════════════════════════════════════════════════════════════╝"

# Colores
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Activar entorno virtual
source venv/bin/activate

# 1. Actualizar estadísticas
echo -e "\n${BLUE}[1/4]${NC} Actualizando estadísticas del canal..."
python3 analizar_canal_completo.py

if [ $? -ne 0 ]; then
    echo "❌ Error al actualizar estadísticas"
    exit 1
fi

# 2. Copiar JSON actualizado
echo -e "\n${BLUE}[2/4]${NC} Copiando datos actualizados..."
cp analisis_canal.json dist/
echo -e "${GREEN}✓${NC} Datos actualizados"

# 3. Git commit
echo -e "\n${BLUE}[3/4]${NC} Preparando deploy..."

# Verificar si hay cambios
if git diff --quiet dist/analisis_canal.json; then
    echo -e "${YELLOW}⚠${NC}  No hay cambios nuevos en las estadísticas"
    read -p "¿Desplegar de todas formas? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Deploy cancelado"
        exit 0
    fi
fi

git add dist/analisis_canal.json
git commit -m "Update: estadísticas $(date +%Y-%m-%d\ %H:%M)"

if [ $? -ne 0 ]; then
    echo -e "${YELLOW}⚠${NC}  No hay cambios para commitear"
fi

# 4. Git push
echo -e "\n${BLUE}[4/4]${NC} Desplegando a Cloudflare Pages..."
git push

if [ $? -eq 0 ]; then
    echo -e "\n${GREEN}✅ Deploy completado exitosamente${NC}"
else
    echo -e "\n${YELLOW}⚠${NC}  Error al hacer push. ¿Ya configuraste el repositorio?"
    echo ""
    echo "Para configurar por primera vez:"
    echo "  git remote add origin https://github.com/TU_USUARIO/lhdln-dashboard.git"
    echo "  git branch -M main"
    echo "  git push -u origin main"
    exit 1
fi

# Resumen
echo ""
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║                                                              ║"
echo "║   ✅ DASHBOARD DESPLEGADO                                   ║"
echo "║                                                              ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""
echo "🌐 URL: https://lhdln.chuchurex.cl"
echo "⏳ Espera 30-60 segundos para ver los cambios"
echo ""
echo "📊 Para verificar el deploy:"
echo "   https://dash.cloudflare.com/ → Pages → tu-proyecto"
echo ""
