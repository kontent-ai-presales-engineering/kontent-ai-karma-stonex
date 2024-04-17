import React, { FC } from 'react';
import {
  createElementSmartLink,
  createFixedAddSmartLink,
  createItemSmartLink,
} from '../../lib/utils/smartLinkUtils';
import { GridComponent, Panel, PanelListing, contentTypes } from '../../models';
import { useSiteCodename } from './siteCodenameContext';
import Image from 'next/image';
import { CallToActionLinkComponent } from './CallToActionLink';

type Props = Readonly<{
  item: GridComponent;
}>;

export const Grid: FC<Props> = (props) => {
  return (
    <div
      style={{ backgroundColor: props.item.elements.layoutOptionBackgroundColor?.value, paddingTop: props.item.elements.layoutOptionPaddingTop?.value, paddingBottom: props.item.elements.layoutOptionPaddingBottom?.value }}
      className={`grid grid-cols-${props.item.elements.columns.value} gap-${props.item.elements.columns.value}}`}
      {...createItemSmartLink(
        props.item.system.id,
        props.item.system.name
      )}
      {...createElementSmartLink(
        contentTypes.panel_listing.elements.panels.codename
      )}
      {...createFixedAddSmartLink('end')}
    >
      {props.item.elements.content.linkedItems.map((link: Panel) => (
        <div
          key={link.system.id}
          {...createItemSmartLink(
            link.system.id,
            link.system.name
          )}
        >
          <div>
            <h3 className='mt-0'>{link.elements.heading.value}</h3>
            <p className='font-normal line-clamp-5'>
              {link.elements.blurb.value}
            </p>
            {link.elements.cta.linkedItems.map((ctaItem) => (
              <CallToActionLinkComponent
                item={ctaItem}
                key={ctaItem.system.id}
              />
            ))}
          </div>
          <div className='min-w-[50%]'>
            {link.elements.image.value.length > 0 && (
              <Image
                src={link.elements.image.value[0].url}
                alt={link.elements.image.value[0].description || 'Image description'}
                width={400}
                height={400}
                className='rounded-lg h-72 w-full object-cover mb-0'
              />
            )}
          </div>
        </div>
      ))}
    </div >
  );
};
