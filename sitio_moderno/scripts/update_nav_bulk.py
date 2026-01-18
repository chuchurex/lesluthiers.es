import os
import re

ROOT_DIR = os.path.abspath("..") 
TARGET_DIR = "/Users/chuchurex/Sites/vigentes/lesluthires.es/sitio_moderno"

def get_header_nav_html(is_root):
    prefix = "" if is_root else "../"
    
    # Restore separate Header + Nav with internal Brand
    html = f"""  <!-- HEADER -->
  <header class="header">
    <div class="header-container">
      <h1>
        <img src="{prefix}assets/portada/cellato.gif" alt="Logo Animado" style="height: 48px; vertical-align: middle; margin-right: 12px; filter: invert(1);">
        La página de Les Luthiers de Patrick
      </h1>
      <p>50 años de música, humor y admiración</p>
    </div>
  </header>

  <!-- NAVEGACIÓN -->
  <nav class="nav">
    <!-- BRAND (Pegado a la izquierda, fuera del container) -->
    <a href="{prefix}index.html" class="nav-brand">
       <img src="{prefix}assets/portada/cellato.gif" alt="Logo" class="nav-logo">
       <span class="nav-title">La página de Les Luthiers de Patrick</span>
    </a>

    <!-- CONTAINER CENTRADO PARA LINKS -->
    <div class="nav-container">
      <div class="nav-links">
        <a href="{prefix}index.html">Inicio</a>
        <a href="{prefix}grupo/index.html">El Grupo</a>
        <a href="{prefix}espectaculos/index.html">Espectáculos</a>
        <a href="{prefix}obras/index.html">Obras</a>
        <a href="{prefix}multimedia/index.html">Multimedia</a>
        <a href="{prefix}instrumentos/index.html">Instrumentos</a>
        <a href="{prefix}personajes/index.html">Personajes</a>
      </div>
    </div>
  </nav>"""
    return html

def update_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    is_root = (filepath == os.path.join(TARGET_DIR, "index.html"))
    
    # 1. Revert HTML Structure
    # Find the Unified Nav block we created earlier
    # Pattern: <!-- NAVEGACIÓN UNIFICADA --> ... </nav>
    pattern_unified = re.compile(
        r'(<!--\s*NAVEGACIÓN UNIFICADA\s*-->\s*)?<nav class="nav">.*?</nav>',
        re.DOTALL
    )
    
    match = pattern_unified.search(content)
    if match:
        new_block = get_header_nav_html(is_root)
        content = content[:match.start()] + new_block + content[match.end():]
        print(f"Reverted HTML: {filepath}")
    else:
        # Fallback: maybe it's still old separate header? 
        # Or maybe it has the manual update I just did on index.html?
        # If it has "<!-- HEADER -->", we assume it's good, but let's check JS.
        pass

    # 2. Inject JS initialization
    # Search for "LesLuthiers.activarNavegacion();" and add initStickyNav if not present
    if "LesLuthiers.initStickyNav();" not in content:
        if "LesLuthiers.activarNavegacion();" in content:
            content = content.replace(
                "LesLuthiers.activarNavegacion();",
                "LesLuthiers.activarNavegacion();\n      LesLuthiers.initStickyNav();"
            )
            print(f"Injected JS: {filepath}")
        else:
            print(f"warning: Could not inject JS in {filepath}")
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

def main():
    print(f"Scanning {TARGET_DIR}...")
    for root, dirs, files in os.walk(TARGET_DIR):
        for file in files:
            if file.endswith(".html"):
                update_file(os.path.join(root, file))

if __name__ == "__main__":
    main()
