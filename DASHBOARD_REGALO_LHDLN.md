# 🎁 Dashboard de Estadísticas - Regalo para La Hora de la Nostalgia

**Dashboard completo de estadísticas del canal YouTube**
**URL:** LHDLN.chuchurex.cl

---

## 🎯 ¿Qué es esto?

Un dashboard interactivo como **regalo para los autores del canal "La Hora de la Nostalgia"** para que puedan ver las estadísticas reales de su canal de YouTube:

- Videos más vistos
- Evolución del canal
- Engagement de la audiencia
- Temas más tratados
- Actividad por año y mes
- Y mucho más...

---

## 📊 Estadísticas del Canal (Actuales)

### Totales
- **298 videos** publicados
- **990,903 visualizaciones** totales
- **40,899 me gusta**
- **8,864 comentarios**
- **266.5 horas** de contenido total

### Promedios
- **3,325 vistas** por video
- **137 likes** por video
- **29 comentarios** por video
- **4.13% engagement rate**

### Top 5 Videos Más Vistos
1. **Ernesto Acher - Episodio 055** - 42,872 vistas
2. **Carlos Núñez Cortés - Episodio 023** - 16,734 vistas
3. **Marcos Mundstock - Episodio 089** - 16,529 vistas
4. **Publicidad FIAT 125 (1973)** - 15,128 vistas
5. **Jorge Maronna - Episodio 047** - 14,048 vistas

---

## ✨ Características del Dashboard

### 1. **Hero Stats** (Estadísticas Principales)
Tarjetas grandes con las métricas más importantes:
- Total de videos
- Visualizaciones totales
- Me gusta totales
- Comentarios totales

### 2. **Estadísticas Promedio**
Rendimiento promedio por video:
- Vistas promedio
- Likes promedio
- Comentarios promedio
- Tasa de engagement

### 3. **Top 10 Videos Más Vistos**
Ranking completo con:
- Posición (#1, #2, #3...)
- Título del video
- Fecha de publicación
- Vistas, likes y comentarios
- Enlace directo a YouTube

### 4. **Top 10 Más Gustados**
Videos con más me gusta de la historia del canal

### 5. **Top 10 Más Comentados**
Videos que generaron más conversación

### 6. **Top 10 Mejor Engagement**
Videos con mejor proporción likes/vistas
(Muestra qué contenido conecta mejor con la audiencia)

### 7. **Evolución por Año**
Tarjetas por año mostrando:
- Total de videos publicados
- Total de vistas del año
- Promedio de vistas
- Video más visto del año

### 8. **Actividad - Últimos 12 Meses**
Gráfico de líneas mostrando:
- Videos publicados por mes
- Vistas totales por mes

### 9. **Temas Más Frecuentes**
Nube de palabras con los temas más tratados
(Extraídos de los títulos de los videos)

### 10. **Videos Recientes**
Últimos 10 videos publicados con sus estadísticas

---

## 🎨 Diseño

- **Moderno y profesional**
- **Gradientes violeta/púrpura** (marca del canal)
- **100% responsive** (se ve perfecto en móvil, tablet y desktop)
- **Animaciones suaves**
- **Colores destacados** para top 1, 2 y 3
- **Enlaces directos** a YouTube en cada video

---

## 📁 Archivos Incluidos

```
dist/
├── index.html              6.4 KB  - Página principal
├── styles.css              9.0 KB  - Estilos
├── dashboard.js           11 KB    - Lógica del dashboard
└── analisis_canal.json   133 KB    - Datos del canal
```

**Total:** 159 KB (súper ligero y rápido)

---

## 🚀 Cómo Desplegar

### Opción 1: Servidor Local (Probar)

```bash
cd dist
python3 -m http.server 8000
# Abrir http://localhost:8000
```

### Opción 2: Subir a Producción

Subir los 4 archivos de la carpeta `dist/` a:
- **LHDLN.chuchurex.cl**

Via SCP:
```bash
scp dist/* usuario@chuchurex.cl:/var/www/lhdln/
```

O via FTP/cPanel File Manager

---

## 🔄 Actualizar Estadísticas

Las estadísticas se actualizan ejecutando:

```bash
# 1. Obtener nuevos videos (si los hay)
python3 scraper_lhdln.py

# 2. Analizar canal completo
python3 analizar_canal_completo.py

# 3. Copiar nuevo JSON al dashboard
cp analisis_canal.json dist/
```

O usar el script automatizado:
```bash
./actualizar_estadisticas.sh
```

**Frecuencia recomendada:** Una vez por semana o cuando se publiquen episodios nuevos.

---

## 📊 Datos que se Muestran

### Métricas Extraídas de YouTube
- ✅ Número de visualizaciones
- ✅ Cantidad de me gusta
- ✅ Cantidad de comentarios
- ✅ Duración de cada video
- ✅ Fecha de publicación

### Análisis Calculados
- ✅ Engagement rate (likes/vistas)
- ✅ Promedios por video
- ✅ Rankings (top 10 de cada categoría)
- ✅ Evolución temporal
- ✅ Temas frecuentes
- ✅ Tendencias por año/mes

---

## 🎯 Para Quién es Este Dashboard

### Para los Autores del Canal
- Ver qué contenido funciona mejor
- Identificar temas que interesan más
- Entender la evolución del canal
- Celebrar los hitos alcanzados
- Planificar futuros contenidos

### Ideal para:
- **Reportes mensuales/anuales**
- **Presentaciones** del canal
- **Análisis de contenido**
- **Motivación del equipo**
- **Compartir con sponsors/colaboradores**

---

## 💡 Insights que Ofrece

### ¿Qué videos funcionan mejor?
Los episodios dedicados a miembros específicos (Ernesto Acher, Carlos Núñez, Marcos Mundstock, Jorge Maronna) son los más vistos.

### ¿Qué engagement tienen?
4.13% es un engagement rate excelente para un canal de podcast.

### ¿Cuál es la tendencia?
El canal promedia 3 videos por mes de forma consistente.

### ¿Qué temas dominan?
- Episodios sobre miembros de Les Luthiers
- Columnas de José María Listorti
- Material histórico ("LHDLN Presenta")

---

## 🔧 Personalización

Si quieres ajustar el dashboard:

### Cambiar colores
Editar `styles.css`, líneas 13-20:
```css
:root {
    --primary: #667eea;    /* Color principal */
    --secondary: #764ba2;  /* Color secundario */
    --accent: #f093fb;     /* Color de acento */
}
```

### Cambiar cantidad de top videos
Editar `dashboard.js`, buscar `.slice(0, 10)` y cambiar el número.

### Añadir más métricas
Editar `analizar_canal_completo.py` para calcular nuevas estadísticas.

---

## 🎁 Mensaje para el Equipo de LHDLN

Este dashboard fue creado con mucho cariño para ayudarles a visualizar el increíble trabajo que han hecho con el canal.

**Casi 1 millón de visualizaciones** y **298 episodios** son un logro monumental. Este es solo el comienzo.

Esperamos que este dashboard les sea útil para:
- Celebrar sus éxitos
- Entender qué contenido resuena más con su audiencia
- Planificar futuros episodios
- Compartir logros con su comunidad

¡Sigan haciendo este contenido increíble sobre Les Luthiers!

---

## 📞 Información Técnica

**Canal:** https://www.youtube.com/@LaHoradelaNostalgia
**Dashboard:** https://lhdln.chuchurex.cl
**Tecnología:** HTML5 + CSS3 + JavaScript (Chart.js)
**Fuente de datos:** YouTube Data API v3

---

## 📝 Próximas Mejoras Posibles

- [ ] Comparación mes vs mes anterior
- [ ] Predicción de crecimiento
- [ ] Análisis de horarios de publicación óptimos
- [ ] Mapa de calor de días/horarios
- [ ] Exportar reportes en PDF
- [ ] Integración con YouTube Analytics (datos más detallados)
- [ ] Dashboard de suscriptores (requiere autenticación OAuth)

---

## ✅ Checklist de Entrega

- [x] Dashboard completo funcionando
- [x] Datos reales del canal procesados
- [x] Top 10 rankings de múltiples categorías
- [x] Gráficos interactivos
- [x] Diseño responsive
- [x] Optimizado para velocidad
- [x] Documentación completa
- [x] Script de actualización
- [ ] Desplegado en producción

---

**Creado con ❤️ para La Hora de la Nostalgia**
**Fecha:** 17 de enero de 2026
**Versión:** 2.0
