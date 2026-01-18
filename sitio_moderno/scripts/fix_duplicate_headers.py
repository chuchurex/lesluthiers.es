import os
import re

TARGET_DIR = "/Users/chuchurex/Sites/vigentes/lesluthires.es/sitio_moderno"

def get_header_nav_html(is_root):
    prefix = "" if is_root else "../"
    
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

def fix_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    is_root = (filepath == os.path.join(TARGET_DIR, "index.html"))
    
    # Skip root index.html (it has different structure)
    if is_root:
        print(f"Skipping root: {filepath}")
        return
    
    # Pattern to find ALL header+nav content from <body> to </nav>
    # This will match everything from the first <!-- HEADER --> to the last </nav>
    pattern = re.compile(
        r'(<body>)\s*(<!--\s*HEADER\s*-->.*?</nav>)',
        re.DOTALL
    )
    
    match = pattern.search(content)
    if match:
        new_block = get_header_nav_html(is_root)
        new_content = content[:match.end(1)] + "\n" + new_block + content[match.end():]
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Fixed: {filepath}")
    else:
        print(f"No match: {filepath}")

def main():
    print(f"Fixing duplicates in {TARGET_DIR}...")
    for root, dirs, files in os.walk(TARGET_DIR):
        for file in files:
            if file.endswith(".html"):
                fix_file(os.path.join(root, file))

if __name__ == "__main__":
    main()
