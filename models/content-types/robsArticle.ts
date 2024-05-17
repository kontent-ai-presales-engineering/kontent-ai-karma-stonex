import { type IContentItem, type Elements } from '@kontent-ai/delivery-sdk';
/**
 * Generated by '@kontent-ai/model-generator@6.5.1'
 *
 * Robs Article
 * Id: 34f5d389-73d1-4c00-beb1-095277b3b2ba
 * Codename: robs_article
 */
export type RobsArticle = IContentItem<{
    /**
     * Number (rich_text)
     * Required: false
     * Id: c12811f4-7e43-4594-8af8-076aa0f4a125
     * Codename: number
     */
    number: Elements.RichTextElement;

    /**
     * Page Title (text)
     * Required: false
     * Id: e2fd763b-9896-41d9-af6e-7b36a33f2727
     * Codename: page_title
     */
    pageTitle: Elements.TextElement;
}>;
