import { type IContentItem, type Elements } from '@kontent-ai/delivery-sdk';
import { type LayoutOption } from '../content-type-snippets/layoutOption';

/**
 * Generated by '@kontent-ai/model-generator@6.5.1'
 *
 * Content Chunk
 * Id: feaac754-fe8a-499d-af52-a7db0bb65499
 * Codename: content_chunk
 */
export type ContentChunk = IContentItem<{
    /**
     * Content (rich_text)
     * Required: false
     * Id: 243ad7ec-37bf-4152-a858-1a2cbdb144be
     * Codename: content
     */
    content: Elements.RichTextElement;
}> &
    LayoutOption;
