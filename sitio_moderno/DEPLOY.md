# 🚀 Instrucciones de Deploy - Cloudflare Pages

## Configuración para patrick.chuchurex.cl

Este documento contiene las instrucciones paso a paso para desplegar el sitio de Les Luthiers en Cloudflare Pages.

---

## 📋 Prerrequisitos

1. ✅ Cuenta de Cloudflare (gratis)
2. ✅ Acceso al dominio `chuchurex.cl` en Cloudflare
3. ✅ Repositorio GitHub: `https://github.com/chuchurex/lesluthiers.es`

---

## 🎯 Pasos para Deploy

### 1. Conectar GitHub a Cloudflare Pages

1. Ir a [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Seleccionar tu cuenta
3. En el menú lateral: **Workers & Pages**
4. Click en **Create application**
5. Tab **Pages**
6. Click en **Connect to Git**
7. Autorizar acceso a GitHub si es necesario
8. Seleccionar el repositorio: `chuchurex/lesluthiers.es`

### 2. Configurar el Proyecto

Usar exactamente esta configuración:

```
Project name:             lesluthiers
Production branch:        main
Build command:            (dejar vacío)
Build output directory:   /
Root directory:           sitio_moderno
```

**Importante:**
- El `Root directory` debe ser `sitio_moderno` porque el proyecto está en esa carpeta
- NO necesitamos build command porque es un sitio 100% estático
- El output es `/` (raíz del proyecto)

### 3. Configurar Variables de Entorno

No se necesitan variables de entorno para este proyecto.

### 4. Deploy Inicial

1. Click en **Save and Deploy**
2. Esperar 1-2 minutos mientras Cloudflare despliega
3. Una vez completado, verás una URL temporal como: `lesluthiers.pages.dev`

### 5. Configurar Dominio Personalizado

1. En el proyecto de Cloudflare Pages, ir a **Custom domains**
2. Click en **Set up a custom domain**
3. Ingresar: `patrick.chuchurex.cl`
4. Cloudflare detectará automáticamente que el dominio ya está en Cloudflare
5. Click en **Activate domain**
6. Esperar 1-5 minutos para propagación de DNS

### 6. Verificar Deploy

Abrir en el navegador:
- URL temporal: `https://lesluthiers.pages.dev`
- URL personalizada: `https://patrick.chuchurex.cl`

Verificar que:
- ✅ La página de inicio carga correctamente
- ✅ La navegación funciona
- ✅ Las imágenes cargan
- ✅ El buscador funciona
- ✅ Las páginas de detalle funcionan (ejemplo: `/grupo/carlos-nunez-cortes.html`)

---

## 🔄 Deploys Automáticos

Cloudflare Pages está configurado para deploy automático:

- **Cada push a `main`** → Deploy a producción en `patrick.chuchurex.cl`
- **Cada PR** → Deploy preview con URL temporal

---

## ⚙️ Configuración Avanzada

### Headers de Seguridad y Performance

El archivo `_headers` en la raíz del proyecto configura:

- ✅ Headers de seguridad (X-Frame-Options, CSP, etc.)
- ✅ Cache optimizado por tipo de archivo
- ✅ Compresión automática

### Redirects

El archivo `_redirects` maneja:

- ✅ Páginas 404 → Redirect a home
- ✅ URLs antiguas → Nuevas URLs (si las agregas)

### Performance Optimizations

Cloudflare Pages incluye automáticamente:

- ✅ HTTP/3 y QUIC
- ✅ Brotli compression
- ✅ Auto minify (HTML, CSS, JS)
- ✅ CDN global (300+ ubicaciones)
- ✅ SSL/TLS automático

---

## 📊 Monitoreo

### Analytics

Cloudflare Pages incluye analytics gratis:

1. En el proyecto → **Analytics**
2. Métricas disponibles:
   - Requests por hora/día
   - Bandwidth usado
   - Top países
   - Cache hit rate

### Logs

Para ver logs de deploy:

1. En el proyecto → **Deployments**
2. Click en cualquier deploy
3. Ver **Build log** y **Function log**

---

## 🐛 Troubleshooting

### Problema: 404 en páginas

**Solución:** Verificar que el `_redirects` file existe y tiene el fallback a `/index.html`

### Problema: CSS/JS no carga

**Solución:**
1. Verificar rutas relativas en HTML
2. Asegurar que `Root directory` sea `sitio_moderno`

### Problema: Dominio personalizado no funciona

**Solución:**
1. Verificar que el dominio esté en Cloudflare
2. Esperar 5-10 minutos para propagación DNS
3. Revisar en **DNS** que existe registro CNAME

### Problema: Cambios no se reflejan

**Solución:**
1. Hacer push a `main`
2. Verificar en **Deployments** que el deploy fue exitoso
3. Limpiar cache del navegador (Cmd+Shift+R)

---

## 🔒 Seguridad

### HTTPS

- ✅ SSL/TLS automático y gratuito
- ✅ Renovación automática de certificados
- ✅ HTTP → HTTPS redirect automático

### Protecciones

- ✅ DDoS protection incluido
- ✅ Rate limiting configurable
- ✅ Firewall rules disponibles

---

## 💰 Costos

**Cloudflare Pages es GRATIS** para proyectos como este:

- ✅ Bandwidth ilimitado
- ✅ Builds ilimitados
- ✅ 500 builds por mes (más que suficiente)
- ✅ SSL incluido
- ✅ CDN global incluido

---

## 📞 Soporte

Si tienes problemas:

1. **Documentación oficial:** https://developers.cloudflare.com/pages/
2. **Community Discord:** https://discord.cloudflare.com/
3. **Status page:** https://www.cloudflarestatus.com/

---

## ✅ Checklist Final

Antes de considerar el deploy completo, verificar:

- [ ] Sitio carga en `https://patrick.chuchurex.cl`
- [ ] Todas las páginas funcionan correctamente
- [ ] Imágenes cargan sin errores
- [ ] Buscador funciona
- [ ] Navegación funciona en todas las secciones
- [ ] HTTPS activo y funcionando
- [ ] Deploy automático configurado (push a main)
- [ ] Analytics activado

---

## 🎉 ¡Listo!

El sitio de Les Luthiers está ahora en producción en Cloudflare Pages.

**URL:** https://patrick.chuchurex.cl

---

*Última actualización: Enero 2026*
