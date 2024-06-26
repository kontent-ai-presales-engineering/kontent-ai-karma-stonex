import { type IContentItem, type Elements } from '@kontent-ai/delivery-sdk';
import { type ArticleCategory } from '../taxonomies/articleCategory';
import { type OpenGraphMetadata } from '../content-type-snippets/openGraphMetadata';
import { type Person } from './person';
import { type SEOMetadata } from '../content-type-snippets/SEOMetadata';

/**
 * Generated by '@kontent-ai/model-generator@6.5.1'
 *
 * Article
 * Id: 5b4209c9-c672-459c-b8a2-43fd15fede54
 * Codename: article
 */
export type Article = IContentItem<{
    /**
     * Abstract (text)
     * Required: false
     * Id: bf77669f-5020-4cb7-9342-b9de30afdd77
     * Codename: abstract
     */
    abstract: Elements.TextElement;

    /**
     * Article Category (taxonomy)
     * Required: false
     * Id: 2cf6d39e-b61c-4df1-a390-b267b1293f56
     * Codename: article_type
     */
    articleType: Elements.TaxonomyElement<ArticleCategory>;

    /**
     * Author (modular_content)
     * Required: false
     * Id: 9611446a-69b1-44d5-b7c1-9cbd7fa5151a
     * Codename: author
     */
    author: Elements.LinkedItemsElement<Person>;

    /**
     * Content (rich_text)
     * Required: false
     * Id: 0746ed7f-f75c-427c-85da-70a71cd14958
     * Codename: content
     */
    content: Elements.RichTextElement;

    /**
     * X (rich_text)
     * Required: false
     * Id: ab57d762-30e9-433b-94fc-171cca5d0e9e
     * Codename: facebook
     */
    facebook: Elements.RichTextElement;

    /**
     * Hero Image (asset)
     * Required: false
     * Id: 0ba20928-908d-48ca-b326-5f0f2fff663d
     * Codename: hero_image
     */
    heroImage: Elements.AssetsElement;

    /**
     * Hide (multiple_choice)
     * Required: false
     * Id: 85e04068-b6d9-40d9-9455-03158afb6c53
     * Codename: hide
     */
    hide: Elements.MultipleChoiceElement;

    /**
     * Integration with Cloudinary (custom)
     * Required: false
     * Id: 3f0284a5-821f-4aba-84a0-24bce33e4775
     * Codename: integration_with_cloudinary
     */
    integrationWithCloudinary: Elements.CustomElement;

    /**
     * LinkedIn (rich_text)
     * Required: false
     * Id: 35091bf0-f6db-46c3-a574-7c02632f0beb
     * Codename: linkedin
     */
    linkedin: Elements.RichTextElement;

    /**
     * Publishing date (date_time)
     * Required: false
     * Id: 99460d45-bd27-480b-b2f5-5ae45c554488
     * Codename: publishing_date
     */
    publishingDate: Elements.DateTimeElement;

    /**
     * Title (text)
     * Required: false
     * Id: d92a08b1-2bb1-4880-9dcd-40add106e7c4
     * Codename: title
     */
    title: Elements.TextElement;

    /**
     * URL (url_slug)
     * Required: false
     * Id: a9a2ddec-60e0-435e-8cf5-94fe50669640
     * Codename: url
     */
    url: Elements.UrlSlugElement;

    /**
     * URL History (custom)
     * Required: false
     * Id: 60fb286f-6db4-4de0-bc0b-b994b4420088
     * Codename: url_history
     */
    urlHistory: Elements.CustomElement;
}> &
    OpenGraphMetadata &
    SEOMetadata;
