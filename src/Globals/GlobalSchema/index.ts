import type { GlobalConfig } from 'payload'

export const GlobalSchema: GlobalConfig = {
    slug: 'global-schema',
    label: 'Global Schema',
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'schema',
            label: 'Global Organization Schema (JSON-LD)',
            type: 'code',
            admin: {
                language: 'json',
                description: 'Paste JSON-LD structured data here.',
            },
        },
    ],
}
