import { appLinks } from "../config";
import { escapeHtml } from "../lib/html";
import type { SiteSettings } from "../../../shared/landing";

export function renderHeader(site: SiteSettings): string {
    return `
        <header class="site-header container">
            <a class="brand" href="./" aria-label="${escapeHtml(site.siteName)} — головна">
                <img class="brand-mark" src="${import.meta.env.BASE_URL}ontime.svg" width="38" height="38" alt="" />${escapeHtml(site.siteName)}
            </a>
                <span class="header-caption">${escapeHtml(site.tagline)}</span>
            <nav class="header-actions" aria-label="Обліковий запис">
                <a class="login-link" href="${escapeHtml(appLinks.login)}">${escapeHtml(site.loginLabel)}</a>
                <a class="button button-small" href="${escapeHtml(appLinks.register)}">${escapeHtml(site.startLabel)} <span aria-hidden="true">↗</span></a>
            </nav>
        </header>
  `;
}
