import { defineField, defineType } from 'sanity'
import { CogIcon } from '@sanity/icons/Cog'

export const settings = defineType({
  name: 'settings',
  title: 'Configurações',
  type: 'document',
  icon: CogIcon,
  groups: [
    { name: 'identity', title: 'Identidade', default: true },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'siteTitle',
      title: 'Nome do site',
      type: 'string',
      group: 'identity',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'seoTitle',
      title: 'Título de SEO',
      type: 'string',
      group: 'seo',
      description: 'Se vazio, usa o Nome do site.',
    }),
    defineField({
      name: 'seoDescription',
      title: 'Meta descrição',
      type: 'text',
      group: 'seo',
    }),
    defineField({
      name: 'ogImage',
      title: 'Imagem de compartilhamento (OG)',
      type: 'image',
      group: 'seo',
      description: 'Se vazia, usa o Logo.',
      fields: [
        defineField({
          name: 'alt',
          title: 'Texto alternativo',
          type: 'string',
        }),
      ],
    }),
  ],
  preview: {
    select: { title: 'siteTitle' },
  },
})
