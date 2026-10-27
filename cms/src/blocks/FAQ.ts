import type { Block } from 'payload'

export const FAQ: Block = {
  slug: 'faq',
  labels: { singular: 'Поширені запитання', plural: 'Поширені запитання' },
  fields: [
    { name: 'eyebrow', type: 'text', label: 'Текст над заголовком', required: true },
    { name: 'title', type: 'text', label: 'Заголовок секції', required: true },
    { name: 'description', type: 'textarea', label: 'Короткий вступ', required: true },
    {
      name: 'items',
      type: 'array',
      label: 'Запитання та відповіді',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'question',
          type: 'text',
          label: 'Запитання',
          required: true,
          validate: (value: unknown) =>
            (typeof value === 'string' && value.trim().length > 0) || 'Укажіть запитання.',
        },
        {
          name: 'answer',
          type: 'textarea',
          label: 'Відповідь',
          required: true,
          validate: (value) =>
            (typeof value === 'string' && value.trim().length > 0) || 'Укажіть відповідь.',
        },
      ],
    },
  ],
}
