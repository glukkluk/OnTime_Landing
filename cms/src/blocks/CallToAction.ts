import type { Block } from 'payload'

export const CallToAction: Block = {
  slug: 'cta',
  labels: { singular: 'Заклик до дії', plural: 'Заклики до дії' },
  fields: [
    { name: 'eyebrow', type: 'text', label: 'Текст над заголовком', required: true },
    { name: 'title', type: 'text', label: 'Заголовок', required: true },
    { name: 'description', type: 'textarea', label: 'Опис', required: true },
    { name: 'primaryLabel', type: 'text', label: 'Кнопка реєстрації', required: true },
    { name: 'secondaryLabel', type: 'text', label: 'Посилання входу', required: true },
  ],
}
