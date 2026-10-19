const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const menu = $('.menu-toggle');
const nav = $('#navigation');
function closeMenu() { nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); }
menu.addEventListener('click', () => { const open = nav.classList.toggle('open'); menu.setAttribute('aria-expanded', String(open)); });
$$('a', nav).forEach(a => a.addEventListener('click', closeMenu));
document.addEventListener('keydown', e => { if(e.key === 'Escape' && nav.classList.contains('open')) { closeMenu(); menu.focus(); } });
if ('IntersectionObserver' in window && !reduced.matches) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if(entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  }), {threshold: .08});
  $$('.reveal').forEach(el => observer.observe(el));
  document.documentElement.classList.add('motion');
}
const projects = $$('.project');
$$('[data-filter]').forEach(button => button.addEventListener('click', () => {
  $$('[data-filter]').forEach(b => { b.classList.toggle('active', b === button); b.setAttribute('aria-pressed', String(b === button)); });
  projects.forEach(p => { p.hidden = button.dataset.filter !== 'all' && p.dataset.category !== button.dataset.filter; if(!p.hidden) p.classList.add('visible'); });
}));
if (matchMedia('(hover:hover) and (pointer:fine)').matches) {
  projects.forEach(card => {
    const picture = $('.project-picture', card);
    card.addEventListener('pointermove', event => {
      if(reduced.matches) return;
      const r = card.getBoundingClientRect();
      picture.style.setProperty('--ry', `${((event.clientX-r.left)/r.width-.5)*3}deg`);
      picture.style.setProperty('--rx', `${-((event.clientY-r.top)/r.height-.5)*3}deg`);
    });
    card.addEventListener('pointerleave', () => { picture.style.setProperty('--rx','0deg'); picture.style.setProperty('--ry','0deg'); });
  });
}
let returnFocus;
function openDialog(dialog, trigger) { returnFocus = trigger; dialog.showModal(); document.body.classList.add('modal-open'); }
$$('dialog').forEach(dialog => {
  $('[data-close]', dialog).addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', e => { if(e.target === dialog) { const r=dialog.getBoundingClientRect(); if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom) dialog.close(); } });
  dialog.addEventListener('close', () => { document.body.classList.remove('modal-open'); returnFocus?.focus(); });
});
const images = [
  ['cinema','ONDE TUDO COMEÇA','Câmera de cinema em estúdio com iluminação verde e roxa'],
  ['fotografia','ALÉM DO RETRATO','Fotógrafo em um ensaio conceitual com luz dramática'],
  ['pos-producao','A ÚLTIMA CAMADA','Estação conceitual de edição e tratamento de cor'],
  ['bastidores','ENTRE LUZES E LENTES','Equipe audiovisual em uma gravação conceitual'],
  ['atmosfera','O INVISÍVEL GANHA FORMA','Silhueta de câmera com luz verde e fumaça']
];
let current = 0;
const lightbox = $('#lightbox');
function showImage(index) {
  current = (index + images.length) % images.length;
  const [file,title,alt] = images[current];
  $('#lightbox-image').src = `assets/${file}-1600.webp`;
  $('#lightbox-image').alt = alt;
  $('#lightbox-title').textContent = title;
  $('#lightbox-count').textContent = `${String(current+1).padStart(2,'0')} / 05 · IMAGEM CONCEITUAL`;
}
projects.forEach(card => card.addEventListener('click', () => { showImage(Number(card.dataset.image)); openDialog(lightbox, card); }));
$('#previous').addEventListener('click', () => showImage(current-1));
$('#next').addEventListener('click', () => showImage(current+1));
lightbox.addEventListener('keydown', e => { if(e.key === 'ArrowLeft') { e.preventDefault(); showImage(current-1); } if(e.key === 'ArrowRight') { e.preventDefault(); showImage(current+1); } });
let touchX = 0;
lightbox.addEventListener('touchstart', e => { touchX = e.changedTouches[0].clientX; }, {passive:true});
lightbox.addEventListener('touchend', e => { const dx=e.changedTouches[0].clientX-touchX; if(Math.abs(dx)>60) showImage(current+(dx<0?1:-1)); }, {passive:true});
const film = $('#film-dialog');
const video = $('video', film);
$$('[data-film]').forEach(button => button.addEventListener('click', () => { openDialog(film, button); video.play().catch(() => { /* Native controls remain available if playback is blocked. */ }); }));
film.addEventListener('close', () => video.pause());
$('#brief-open').addEventListener('click', e => openDialog($('#brief-dialog'), e.currentTarget));
$('#brief-form').addEventListener('submit', e => {
  e.preventDefault();
  const data=new FormData(e.currentTarget);
  const body=`CAMALEÃO PRODUTORA — RESUMO DE PROJETO\n\nNome: ${data.get('nome')}\nTipo: ${data.get('tipo')}\n\nIdeia:\n${data.get('ideia')}\n\nDocumento preparado localmente. Não enviado à produtora.\n`;
  const url=URL.createObjectURL(new Blob([body],{type:'text/plain;charset=utf-8'}));
  const a=document.createElement('a'); a.href=url; a.download='meu-projeto-camaleao.txt'; document.body.append(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url),1000);
  $('#brief-status').textContent='Resumo preparado para download. Nenhuma informação foi enviada à produtora.';
});
