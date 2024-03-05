import { type IContentItem, type Elements } from '@kontent-ai/delivery-sdk';
import { type Channels } from '../taxonomies/channels';
import { type EventType } from '../taxonomies/eventType';
import { type OpenGraphMetadata } from '../content-type-snippets/openGraphMetadata';
import { type SEOMetadata } from '../content-type-snippets/SEOMetadata';

/**
 * Generated by '@kontent-ai/model-generator@6.5.1'
 *
 * Event
 * Id: 7c61f0d7-5790-41a8-99d3-6b88063e95c3
 * Codename: event
 */
export type Event = IContentItem<{
    /**
     * Channels (taxonomy)
     * Required: false
     * Id: 5403ad6f-f5b1-4745-a735-57eb50c82109
     * Codename: channels
     */
    channels: Elements.TaxonomyElement<Channels>;

    /**
     * Content (rich_text)
     * Required: false
     * Id: 77dea97f-80a0-47fa-a4f7-9c065dde884a
     * Codename: content
     */
    content: Elements.RichTextElement;

    /**
     * End date/time (date_time)
     * Required: false
     * Id: a39299ad-ce80-4ac3-9eca-af669b8fa88e
     * Codename: end_date_time
     */
    endDateTime: Elements.DateTimeElement;

    /**
     * Event location (text)
     * Required: false
     * Id: 67b28b12-119e-41be-bcfa-a94a3f62ab2b
     * Codename: event_location
     */
    eventLocation: Elements.TextElement;

    /**
     * Event Type (taxonomy)
     * Required: false
     * Id: 22e0f9d8-14cc-49a3-b443-3d150c49f7dd
     * Codename: event_type
     */
    eventType: Elements.TaxonomyElement<EventType>;

    /**
     * Organiser (text)
     * Required: false
     * Id: 34a16dec-5696-40fd-8fb9-f3b9d5133815
     * Codename: organiser
     */
    organiser: Elements.TextElement;

    /**
     * Start date/time (date_time)
     * Required: true
     * Id: 07419dda-3ede-477b-a8d5-3f4ea57aaf39
     * Codename: start_date_time
     */
    startDateTime: Elements.DateTimeElement;

    /**
     * Event name (text)
     * Required: true
     * Id: 60505805-3b06-41a6-9e5f-49094763c4a2
     * Codename: title
     */
    title: Elements.TextElement;

    /**
     * URL (url_slug)
     * Required: false
     * Id: 34ae9ec7-8e7e-4582-850a-6c20090c7ab0
     * Codename: url
     */
    url: Elements.UrlSlugElement;
}> &
    OpenGraphMetadata &
    SEOMetadata;