import type { Block } from 'payload'

export const Features: Block = {
  slug: 'features',
  labels: { singular: 'Можливості', plural: 'Можливості' },
  fields: [
    { name: 'eyebrow', type: 'text', label: 'Текст над заголовком', required: true },
    { name: 'title', type: 'text', label: 'Заголовок секції', required: true },
    { name: 'description', type: 'textarea', label: 'Короткий вступ', required: true },
    {
      name: 'cards',
      type: 'array',
      label: 'Картки можливостей',
      required: true,
      minRows: 1,
      maxRows: 6,
      fields: [
        { name: 'title', type: 'text', label: 'Назва можливості', required: true },
        { name: 'description', type: 'textarea', label: 'Користь для відвідувача', required: true },
      ],
    },
    { name: 'ctaLabel', type: 'text', label: 'Кнопка переходу до реєстрації', required: true },
  ],
}
