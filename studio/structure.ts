import type { StructureResolver } from 'sanity/structure'
import { CogIcon } from '@sanity/icons/Cog'

const SINGLETONS = ['settings']

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Conteúdo')
    .items([
      S.listItem()
        .title('Configurações')
        .icon(CogIcon)
        .child(
          S.document()
            .schemaType('settings')
            .documentId('settings')
            .title('Configurações'),
        ),

      S.divider(),

      ...S.documentTypeListItems().filter(
        (listItem) => !SINGLETONS.includes(listItem.getId() as string),
      ),
    ])
