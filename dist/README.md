# 🎙️ Dashboard LHDLN - La Hora de la Nostalgia

Dashboard de estadísticas del canal YouTube "La Hora de la Nostalgia"

**Un regalo para los autores del canal**

---

## 📊 Estadísticas Actuales

- **298 videos** publicados
- **990,903** visualizaciones totales
- **40,899** me gusta
- **8,864** comentarios
- **4.13%** engagement rate

---

## 🚀 Desplegado con Cloudflare Pages

Este dashboard está optimizado para Cloudflare Pages:

- ✅ 100% estático (HTML/CSS/JS)
- ✅ Sin dependencias de servidor
- ✅ Carga súper rápida
- ✅ HTTPS automático
- ✅ Solo 159 KB total

---

## 📁 Archivos

```
dist/
├── index.html              - Página principal
├── styles.css              - Estilos del dashboard
├── dashboard.js            - Lógica y visualizaciones
├── analisis_canal.json     - Datos del canal (actualizable)
└── README.md               - Este archivo
```

---

## 🔄 Actualizar Estadísticas

Para actualizar los datos del dashboard:

1. Ejecutar desde el directorio raíz:
   ```bash
   python3 analizar_canal_completo.py
   cp analisis_canal.json dist/
   ```

2. Deploy:
   - **Git:** `git add dist/analisis_canal.json && git commit -m "Update stats" && git push`
   - **Manual:** Subir `analisis_canal.json` actualizado a Cloudflare Pages

---

## 🌐 URLs

- **Producción:** https://lhdln.chuchurex.cl
- **Canal YouTube:** https://www.youtube.com/@LaHoradelaNostalgia

---

## 🎨 Características

- Estadísticas en tiempo real de YouTube
- Top 10 videos más vistos
- Rankings de likes y comentarios
- Análisis de engagement
- Evolución por año
- Gráfico de actividad mensual
- Temas más frecuentes
- 100% responsive

---

**Creado con ❤️ - Enero 2026**
