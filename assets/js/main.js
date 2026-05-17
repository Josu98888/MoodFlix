import { MOOD_THEMES } from "./data.js";
import { hexToLuminance, contrastRatio } from "./utility.js";
/* ----------------------------------------------------------------
   APLICAR TEMA AL :root
---------------------------------------------------------------- */
function applyTheme(moodKey) {
  const theme = MOOD_THEMES[moodKey];
  if (!theme) return;

  const root = document.documentElement;

  /* ---- Variables CSS ---- */
  root.style.setProperty('--color-bg',           theme.bg);
  root.style.setProperty('--color-surface',      theme.surface);
  root.style.setProperty('--color-surface-2',    theme.surface2);
  root.style.setProperty('--color-border',       theme.border);
  root.style.setProperty('--color-accent',       theme.accent);
  root.style.setProperty('--color-accent-glow',  theme.accentGlow);
  root.style.setProperty('--color-neon',         theme.neon);
  root.style.setProperty('--color-neon-dark',    theme.neonDark);
  root.style.setProperty('--color-amber',        theme.amber);
  root.style.setProperty('--color-text-primary', theme.textPrimary);
  root.style.setProperty('--color-text-secondary', theme.textSec);
  root.style.setProperty('--color-text-muted',   theme.textMuted);

  /* ---- Orbes del hero ---- */
  const orbs = document.querySelectorAll('.hero__orb');
  orbs.forEach((orb, i) => {
    orb.style.background = theme.orbColors[i] ?? theme.accent;
  });

  /* ---- Color del texto del botón CTA (contraste adaptativo) ---- */
  const ctaBtn = document.querySelector('.cta-btn');
  if (ctaBtn) {
    const accentLum = hexToLuminance(theme.accent);
    const whiteLum  = 1;
    const blackLum  = 0;
    const contrastWhite = contrastRatio(accentLum, whiteLum);
    const contrastBlack = contrastRatio(accentLum, blackLum);
    /* WCAG AA requiere ≥ 4.5:1 para texto normal */
    ctaBtn.style.color = contrastWhite >= contrastBlack ? '#ffffff' : '#111111';
  }

  /* ---- Clase de modo claro/oscuro en <body> ---- */
  document.body.classList.toggle('theme--light', !theme.isDark);
  document.body.classList.toggle('theme--dark',   theme.isDark);

  /* ---- Anuncio accesible (aria-live) ---- */
  const liveRegion = document.getElementById('mood-announcement');
  if (liveRegion) {
    /* Pequeño delay para que lectores de pantalla detecten el cambio */
    liveRegion.textContent = '';
    setTimeout(() => {
      liveRegion.textContent = `Estado de ánimo cambiado a: ${theme.label}`;
    }, 100);
  }

  /* ---- Actualizar subtítulo de resultados ---- */
  const resultsMoodLabel = document.getElementById('results-mood-label');
  if (resultsMoodLabel) {
    resultsMoodLabel.textContent = theme.label.replace(/ .+$/, ''); // solo la palabra
  }
}

/* ----------------------------------------------------------------
   INIT: ejecutar cuando el DOM esté listo
---------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. HAMBURGUESA ─────────────────────────────────────────── */
  const toggle     = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!isOpen));
      toggle.setAttribute(
        'aria-label',
        isOpen ? 'Abrir menú de navegación' : 'Cerrar menú de navegación'
      );
      toggle.classList.toggle('is-open', !isOpen);
      mobileMenu.hidden = isOpen;
    });

    /* Cerrar con Escape */
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !mobileMenu.hidden) {
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Abrir menú de navegación');
        toggle.classList.remove('is-open');
        mobileMenu.hidden = true;
        toggle.focus();
      }
    });
  }

  /* ── 2. MOOD BUTTONS ────────────────────────────────────────── */
  const moodBtns = document.querySelectorAll('.mood-btn');

  moodBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const mood = btn.dataset.mood;

      /* Actualizar aria-pressed y clases */
      moodBtns.forEach((b) => {
        b.setAttribute('aria-pressed', 'false');
        b.classList.remove('mood-btn--active');
      });
      btn.setAttribute('aria-pressed', 'true');
      btn.classList.add('mood-btn--active');

      /* Aplicar el tema visual y guardar */
      localStorage.setItem('savedMood', mood);
      applyTheme(mood);
    });
  });

  /* ── 3. APLICAR TEMA INICIAL (feliz, por defecto) ───────────── */
    const savedMood = localStorage.getItem('savedMood');
  if(savedMood === null){
    applyTheme('feliz');
  }
  else{
    applyTheme(savedMood);
  }
});