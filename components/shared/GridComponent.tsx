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
  const gridSizeClass = {
    1: 'grid-cols-1 gap-1',
    2: 'grid-cols-2 gap-2',
    3: 'grid-cols-3 gap-3',
    4: 'grid-cols-4 gap-4',
    5: 'grid-cols-5 gap-5',
    6: 'grid-cols-6 gap-6',
    7: 'grid-cols-7 gap-7',
    8: 'grid-cols-8 gap-8',
    9: 'grid-cols-9 gap-9',
    10: 'grid-cols-10 gap-10',
    11: 'grid-cols-11 gap-11',
    12: 'grid-cols-12 gap-12',
  }
  return (
    <div
      style={{ color: props.item.elements.layoutOptionTextColor?.value, backgroundColor: props.item.elements.layoutOptionBackgroundColor?.value, paddingTop: props.item.elements.layoutOptionPaddingTop?.value, paddingBottom: props.item.elements.layoutOptionPaddingBottom?.value }}
      className={`not-prose grid ${gridSizeClass[props.item.elements.columns.value]}}`}
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
        className='m-5 shadow-lg'
          key={link.system.id}
          {...createItemSmartLink(
            link.system.id,
            link.system.name
          )}
        >
          {link.elements.image.value.length > 0 && (
              <Image
                src={link.elements.image.value[0].url}
                alt={link.elements.image.value[0].description || 'Image description'}
                width={400}
                height={100}
                className='h-20 w-full object-cover mb-0'
              />
            )}
          <div className='p-4'>
            <h3 className='mt-0 text-xl font-bold'>{link.elements.heading.value}</h3>
            <p className='font-normal line-clamp-5'>
              {link.elements.blurb.value}
            </p>
            <p className='font-bold mt-5'>
            {link.elements.cta.linkedItems.map((ctaItem) => (
              <CallToActionLinkComponent
                item={ctaItem}
                key={ctaItem.system.id}
              />
            ))}
            </p>
          </div>
        </div>
      ))}
    </div >
  );
};
