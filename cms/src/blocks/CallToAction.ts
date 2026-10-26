import type { Block } from 'payload'

export const CallToAction: Block = {
  slug: 'cta',
  labels: { singular: 'Заклик до дії', plural: 'Заклики до дії' },
  fields: [
    {
      name: 'eyebrow', type: 'text', label: 'Текст над заголовком', required: true,
      defaultValue: 'ТВІЙ НАСТУПНИЙ КРОК',
    },
    {
      name: 'title', type: 'text', label: 'Заголовок', required: true,
      defaultValue: 'Залиш більше місця для важливого.',
    },
    {
      name: 'description', type: 'textarea', label: 'Опис', required: true,
      defaultValue: 'Почни з одного плану. Збери свої справи в OnTime й поступово знайди ритм, який підходить саме тобі.',
    },
    {
      name: 'primaryLabel', type: 'text', label: 'Кнопка реєстрації', required: true,
      defaultValue: 'Створити свій простір',
    },
    {
      name: 'secondaryLabel', type: 'text', label: 'Посилання входу', required: true,
      defaultValue: 'У мене вже є акаунт',
    },
  ],
}
