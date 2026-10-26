import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'
import { Hero } from '../blocks/Hero'
import { Features } from '../blocks/Features'

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: { singular: 'Сторінка', plural: 'Сторінки' },
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'slug', 'updatedAt'] },
  access: {
    read: () => true,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: 'slug',
      type: 'text',
      label: 'Ідентифікатор',
      required: true,
      unique: true,
      defaultValue: 'home',
      admin: { description: 'Для головної сторінки використовуйте home.' },
    },
    { name: 'title', type: 'text', label: 'SEO-заголовок', required: true },
    { name: 'description', type: 'textarea', label: 'SEO-опис', required: true },
    {
      name: 'blocks',
      type: 'blocks',
      label: 'Блоки сторінки',
      blocks: [Hero, Features],
      required: true,
      minRows: 1,
      maxRows: 2,
      validate: (value) => {
        if (!Array.isArray(value) || value.length < 1 || value.length > 2) {
          return 'Додайте головний екран і, за бажанням, секцію можливостей.'
        }
        return (
          (value[0]?.blockType === 'hero' &&
            (value.length === 1 || value[1]?.blockType === 'features')) ||
          'Перший блок — головний екран, другий — можливості. Блоки не повинні повторюватися.'
        )
      },
      admin: { description: 'Головний екран, потім необов’язкова секція можливостей.' },
    },
  ],
}
