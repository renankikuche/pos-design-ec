import { defineField, defineType } from 'sanity'
import { HashIcon } from '@sanity/icons/Hash'

export const taxonomySubject = defineType({
  name: 'taxonomySubject',
  title: 'Assunto',
  type: 'document',
  icon: HashIcon,
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
