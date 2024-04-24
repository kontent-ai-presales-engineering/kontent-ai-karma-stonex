import { type IContentItem, type Elements } from '@kontent-ai/delivery-sdk';
/**
 * Generated by '@kontent-ai/model-generator@6.5.1'
 *
 * Layout option
 * Id: 45ac6cab-be3c-4fcf-ac10-1b239f2a36a2
 * Codename: layout_option
 */
export type LayoutOption = IContentItem<{
    /**
     * Alignment (multiple_choice)
     * Required: false
     * Id: f17a9b0b-dea4-44fb-bf1a-fa626128df83
     * Codename: layout_option__alginment
     */
    layoutOptionAlginment: Elements.MultipleChoiceElement;

    /**
     * Background color (multiple_choice)
     * Required: false
     * Id: 873eedb5-7c0e-42cf-b21b-edd25a7577fa
     * Codename: layout_option__background_color
     */
    layoutOptionBackgroundColor: Elements.MultipleChoiceElement;

    /**
     * Padding bottom (number)
     * Required: false
     * Id: d9fb6aa0-9c7d-4ce6-8c41-dc6db9411c43
     * Codename: layout_option__padding_bottom
     */
    layoutOptionPaddingBottom: Elements.NumberElement;

    /**
     * Padding top (number)
     * Required: false
     * Id: e43fe29d-25ac-4d20-b7d5-a21cfb28facf
     * Codename: layout_option__padding_top
     */
    layoutOptionPaddingTop: Elements.NumberElement;
}>;
