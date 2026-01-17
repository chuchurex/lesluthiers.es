// Dashboard JavaScript - La Hora de la Nostalgia

document.addEventListener('DOMContentLoaded', () => {
    cargarDatos();
});

async function cargarDatos() {
    try {
        const response = await fetch('analisis_canal.json');
        const data = await response.json();

        actualizarHeroStats(data.canal);
        actualizarPromedios(data.promedios);
        actualizarTopVistos(data.top_videos.mas_vistos);
        actualizarTopLikes(data.top_videos.mas_likes);
        actualizarTopComentados(data.top_videos.mas_comentados);
        actualizarTopEngagement(data.top_videos.mejor_engagement);
        actualizarEvolucionAños(data.por_año);
        actualizarUltimosMeses(data.por_mes_ultimos_12);
        actualizarTemasFrecuentes(data.temas_frecuentes);
        actualizarVideosRecientes(data.videos_recientes);
        actualizarFecha(data.fecha_actualizacion);

    } catch (error) {
        console.error('Error cargando datos:', error);
    }
}

function formatNumber(num) {
    return num.toLocaleString('es-ES');
}

function formatDuration(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
}

function actualizarHeroStats(canal) {
    document.getElementById('total-videos').textContent = formatNumber(canal.total_videos);
    document.getElementById('total-vistas').textContent = formatNumber(canal.total_vistas);
    document.getElementById('total-likes').textContent = formatNumber(canal.total_likes);
    document.getElementById('total-comentarios').textContent = formatNumber(canal.total_comentarios);
}

function actualizarPromedios(promedios) {
    document.getElementById('prom-vistas').textContent = formatNumber(promedios.vistas_por_video);
    document.getElementById('prom-likes').textContent = formatNumber(promedios.likes_por_video);
    document.getElementById('prom-comentarios').textContent = formatNumber(promedios.comentarios_por_video);
    document.getElementById('engagement').textContent = `${promedios.engagement_rate}%`;
}

function crearRankingItem(video, index, tipo = 'completo') {
    const item = document.createElement('div');
    item.className = `ranking-item ${index === 0 ? 'top-1' : index === 1 ? 'top-2' : index === 2 ? 'top-3' : ''}`;

    const posicion = document.createElement('div');
    posicion.className = 'ranking-position';
    posicion.textContent = `#${index + 1}`;

    const info = document.createElement('div');
    info.className = 'ranking-info';

    const titulo = document.createElement('div');
    titulo.className = 'ranking-title';
    titulo.textContent = video.title;

    const meta = document.createElement('div');
    meta.className = 'ranking-meta';
    const fecha = new Date(video.published_at).toLocaleDateString('es-ES');

    let metaText = `📅 ${fecha}`;
    if (tipo === 'completo') {
        metaText += ` • 👁️ ${formatNumber(video.view_count)} • ❤️ ${formatNumber(video.like_count)} • 💬 ${formatNumber(video.comment_count)}`;
    }
    meta.textContent = metaText;

    const link = document.createElement('a');
    link.className = 'ranking-link';
    link.href = `https://www.youtube.com/watch?v=${video.video_id}`;
    link.target = '_blank';
    link.textContent = 'Ver en YouTube →';

    info.appendChild(titulo);
    info.appendChild(meta);
    if (tipo === 'completo') {
        info.appendChild(link);
    }

    const stat = document.createElement('div');
    stat.className = 'ranking-stat';

    item.appendChild(posicion);
    item.appendChild(info);
    item.appendChild(stat);

    return item;
}

function actualizarTopVistos(videos) {
    const container = document.getElementById('top-vistos');
    container.innerHTML = '';

    videos.slice(0, 10).forEach((video, index) => {
        const item = crearRankingItem(video, index, 'completo');
        const stat = item.querySelector('.ranking-stat');
        stat.textContent = `${formatNumber(video.view_count)} vistas`;
        container.appendChild(item);
    });
}

function actualizarTopLikes(videos) {
    const container = document.getElementById('top-likes');
    container.innerHTML = '';

    videos.slice(0, 10).forEach((video, index) => {
        const item = crearRankingItem(video, index, 'compact');
        const stat = item.querySelector('.ranking-stat');
        stat.textContent = `${formatNumber(video.like_count)} ❤️`;
        container.appendChild(item);
    });
}

function actualizarTopComentados(videos) {
    const container = document.getElementById('top-comentados');
    container.innerHTML = '';

    videos.slice(0, 10).forEach((video, index) => {
        const item = crearRankingItem(video, index, 'compact');
        const stat = item.querySelector('.ranking-stat');
        stat.textContent = `${formatNumber(video.comment_count)} 💬`;
        container.appendChild(item);
    });
}

function actualizarTopEngagement(videos) {
    const container = document.getElementById('top-engagement');
    container.innerHTML = '';

    videos.slice(0, 10).forEach((video, index) => {
        const item = crearRankingItem(video, index, 'completo');
        const stat = item.querySelector('.ranking-stat');
        const engagement = ((video.like_count / video.view_count) * 100).toFixed(2);
        stat.textContent = `${engagement}%`;
        container.appendChild(item);
    });
}

function actualizarEvolucionAños(porAño) {
    const container = document.getElementById('evolucion-años');
    container.innerHTML = '';

    Object.entries(porAño).reverse().forEach(([año, datos]) => {
        const card = document.createElement('div');
        card.className = 'evolucion-card';

        const yearTitle = document.createElement('div');
        yearTitle.className = 'evolucion-año';
        yearTitle.textContent = año;

        const stats = document.createElement('div');
        stats.className = 'evolucion-stats';

        stats.innerHTML = `
            <div class="evolucion-stat">
                <span class="evolucion-stat-label">Videos:</span>
                <span class="evolucion-stat-value">${datos.total_videos}</span>
            </div>
            <div class="evolucion-stat">
                <span class="evolucion-stat-label">Total vistas:</span>
                <span class="evolucion-stat-value">${formatNumber(datos.total_vistas)}</span>
            </div>
            <div class="evolucion-stat">
                <span class="evolucion-stat-label">Promedio:</span>
                <span class="evolucion-stat-value">${formatNumber(datos.promedio_vistas)}</span>
            </div>
        `;

        const mejor = document.createElement('div');
        mejor.className = 'evolucion-mejor';
        mejor.innerHTML = `
            <div class="evolucion-mejor-titulo">🏆 Más visto:</div>
            <div class="evolucion-mejor-video">${datos.video_mas_visto.title.substring(0, 50)}...</div>
        `;

        card.appendChild(yearTitle);
        card.appendChild(stats);
        card.appendChild(mejor);
        container.appendChild(card);
    });
}

function actualizarUltimosMeses(porMes) {
    const canvas = document.getElementById('chart-meses');
    const ctx = canvas.getContext('2d');

    const meses = Object.keys(porMes).reverse();
    const labels = meses.map(m => {
        const [año, mes] = m.split('-');
        const fecha = new Date(año, mes - 1);
        return fecha.toLocaleDateString('es-ES', { month: 'short', year: '2-digit' });
    });

    const videos = meses.map(m => porMes[m].total_videos);
    const vistas = meses.map(m => porMes[m].total_vistas);

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Videos publicados',
                    data: videos,
                    borderColor: '#667eea',
                    backgroundColor: 'rgba(102, 126, 234, 0.1)',
                    tension: 0.4,
                    yAxisID: 'y'
                },
                {
                    label: 'Vistas totales',
                    data: vistas,
                    borderColor: '#764ba2',
                    backgroundColor: 'rgba(118, 75, 162, 0.1)',
                    tension: 0.4,
                    yAxisID: 'y1'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            scales: {
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: {
                        display: true,
                        text: 'Videos'
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Vistas'
                    },
                    grid: {
                        drawOnChartArea: false,
                    },
                }
            }
        }
    });
}

function actualizarTemasFrecuentes(temas) {
    const container = document.getElementById('temas-cloud');
    container.innerHTML = '';

    const maxFreq = temas[0].frecuencia;

    temas.slice(0, 20).forEach(tema => {
        const tag = document.createElement('div');
        tag.className = 'tag';

        const ratio = tema.frecuencia / maxFreq;
        if (ratio > 0.7) tag.classList.add('size-xl');
        else if (ratio > 0.5) tag.classList.add('size-lg');
        else if (ratio > 0.3) tag.classList.add('size-md');
        else tag.classList.add('size-sm');

        tag.textContent = `${tema.tema} (${tema.frecuencia})`;
        container.appendChild(tag);
    });
}

function actualizarVideosRecientes(videos) {
    const container = document.getElementById('videos-recientes');
    container.innerHTML = '';

    videos.forEach(video => {
        const card = document.createElement('div');
        card.className = 'video-card-reciente';

        const content = document.createElement('div');
        content.className = 'video-card-content';

        const fecha = new Date(video.published_at).toLocaleDateString('es-ES');

        content.innerHTML = `
            <div class="video-card-title">${video.title}</div>
            <div class="video-card-stats">
                <span class="video-card-stat">👁️ ${formatNumber(video.view_count)}</span>
                <span class="video-card-stat">❤️ ${formatNumber(video.like_count)}</span>
                <span class="video-card-stat">💬 ${formatNumber(video.comment_count)}</span>
            </div>
            <div class="video-card-meta">📅 ${fecha}</div>
            <a href="https://www.youtube.com/watch?v=${video.video_id}" target="_blank" class="video-card-link">
                Ver en YouTube →
            </a>
        `;

        card.appendChild(content);
        container.appendChild(card);
    });
}

function actualizarFecha(fechaISO) {
    const fecha = new Date(fechaISO);
    const opciones = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };

    const fechaFormateada = fecha.toLocaleDateString('es-ES', opciones);
    document.getElementById('ultima-actualizacion').textContent = fechaFormateada;
}
