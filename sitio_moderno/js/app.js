/**
 * APLICACIÓN PRINCIPAL - LES LUTHIERS SITIO MODERNO
 * Sistema de carga de datos y búsqueda
 */

let respaldoCompleto = null;

// ==================================================================
// CARGA DE DATOS
// ==================================================================

async function cargarRespaldo(basePath = '.') {
  try {
    const response = await fetch(`${basePath}/data/lesluthiers_respaldo_completo.json`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    respaldoCompleto = await response.json();
    console.log('✅ Respaldo cargado:', respaldoCompleto.metadata);
    return respaldoCompleto;
  } catch (error) {
    console.error('❌ Error cargando respaldo:', error);
    mostrarError('No se pudo cargar el contenido. Por favor, intenta de nuevo.');
    return null;
  }
}

// ==================================================================
// FUNCIONES DE UTILIDAD
// ==================================================================

function crearSlug(texto) {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function truncarTexto(texto, maxLength = 150) {
  if (!texto) return '';
  if (texto.length <= maxLength) return texto;
  return texto.substring(0, maxLength).trim() + '...';
}

function extraerPrimerParrafo(html) {
  if (!html) return '';
  const div = document.createElement('div');
  div.innerHTML = html;
  const parrafos = div.querySelectorAll('p');
  return parrafos.length > 0 ? parrafos[0].textContent : '';
}

function obtenerPrimeraImagen(imagenes) {
  if (!imagenes || imagenes.length === 0) return null;
  return imagenes[0].url_absoluta || null;
}

function formatearFecha(fechaStr) {
  if (!fechaStr) return '';
  const fecha = new Date(fechaStr);
  return fecha.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function mostrarError(mensaje) {
  const container = document.getElementById('main-content') || document.body;
  container.innerHTML = `
    <div class="error">
      <h3>Error</h3>
      <p>${mensaje}</p>
    </div>
  `;
}

function mostrarCargando(container) {
  container.innerHTML = `
    <div class="loading">
      <h3>Cargando...</h3>
      <p>Por favor espera mientras se carga el contenido.</p>
    </div>
  `;
}

// ==================================================================
// NAVEGACIÓN
// ==================================================================

function activarNavegacion() {
  const links = document.querySelectorAll('.nav a');
  const rutaActual = window.location.pathname;

  links.forEach(link => {
    if (link.getAttribute('href') === rutaActual ||
      link.getAttribute('href') === '.' + rutaActual) {
      link.classList.add('active');
    }
  });
}

// ==================================================================
// BÚSQUEDA
// ==================================================================

function inicializarBusqueda() {
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');

  if (!searchInput || !respaldoCompleto) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.trim().toLowerCase();

    if (query.length < 2) {
      searchResults.classList.remove('active');
      searchResults.innerHTML = '';
      return;
    }

    const resultados = buscarEnRespaldo(query);
    mostrarResultadosBusqueda(resultados, query);
  });
}

function buscarEnRespaldo(query) {
  const resultados = [];

  // Buscar en componentes
  Object.entries(respaldoCompleto.componentes || {}).forEach(([url, comp]) => {
    if (comp.nombre.toLowerCase().includes(query) ||
      comp.biografia.toLowerCase().includes(query)) {
      resultados.push({
        tipo: 'Integrante',
        titulo: comp.nombre,
        descripcion: truncarTexto(comp.biografia, 100),
        url: `./grupo/${crearSlug(comp.nombre)}.html`,
        imagen: obtenerPrimeraImagen(comp.imagenes)
      });
    }
  });

  // Buscar en espectáculos
  Object.entries(respaldoCompleto.espectaculos || {}).forEach(([url, esp]) => {
    if (esp.titulo.toLowerCase().includes(query) ||
      esp.descripcion.toLowerCase().includes(query)) {
      resultados.push({
        tipo: 'Espectáculo',
        titulo: esp.titulo,
        descripcion: truncarTexto(esp.descripcion, 100),
        url: `./espectaculos/${crearSlug(esp.titulo)}.html`,
        imagen: obtenerPrimeraImagen(esp.imagenes)
      });
    }
  });

  // Buscar en obras
  Object.entries(respaldoCompleto.obras || {}).forEach(([url, obra]) => {
    if (obra.titulo.toLowerCase().includes(query) ||
      obra.contenido.toLowerCase().includes(query)) {
      resultados.push({
        tipo: 'Obra',
        titulo: obra.titulo,
        descripcion: truncarTexto(extraerPrimerParrafo(obra.contenido), 100),
        url: `./obras/${crearSlug(obra.titulo)}.html`,
        imagen: null
      });
    }
  });

  // Buscar en personajes
  Object.entries(respaldoCompleto.personajes || {}).forEach(([url, per]) => {
    if (per.nombre.toLowerCase().includes(query) ||
      per.biografia.toLowerCase().includes(query)) {
      resultados.push({
        tipo: 'Personaje',
        titulo: per.nombre,
        descripcion: truncarTexto(per.biografia, 100),
        url: `./personajes/${crearSlug(per.nombre)}.html`,
        imagen: obtenerPrimeraImagen(per.imagenes)
      });
    }
  });

  return resultados;
}

function mostrarResultadosBusqueda(resultados, query) {
  const searchResults = document.getElementById('search-results');

  if (resultados.length === 0) {
    searchResults.innerHTML = `
      <div class="card">
        <div class="card-body">
          <p>No se encontraron resultados para "<strong>${query}</strong>"</p>
        </div>
      </div>
    `;
    searchResults.classList.add('active');
    return;
  }

  const html = `
    <div class="card">
      <div class="card-body">
        <h3>Resultados (${resultados.length})</h3>
      </div>
    </div>
    <div class="grid">
      ${resultados.slice(0, 12).map(res => `
        <a href="${res.url}" class="card">
          <div class="card-image-wrapper">
            ${res.imagen ? `<img src="${res.imagen}" alt="${res.titulo}" class="card-image" loading="lazy">` : ''}
          </div>
          <div class="card-body">
            <div class="card-tags">
              <span class="tag">${res.tipo}</span>
            </div>
            <h3 class="card-title">${res.titulo}</h3>
            <p class="card-text">${res.descripcion}</p>
          </div>
        </a>
      `).join('')}
    </div>
    ${resultados.length > 12 ? `<p class="text-center mt-2">Mostrando 12 de ${resultados.length} resultados</p>` : ''}
  `;

  searchResults.innerHTML = html;
  searchResults.classList.add('active');
}

// ==================================================================
// RENDERIZADO DE TARJETAS
// ==================================================================

function renderizarTarjeta(item, tipo, urlBase) {
  const slug = crearSlug(item.titulo || item.nombre);
  const titulo = item.titulo || item.nombre;
  const descripcion = truncarTexto(
    item.descripcion || item.biografia || extraerPrimerParrafo(item.contenido),
    120
  );
  const imagen = obtenerPrimeraImagen(item.imagenes);

  return `
    <a href="${urlBase}/${slug}.html" class="card fade-in">
      <div class="card-image-wrapper">
        ${imagen ? `<img src="${imagen}" alt="${titulo}" class="card-image" loading="lazy">` : ''}
      </div>
      <div class="card-body">
        <div class="card-tags">
          <span class="tag">${tipo}</span>
        </div>
        <h3 class="card-title">${titulo}</h3>
        <p class="card-text">${descripcion}</p>
      </div>
    </a>
  `;
}

function renderizarGrid(items, tipo, urlBase, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const html = items.map(item => renderizarTarjeta(item, tipo, urlBase)).join('');
  container.innerHTML = `<div class="grid">${html}</div>`;
}

// ==================================================================
// ESTADÍSTICAS
// ==================================================================

function renderizarEstadisticas(containerId) {
  if (!respaldoCompleto) return;

  const container = document.getElementById(containerId);
  if (!container) return;

  const stats = [
    {
      numero: Object.keys(respaldoCompleto.componentes || {}).length,
      label: 'Integrantes'
    },
    {
      numero: Object.keys(respaldoCompleto.espectaculos || {}).length,
      label: 'Espectáculos'
    },
    {
      numero: Object.keys(respaldoCompleto.obras || {}).length,
      label: 'Obras'
    },
    {
      numero: Object.keys(respaldoCompleto.personajes || {}).length,
      label: 'Personajes'
    },
    {
      numero: respaldoCompleto.metadata?.total_paginas || 0,
      label: 'Páginas'
    },
    {
      numero: respaldoCompleto.metadata?.total_imagenes || 0,
      label: 'Imágenes'
    }
  ];

  const html = stats.map(stat => `
    <div class="stat-card fade-in">
      <div class="stat-number">${stat.numero}</div>
      <div class="stat-label">${stat.label}</div>
    </div>
  `).join('');

  container.innerHTML = `<div class="stats-grid">${html}</div>`;
}

// ==================================================================
// UX / UI
// ==================================================================

function initStickyNav() {
  const header = document.querySelector('.header');
  const nav = document.querySelector('.nav');

  if (!header || !nav) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      // Si el header NO está intersectando (se fue arriba), añadimos 'scrolled'
      if (!entry.isIntersecting) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    },
    {
      root: null,
      threshold: 0,
      rootMargin: "0px" // Trigger exacto cuando sale
    }
  );

  observer.observe(header);
}

// ==================================================================
// EXPORTAR FUNCIONES
// ==================================================================

window.LesLuthiers = {
  cargarRespaldo,
  activarNavegacion,
  inicializarBusqueda,
  renderizarGrid,
  renderizarEstadisticas,
  crearSlug,
  truncarTexto,
  obtenerPrimeraImagen,
  formatearFecha,
  initStickyNav
};
