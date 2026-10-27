import type { Block } from 'payload'

export const Hero: Block = {
  slug: 'hero',
  labels: { singular: 'Головний екран', plural: 'Головні екрани' },
  fields: [
    { name: 'eyebrow', type: 'text', label: 'Текст над заголовком', required: true },
    { name: 'title', type: 'text', label: 'Заголовок', required: true },
    { name: 'accent', type: 'text', label: 'Акцентний рядок заголовка', required: true },
    { name: 'description', type: 'textarea', label: 'Опис', required: true },
    { name: 'primaryLabel', type: 'text', label: 'Кнопка реєстрації', required: true },
    { name: 'secondaryLabel', type: 'text', label: 'Посилання входу', required: true },
    {
      name: 'highlights',
      type: 'array',
      label: 'Короткі переваги',
      minRows: 1,
      required: true,
      fields: [{ name: 'text', type: 'text', label: 'Текст', required: true }],
    },
  ],
}
