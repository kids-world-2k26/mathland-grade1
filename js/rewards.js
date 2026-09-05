// Rewards, Sticker Album, Celebratory Confetti, and Toast System
import { store, ALL_STICKERS } from './state.js';
import { sounds } from './audio.js';

export function fireConfetti() {
  fireFireworksAndFlowers();
}

export function fireFireworksAndFlowers() {
  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '9999';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const flowers = [];
  const colors = ['#f43f5e', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#facc15', '#06b6d4', '#f97316'];
  const flowerEmojis = ['🌸', '🌺', '🌼', '🌻', '🌷', '💐', '✨', '⭐️'];

  // Sound effects: Launch multiple firework bursts & sparkles
  sounds.playFireworkBurst();
  setTimeout(() => sounds.playSparkle(), 300);
  setTimeout(() => sounds.playFireworkBurst(), 700);
  setTimeout(() => sounds.playSparkle(), 1100);

  // 1. Firework burst particles (multiple centers)
  const burstCenters = [
    { x: canvas.width * 0.25, y: canvas.height * 0.35 },
    { x: canvas.width * 0.5, y: canvas.height * 0.25 },
    { x: canvas.width * 0.75, y: canvas.height * 0.35 }
  ];

  burstCenters.forEach(center => {
    for (let i = 0; i < 45; i++) {
      const angle = (Math.PI * 2 * i) / 45;
      const speed = Math.random() * 8 + 3;
      particles.push({
        x: center.x,
        y: center.y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: 1,
        decay: Math.random() * 0.015 + 0.008
      });
    }
  });

  // 2. Blooming Flower floating elements drifting across the screen
  for (let i = 0; i < 28; i++) {
    flowers.push({
      x: Math.random() * canvas.width,
      y: canvas.height + Math.random() * 100,
      vx: (Math.random() - 0.5) * 3,
      vy: -(Math.random() * 5 + 3.5), // Float upwards
      emoji: flowerEmojis[Math.floor(Math.random() * flowerEmojis.length)],
      size: Math.random() * 18 + 24, // 24px to 42px font size
      rotation: Math.random() * 360,
      vRot: (Math.random() - 0.5) * 6,
      opacity: 1
    });
  }

  let animationFrame;
  let frameCount = 0;

  function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;
    frameCount++;

    // Draw & update firework sparkle particles
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.18; // gravity
      p.opacity -= p.decay;

      if (p.opacity > 0) {
        alive = true;
        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.restore();
      }
    });

    // Draw & update floating flowers
    flowers.forEach(f => {
      f.x += f.vx + Math.sin(frameCount * 0.05) * 0.8; // gentle swaying
      f.y += f.vy;
      f.rotation += f.vRot;
      if (f.y < canvas.height * 0.4) {
        f.opacity -= 0.01;
      }

      if (f.opacity > 0 && f.y > -50) {
        alive = true;
        ctx.save();
        ctx.translate(f.x, f.y);
        ctx.rotate((f.rotation * Math.PI) / 180);
        ctx.font = `${f.size}px "Segoe UI Emoji", "Apple Color Emoji", sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.globalAlpha = Math.max(0, f.opacity);
        ctx.fillText(f.emoji, 0, 0);
        ctx.restore();
      }
    });

    if (alive) {
      animationFrame = requestAnimationFrame(update);
    } else {
      cancelAnimationFrame(animationFrame);
      if (canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
    }
  }

  update();
}

export function showToast(message, icon = '🎉') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
  container.appendChild(toast);

  sounds.playPop();

  setTimeout(() => {
    toast.style.transition = 'opacity 0.3s, transform 0.3s';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 300);
  }, 3500);
}

export function renderStickerAlbum() {
  const grid = document.getElementById('sticker-album-grid');
  if (!grid) return;

  grid.innerHTML = '';
  ALL_STICKERS.forEach(sticker => {
    const isUnlocked = store.isStickerUnlocked(sticker.id);
    const slot = document.createElement('div');
    slot.className = `sticker-slot ${isUnlocked ? 'unlocked' : ''}`;
    slot.innerHTML = `
      <div class="sticker-icon">${sticker.icon}</div>
      <div class="sticker-title">${sticker.name}</div>
      <div class="sticker-req">${isUnlocked ? 'Đã mở khóa! 🎉' : sticker.req}</div>
    `;
    grid.appendChild(slot);
  });
}
