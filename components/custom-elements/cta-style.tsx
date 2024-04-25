import React, {useEffect, useState} from 'react';
import {useThemeContext} from "../shared/contexts/ThemeProvider";
import {IContentItem} from "@kontent-ai/delivery-sdk";

export type StyleOption = "solid-primary"
  | "solid-secondary"
  | "transparent-primary"
  | "transparent-secondary"
  | "arrow-right"
  | "arrow-left";

type Option = {
  codename: StyleOption,
  label: string
}

const options: Option[] = [
  {
    codename: "solid-primary",
    label: "Solid Primary"
  },
  {
    codename: "solid-secondary",
    label: "Solid Secondary"
  },
  {
    codename: "transparent-primary",
    label: "Transparent Primary"
  },
  {
    codename: "transparent-secondary",
    label: "Transparent Secondary"
  },
  {
    codename: "arrow-right",
    label: "Arrow Right"
  },
  {
    codename: "arrow-left",
    label: "Arrow Left"
  },
]

interface IProps {
  element: CustomElement.Element;
  context: CustomElement.Context;
  handleSave: (value: StyleOption) => void;
  value: StyleOption;
}

export const CtaStyleCustomElement: React.FC<IProps> = ({
                                                          element,
                                                          value,
                                                          handleSave,
                                                          context,
                                                        }) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer <token>");
  myHeaders.append("Accept", "application/json");

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
  };

  const [parentItem, setItem] = useState<IContentItem>();
  const [brandChoice, setBrand] = useState('forex');

  useEffect(() => {
    if (!context.item.codename) return;

    // @ts-ignore
    fetch(`https://deliver.kontent.ai/${context.projectId}/items/${context.item.codename}?elements=title,summary&excludeElements=title,summary&depth=1`, requestOptions)
      .then((response) => response.json())
      .then((result) => result.system.type === "page" && setItem(result.item))
      .catch((error) => console.error(error));
  }, [context.item.codename]);

    // @ts-ignore
  useEffect(() => {
    if (!parentItem?.system?.collection) return;
    fetch(`https://deliver.kontent.ai/${context.projectId}/items?system.collection=${parentItem.system.collection}&system.type=_layout_settings&elements=brand_choice&depth=1`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (!result.items?.[0]?.elements?.brand_choice.value) return;
        setBrand(result.items[0].elements.brand_choice.value)
      })
      .catch((error) => console.error(error));
  }, [parentItem]);

  // @ts-ignore
  const init: StyleOption = !!element.config?.default && options.find(({label}) => label === element.config?.default)?.codename;

  useEffect(() => {
    if (!value && !!init) {
      handleSave(init)
    }
  }, [value, init, handleSave])

  return (
    <fieldset
      className='flex flex-col gap-8 p-8'
      data-theme={brandChoice}
    >
      {options.map(option => (
          <div className={"flex gap-8 text-center items-center"} key={option.codename}>
            <input type="radio"
                   name="style-options"
                   className={"mr-8 text-black"}
                   id={option.codename}
                   value={option.codename}
                   checked={value === option.codename}
                   onChange={(e) => {
                     console.log('change', e)
                     handleSave(option.codename)
                   }}
            />
            <label key={option.codename}
                   htmlFor={option.codename}
                   className={`brand-cta brand-cta--${option.codename} text-xs !py-8`}>
              {option.label}
            </label>
          </div>
        )
      )}
    </fieldset>
  )
};