#!/bin/bash
# Servidor de desarrollo para Les Luthiers Sitio Moderno
# Puerto asignado: 3014

echo ""
echo "🎭 Les Luthiers - Sitio Moderno"
echo "================================"
echo ""
echo "📍 Puerto asignado: 3014"
echo "🌐 URL: http://localhost:3014"
echo ""
echo "Iniciando servidor..."
echo ""

# Cambiar al directorio del script
cd "$(dirname "$0")"

# Iniciar servidor HTTP
python3 -m http.server 3014
