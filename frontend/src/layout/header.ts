import { appLinks } from '../config'
import { escapeHtml } from '../lib/html'

export function renderHeader(): string {
  return `
    <header class="site-header container">
      <a class="brand" href="./" aria-label="Dayflow — головна">
        <img class="brand-mark" src="${import.meta.env.BASE_URL}dayflow.svg" width="38" height="38" alt="" />Dayflow
      </a>
      <span class="header-caption">Простір для твого ритму</span>
      <nav class="header-actions" aria-label="Обліковий запис">
        <a class="login-link" href="${escapeHtml(appLinks.login)}">Увійти</a>
        <a class="button button-small" href="${escapeHtml(appLinks.register)}">Почати <span aria-hidden="true">↗</span></a>
      </nav>
    </header>
  `
}
