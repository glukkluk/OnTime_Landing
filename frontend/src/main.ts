import "./style.css";
import { getLandingContent } from "./api";
import { renderHero } from "./blocks/hero/hero";
import { renderHeader } from "./layout/header";
import { escapeHtml } from "./lib/html";

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) throw new Error("Не знайдено контейнер сторінки");

async function loadPage(container: HTMLDivElement): Promise<void> {
    container.innerHTML =
        '<main class="page-status container" aria-busy="true"><p role="status">Завантажуємо Dayflow…</p></main>';

    try {
        const { page, site } = await getLandingContent();
        document.title = page.title;
        document
            .querySelector<HTMLMetaElement>('meta[name="description"]')
            ?.setAttribute("content", page.description);

        container.innerHTML = `
            <a class="skip-link" href="#main">Перейти до вмісту</a>
            ${renderHeader(site)}
            <main id="main" tabindex="-1">
                ${page.blocks.map(renderHero).join("")}
            </main>
            <footer class="site-footer container">
                <span>${escapeHtml(site.footerText)}</span>
                <a href="#main">${escapeHtml(site.backToTopLabel)}</a>
            </footer>
`;
    } catch (error) {
        console.error("Не вдалося завантажити контент Dayflow", error);
        container.innerHTML = `
            <main class="page-status container">
                <h1>Dayflow зараз недоступний</h1>
                <p role="alert">Не вдалося завантажити сторінку. Спробуй ще раз за мить.</p>
                <button class="button" type="button" id="retry">Спробувати ще раз</button>
            </main>
    `;
        container.querySelector("#retry")?.addEventListener(
            "click",
            async () => {
                await loadPage(container);
                container.querySelector<HTMLElement>("#main, #retry")?.focus();
            },
            { once: true },
        );
    }
}

loadPage(app);
