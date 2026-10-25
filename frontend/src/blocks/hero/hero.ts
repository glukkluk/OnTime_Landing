import type { HeroBlock } from '../../../../shared/landing'
import { appLinks } from '../../config'
import { escapeHtml } from '../../lib/html'
import './hero.css'

export function renderHero(block: HeroBlock): string {
  return `
    <section class="hero container" aria-labelledby="hero-title">
      <div class="hero-copy">
        <p class="eyebrow"><span aria-hidden="true">✳</span> ${escapeHtml(block.eyebrow)}</p>
        <h1 id="hero-title">${escapeHtml(block.title)} <span>${escapeHtml(block.accent)}</span></h1>
        <p class="hero-description">${escapeHtml(block.description)}</p>
        <div class="hero-actions">
          <a class="button" href="${escapeHtml(appLinks.register)}">${escapeHtml(block.primaryLabel)} <span aria-hidden="true">↗</span></a>
          <a class="secondary-link" href="${escapeHtml(appLinks.login)}">${escapeHtml(block.secondaryLabel)} <span aria-hidden="true">→</span></a>
        </div>
        <ul class="hero-highlights">
          ${block.highlights.map((item) => `<li><span aria-hidden="true">✓</span> ${escapeHtml(item)}</li>`).join('')}
        </ul>
      </div>
      <figure class="day-preview">
        <div class="day-sheet">
          <div class="sheet-heading"><span>МІЙ DAYFLOW</span><span aria-hidden="true">✳</span></div>
          <h2>Усе у своєму ритмі.</h2>
          <p class="sheet-subtitle">Один день. Кілька важливих кроків.</p>
          <ol class="day-timeline">
            <li><span class="event-time">09:00</span><div class="event event-sage"><span>РОБОТА</span><strong>Фокус на головному</strong><small>Робота над проєктом · 90 хв</small></div></li>
            <li><span class="event-time">11:00</span><div class="event event-peach"><span>ОСОБИСТЕ</span><strong>Зробити паузу</strong><small>Прогулянка · 30 хв</small></div></li>
            <li><span class="event-time">12:00</span><div class="event event-lilac"><span>НАВЧАННЯ</span><strong>Маленький крок уперед</strong><small>Новий розділ книги · 45 хв</small></div></li>
          </ol>
          <div class="sheet-note"><span aria-hidden="true">↗</span> Для важливого знайдеться час</div>
        </div>
        <figcaption>Ілюстрація розкладу · приклад даних</figcaption>
      </figure>
    </section>
  `
}
