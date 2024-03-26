import { type IContentItem, type Elements } from '@kontent-ai/delivery-sdk';
import { type Personas } from '../taxonomies/personas';

/**
 * Generated by '@kontent-ai/model-generator@6.5.1'
 *
 * Image Container
 * Id: 6ebb749b-5eaf-44f6-8a5e-268921144349
 * Codename: image_container
 */
export type ImageContainer = IContentItem<{
    /**
     * Content (rich_text)
     * Required: false
     * Id: fb8a6471-ce6b-446b-8034-19c921ee5683
     * Codename: content
     */
    content: Elements.RichTextElement;

    /**
     * Focal point (custom)
     * Required: false
     * Id: 4ca97623-d556-4943-ad48-bafbe6b487a8
     * Codename: focal_point
     */
    focalPoint: Elements.CustomElement;

    /**
     * Heading (text)
     * Required: false
     * Id: 9cd23f04-c571-4ebd-86e0-11f3ad6503d7
     * Codename: heading
     */
    heading: Elements.TextElement;

    /**
     * Image (asset)
     * Required: false
     * Id: 569f29a5-57c5-49ef-a120-5f4931d34acf
     * Codename: image
     */
    image: Elements.AssetsElement;

    /**
     * Image location (multiple_choice)
     * Required: false
     * Id: a537365b-e81b-4f70-b34b-de4f63e26815
     * Codename: image_location
     */
    imageLocation: Elements.MultipleChoiceElement;

    /**
     * Personas (taxonomy)
     * Required: false
     * Id: a6ea1d6e-31fc-4273-81ac-740ef1c478a7
     * Codename: personas
     */
    personas: Elements.TaxonomyElement<Personas>;
}>;
