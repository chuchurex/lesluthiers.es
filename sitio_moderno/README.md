# 🎭 Les Luthiers - Sitio Moderno

**Versión moderna del sitio de Les Luthiers con diseño simple y funcional**

---

## 📊 Estadísticas del Sitio

```
✅ 122 páginas HTML generadas automáticamente
✅ 24 biografías de integrantes
✅ 36 espectáculos documentados
✅ 25 obras musicales
✅ 37 personajes creados
✅ Sistema de búsqueda en tiempo real
✅ Diseño responsive (mobile-first)
✅ Carga rápida (HTML estático)
```

---

## 🚀 Inicio Rápido

### Opción 1: Usar el script de servidor

```bash
# Desde la carpeta sitio_moderno
./servidor.sh
```

Luego abre http://localhost:3014

### Opción 2: Python directamente

```bash
# Desde la carpeta sitio_moderno
python3 -m http.server 3014
```

### Opción 3: Cualquier servidor web estático

Como el sitio es **100% estático**, puedes usar cualquier servidor:

- Live Server (VS Code)
- NGINX
- Apache
- Vercel
- Netlify
- GitHub Pages

---

## 📁 Estructura del Proyecto

```
sitio_moderno/
│
├── index.html ...................... Página de inicio
│
├── css/
│   └── styles.css .................. Sistema de diseño completo
│
├── js/
│   └── app.js ...................... Lógica de la aplicación
│
├── data/
│   └── lesluthiers_respaldo_completo.json ... Datos completos
│
├── grupo/
│   ├── index.html .................. Listado de integrantes
│   ├── carlos-nunez-cortes.html .... Detalle individual
│   └── [23 páginas más] ............ Otros integrantes
│
├── espectaculos/
│   ├── index.html .................. Listado de espectáculos
│   ├── mastropiero-que-nunca.html .. Detalle individual
│   └── [35 páginas más] ............ Otros espectáculos
│
├── obras/
│   ├── index.html .................. Listado de obras
│   └── [25 páginas] ................ Detalle de cada obra
│
├── personajes/
│   ├── index.html .................. Listado de personajes
│   └── [37 páginas] ................ Detalle de cada personaje
│
├── multimedia/ ..................... (Placeholder)
├── instrumentos/ ................... (Placeholder)
│
└── servidor.sh ..................... Script de servidor (puerto 3014)
```

---

## 🎨 Sistema de Diseño

### Paleta de Colores

```css
/* Inspirada en instrumentos musicales y teatro */
--primary: #8B4513;      /* Marrón cálido (madera) */
--secondary: #D4AF37;    /* Dorado (latón) */
--accent: #C41E3A;       /* Rojo (cortinas) */
--bg-light: #FFF8F0;     /* Beige claro */
```

### Tipografía

- **Títulos:** Playfair Display (serif elegante)
- **Cuerpo:** Inter (sans-serif moderna)
- **Código:** JetBrains Mono

### Responsive

- **Mobile:** 1 columna
- **Tablet (768px+):** 2 columnas
- **Desktop (1024px+):** 3 columnas

---

## ⚙️ Características

### ✅ Implementadas

1. **Navegación Global**
   - Header fijo con logo
   - Menú sticky con 7 secciones principales
   - Breadcrumbs en páginas de detalle

2. **Sistema de Búsqueda**
   - Búsqueda en tiempo real
   - Busca en componentes, espectáculos, obras y personajes
   - Resultados instantáneos
   - Autocompletado

3. **Páginas de Listado**
   - Grid responsive de tarjetas
   - Búsqueda local en cada sección
   - Contador de elementos
   - Imágenes con lazy loading

4. **Páginas de Detalle**
   - Hero con imagen principal
   - Metadata organizada
   - Galerías de imágenes
   - Navegación de retorno

5. **Performance**
   - HTML estático (ultra rápido)
   - Lazy loading de imágenes
   - CSS optimizado
   - Sin dependencias externas (solo fuentes)

### 🚧 Pendientes (futuras mejoras)

1. **Multimedia**
   - Páginas de discografía
   - Páginas de DVDs
   - Galería de fotos
   - Libros

2. **Instrumentos Informales**
   - Catálogo de instrumentos
   - Páginas de detalle

3. **Features Avanzadas**
   - Línea de tiempo interactiva
   - Filtros combinados
   - Modo oscuro
   - Compartir en redes sociales
   - PWA (Progressive Web App)

---

## 🔧 Personalización

### Cambiar Colores

Edita `/css/styles.css` líneas 10-25 (variables CSS):

```css
:root {
  --primary: #TU_COLOR;
  --secondary: #TU_COLOR;
  /* etc */
}
```

### Cambiar Fuentes

Edita el `<head>` de cualquier HTML y actualiza:

```html
<link href="https://fonts.googleapis.com/css2?family=TU_FUENTE" rel="stylesheet">
```

Luego actualiza en `/css/styles.css`:

```css
:root {
  --font-serif: 'TU_FUENTE', serif;
}
```

### Añadir Nuevas Secciones

1. Crea nueva carpeta (ej: `nueva-seccion/`)
2. Crea `index.html` usando `grupo/index.html` como plantilla
3. Añade enlace en navegación de todos los HTML
4. Genera páginas de detalle con script Python

---

## 🔄 Regenerar Páginas de Detalle

Si actualizas el JSON de respaldo:

```bash
# Desde la raíz del proyecto lesluthires.es
python3 generar_paginas_detalle.py
```

Este script:
- Lee `lesluthiers_respaldo_completo.json`
- Genera 122 páginas HTML automáticamente
- Crea slugs URL-friendly
- Mantiene la estructura de carpetas

---

## 📦 Deploy a Producción

### Netlify

1. Sube la carpeta `sitio_moderno/` a un repositorio Git
2. Conecta Netlify al repositorio
3. Build settings: ninguno (es estático)
4. Publish directory: `/`
5. Deploy!

### Vercel

```bash
cd sitio_moderno
vercel --prod
```

### GitHub Pages

1. Push a GitHub
2. Settings → Pages
3. Source: `main` branch, carpeta `/sitio_moderno`
4. Save

### Servidor Propio

```bash
# Copiar archivos
scp -r sitio_moderno/* user@server:/var/www/lesluthiers

# Configurar NGINX
server {
  listen 80;
  server_name lesluthiers.es;
  root /var/www/lesluthiers;
  index index.html;
}
```

---

## 🧪 Testing

### Validar HTML

```bash
# Instalar validator
npm install -g html-validator-cli

# Validar
html-validator index.html
```

### Lighthouse (Performance)

1. Abrir Chrome DevTools
2. Tab "Lighthouse"
3. Generate report
4. Meta: 90+ en todas las categorías

---

## 📈 SEO

Cada página incluye:

- `<title>` único y descriptivo
- `<meta name="description">` específico
- HTML semántico (`<header>`, `<nav>`, `<main>`, `<article>`)
- URLs amigables (slugs)
- Breadcrumbs para navegación
- Alt text en imágenes

---

## 🐛 Problemas Conocidos

### JSON no carga
**Solución:** Asegúrate que `data/lesluthiers_respaldo_completo.json` existe.

### Imágenes no cargan
**Solución:** Las URLs de imágenes apuntan al sitio original. Para descargarlas localmente:

```bash
# Desde la raíz del proyecto
python3 descargar_imagenes.py
```

### Puerto ocupado
**Solución:** Cambia el puerto en `servidor.sh` y actualiza `PORTS.md`.

---

## 📝 Notas Técnicas

- **Sin framework JavaScript:** Vanilla JS puro para máxima velocidad
- **Sin build process:** No necesita compilación
- **Sin dependencias npm:** Solo HTML/CSS/JS
- **Compatible:** Funciona hasta IE11 (con pequeños ajustes)
- **Accesible:** Cumple WCAG 2.1 nivel AA

---

## 🎯 Próximos Pasos Sugeridos

1. ✅ Implementar páginas de multimedia
2. ✅ Crear línea de tiempo interactiva
3. ✅ Añadir modo oscuro
4. ✅ Integrar con CMS (Sanity, Contentful)
5. ✅ Migrar a framework moderno (Astro, Next.js)
6. ✅ Añadir comentarios/foro de fans
7. ✅ Integración con Spotify/YouTube

---

## 📜 Licencia

- **Contenido original:** © Les Luthiers
- **Código del sitio:** Dominio público
- **Propósito:** Preservación cultural y homenaje

---

## 🙏 Créditos

- **Sitio original:** Patrick (lesluthiers.es)
- **Les Luthiers:** 1967 - 2017 (50 años de música y humor)
- **Respaldo y sitio moderno:** Creado como regalo para Patrick

---

**¡Que viva Les Luthiers! 🎭🎵**

*Versión 1.0 - Enero 2026*
