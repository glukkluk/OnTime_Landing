# OnTime CMS

Payload 3 + Next.js + PostgreSQL у Neon.

Інструкції запуску, змінні оточення та опис API — у [README проєкту](../README.md).

- Адмінка: `http://localhost:3000/admin`.
- Публічний контент: `GET /api/landing`.
- Сторінки: колекція `pages`, головна сторінка має slug `home`.
- Шапка та підвал: global `site-settings`.
- Підключення до наявної Neon БД — через `DATABASE_URL` у `.env`.
- У режимі розробки Payload автоматично синхронізує схему Neon з колекціями та блоками, як у прикладі.
- Блоки сторінки: Hero → Можливості → Як це працює → Для кого OnTime → FAQ → Заклик до дії (усі секції після Hero необов'язкові).

```sh
npm ci
npm run dev
```
