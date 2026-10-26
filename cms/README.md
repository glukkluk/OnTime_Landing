# Dayflow CMS

Payload 3 + Next.js + PostgreSQL у Neon.

Інструкції запуску, змінні оточення та опис API — у [README проєкту](../README.md).

- Адмінка: `http://localhost:3000/admin`.
- Публічний контент: `GET /api/landing`.
- Сторінки: колекція `pages`, головна сторінка має slug `home`.
- Шапка та підвал: global `site-settings`.
- Підключення до наявної Neon БД — через `DATABASE_URL` у `.env`.
- `push: false`: запуск CMS не змінює схему БД автоматично.

```sh
npm ci
npm run dev
```
