/**
 * Generated by '@kontent-ai/model-generator@6.5.1'
 */
export const contentTypeSnippets = {
    /**
     * Layout option
     */
    layout_option: {
        codename: 'layout_option',
        id: '45ac6cab-be3c-4fcf-ac10-1b239f2a36a2',
        externalId: undefined,
        name: 'Layout option',
        elements: {
            /**
             * Alginment (multiple_choice)
             */
            layout_option__alginment: {
                codename: 'layout_option__alginment',
                id: 'f17a9b0b-dea4-44fb-bf1a-fa626128df83',
                externalId: undefined,
                name: 'Alginment',
                required: false,
                type: 'multiple_choice'
            },

            /**
             * Padding top (number)
             */
            layout_option__padding_top: {
                codename: 'layout_option__padding_top',
                id: 'e43fe29d-25ac-4d20-b7d5-a21cfb28facf',
                externalId: undefined,
                name: 'Padding top',
                required: false,
                type: 'number'
            },

            /**
             * Padding bottom (number)
             */
            layout_option__padding_bottom: {
                codename: 'layout_option__padding_bottom',
                id: 'd9fb6aa0-9c7d-4ce6-8c41-dc6db9411c43',
                externalId: undefined,
                name: 'Padding bottom',
                required: false,
                type: 'number'
            },

            /**
             * Background color (multiple_choice)
             */
            layout_option__background_color: {
                codename: 'layout_option__background_color',
                id: '873eedb5-7c0e-42cf-b21b-edd25a7577fa',
                externalId: undefined,
                name: 'Background color',
                required: false,
                type: 'multiple_choice'
            }
        }
    },

    /**
     * Open Graph Metadata
     */
    open_graph_metadata: {
        codename: 'open_graph_metadata',
        id: '81a6f4b3-64af-4e49-a080-27da56cb912f',
        externalId: undefined,
        name: 'Open Graph Metadata',
        elements: {
            /**
             * OG Image (asset)
             *
             * Ideally larger than 1200x630Ideal image aspect ratio: 1.91:1
             */
            open_graph_metadata__image: {
                codename: 'open_graph_metadata__image',
                id: 'c4f33233-4a38-46af-ae18-ebf534b615d4',
                externalId: undefined,
                name: 'OG:Image',
                required: false,
                type: 'asset'
            },

            /**
             * OG Title (text)
             */
            open_graph_metadata__title: {
                codename: 'open_graph_metadata__title',
                id: 'e6a6aef9-44af-4f99-82ea-9ceee6f1d526',
                externalId: undefined,
                name: 'OG:Title',
                required: false,
                type: 'text'
            },

            /**
             * OG Description (text)
             */
            open_graph_metadata__description: {
                codename: 'open_graph_metadata__description',
                id: '3886ee4b-3434-4587-9aab-d54793e1075f',
                externalId: undefined,
                name: 'OG:Description',
                required: false,
                type: 'text'
            },

            /**
             * OG Type (text)
             */
            open_graph_metadata__type: {
                codename: 'open_graph_metadata__type',
                id: '8042b550-cd5a-4149-8aed-b047a54dbc9c',
                externalId: undefined,
                name: 'OG:Type',
                required: false,
                type: 'text'
            }
        }
    },

    /**
     * SEO Metadata
     */
    seo_metadata: {
        codename: 'seo_metadata',
        id: '9b5983e3-8535-4563-b385-d9480da6f006',
        externalId: undefined,
        name: 'SEO Metadata',
        elements: {
            /**
             * Title (text)
             *
             * Write a unique title tag for each pageBe brief, but descriptiveAvoid generic and vague titlesUse sentence case or title caseCreate something click-worthy—not clickbaitMatch search intentInclude your target keyword where it makes senseKeep it under 60 characters
             */
            seo_metadata__title: {
                codename: 'seo_metadata__title',
                id: '7a871a0b-4ef9-4eac-a2f1-274605253faa',
                externalId: undefined,
                name: 'Title',
                required: false,
                type: 'text'
            },

            /**
             * Description (text)
             *
             * Write a unique description for each pageTry to summarize content accuratelyAvoid generic descriptionsUse sentence caseCreate something click-worthy, not clickbaitMatch search intentInclude your target keyword where it makes sense
             */
            seo_metadata__description: {
                codename: 'seo_metadata__description',
                id: '190b0bf9-f8c7-4ad8-be5f-844d2256d588',
                externalId: undefined,
                name: 'Description',
                required: false,
                type: 'text'
            },

            /**
             * Keywords (text)
             */
            seo_metadata__keywords: {
                codename: 'seo_metadata__keywords',
                id: '681b8261-5d73-4ff5-a3e3-86f551ce631d',
                externalId: undefined,
                name: 'Keywords',
                required: false,
                type: 'text'
            },

            /**
             * Robots Follow (multiple_choice)
             */
            seo_metadata__robots_follow: {
                codename: 'seo_metadata__robots_follow',
                id: '59f3a9c8-2620-4ae2-9d8f-15f4afb0c30c',
                externalId: undefined,
                name: 'Robots Follow',
                required: false,
                type: 'multiple_choice'
            },

            /**
             * Robots Index (multiple_choice)
             */
            seo_metadata__robots_index: {
                codename: 'seo_metadata__robots_index',
                id: '55ca45b3-a719-42da-b2a4-3f38942a70b7',
                externalId: undefined,
                name: 'Robots Index',
                required: false,
                type: 'multiple_choice'
            },

            /**
             * Canonical URL (text)
             */
            seo_metadata__canonical_url: {
                codename: 'seo_metadata__canonical_url',
                id: '145b30b0-1438-4e27-998f-c37a23c39393',
                externalId: undefined,
                name: 'Canonical URL',
                required: false,
                type: 'text'
            }
        }
    }
} as const;
