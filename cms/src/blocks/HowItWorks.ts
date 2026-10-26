import type { Block } from 'payload'

export const HowItWorks: Block = {
  slug: 'how-it-works',
  labels: { singular: 'Як це працює', plural: 'Як це працює' },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Текст над заголовком',
      required: true,
      defaultValue: 'ПРОСТИЙ ПОЧАТОК',
    },
    {
      name: 'title',
      type: 'text',
      label: 'Заголовок секції',
      required: true,
      defaultValue: 'Твій ритм починається з трьох кроків.',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Короткий вступ',
      required: true,
      defaultValue:
        'Від першого плану до впорядкованого дня — познайомся з OnTime у власному темпі.',
    },
    {
      name: 'steps',
      type: 'array',
      label: 'Кроки',
      required: true,
      minRows: 1,
      maxRows: 5,
      defaultValue: [
        {
          title: 'Створи свій простір',
          description:
            'Зареєструйся та вкажи свій часовий пояс і робочі години. OnTime врахує їх під час планування.',
        },
        {
          title: 'Додай те, що важливо',
          description:
            'Збережи зустрічі в календарі, а справи — у завданнях. Додай пріоритети, дедлайни та орієнтовну тривалість.',
        },
        {
          title: 'Знайди зручний ритм',
          description:
            'Спробуй автопланування: переглянь запропоновані проміжки та підтвердь розклад. Твій день — під твоїм контролем.',
        },
      ],
      fields: [
        { name: 'title', type: 'text', label: 'Назва кроку', required: true },
        { name: 'description', type: 'textarea', label: 'Пояснення', required: true },
      ],
    },
  ],
}
