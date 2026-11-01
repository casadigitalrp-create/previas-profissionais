const products = [
  { id: 1, category: 'Bolsas', name: 'Kit Jardim Sereno', description: 'Bolsa, frasqueira e necessaire em composição demonstrativa.', image: 'assets/images/categoria-bolsas.webp', position: '50% 48%' },
  { id: 2, category: 'Bolsas', name: 'Bolsa Florescer', description: 'Uma referência delicada para a rotina da maternidade.', image: 'assets/images/categoria-bolsas.webp', position: '38% 45%' },
  { id: 3, category: 'Enxoval', name: 'Enxoval Doce Ninho', description: 'Texturas macias, bordado floral e paleta acolhedora.', image: 'assets/images/categoria-enxoval.webp', position: '50% 50%' },
  { id: 4, category: 'Enxoval', name: 'Banho Bosque Rosé', description: 'Toalha de capuz e peças coordenadas para inspirar.', image: 'assets/images/categoria-enxoval.webp', position: '22% 30%' },
  { id: 5, category: 'Escola', name: 'Kit Borboleta Encantada', description: 'Mochila, lancheira e estojo em uma mesma história visual.', image: 'assets/images/categoria-escolar.webp', position: '50% 45%' },
  { id: 6, category: 'Escola', name: 'Primeiros Passos', description: 'Uma referência alegre para a volta às aulas.', image: 'assets/images/categoria-escolar.webp', position: '72% 45%' }
];

const whatsappNumber = '5516992633356';
const productGrid = document.querySelector('[data-product-grid]');
const filters = [...document.querySelectorAll('[data-filter]')];
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function whatsappUrl(message) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

document.querySelectorAll('[data-whatsapp]').forEach((link) => {
  link.href = whatsappUrl(link.dataset.whatsapp);
});

function productCard(product) {
  const article = document.createElement('article');
  article.className = 'product-card reveal is-visible';
  article.dataset.category = product.category;
  article.innerHTML = `
    <button class="product-image" type="button" data-view-product="${product.id}" aria-label="Ampliar imagem de ${product.name}">
      <img src="${product.image}" alt="Imagem demonstrativa de ${product.name}" loading="lazy" style="object-position:${product.position}">
      <span>Ampliar <b aria-hidden="true">↗</b></span>
    </button>
    <div class="product-info">
      <div><span>${product.category}</span><h3>${product.name}</h3><p>${product.description}</p></div>
      <a href="${whatsappUrl(`Olá, Ateliê Aragão! Gostei do modelo demonstrativo ${product.name} e quero conversar sobre uma versão personalizada.`)}" target="_blank" rel="noopener noreferrer" aria-label="Pedir referência de ${product.name} pelo WhatsApp">Conversar <b aria-hidden="true">↗</b></a>
    </div>`;
  return article;
}

function renderProducts(category = 'Todos') {
  const visibleProducts = category === 'Todos' ? products : products.filter((product) => product.category === category);
  productGrid.replaceChildren(...visibleProducts.map(productCard));
}

filters.forEach((button) => {
  button.addEventListener('click', () => {
    filters.forEach((item) => {
      const active = item === button;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    renderProducts(button.dataset.filter);
  });
});

document.querySelectorAll('[data-filter-link]').forEach((link) => {
  link.addEventListener('click', () => {
    const target = filters.find((filter) => filter.dataset.filter === link.dataset.filterLink);
    target?.click();
  });
});

renderProducts();

const lightbox = document.querySelector('[data-lightbox]');
const lightboxImage = document.querySelector('[data-lightbox-image]');
const lightboxTitle = document.querySelector('[data-lightbox-title]');
const lightboxWhatsapp = document.querySelector('[data-lightbox-whatsapp]');

productGrid.addEventListener('click', (event) => {
  const button = event.target.closest('[data-view-product]');
  if (!button) return;
  const product = products.find((item) => item.id === Number(button.dataset.viewProduct));
  lightboxImage.src = product.image;
  lightboxImage.alt = `Imagem demonstrativa ampliada de ${product.name}`;
  lightboxImage.style.objectPosition = product.position;
  lightboxTitle.textContent = product.name;
  lightboxWhatsapp.href = whatsappUrl(`Olá, Ateliê Aragão! Gostei do modelo demonstrativo ${product.name} e quero imaginar uma versão personalizada.`);
  lightbox.showModal();
});

document.querySelector('[data-lightbox-close]').addEventListener('click', () => lightbox.close());
lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) lightbox.close();
});

const menuButton = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
const menuLabel = menuButton.querySelector('.sr-only');
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  mainNav.classList.toggle('is-open', !open);
  menuLabel.textContent = open ? 'Abrir menu' : 'Fechar menu';
});

mainNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  menuButton.setAttribute('aria-expanded', 'false');
  mainNav.classList.remove('is-open');
  menuLabel.textContent = 'Abrir menu';
}));

document.querySelectorAll('.accordion-item button').forEach((button) => {
  button.addEventListener('click', () => {
    const item = button.closest('.accordion-item');
    const panel = item.querySelector('.accordion-panel');
    const willOpen = !item.classList.contains('is-open');
    document.querySelectorAll('.accordion-item').forEach((other) => {
      other.classList.remove('is-open');
      other.querySelector('button').setAttribute('aria-expanded', 'false');
      other.querySelector('.accordion-panel').hidden = true;
    });
    if (willOpen) {
      item.classList.add('is-open');
      button.setAttribute('aria-expanded', 'true');
      panel.hidden = false;
    }
  });
});

if (!reducedMotion && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });
  document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
} else {
  document.querySelectorAll('.reveal').forEach((element) => element.classList.add('is-visible'));
}

const header = document.querySelector('[data-header]');
const updateHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 24);
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

document.querySelector('[data-year]').textContent = new Date().getFullYear();
