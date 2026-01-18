# 🚀 Crear Proyecto en Cloudflare Pages - PASO A PASO

## ⚠️ IMPORTANTE: El proyecto NO existe todavía

Las URLs no funcionan porque **aún no has creado el proyecto en Cloudflare Pages**.

El código está en GitHub, pero Cloudflare no sabe que existe. Necesitas crear el proyecto siguiendo estos pasos:

---

## 📋 Paso 1: Ir a Cloudflare Dashboard

1. Abre tu navegador
2. Ve a: **https://dash.cloudflare.com/**
3. Inicia sesión con tu cuenta de Cloudflare

---

## 📋 Paso 2: Ir a Workers & Pages

1. En el menú lateral izquierdo, busca **"Workers & Pages"**
2. Click en **"Workers & Pages"**
3. Verás una lista de tus proyectos actuales (si tienes)

---

## 📋 Paso 3: Create Application

1. Click en el botón azul **"Create application"** (arriba a la derecha)
2. Verás dos tabs: **Workers** y **Pages**
3. Click en el tab **"Pages"**

---

## 📋 Paso 4: Connect to Git

1. Click en **"Connect to Git"**
2. Si es la primera vez, te pedirá autorizar GitHub:
   - Click en **"Connect GitHub"**
   - Se abrirá una ventana de GitHub
   - Autoriza el acceso a Cloudflare
   - Selecciona a qué repositorios darle acceso (puedes dar acceso a todos o solo a `lesluthiers.es`)

---

## 📋 Paso 5: Seleccionar Repositorio

1. Verás una lista de tus repositorios de GitHub
2. Busca: **"chuchurex/lesluthiers.es"**
3. Click en **"Begin setup"** al lado del repositorio

---

## 📋 Paso 6: Configurar Build Settings

**⚠️ ESTA ES LA PARTE MÁS IMPORTANTE:**

Ingresa exactamente estos valores:

```
┌─────────────────────────────────────────────┐
│ Project name:                               │
│ lesluthiers                                 │
│                                             │
│ Production branch:                          │
│ main                                        │
│                                             │
│ Framework preset:                           │
│ None                                        │
│                                             │
│ Build command:                              │
│ (dejar VACÍO - no escribir nada)           │
│                                             │
│ Build output directory:                     │
│ /                                           │
│                                             │
│ Root directory (path):                      │
│ sitio_moderno                               │
│                                             │
└─────────────────────────────────────────────┘
```

**CRÍTICO:**
- El campo **"Root directory"** debe ser exactamente: `sitio_moderno`
- El campo **"Build command"** debe estar VACÍO (es un sitio estático)
- El campo **"Build output directory"** debe ser: `/`

---

## 📋 Paso 7: Variables de Entorno (Opcional)

1. Expande **"Environment variables (advanced)"** si quieres
2. Para este proyecto **NO necesitas** variables de entorno
3. Déjalo vacío y continúa

---

## 📋 Paso 8: Save and Deploy

1. Click en el botón grande azul **"Save and Deploy"**
2. Cloudflare comenzará a construir tu sitio
3. Verás una pantalla con logs de deploy
4. Espera 1-2 minutos (es muy rápido porque es HTML estático)

---

## 📋 Paso 9: Deploy Exitoso

Cuando termine, verás:

```
✅ Success! Your site is live!

🔗 https://lesluthiers.pages.dev
```

1. Click en la URL temporal
2. Verifica que el sitio cargue correctamente
3. Navega por las secciones para asegurarte que todo funciona

---

## 📋 Paso 10: Agregar Dominio Personalizado

Ahora que el sitio funciona, agrega el dominio personalizado:

1. En la página del proyecto, busca el tab **"Custom domains"**
2. Click en **"Set up a custom domain"**
3. Ingresa: `patrick.chuchurex.cl`
4. Click en **"Continue"**
5. Cloudflare detectará automáticamente que el dominio está en Cloudflare
6. Click en **"Activate domain"**
7. Espera 2-5 minutos para que el DNS se propague

---

## ✅ Verificación Final

Después de 5 minutos, verifica:

- ✅ **Temporal**: https://lesluthiers.pages.dev
- ✅ **Personalizada**: https://patrick.chuchurex.cl

Ambas URLs deben mostrar el sitio de Les Luthiers.

---

## 🐛 Si algo sale mal

### Error: "Build failed"

**Causa:** Probablemente el "Root directory" está mal configurado.

**Solución:**
1. Ve a **Settings** en el proyecto
2. Busca **"Build & deployments"**
3. Click en **"Edit configuration"**
4. Verifica que **Root directory** sea exactamente: `sitio_moderno`
5. Save y haz un **Retry deployment**

### Error: "404 Not Found" en todas las páginas

**Causa:** El archivo `_redirects` no está funcionando.

**Solución:**
1. Verifica que el archivo `_redirects` existe en la raíz de `sitio_moderno/`
2. Haz un nuevo deploy desde el dashboard

### Error: "Domain not activating"

**Causa:** El dominio `chuchurex.cl` no está en Cloudflare o hay un problema de DNS.

**Solución:**
1. Ve a **DNS** en Cloudflare
2. Verifica que existe un registro CNAME para `patrick` apuntando a `lesluthiers.pages.dev`
3. Si no existe, créalo manualmente:
   ```
   Type: CNAME
   Name: patrick
   Target: lesluthiers.pages.dev
   Proxy status: Proxied (orange cloud)
   ```

---

## 📞 Necesitas ayuda?

Si después de seguir estos pasos algo no funciona:

1. Toma un screenshot del error
2. Copia los logs de deploy (si hay errores)
3. Verifica que seguiste EXACTAMENTE los valores del Paso 6

---

## 🎯 Checklist Rápido

Antes de empezar, asegúrate:

- [ ] Tienes cuenta en Cloudflare
- [ ] Tienes acceso al dominio `chuchurex.cl` en Cloudflare
- [ ] Tienes acceso al repositorio GitHub `chuchurex/lesluthiers.es`
- [ ] Estás conectado a GitHub desde Cloudflare

Durante la configuración:

- [ ] Project name: `lesluthiers`
- [ ] Production branch: `main`
- [ ] Build command: (VACÍO)
- [ ] Build output directory: `/`
- [ ] Root directory: `sitio_moderno` ← MUY IMPORTANTE

Después del deploy:

- [ ] URL temporal funciona: `https://lesluthiers.pages.dev`
- [ ] Agregaste dominio personalizado: `patrick.chuchurex.cl`
- [ ] Esperaste 5 minutos para DNS
- [ ] URL personalizada funciona: `https://patrick.chuchurex.cl`

---

**¡Mucha suerte con el deploy!** 🚀

*Si sigues estos pasos exactamente, funcionará sin problemas.*
