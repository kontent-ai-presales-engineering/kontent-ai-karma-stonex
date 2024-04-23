import React from 'react';
import Link from 'next/link';
import classNames from "classnames";
import {Elements, IContentItem, IContentItemElements} from "@kontent-ai/delivery-sdk";
import LinkedItemsElement = Elements.LinkedItemsElement;

interface BrandCTAProps {
  colorTheme?: string,
  className?: string
}

interface Props extends BrandCTAProps {
  item: IContentItem;
}

export const BrandCTA = ({
                           item,
                           colorTheme = "primary", className
                         }: Props): JSX.Element => (
  <Link
    className={classNames(`brand-cta brand-cta--${colorTheme}`, className)}
    href={"/"}
  >
    {item.elements.title?.value || item.system.name}
  </Link>
)