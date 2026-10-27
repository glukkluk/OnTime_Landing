import type { Block } from 'payload'

export const Audiences: Block = {
  slug: 'audiences',
  labels: { singular: 'Для кого OnTime', plural: 'Для кого OnTime' },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Текст над заголовком',
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      label: 'Заголовок секції',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Короткий вступ',
      required: true,
    },
    {
      name: 'scenarios',
      type: 'array',
      label: 'Приклади використання',
      required: true,
      minRows: 1,
      maxRows: 3,
      fields: [
        {
          name: 'audience',
          type: 'text',
          label: 'Категорія (наприклад, Навчання)',
          required: true,
        },
        { name: 'title', type: 'text', label: 'Заголовок картки', required: true },
        { name: 'description', type: 'textarea', label: 'Опис', required: true },
        {
          name: 'schedule',
          type: 'array',
          label: 'Ілюстративний розклад',
          required: true,
          minRows: 2,
          maxRows: 4,
          admin: { description: 'Демонстраційні пункти, а не справжні події користувачів.' },
          fields: [
            { name: 'time', type: 'text', label: 'Час (наприклад, 09:00)', required: true },
            { name: 'activity', type: 'text', label: 'Подія або завдання', required: true },
          ],
        },
      ],
    },
  ],
}
