import React from "react";

import Image from 'next/image';
import {BrandCTA} from "../../BrandCTA";
import {CTACard} from "../../../../models";
import {Heading} from "../../Heading";

type CTACardComponentProps = Readonly<{
  item: CTACard;
}>;

export const CTACardComponent = (
  {item}: CTACardComponentProps) => {
  return <div className={"theme-card"}>
    {item.elements.image?.value?.length > 0 &&
        <figure className={"w-full h-[200px] overflow-hidden"}>
            <Image
                src={item.elements.image.value[0].url}
                alt={item.elements.image.value[0].description || item.elements.image.value[0].name}
                width={400}
                height={400}
                loading={"lazy"}
                className={"object-cover object-center w-full h-full"}
            />
        </figure>
    }

    <div className={"flex flex-col items-start p-xxs gap-xs w-full flex-1"}>
      {!!item.elements.headingOptionsTitle?.value &&
          <Heading level={item.elements.headingOptionsHeadingLevel?.value}>
            {item.elements.headingOptionsTitle.value}
          </Heading>
      }

      {!!item.elements.description?.value &&
          <p>{item.elements.description.value}</p>
      }
      {item.elements.brandCtaLink?.linkedItems?.[0] &&
          <BrandCTA item={item.elements.brandCtaLink.linkedItems[0]}
                    className={"mt-auto"}
                    colorTheme={item.elements.brandCtaStyle?.value}/>
      }
    </div>
  </div>
}