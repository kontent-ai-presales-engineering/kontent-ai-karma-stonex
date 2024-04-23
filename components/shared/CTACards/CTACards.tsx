import React from "react";
import {CTACardComponent} from "./components/CTACard";
import {Heading} from "../Heading";
import {CTACard, CTACards} from "../../../models";
import {BrandCTA} from "../BrandCTA";

type CTACardsComponentProps = Readonly<{
  item: CTACards;
}>;

export const CTACardsComponent = ({item}: CTACardsComponentProps): JSX.Element => {
  return (
    <div
      className={`cta-cards w-full bg-color-Surface-Background text-color-Text-Secondary flex flex-col gap-xxs py-xs`}>
      <div className={"text-center flex flex-col gap-xxs items-center"}>
        {!!item.elements?.headingOptionsTitle?.value &&
            <Heading level={item.elements.headingOptionsHeadingLevel?.value}>
              {item.elements.headingOptionsTitle.value}
            </Heading>
        }

        {!!item.elements.description.value &&
            <p dangerouslySetInnerHTML={{__html: item.elements.description.value}}/>
        }

        {item.elements.brandCtaLink?.linkedItems?.[0] &&
            <BrandCTA item={item.elements.brandCtaLink.linkedItems[0]} colorTheme={item.elements.brandCtaStyle?.value}/>
        }
      </div>
      {
        // TODO: Check why dynamic values are not loaded for tailwind class
      }
      {item.elements.cards?.linkedItems?.length &&
          <div className={`grid grid-cols-3 gap-8 w-full`}>
            {item.elements.cards.linkedItems.map((card: CTACard) =>
              <CTACardComponent key={card.elements?.headingOptionsTitle?.value || card.elements?.description?.value}
                                item={card}/>
            )}
          </div>
      }
    </div>
  );
};