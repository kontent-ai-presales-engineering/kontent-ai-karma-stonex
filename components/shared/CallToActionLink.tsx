import { FC } from 'react';
import { CallToAction } from '../../models';
import { createItemSmartLink } from '../../lib/utils/smartLinkUtils';
import { Elements } from '@kontent-ai/delivery-sdk';
import {
  mainColorBgClass,
  mainColorTextClass,
  mainColorHoverClass,
} from '../../lib/constants/colors';
import { useSiteCodename } from './siteCodenameContext';
import { ResolutionContext, resolveUrlPath } from '../../lib/routing';
import Link from 'next/link';

type Props = Readonly<{
  item: CallToAction;
}>;

export const CallToActionLinkComponent: FC<Props> = (props) => {
  const siteCodename = useSiteCodename();
  let url = props.item.elements.manualTarget.value;
  if (props.item.elements.itemTarget.linkedItems[0]?.elements.url) {
    const slugElement = props.item.elements.itemTarget.linkedItems[0]?.elements
      .url as Elements.UrlSlugElement;
    url = resolveUrlPath(
      {
        type: props.item.elements.itemTarget.linkedItems[0]?.system.type,
        slug: slugElement.value,
      } as ResolutionContext
    );
  }

  return (
    <Link href={url}>
        {props.item.elements.title.value}
    </Link>
  );
};

CallToActionLinkComponent.displayName = 'CallToActionLinkComponent';
