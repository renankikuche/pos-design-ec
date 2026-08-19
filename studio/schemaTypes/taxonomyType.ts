import { defineField, defineType } from 'sanity'
import { TagIcon } from '@sanity/icons/Tag'

export const taxonomyType = defineType({
  name: 'taxonomyType',
  title: 'Tipo',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Nome',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: 'name' },
  },
})
