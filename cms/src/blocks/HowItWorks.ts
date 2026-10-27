import type { Block } from 'payload'

export const HowItWorks: Block = {
  slug: 'how-it-works',
  labels: { singular: 'Як це працює', plural: 'Як це працює' },
  fields: [
    { name: 'eyebrow', type: 'text', label: 'Текст над заголовком', required: true },
    { name: 'title', type: 'text', label: 'Заголовок секції', required: true },
    { name: 'description', type: 'textarea', label: 'Короткий вступ', required: true },
    {
      name: 'steps',
      type: 'array',
      label: 'Кроки',
      required: true,
      minRows: 1,
      fields: [
        { name: 'title', type: 'text', label: 'Назва кроку', required: true },
        { name: 'description', type: 'textarea', label: 'Пояснення', required: true },
      ],
    },
  ],
}
