const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');

// Navegação compartilhada entre desktop e mobile.
const menuButton = $('.menu-toggle');
const navigation = $('#navigation');
function setMenuState(open) {
  if (!menuButton || !navigation) return;
  navigation.classList.toggle('open', open);
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Fechar menu de navegação' : 'Abrir menu de navegação');
  $('span', menuButton).textContent = open ? '−' : '＋';
}
menuButton?.addEventListener('click', () => setMenuState(!navigation.classList.contains('open')));
$$('a', navigation).forEach(link => link.addEventListener('click', () => setMenuState(false)));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && navigation?.classList.contains('open')) {
    setMenuState(false);
    menuButton.focus();
  }
});
document.addEventListener('click', event => {
  if (!event.target.closest('.header')) setMenuState(false);
});

// Entrada suave dos blocos, respeitando preferências de acessibilidade.
if ('IntersectionObserver' in window && !reducedMotion.matches) {
  const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    revealObserver.unobserve(entry.target);
  }), { threshold: 0.06 });
  $$('.reveal').forEach(element => revealObserver.observe(element));
  document.documentElement.classList.add('motion');
}

// Fallback das thumbnails oficiais quando maxresdefault não estiver disponível.
$$('img[data-fallback-src]').forEach(image => image.addEventListener('error', () => {
  const fallback = image.dataset.fallbackSrc;
  if (!fallback || image.src === fallback) return;
  image.src = fallback;
}, { once: true }));

// Mensagens de orçamento vinculadas ao nome e gênero de cada produção.
function buildReferenceUrl(title, genre) {
  const message = `Olá Jonas! Vim pelo portfólio da Camaleão Produtora e quero usar "${title}" (${genre}) como referência para orçar meu videoclipe.`;
  return `https://wa.me/5516991432992?text=${encodeURIComponent(message)}`;
}

$$('.featured-card, .work-card').forEach(card => {
  const title = card.dataset.workTitle;
  const genre = card.dataset.workGenre;
  const reference = $('.work-reference', card);
  if (reference) reference.href = buildReferenceUrl(title, genre);
});

// Filtros combinados por gênero e especialidade, com suporte a ?estilo=.
const genreButtons = $$('[data-filter-genre]');
const roleButtons = $$('[data-filter-role]');
const workCards = $$('.work-card');
const countLabel = $('#works-count');
const emptyResults = $('#empty-results');
const validGenres = new Set(genreButtons.map(button => button.dataset.filterGenre));
let activeGenre = 'all';
let activeRole = 'all';

function setPressed(buttons, selected) {
  buttons.forEach(button => {
    const active = button === selected;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
  });
}

function applyFilters() {
  let visible = 0;
  workCards.forEach(card => {
    const genreMatch = activeGenre === 'all' || card.dataset.genre === activeGenre;
    const roles = card.dataset.roles.split(' ');
    const roleMatch = activeRole === 'all' || roles.includes(activeRole);
    const show = genreMatch && roleMatch;
    card.hidden = !show;
    card.setAttribute('aria-hidden', String(!show));
    if (show) visible += 1;
  });
  countLabel.textContent = `Exibindo ${visible} ${visible === 1 ? 'produção' : 'produções'}`;
  emptyResults.hidden = visible !== 0;
}

function selectGenreFilter(value, updateUrl = true) {
  activeGenre = validGenres.has(value) ? value : 'all';
  const selected = genreButtons.find(button => button.dataset.filterGenre === activeGenre);
  setPressed(genreButtons, selected);
  applyFilters();
  if (!updateUrl) return;
  const url = new URL(window.location.href);
  if (activeGenre === 'all') url.searchParams.delete('estilo');
  else url.searchParams.set('estilo', activeGenre);
  history.replaceState(null, '', `${url.pathname}${url.search}${url.hash}`);
}

function selectRoleFilter(value) {
  activeRole = value;
  const selected = roleButtons.find(button => button.dataset.filterRole === value) || roleButtons[0];
  setPressed(roleButtons, selected);
  applyFilters();
}

genreButtons.forEach(button => button.addEventListener('click', () => selectGenreFilter(button.dataset.filterGenre)));
roleButtons.forEach(button => button.addEventListener('click', () => selectRoleFilter(button.dataset.filterRole)));
const requestedGenre = new URLSearchParams(window.location.search).get('estilo') || 'all';
selectGenreFilter(requestedGenre, false);
selectRoleFilter('all');

// Player sob demanda: o iframe só é criado depois da ação do visitante.
const playerDialog = $('#showreel-dialog');
const playerFrame = $('#showreel-player');
const playerTitle = $('#showreel-title');
const playerReference = $('#player-reference');
let returnFocus = null;

function openPlayer(trigger) {
  const card = trigger.closest('[data-embed-url]');
  if (!card) return;
  const iframe = document.createElement('iframe');
  iframe.title = `Camaleão Produtora — ${card.dataset.workTitle}`;
  iframe.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
  iframe.allowFullscreen = true;
  iframe.referrerPolicy = 'strict-origin-when-cross-origin';
  iframe.src = card.dataset.embedUrl;
  playerTitle.textContent = card.dataset.workTitle;
  playerReference.href = buildReferenceUrl(card.dataset.workTitle, card.dataset.workGenre);
  playerFrame.replaceChildren(iframe);
  returnFocus = trigger;
  playerDialog.showModal();
  document.body.classList.add('modal-open');
}

$$('[data-open-player]').forEach(button => button.addEventListener('click', () => openPlayer(button)));
$('[data-close]', playerDialog).addEventListener('click', () => playerDialog.close());
playerDialog.addEventListener('click', event => {
  if (event.target !== playerDialog) return;
  const bounds = playerDialog.getBoundingClientRect();
  const outside = event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom;
  if (outside) playerDialog.close();
});
playerDialog.addEventListener('close', () => {
  const iframe = $('iframe', playerFrame);
  if (iframe) {
    iframe.src = 'about:blank';
    iframe.remove();
  }
  document.body.classList.remove('modal-open');
  returnFocus?.focus();
});

// Spotlight Camaleão acompanha o ponteiro sem interferir em toque ou reduced-motion.
if (!reducedMotion.matches) {
  $$('.spotlight-card').forEach(card => {
    card.addEventListener('mousemove', event => {
      const bounds = card.getBoundingClientRect();
      card.style.setProperty('--spot-x', `${event.clientX - bounds.left}px`);
      card.style.setProperty('--spot-y', `${event.clientY - bounds.top}px`);
    });
    card.addEventListener('mouseleave', () => {
      card.style.setProperty('--spot-x', '50%');
      card.style.setProperty('--spot-y', '50%');
    });
  });
}
