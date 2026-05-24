/* =========================================
   BDAY — Main JavaScript
   ========================================= */

// ── Config ──────────────────────────────
const PASSWORD = "2225"; // Default: Valentine's date — CHANGE THIS
const MUSIC_SRC = "assets/music/bg.mp3"; // Place your mp3 here

// ── State ────────────────────────────────
let pwInput = "";
let musicPlaying = false;
let audio = null;
let heartsAnimId = null;

// ── DOM Ready ────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  initLoading();
  initHearts();
  initMusic();
  initPassword();
  AOS.init({
    duration: 1000,
    easing: "ease-out-cubic",
    once: true,
    offset: 80,
  });
});

/* =========================================
   LOADING SCREEN
   ========================================= */
function initLoading() {
  const screen = document.getElementById("loading-screen");
  // Auto-dismiss after animation
  setTimeout(() => {
    screen.classList.add("hidden");
    screen.addEventListener("transitionend", () => {
      screen.style.display = "none";
    }, { once: true });
  }, 3200);
}

/* =========================================
   FLOATING HEARTS CANVAS
   ========================================= */
function initHearts() {
  const canvas = document.getElementById("hearts-canvas");
  const ctx = canvas.getContext("2d");
  let W, H, hearts = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  class Heart {
    constructor() { this.reset(true); }
    reset(init = false) {
      this.x = Math.random() * W;
      this.y = init ? Math.random() * H : H + 20;
      this.size = Math.random() * 14 + 6;
      this.speed = Math.random() * 0.6 + 0.2;
      this.opacity = Math.random() * 0.35 + 0.05;
      this.drift = (Math.random() - 0.5) * 0.4;
      this.wobble = Math.random() * Math.PI * 2;
      this.wobbleSpeed = Math.random() * 0.02 + 0.005;
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = this.opacity;
      this.wobble += this.wobbleSpeed;
      const x = this.x + Math.sin(this.wobble) * 8;
      ctx.translate(x, this.y);
      drawHeart(ctx, this.size);
      ctx.restore();
      this.y -= this.speed;
      this.x += this.drift;
      if (this.y < -30) this.reset();
    }
  }

  function drawHeart(ctx, s) {
    const colors = ["rgba(196,83,106,", "rgba(242,170,186,", "rgba(139,26,26,"];
    const c = colors[Math.floor(Math.random() * colors.length)];
    ctx.beginPath();
    ctx.moveTo(0, -s * 0.3);
    ctx.bezierCurveTo( s * 0.5, -s,  s,  0,  0,  s * 0.75);
    ctx.bezierCurveTo(-s,  0, -s * 0.5, -s,  0, -s * 0.3);
    ctx.fillStyle = c + "0.8)";
    ctx.fill();
  }

  for (let i = 0; i < 28; i++) hearts.push(new Heart());

  function loop() {
    ctx.clearRect(0, 0, W, H);
    hearts.forEach(h => h.draw());
    heartsAnimId = requestAnimationFrame(loop);
  }
  loop();
}

/* =========================================
   BACKGROUND MUSIC
   ========================================= */
function initMusic() {
  const btn = document.getElementById("music-btn");

  audio = new Audio(MUSIC_SRC);
  audio.loop = true;
  audio.volume = 0.35;

  // Auto-play after first user interaction (browser policy)
  const tryPlay = () => {
    audio.play().then(() => {
      musicPlaying = true;
      btn.textContent = "♪";
      btn.classList.remove("muted");
    }).catch(() => {});
  };

  document.addEventListener("click", tryPlay, { once: true });
  document.addEventListener("touchstart", tryPlay, { once: true });

  btn.addEventListener("click", () => {
    if (musicPlaying) {
      audio.pause();
      musicPlaying = false;
      btn.textContent = "♪";
      btn.classList.add("muted");
    } else {
      audio.play();
      musicPlaying = true;
      btn.textContent = "♪";
      btn.classList.remove("muted");
    }
  });
}

/* =========================================
   PASSWORD SECTION
   ========================================= */
function initPassword() {
  const keys = document.querySelectorAll(".pw-key");
  const dots = document.querySelectorAll(".pw-dot");
  const errorEl = document.getElementById("pw-error");

  keys.forEach(key => {
    key.addEventListener("click", () => {
      const val = key.dataset.val;
      if (val === "del") {
        if (pwInput.length > 0) {
          pwInput = pwInput.slice(0, -1);
          updateDots();
        }
      } else {
        if (pwInput.length < 4) {
          pwInput += val;
          updateDots();
          if (pwInput.length === 4) {
            setTimeout(checkPassword, 200);
          }
        }
      }
      // Key ripple
      key.style.transform = "scale(0.92)";
      setTimeout(() => key.style.transform = "", 150);
    });
  });

  function updateDots() {
    dots.forEach((dot, i) => {
      dot.classList.toggle("filled", i < pwInput.length);
    });
  }

  function checkPassword() {
    if (pwInput === PASSWORD) {
      playUnlockAnimation();
    } else {
      errorEl.textContent = "Ath alla, something realted to brithday 💔";
      shakeDots();
      pwInput = "";
      setTimeout(() => {
        updateDots();
        errorEl.textContent = "";
      }, 1200);
    }
  }

  function shakeDots() {
    const wrap = document.querySelector(".pw-dots");
    wrap.style.animation = "shake 0.4s ease";
    setTimeout(() => wrap.style.animation = "", 400);
  }
}

// Inject shake keyframes dynamically
const shakeStyle = document.createElement("style");
shakeStyle.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20% { transform: translateX(-8px); }
    40% { transform: translateX(8px); }
    60% { transform: translateX(-5px); }
    80% { transform: translateX(5px); }
  }
`;
document.head.appendChild(shakeStyle);

function playUnlockAnimation() {
  const overlay = document.getElementById("unlock-overlay");
  overlay.classList.add("active");

  setTimeout(() => {
    overlay.style.transition = "opacity 0.8s ease";
    overlay.style.opacity = "0";
    document.getElementById("password-section").style.display = "none";
    document.getElementById("main-content").style.display = "block";
    // Re-init AOS for newly shown content
    AOS.refresh();
    setTimeout(() => {
      overlay.style.display = "none";
    }, 800);
  }, 1800);
}

/* =========================================
   CONFETTI / FIREWORKS (Final Section)
   ========================================= */
function launchConfetti() {
  const canvas = document.getElementById("confetti-canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  const colors = ["#C4536A", "#F2AABA", "#FAD0C4", "#8B1A1A", "#FFF0F3", "#E8A0AF"];
  const pieces = [];

  for (let i = 0; i < 140; i++) {
    pieces.push({
      x: Math.random() * canvas.width,
      y: canvas.height * 0.3 + Math.random() * canvas.height * 0.2,
      vx: (Math.random() - 0.5) * 6,
      vy: (Math.random() - 0.5) * 14 - 6,
      rot: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.15,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      shape: Math.random() > 0.5 ? "rect" : "heart",
      gravity: 0.22,
      life: 1,
      decay: Math.random() * 0.006 + 0.003,
    });
  }

  let frame;
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach(p => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.globalAlpha = p.life;
      ctx.fillStyle = p.color;
      if (p.shape === "rect") {
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      } else {
        const s = p.size * 0.6;
        ctx.beginPath();
        ctx.moveTo(0, s * 0.4);
        ctx.bezierCurveTo(-s, -s * 0.2, -s * 1.2, s, 0, s * 1.2);
        ctx.bezierCurveTo( s * 1.2, s, s, -s * 0.2, 0, s * 0.4);
        ctx.fill();
      }
      ctx.restore();
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.rot += p.rotSpeed;
      p.life -= p.decay;
    });

    const alive = pieces.filter(p => p.life > 0);
    if (alive.length > 0) {
      frame = requestAnimationFrame(draw);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  if (frame) cancelAnimationFrame(frame);
  draw();
}

// Trigger confetti when final section is visible
const finalObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      setTimeout(launchConfetti, 600);
    }
  });
}, { threshold: 0.4 });

window.addEventListener("load", () => {
  const finalSec = document.getElementById("final-section");
  if (finalSec) finalObserver.observe(finalSec);
});

// Replay button
function replay() {
  window.scrollTo({ top: 0, behavior: "smooth" });
  launchConfetti();
}

/* =========================================
   PARALLAX on scroll (lightweight)
   ========================================= */
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;

  // Subtle parallax on polaroids
  document.querySelectorAll(".polaroid").forEach((el, i) => {
    const rect = el.getBoundingClientRect();
    const center = rect.top + rect.height / 2 - window.innerHeight / 2;
    const offset = center * 0.04;
    el.style.transform = `translateY(${offset}px) rotate(${i % 2 === 0 ? -1.5 : 1.5}deg)`;
  });
}, { passive: true });
