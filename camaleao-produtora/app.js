const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const menu = $('.menu-toggle');
const nav = $('#navigation');
function setMenu(open) {
  nav.classList.toggle('open', open);
  menu.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label', open ? 'Fechar menu de navegação' : 'Abrir menu de navegação');
  $('span', menu).textContent = open ? '−' : '＋';
}
function closeMenu() { setMenu(false); }
menu.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
$$('a', nav).forEach(a => a.addEventListener('click', closeMenu));
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && nav.classList.contains('open')) { closeMenu(); menu.focus(); }
});
document.addEventListener('click', e => {
  if (!e.target.closest('.header')) closeMenu();
});
document.addEventListener('focusin', e => {
  if (!e.target.closest('.header')) closeMenu();
});
matchMedia('(max-width: 1150px)').addEventListener('change', closeMenu);
if ('IntersectionObserver' in window && !reduced.matches) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if(entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  }), {threshold: .08});
  $$('.reveal').forEach(el => observer.observe(el));
  document.documentElement.classList.add('motion');
}
let returnFocus;
function openDialog(dialog, trigger) { returnFocus = trigger; dialog.showModal(); document.body.classList.add('modal-open'); }
$$('dialog').forEach(dialog => {
  $('[data-close]', dialog).addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', e => { if(e.target === dialog) { const r=dialog.getBoundingClientRect(); if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom) dialog.close(); } });
  dialog.addEventListener('close', () => { document.body.classList.remove('modal-open'); returnFocus?.focus(); });
});
$$('img[data-fallback-src]').forEach(image => image.addEventListener('error', () => {
  const fallback = image.dataset.fallbackSrc;
  if (!fallback || image.src === fallback) return;
  image.src = fallback;
}, { once: true }));

// Etapa 6: o rodape reutiliza exatamente o vetor aprovado no Header.
const footerLogo = $('.footer-logo-icon');
const headerLogoPath = $('.brand-logo-icon path');
if (footerLogo && headerLogoPath) footerLogo.append(headerLogoPath.cloneNode(true));

// Etapa 6: briefing rapido gerado apenas no navegador e enviado ao WhatsApp.
const budgetStyleInputs = $$('[name="budget-style"]');
const budgetFormatInputs = $$('[name="budget-format"]');
const budgetArtist = $('#budget-artist');
const budgetWhatsapp = $('#budget-whatsapp');
const budgetPreview = $('#budget-preview');
function updateBudgetBriefing() {
  const style = $('[name="budget-style"]:checked').value;
  const format = $('[name="budget-format"]:checked').value;
  const artist = budgetArtist.value.trim() || 'artista/banda';
  const message = `Olá Jonas! Vim pelo site da Camaleão Produtora. Sou ${artist} e gostaria de orçar um projeto de *${format}* no estilo *${style}*.`;
  budgetWhatsapp.href = `https://wa.me/5516991432992?text=${encodeURIComponent(message)}`;
  budgetPreview.textContent = message.replaceAll('*', '');
}
function selectBudgetStyle(key, focus = false) {
  const input = $(`[data-budget-style="${key}"]`) || $('[data-budget-style="live"]');
  input.checked = true;
  updateBudgetBriefing();
  if (focus) input.focus();
}
[...budgetStyleInputs, ...budgetFormatInputs].forEach(input => input.addEventListener('change', updateBudgetBriefing));
budgetArtist.addEventListener('input', updateBudgetBriefing);
budgetWhatsapp.addEventListener('click', updateBudgetBriefing);
updateBudgetBriefing();

// Etapas 2 e 5: o player externo so existe apos a acao do visitante.
const showreel = $('#showreel-dialog');
const showreelPlayer = $('#showreel-player');
const videoTriggers = $$('[data-showreel], [data-embed-url]');
videoTriggers.forEach(button => button.addEventListener('click', () => {
  const embedUrl = button.dataset.embedUrl || 'https://www.youtube.com/embed/IItv4mgrObk?autoplay=1&rel=0';
  const videoTitle = button.dataset.videoTitle || 'ALGUIDAR — HC WORLDWIDE (OFFICIAL 4K)';
  const iframe = document.createElement('iframe');
  iframe.title = `Camaleão Produtora — ${videoTitle}`;
  iframe.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
  iframe.allowFullscreen = true;
  iframe.referrerPolicy = 'strict-origin-when-cross-origin';
  iframe.src = embedUrl;
  $('#showreel-title').textContent = videoTitle;
  showreelPlayer.replaceChildren(iframe);
  openDialog(showreel, button);
}));
showreel.addEventListener('close', () => {
  const iframe = $('iframe', showreelPlayer);
  if (iframe) { iframe.src = 'about:blank'; iframe.removeAttribute('src'); iframe.remove(); }
});

// Etapa 2.1: quatro atmosferas sincronizadas ao monitor de direcao.
const heroSlides = $$('.hero-bg-slide');
const cameraButtons = $$('[data-camera-button]');
const cameraLabel = $('#camera-label');
const cameraHud = $('.camera-hud');
const cameraLabels = [
  'SET & DIREÇÃO 4K',
  'PERFORMANCE & BANDAS',
  'ESTÉTICA URBANA & TRAP / POP',
  'ROTEIRO, LENTES & VFX'
];
let activeCamera = 0;
let cameraTimer;

function preloadHeroScene(slide) {
  const sources = [slide.dataset.primary, slide.dataset.fallback, 'assets/cinema-1600.webp'].filter(Boolean);
  function trySource(index) {
    const image = new Image();
    image.onload = () => {
      slide.style.backgroundImage = `url("${sources[index]}")`;
      slide.classList.add('is-ready');
    };
    image.onerror = () => {
      if (index + 1 < sources.length) trySource(index + 1);
    };
    image.src = sources[index];
  }
  trySource(0);
}

function restartCameraTimer() {
  clearTimeout(cameraTimer);
  const paused = document.hidden || showreel.open;
  cameraHud.classList.toggle('is-paused', paused);
  if (paused) return;
  cameraTimer = setTimeout(() => selectCamera((activeCamera + 1) % heroSlides.length), 5000);
}

function selectCamera(index) {
  const requestedSlide = heroSlides[index];
  if (!requestedSlide.classList.contains('is-ready')) {
    restartCameraTimer();
    return;
  }
  activeCamera = index;
  heroSlides.forEach((slide, slideIndex) => slide.classList.toggle('is-active', slideIndex === index));
  cameraButtons.forEach((button, buttonIndex) => {
    const selected = buttonIndex === index;
    button.classList.toggle('is-active', selected);
    button.setAttribute('aria-pressed', String(selected));
    if (selected) {
      const progress = $('i', button);
      progress.style.animation = 'none';
      void progress.offsetWidth;
      progress.style.animation = '';
    }
  });
  cameraLabel.textContent = cameraLabels[index];
  restartCameraTimer();
}

cameraButtons.forEach(button => button.addEventListener('click', () => selectCamera(Number(button.dataset.cameraButton))));
window.addEventListener('load', () => {
  heroSlides.slice(1).forEach(preloadHeroScene);
  selectCamera(activeCamera);
}, { once: true });
document.addEventListener('visibilitychange', restartCameraTimer);
showreel.addEventListener('close', restartCameraTimer);
videoTriggers.forEach(button => button.addEventListener('click', restartCameraTimer));

// Etapa 4.2: flip cards acessiveis, spotlight e controles internos independentes.
const serviceFlipCards = $$('.service-flip-card');
function setServiceFlipState(card, flipped) {
  const front = $('.service-face-front', card);
  const back = $('.service-face-back', card);
  card.classList.toggle('is-flipped', flipped);
  card.setAttribute('aria-pressed', String(flipped));
  card.setAttribute('aria-label', flipped ? card.dataset.backLabel : card.dataset.frontLabel);
  front.setAttribute('aria-hidden', String(flipped));
  back.setAttribute('aria-hidden', String(!flipped));
  $$('a, button', back).forEach(control => { control.tabIndex = flipped ? 0 : -1; });
}
serviceFlipCards.forEach(card => {
  card.dataset.frontLabel = card.getAttribute('aria-label');
  card.dataset.backLabel = card.dataset.frontLabel.replace('Virar card', 'Mostrar frente do card');
  setServiceFlipState(card, false);
  card.addEventListener('click', event => {
    if (event.target.closest('a, button')) return;
    setServiceFlipState(card, !card.classList.contains('is-flipped'));
  });
  card.addEventListener('keydown', event => {
    if (event.target !== card) return;
    if (event.key === 'Escape' && card.classList.contains('is-flipped')) {
      event.preventDefault();
      setServiceFlipState(card, false);
      return;
    }
    if (!['Enter', ' '].includes(event.key)) return;
    event.preventDefault();
    setServiceFlipState(card, !card.classList.contains('is-flipped'));
  });
  $('.service-back-button', card).addEventListener('click', event => {
    event.stopPropagation();
    setServiceFlipState(card, false);
    card.focus();
  });
  $$('.service-back-cta', card).forEach(control => control.addEventListener('click', event => event.stopPropagation()));
  if (!reduced.matches) {
    card.addEventListener('mousemove', event => {
      const bounds = card.getBoundingClientRect();
      card.style.setProperty('--mouse-x', `${event.clientX - bounds.left}px`);
      card.style.setProperty('--mouse-y', `${event.clientY - bounds.top}px`);
    });
    card.addEventListener('mouseleave', () => {
      card.style.setProperty('--mouse-x', '50%');
      card.style.setProperty('--mouse-y', '50%');
    });
  }
});

// Etapa 4: o painel traduz cada genero em uma direcao visual especifica.
const genreExplorer = $('.genre-explorer');
const genreTabs = $$('[data-genre]');
const genrePanel = $('#genre-panel');
const genreName = $('#genre-name');
const genreDescription = $('#genre-description');
const genreFocus = $('#genre-focus');
const genreCta = $('#genre-cta');
const genreVideoButton = $('.genre-video-link');
let genreTransitionTimer = 0;
const genreOptions = {
  rap: {
    name: 'Rap / Trap & Hip-Hop', accent: '#8B5CF6',
    description: 'Lentes grande-angulares, movimentos dinâmicos de câmera, cortes rápidos sincronizados no bumbo/hi-hat, iluminação neon contrastada e VFX modernos de transição.',
    focus: ['Clipes de Rua & Estúdio', 'VFX & Speed Ramp', 'Estética Street 4K']
  },
  rock: {
    name: 'Rock / Hardcore & Metal', accent: '#EF4444', video: true,
    description: 'Captação visceral de banda completa, câmera na mão com energia orgânica, contraluz agressiva com fumaça e edição de alta intensidade que transmite o peso do som.',
    focus: ['Performance de Banda', 'Clipes Conceituais', 'Textura Analógica / 4K']
  },
  sertanejo: {
    name: 'Sertanejo & Country', accent: '#F59E0B',
    description: 'Fotografia limpa e valorização de pele, iluminação quente de palco ou locação, planos fechados de emoção e interpretação, com acabamento de DVD ou Pocket Show.',
    focus: ['DVD & Pocket Show', 'Clipes Românticos / Narrativos', 'Áudio & Vídeo Sincronizados']
  },
  pop: {
    name: 'Pop, R&B & Eletrônica', accent: '#06B6D4',
    description: 'Direção de arte milimétrica, coreografia de câmera suave com gimbal e slider, estética fashion e conceitual, com color grading vibrante pronto para retenção global.',
    focus: ['Direção de Arte', 'Color Grading Vibrante', 'Visualizers & Reels']
  },
  funk: {
    name: 'Funk & Cena Urbana', accent: '#22E878',
    description: 'Ritmo acelerado, iluminação estroboscópica e neon, enquadramentos de impacto e edição pensada para performar no YouTube e em cortes virais.',
    focus: ['Clipes de Impacto', 'Cortes Virais / Shorts', 'Produção Ágil']
  },
  live: {
    name: 'Acústico, Gospel & Live Session', accent: '#E2E8F0',
    description: 'Atmosfera intimista, iluminação cinematográfica contínua, múltiplos ângulos de câmera e foco absoluto na emoção da interpretação ao vivo.',
    focus: ['Live Sessions', 'Multicâmera', 'Direção Intimista']
  }
};

function selectGenre(key, moveFocus = false) {
  const option = genreOptions[key];
  const selectedTab = $(`[data-genre="${key}"]`);
  clearTimeout(genreTransitionTimer);
  genrePanel.classList.add('is-changing');
  genreTransitionTimer = setTimeout(() => {
    genreExplorer.style.setProperty('--genre-accent', option.accent);
    genreName.textContent = option.name;
    genreDescription.textContent = option.description;
    genreFocus.replaceChildren(...option.focus.map(text => {
      const item = document.createElement('li');
      item.textContent = text;
      return item;
    }));
    genreVideoButton.hidden = !option.video;
    genreCta.textContent = `Orçar clipe de ${option.name} ↗`;
    genreCta.href = '#contato';
    genreCta.dataset.contactStyle = key;
    genrePanel.setAttribute('aria-labelledby', selectedTab.id);
    genreTabs.forEach(tab => {
      const selected = tab === selectedTab;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
    });
    genrePanel.classList.remove('is-changing');
    if (moveFocus) selectedTab.focus();
  }, reduced.matches ? 0 : 180);
}

genreTabs.forEach(tab => {
  tab.addEventListener('click', () => selectGenre(tab.dataset.genre));
  tab.addEventListener('keydown', event => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const currentIndex = genreTabs.indexOf(tab);
    const nextIndex = event.key === 'Home' ? 0 : event.key === 'End' ? genreTabs.length - 1 : (currentIndex + (event.key === 'ArrowRight' ? 1 : -1) + genreTabs.length) % genreTabs.length;
    selectGenre(genreTabs[nextIndex].dataset.genre, true);
  });
});
genreCta.addEventListener('click', event => {
  event.preventDefault();
  const styleKey = genreCta.dataset.contactStyle || 'rap';
  selectBudgetStyle(styleKey);
  $('#contato').scrollIntoView({ behavior: reduced.matches ? 'auto' : 'smooth', block: 'start' });
  setTimeout(() => $(`[data-budget-style="${styleKey}"]`).focus(), reduced.matches ? 0 : 650);
});
