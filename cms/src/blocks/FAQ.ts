import type { Block } from 'payload'

export const FAQ: Block = {
  slug: 'faq',
  labels: { singular: 'Поширені запитання', plural: 'Поширені запитання' },
  fields: [
    {
      name: 'eyebrow', type: 'text', label: 'Текст над заголовком', required: true,
      defaultValue: 'ВІДПОВІДІ ПОРУЧ',
    },
    {
      name: 'title', type: 'text', label: 'Заголовок секції', required: true,
      defaultValue: 'Ще кілька слів про OnTime.',
    },
    {
      name: 'description', type: 'textarea', label: 'Короткий вступ', required: true,
      defaultValue: 'Зібрали відповіді, які допоможуть зробити перший крок до впорядкованого дня.',
    },
    {
      name: 'items', type: 'array', label: 'Запитання та відповіді',
      required: true, minRows: 1, maxRows: 10,
      defaultValue: [
        {
          question: 'Чим відрізняються події та завдання?',
          answer: 'Подія займає певний час у календарі: наприклад, зустріч чи заняття. Завдання — це справа, яку потрібно виконати. Для нього можна вказати пріоритет, дедлайн та орієнтовну тривалість.',
        },
        {
          question: 'Як працює автопланування?',
          answer: 'OnTime шукає вільні проміжки для завдань із зазначеною тривалістю. Він враховує наявні події, робочі години, буфери між блоками, пріоритети й дедлайни. Спочатку ти переглядаєш пропозицію, а потім підтверджуєш розміщення в календарі.',
        },
        {
          question: 'Чи можна створювати повторювані події?',
          answer: 'Так. Для регулярних зустрічей або занять є щоденні, щотижневі та щомісячні повторення. За потреби можна вказати дату завершення серії.',
        },
        {
          question: 'Де з’являються нагадування?',
          answer: 'Нагадування про події та дедлайни доступні всередині OnTime: у розділі повідомлень і як спливаючі повідомлення, коли ти користуєшся застосунком. Надсилання нагадувань на email наразі не передбачене.',
        },
      ],
      fields: [
        {
          name: 'question', type: 'text', label: 'Запитання', required: true,
          validate: (value) => typeof value === 'string' && value.trim().length > 0 || 'Укажіть запитання.',
        },
        {
          name: 'answer', type: 'textarea', label: 'Відповідь', required: true,
          validate: (value) => typeof value === 'string' && value.trim().length > 0 || 'Укажіть відповідь.',
        },
      ],
    },
  ],
}
