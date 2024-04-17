import { FC, useState } from "react";
import { createElementSmartLink, createFixedAddSmartLink, createItemSmartLink, createRelativeAddSmartLink } from "../../lib/utils/smartLinkUtils";
import { GridComponent, Panel, contentTypes } from "../../models";
import Image from 'next/image';
import { CallToActionLinkComponent } from "./CallToActionLink";

type Props = Readonly<{
  item: GridComponent;
}>;

export const Tabs: FC<Props> = (props) => {
  const [actionIndex, setActionIndex] = useState(0);
  const currentAction = props.item.elements.content.linkedItems[actionIndex] as Panel;

  if (!currentAction) {
    return null;
  }

  return (
    <div
      className="vis-container px-3 md:px-10 relative"
      {...createItemSmartLink(
        props.item.system.id,
        props.item.system.name
      )}
      {...createElementSmartLink(
        contentTypes.tab_component.elements.content.codename
      )}
      {...createFixedAddSmartLink('end')}
    >
      <section>
        {props.item.elements.content.linkedItems.length > 1 && (
          <Headers
            headers={props.item.elements.content.linkedItems.map((item) => ({
              id: item.system.id,
              label: item.elements.heading.value,
              codename: item.system.codename,
            }))}
            onHeaderSelected={setActionIndex}
            selectedHeaderIndex={actionIndex}
          />
        )}
        <div>
            <div
              className='flex flex-col md:flex-row items-center gap-1 w-full m-0 py-10'
              key={currentAction.system.id}
              {...createItemSmartLink(
                currentAction.system.id,
                currentAction.system.name
              )}
            >
              <div className={`md:w-1/2 pl-2 pr-10 relative md:pl-20`}>
                <h3 className='mt-0 text-xl font-bold'>{currentAction.elements.heading.value}</h3>
                <p className='font-normal line-clamp-5'>
                  {currentAction.elements.blurb.value}
                </p>
                <p className='font-bold mt-5'>
                  {currentAction.elements.cta.linkedItems.map((ctaItem) => (
                    <CallToActionLinkComponent
                      item={ctaItem}
                      key={ctaItem.system.id}
                    />
                  ))}
                </p>
              </div>              
              {currentAction.elements.image.value.length > 0 && (
                <div
                className={`w-full md:w-1/2 h-[400px] relative drop-shadow-lg after:absolute after:right-3 after:top-3 after:bg-no-repeat after:w-full after:bg-contain after:h-full after:rounded-lg after:z-[1]`}
                {...createElementSmartLink(contentTypes._panel.elements.image.codename)}
              >
                <Image
                  src={currentAction.elements.image.value[0]?.url}
                  alt={currentAction.elements.image.value[0]?.description}
                  fill
                  sizes="(max-width: 757px) 100vw, 50vw"
                  className="object-cover m-0 rounded-lg z-10"
                />
              </div>
              )}
            </div>
        </div>
      </section>
    </div>
  );
};

type HeadersProps = Readonly<{
  headers: ReadonlyArray<Readonly<{ id: string; label: string; codename: string }>>;
  selectedHeaderIndex: number;
  onHeaderSelected: (headerIndex: number) => void;
}>;

const Headers: FC<HeadersProps> = (props) => {

  return (
    <menu className="flex grow">
      {props.headers.map((header, i) => (
        <li
          key={i}
          className={`grow w-fit justify-center md:justify-between md:pl-5 flex overflow-hidden p-2 cursor-pointer ${props.selectedHeaderIndex === i
            ? `border-b-2`
            : ""
            }`}
          onClick={() => props.onHeaderSelected(i)}
          {...createItemSmartLink(header.id, header.codename)}
          {...createRelativeAddSmartLink("after", "bottom-end")}
        >
          <span className="hidden md:block">{header.label}</span>
          <span className="md:hidden font-black text-xl">•</span>
        </li>
      ))}
    </menu>
  );
};