import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'
import { Hero } from '../blocks/Hero'

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
      blocks: [Hero],
      required: true,
      minRows: 1,
      maxRows: 1,
      admin: { description: 'На цьому етапі сторінка містить один головний екран.' },
    },
  ],
}
