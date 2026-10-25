import './style.css'
import { landingPage } from './content/home'
import { renderHero } from './blocks/hero/hero'
import { renderHeader } from './layout/header'

const app = document.querySelector<HTMLDivElement>('#app')

if (!app) throw new Error('Не знайдено контейнер сторінки')

app.innerHTML = `
  <a class="skip-link" href="#main">Перейти до вмісту</a>
  ${renderHeader()}
  <main id="main" tabindex="-1">
    ${landingPage.blocks.map(renderHero).join('')}
  </main>
  <footer class="site-footer container">
    <span>Dayflow · Плануй день. Залишай місце для життя.</span>
    <a href="#main">На початок ↑</a>
  </footer>
`
