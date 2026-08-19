import { defineField, defineType } from 'sanity'
import { CalendarIcon } from '@sanity/icons/Calendar'

export const taxonomyYear = defineType({
  name: 'taxonomyYear',
  title: 'Ano',
  type: 'document',
  icon: CalendarIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Ano',
      type: 'number',
      validation: (rule) => rule.required().integer(),
    }),
  ],
  preview: {
    select: { title: 'name' },
  },
})
