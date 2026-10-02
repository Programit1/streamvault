// ==========================================================================
// StreamVault Web - Netflix & Apple Glass Cinema Logic
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  let sites = [];
  let currentCategory = 'all';
  let searchQuery = '';
  let filter4k = false;
  let filterAutoNext = false;
  let favoritesSet = new Set();

  // Hero Spotlight State
  let heroFeaturedIndex = 0;
  let heroFeaturedSites = [];
  let heroInterval = null;

  // DOM Elements - Header & Nav
  const netflixNavLinks = document.getElementById('netflix-nav-links');
  const searchInput = document.getElementById('search-input');
  const btnClearSearch = document.getElementById('btn-clear-search');
  const btnBrandHome = document.getElementById('btn-brand-home');

  // Hero Billboard Elements
  const heroTitle = document.getElementById('hero-title');
  const heroDesc = document.getElementById('hero-desc');
  const heroTagQuality = document.getElementById('hero-tag-quality');
  const btnHeroPlay = document.getElementById('btn-hero-play');
  const btnHeroFav = document.getElementById('btn-hero-fav');
  const heroFavIcon = document.getElementById('hero-fav-icon');
  const heroFavText = document.getElementById('hero-fav-text');
  const heroSwitchers = document.getElementById('hero-switchers');
  const billboardGlow = document.getElementById('billboard-glow');

  // Shelves Elements
  const favoritesSection = document.getElementById('favorites-section');
  const favoritesCarousel = document.getElementById('favorites-carousel');
  const countFavoritesBadge = document.getElementById('count-favorites-badge');
  const carouselTrending = document.getElementById('carousel-trending');
  const carouselMovies = document.getElementById('carousel-movies');
  const carouselAnime = document.getElementById('carousel-anime');
  const carouselLive = document.getElementById('carousel-live');

  // Master Directory Elements
  const categoryTabs = document.getElementById('category-tabs');
  const chipFilter4k = document.getElementById('chip-filter-4k');
  const chipFilterAutoNext = document.getElementById('chip-filter-autonext');
  const activeCategoryTitle = document.getElementById('active-category-title');
  const sitesGrid = document.getElementById('sites-grid');
  const toastContainer = document.getElementById('toast-container');

  // ==========================================================================
  // Initialization
  // ==========================================================================
  function init() {
    loadSites();
    setupEventListeners();
    startHeroAutoRotation();
  }

  // Load saved favorites from localStorage
  function loadFavorites() {
    try {
      const raw = localStorage.getItem('streamvault_favorites');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          favoritesSet = new Set(parsed);
        }
      }
    } catch (e) {
      console.warn('Failed to parse favorites:', e);
    }
  }

  // Persist favorite to localStorage
  function persistFavorite(siteId, isFav) {
    if (isFav) {
      favoritesSet.add(siteId);
    } else {
      favoritesSet.delete(siteId);
    }

    try {
      localStorage.setItem('streamvault_favorites', JSON.stringify([...favoritesSet]));
    } catch (e) {}
  }

  // Load sites from window.DEFAULT_SITES (loaded synchronously from sites-data.js)
  function loadSites() {
    try {
      if (window.DEFAULT_SITES && Array.isArray(window.DEFAULT_SITES) && window.DEFAULT_SITES.length > 0) {
        sites = JSON.parse(JSON.stringify(window.DEFAULT_SITES));
      } else {
        console.warn('sites-data.js not found, fallback to empty catalog');
        sites = [];
      }

      loadFavorites();

      // Sync favorite flags
      sites.forEach(s => {
        s.favorite = favoritesSet.has(s.id);
      });

      setupHeroSpotlight();
      renderAllSections();
    } catch (e) {
      console.error('Failed to load streaming sites:', e);
    }
  }

  // ==========================================================================
  // Netflix Billboard Hero Spotlight
  // ==========================================================================
  function setupHeroSpotlight() {
    const priorityIds = ['fmhy_movy_0', 'fmhy_miruro_137', 'fmhy_cinejoy_1', 'fmhy_rive_4', 'pluto-tv'];
    heroFeaturedSites = priorityIds.map(id => sites.find(s => s.id === id)).filter(Boolean);

    if (heroFeaturedSites.length === 0 && sites.length > 0) {
      heroFeaturedSites = sites.slice(0, 5);
    }

    renderHeroSpotlight(0);
    renderHeroSwitchers();
  }

  function renderHeroSpotlight(index) {
    if (!heroFeaturedSites || heroFeaturedSites.length === 0) return;
    heroFeaturedIndex = index;
    const current = heroFeaturedSites[index];
    if (!current) return;

    if (heroTitle) heroTitle.textContent = current.name.toUpperCase();
    if (heroDesc) {
      heroDesc.textContent = current.description || 'Stream thousands of movies, TV shows, and live channels with network-level ad interception.';
    }

    const has4k = current.tags && current.tags.some(t => t.toLowerCase() === '4k');
    if (heroTagQuality) heroTagQuality.textContent = has4k ? '4K ULTRA HD' : 'HD 1080P STREAM';

    const accent = current.accentColor || '#E50914';
    if (billboardGlow) {
      billboardGlow.style.background = `radial-gradient(circle, ${accent}33 0%, rgba(147, 51, 234, 0.15) 50%, transparent 75%)`;
    }

    updateHeroFavoriteButton(current);

    if (btnHeroPlay) btnHeroPlay.onclick = () => launchStream(current);
    if (btnHeroFav) {
      btnHeroFav.onclick = () => {
        current.favorite = !current.favorite;
        persistFavorite(current.id, current.favorite);
        updateHeroFavoriteButton(current);
        renderFavoritesShelf();
        renderMasterGrid();
        showToast(current.favorite ? 'Added to Favorites' : 'Removed from Favorites', current.name);
      };
    }

    document.querySelectorAll('.switcher-tab').forEach((tab, i) => {
      tab.classList.toggle('active', i === index);
    });
  }

  function updateHeroFavoriteButton(site) {
    if (!btnHeroFav) return;
    if (site.favorite) {
      if (heroFavIcon) heroFavIcon.textContent = '★';
      if (heroFavText) heroFavText.textContent = 'In Favorites';
      btnHeroFav.style.background = 'rgba(245, 158, 11, 0.25)';
      btnHeroFav.style.borderColor = '#f59e0b';
    } else {
      if (heroFavIcon) heroFavIcon.textContent = '☆';
      if (heroFavText) heroFavText.textContent = 'Favorite';
      btnHeroFav.style.background = 'rgba(255, 255, 255, 0.15)';
      btnHeroFav.style.borderColor = 'rgba(255, 255, 255, 0.2)';
    }
  }

  function renderHeroSwitchers() {
    if (!heroSwitchers) return;
    heroSwitchers.innerHTML = '';
    heroFeaturedSites.forEach((site, idx) => {
      const tab = document.createElement('button');
      tab.className = `switcher-tab ${idx === heroFeaturedIndex ? 'active' : ''}`;
      tab.textContent = site.name;
      tab.onclick = () => {
        renderHeroSpotlight(idx);
        startHeroAutoRotation();
      };
      heroSwitchers.appendChild(tab);
    });
  }

  function startHeroAutoRotation() {
    if (heroInterval) clearInterval(heroInterval);
    heroInterval = setInterval(() => {
      if (heroFeaturedSites.length > 1) {
        const nextIdx = (heroFeaturedIndex + 1) % heroFeaturedSites.length;
        renderHeroSpotlight(nextIdx);
      }
    }, 10000);
  }

  // ==========================================================================
  // Render Shelves & Master Directory
  // ==========================================================================
  function renderAllSections() {
    renderFavoritesShelf();
    renderTrendingShelf();
    renderCategoryShelves();
    renderMasterGrid();
  }

  function renderFavoritesShelf() {
    if (!favoritesCarousel || !favoritesSection) return;
    const favSites = sites.filter(s => s.favorite);

    if (favSites.length === 0) {
      favoritesSection.classList.add('hidden');
      favoritesCarousel.innerHTML = '';
      return;
    }

    favoritesSection.classList.remove('hidden');
    if (countFavoritesBadge) countFavoritesBadge.textContent = `${favSites.length} Titles`;
    favoritesCarousel.innerHTML = '';

    favSites.forEach(site => {
      favoritesCarousel.appendChild(createCard(site));
    });
  }

  function renderTrendingShelf() {
    if (!carouselTrending) return;
    carouselTrending.innerHTML = '';
    const trending = sites.slice(0, 12);
    trending.forEach(site => {
      carouselTrending.appendChild(createCard(site));
    });
  }

  function renderCategoryShelves() {
    if (carouselMovies) {
      carouselMovies.innerHTML = '';
      const movies = sites.filter(s => s.category === 'Cinema & Shows').slice(0, 16);
      movies.forEach(site => carouselMovies.appendChild(createCard(site)));
    }

    if (carouselAnime) {
      carouselAnime.innerHTML = '';
      const anime = sites.filter(s => s.category === 'Anime & Animation').slice(0, 16);
      anime.forEach(site => carouselAnime.appendChild(createCard(site)));
    }

    if (carouselLive) {
      carouselLive.innerHTML = '';
      const live = sites.filter(s => s.category === 'Live TV & Streams' || s.category === 'Video & Streams').slice(0, 16);
      live.forEach(site => carouselLive.appendChild(createCard(site)));
    }
  }

  function renderMasterGrid() {
    if (!sitesGrid) return;
    sitesGrid.innerHTML = '';

    const filtered = sites.filter(site => {
      let matchesCat = true;
      if (currentCategory !== 'all') {
        matchesCat = site.category === currentCategory;
      }

      let matches4k = true;
      if (filter4k) {
        matches4k = site.tags && site.tags.some(t => t.toLowerCase() === '4k');
      }

      let matchesAutoNext = true;
      if (filterAutoNext) {
        matchesAutoNext = site.tags && site.tags.some(t => t.toLowerCase().includes('auto-next'));
      }

      let matchesSearch = true;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        matchesSearch = (site.name || '').toLowerCase().includes(q) ||
                        (site.url || '').toLowerCase().includes(q) ||
                        (site.tags || []).some(t => t.toLowerCase().includes(q));
      }

      return matchesCat && matches4k && matchesAutoNext && matchesSearch;
    });

    if (activeCategoryTitle) {
      activeCategoryTitle.textContent = `${filtered.length} Services Ready`;
    }

    if (filtered.length === 0) {
      sitesGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 48px 12px; color: var(--text-dim);">
          No streaming services matched your filters.
        </div>
      `;
      return;
    }

    filtered.forEach(site => {
      sitesGrid.appendChild(createCard(site));
    });
  }

  // ==========================================================================
  // Card Creation
  // ==========================================================================
  function createCard(site) {
    const card = document.createElement('div');
    card.className = 'site-card';
    card.style.setProperty('--card-accent', site.accentColor || '#E50914');

    let hostname = site.url;
    try {
      hostname = new URL(site.url).hostname.replace('www.', '');
    } catch (e) {}

    const isFav = !!site.favorite;
    const initial = (site.name || 'S').charAt(0).toUpperCase();

    const tags = site.tags || [];
    const has4k = tags.some(t => t.toLowerCase() === '4k');
    const hasAutoNext = tags.some(t => t.toLowerCase().includes('auto-next'));

    let badgeHtml = '';
    if (has4k) badgeHtml += '<span class="tile-badge badge-4k">4K</span>';
    if (hasAutoNext) badgeHtml += '<span class="tile-badge badge-autonext">Auto-Next</span>';

    const iconUrl = site.icon || `https://www.google.com/s2/favicons?domain=${hostname}&sz=128`;

    card.innerHTML = `
      <div class="card-ambient-tint"></div>
      <div class="card-top-row">
        <div class="card-logo-box">
          <img class="card-logo-img" src="${iconUrl}" alt="${escapeHtml(site.name)}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
          <div class="card-logo-fallback" style="display:none; background: linear-gradient(135deg, ${site.accentColor || '#E50914'}, #111420);">${initial}</div>
        </div>
        <button class="card-star-btn ${isFav ? 'active' : ''}" title="${isFav ? 'Unfavorite' : 'Favorite'}">
          ${isFav ? '★' : '☆'}
        </button>
      </div>

      <div class="card-body">
        <h3 class="card-title">${escapeHtml(site.name)}</h3>
        <p class="card-domain">${escapeHtml(hostname)}</p>
      </div>

      <div class="card-badges-wrap">
        ${badgeHtml}
      </div>
    `;

    // 1-Click Launch Stream
    card.addEventListener('click', (e) => {
      if (e.target.closest('.card-star-btn')) return;
      launchStream(site);
    });

    // Star Toggle
    const starBtn = card.querySelector('.card-star-btn');
    starBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      site.favorite = !site.favorite;
      persistFavorite(site.id, site.favorite);
      renderFavoritesShelf();
      renderMasterGrid();
      showToast(site.favorite ? 'Added to Favorites' : 'Removed from Favorites', site.name);
    });

    return card;
  }

  // ==========================================================================
  // Launch Stream
  // ==========================================================================
  function launchStream(site) {
    showToast('Opening stream...', site.name);
    window.open(site.url, '_blank', 'noopener,noreferrer');
  }

  // ==========================================================================
  // Toast Alert Notification
  // ==========================================================================
  function showToast(message, title = '') {
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <span class="pulse-emerald-dot"></span>
      <div>
        ${title ? `<strong>${escapeHtml(title)}</strong> ` : ''}
        <span>${escapeHtml(message)}</span>
      </div>
    `;
    toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.remove();
    }, 3500);
  }

  // ==========================================================================
  // Event Listeners
  // ==========================================================================
  function setupEventListeners() {
    // Header navigation links smooth scroll
    if (netflixNavLinks) {
      netflixNavLinks.addEventListener('click', (e) => {
        const link = e.target.closest('.nav-link');
        if (!link) return;

        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');

        const target = link.dataset.target;
        if (target === 'home') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (target === 'movies') {
          document.getElementById('shelf-movies')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else if (target === 'anime') {
          document.getElementById('shelf-anime')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else if (target === 'live') {
          document.getElementById('shelf-live')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else if (target === 'all') {
          document.getElementById('master-directory-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    }

    if (btnBrandHome) {
      btnBrandHome.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // Spotlight search
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase().trim();
        if (searchQuery) {
          btnClearSearch?.classList.remove('hidden');
          document.getElementById('master-directory-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          btnClearSearch?.classList.add('hidden');
        }
        renderMasterGrid();
      });
    }

    if (btnClearSearch) {
      btnClearSearch.addEventListener('click', () => {
        searchInput.value = '';
        searchQuery = '';
        btnClearSearch.classList.add('hidden');
        renderMasterGrid();
        searchInput.focus();
      });
    }

    // Category tabs
    if (categoryTabs) {
      categoryTabs.addEventListener('click', (e) => {
        const pill = e.target.closest('.glass-cat-pill');
        if (!pill) return;

        document.querySelectorAll('.glass-cat-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        currentCategory = pill.dataset.category;
        renderMasterGrid();
      });
    }

    // Feature filter chips
    if (chipFilter4k) {
      chipFilter4k.addEventListener('click', () => {
        filter4k = !filter4k;
        chipFilter4k.classList.toggle('active', filter4k);
        renderMasterGrid();
      });
    }

    if (chipFilterAutoNext) {
      chipFilterAutoNext.addEventListener('click', () => {
        filterAutoNext = !filterAutoNext;
        chipFilterAutoNext.classList.toggle('active', filterAutoNext);
        renderMasterGrid();
      });
    }
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Run initialization
  init();
});
