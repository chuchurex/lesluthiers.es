import os
import re

# Constantes
BASE_DIR = "/Users/chuchurex/Sites/vigentes/lesluthires.es/sitio_moderno"

# Plantilla para el HEADER (para archivos en subdirectorios nivel 1, e.g. grupo/, obras/)
HEADER_TEMPLATE = """  <!-- HEADER -->
  <header class="header">
    <div class="header-container">
      <h1>
        <img src="../portada/glamocot.png" alt="Glamocot" class="header-logo-left">
        La página de Les Luthiers de Patrick
        <img src="../portada/cellato.gif" alt="Cellato" class="header-logo-right">
      </h1>
      <p>50 años de música, humor y admiración</p>
    </div>
  </header>"""

# Plantilla para el NAV (para archivos en subdirectorios nivel 1)
NAV_TEMPLATE = """  <!-- NAVEGACIÓN -->
  <nav class="nav" id="main-nav">
    <!-- BRAND IZQUIERDA (aparece al scroll) -->
    <a href="../index.html" class="nav-brand nav-brand-left">
      <img src="../portada/glamocot.png" alt="Logo" class="nav-logo">
      <span class="nav-title">La página de Les Luthiers de Patrick</span>
    </a>

    <!-- BRAND DERECHA - Cellato flotando (aparece al scroll) -->
    <div class="nav-brand nav-brand-right">
      <img src="../portada/cellato.gif" alt="Cellato" class="nav-logo">
    </div>

    <!-- CONTAINER CENTRADO PARA LINKS -->
    <div class="nav-container">
      <div class="nav-links">
        <a href="../grupo/index.html">El Grupo</a>
        <a href="../espectaculos/index.html">Espectáculos</a>
        <a href="../obras/index.html">Obras</a>
        <a href="../multimedia/index.html">Multimedia</a>
        <a href="../instrumentos/index.html">Instrumentos</a>
        <a href="../personajes/index.html">Personajes</a>
      </div>
    </div>
  </nav>"""

def unify_headers():
    print("Iniciando unificación de cabeceras...")
    
    # Recorrer directorios
    for root, dirs, files in os.walk(BASE_DIR):
        # Ignorar archivo index.html raíz y carpetas especiales
        if root == BASE_DIR:
            continue
            
        # Ignorar assets, css, js, scripts
        rel_path = os.path.relpath(root, BASE_DIR)
        if rel_path in ['assets', 'css', 'js', 'scripts', 'data', 'portada']:
            continue
            
        print(f"Procesando directorio: {rel_path}")
        
        for file in files:
            if file.endswith(".html"):
                file_path = os.path.join(root, file)
                process_file(file_path)

def process_file(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # Regex para encontrar HEADER completo
        # Busca desde <!-- HEADER --> hasta el cierre de </header>
        header_pattern = re.compile(r'<!-- HEADER -->.*?<\/header>', re.DOTALL | re.IGNORECASE)
        
        # Regex para encontrar NAV completo
        # Busca desde <!-- NAVEGACIÓN --> hasta el cierre de </nav>
        nav_pattern = re.compile(r'<!-- NAVEGACIÓN -->.*?<\/nav>', re.DOTALL | re.IGNORECASE)
        
        new_content = content
        
        # Reemplazar HEADER si existe
        if re.search(header_pattern, new_content):
            new_content = re.sub(header_pattern, HEADER_TEMPLATE, new_content)
        else:
            print(f"  [WARN] No se encontró bloque HEADER en {os.path.basename(file_path)}")
            
        # Reemplazar NAV si existe
        if re.search(nav_pattern, new_content):
            new_content = re.sub(nav_pattern, NAV_TEMPLATE, new_content)
        else:
            print(f"  [WARN] No se encontró bloque NAV en {os.path.basename(file_path)}")
            
        # Guardar cambios si hubo modificaciones
        if content != new_content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"  [OK] Actualizado: {os.path.basename(file_path)}")
        else:
             print(f"  [SKIP] Sin cambios necesarios: {os.path.basename(file_path)}")
             
    except Exception as e:
        print(f"  [ERROR] Falló procesamiento de {file_path}: {e}")

if __name__ == "__main__":
    unify_headers()
