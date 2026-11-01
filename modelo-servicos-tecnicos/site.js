const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('.main-nav');

function closeMenu() {
  menu?.classList.remove('is-open');
  menuButton?.setAttribute('aria-expanded', 'false');
  menuButton?.setAttribute('aria-label', 'Abrir menu');
}

menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menu?.classList.toggle('is-open', !open);
  menuButton.setAttribute('aria-expanded', String(!open));
  menuButton.setAttribute('aria-label', open ? 'Abrir menu' : 'Fechar menu');
});

menu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});

const dialog = document.querySelector('.gallery-dialog');
const dialogImage = dialog?.querySelector('img');
const dialogCaption = dialog?.querySelector('p');
const dialogClose = dialog?.querySelector('.dialog-close');

document.querySelectorAll('[data-gallery-image]').forEach((button) => {
  button.addEventListener('click', () => {
    if (!(dialog instanceof HTMLDialogElement) || !dialogImage || !dialogCaption) return;
    dialogImage.src = button.dataset.galleryImage;
    dialogImage.alt = button.querySelector('img')?.alt || 'Imagem da galeria ampliada';
    dialogCaption.textContent = button.dataset.galleryCaption || '';
    dialog.showModal();
    dialogClose?.focus();
  });
});

dialogClose?.addEventListener('click', () => dialog?.close());
dialog?.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
});
dialog?.addEventListener('close', () => {
  if (dialogImage) dialogImage.removeAttribute('src');
});
