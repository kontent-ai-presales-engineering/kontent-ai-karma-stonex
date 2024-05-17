import { type IContentItem, type Elements } from '@kontent-ai/delivery-sdk';
/**
 * Generated by '@kontent-ai/model-generator@6.5.1'
 *
 * SEO Metadata
 * Id: 9b5983e3-8535-4563-b385-d9480da6f006
 * Codename: seo_metadata
 */
export type SEOMetadata = IContentItem<{
    /**
     * Canonical URL (text)
     * Required: false
     * Id: 38438cc2-17f4-4693-850b-ae7b0a032daf
     * Codename: seo_metadata__canonical_url
     */
    seoMetadataCanonicalUrl: Elements.TextElement;

    /**
     * Description (text)
     * Required: false
     * Id: 190b0bf9-f8c7-4ad8-be5f-844d2256d588
     * Codename: seo_metadata__description
     *
     * Write a unique description for each pageTry to summarize content accuratelyAvoid generic descriptionsUse sentence caseCreate something click-worthy, not clickbaitMatch search intentInclude your target keyword where it makes sense
     */
    seoMetadataDescription: Elements.TextElement;

    /**
     * Keywords (text)
     * Required: false
     * Id: 681b8261-5d73-4ff5-a3e3-86f551ce631d
     * Codename: seo_metadata__keywords
     */
    seoMetadataKeywords: Elements.TextElement;

    /**
     * 3rd party services included (multiple_choice)
     * Required: true
     * Id: 3a4fb72e-65ed-4788-a895-33a27efd2525
     * Codename: seo_metadata__n3rd_party_services_included
     */
    seoMetadataN3rdPartyServicesIncluded: Elements.MultipleChoiceElement;

    /**
     * Robots Follow (multiple_choice)
     * Required: false
     * Id: 59f3a9c8-2620-4ae2-9d8f-15f4afb0c30c
     * Codename: seo_metadata__robots_follow
     */
    seoMetadataRobotsFollow: Elements.MultipleChoiceElement;

    /**
     * Robots Index (multiple_choice)
     * Required: false
     * Id: 55ca45b3-a719-42da-b2a4-3f38942a70b7
     * Codename: seo_metadata__robots_index
     */
    seoMetadataRobotsIndex: Elements.MultipleChoiceElement;

    /**
     * Title (text)
     * Required: false
     * Id: 7a871a0b-4ef9-4eac-a2f1-274605253faa
     * Codename: seo_metadata__title
     *
     * Write a unique title tag for each pageBe brief, but descriptiveAvoid generic and vague titlesUse sentence case or title caseCreate something click-worthy—not clickbaitMatch search intentInclude your target keyword where it makes senseKeep it under 60 characters
     */
    seoMetadataTitle: Elements.TextElement;
}>;
