/* ============================================================
   shared.js — utilities reutilizables en todas las páginas
   ============================================================ */

/* ---------- CONFETTI ---------- */
function spawnConfetti(count = 90) {
  const colors  = ['#87CEEB','#0077b6','#f2d74e','#ffffff','#ff6b9d','#c084fc','#34d399'];
  const shapes  = ['square','circle','rect'];
  for (let i = 0; i < count; i++) {
    const el    = document.createElement('div');
    el.className = 'confetti-piece';
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    const size  = Math.random() * 8 + 6;
    el.style.cssText = `
      left: ${Math.random() * 100}vw;
      width: ${shape === 'rect' ? size * 2.2 : size}px;
      height: ${size}px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      border-radius: ${shape === 'circle' ? '50%' : '2px'};
      animation-duration: ${(Math.random() * 3 + 2.5).toFixed(2)}s;
      animation-delay: ${(Math.random() * 1.8).toFixed(2)}s;
      opacity: ${(Math.random() * 0.55 + 0.45).toFixed(2)};
    `;
    document.body.appendChild(el);
    el.addEventListener('animationend', () => el.remove());
  }
}

/* ---------- GALLERY + LIGHTBOX ---------- */
function buildGallery(containerId, photos) {
  const grid = document.getElementById(containerId);
  if (!grid) return;

  photos.forEach((photo, index) => {
    const item = document.createElement('div');
    item.className = 'gallery__item';
    item.innerHTML = `<img src="${photo.src}" alt="${photo.alt}" loading="lazy" />`;
    item.addEventListener('click', () => openLightbox(index));
    grid.appendChild(item);
  });

  /* --- Lightbox state --- */
  let current = 0;
  const lb    = document.getElementById('lightbox');
  const lbImg = document.getElementById('lbImg');

  function openLightbox(index) {
    current     = index;
    lbImg.src   = photos[index].src;
    lbImg.alt   = photos[index].alt;
    lb.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lb.classList.remove('active');
    document.body.style.overflow = '';
  }

  function navigate(dir) {
    current = (current + dir + photos.length) % photos.length;
    lbImg.style.opacity = '0';
    setTimeout(() => {
      lbImg.src = photos[current].src;
      lbImg.alt = photos[current].alt;
      lbImg.style.opacity = '1';
    }, 140);
  }

  document.getElementById('lbClose').addEventListener('click', closeLightbox);
  document.getElementById('lbPrev').addEventListener('click',  () => navigate(-1));
  document.getElementById('lbNext').addEventListener('click',  () => navigate(1));
  lb.addEventListener('click', e => { if (e.target === lb) closeLightbox(); });

  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('active')) return;
    if (e.key === 'Escape')     closeLightbox();
    if (e.key === 'ArrowLeft')  navigate(-1);
    if (e.key === 'ArrowRight') navigate(1);
  });

  lbImg.style.transition = 'opacity 0.14s ease';
}

/* ---------- AUTO INIT ON LOAD ---------- */
window.addEventListener('load', () => {
  spawnConfetti(100);
  setTimeout(() => spawnConfetti(55), 3200);
});