import React, { useEffect, useState } from 'react';
import { useThemeContext } from "../shared/contexts/ThemeProvider";
import { Elements } from '@kontent-ai/delivery-sdk';

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
}) => {
  // @ts-ignore
  const init: StyleOption = !!element.config?.default && options.find(({ label }) => label === element.config?.default)?.codename;

  const { themeState } = useThemeContext();
  const [brandTheme, setBrandTheme] = useState<Elements.MultipleChoiceElement>();

  
  CustomElement.getElementValue(element.config["elementToWatch"], (elementValue) => {
    setBrandTheme(elementValue);
    console.log(elementValue)
    console.log(elementValue[0]?.name)
  });

  CustomElement.observeElementChanges([element.config["elementToWatch"]], () => {
    CustomElement.getElementValue(element.config["elementToWatch"], (elementValue) => {
      setBrandTheme(elementValue);
      console.log(elementValue)
    });
  });

  const [style, setStyle] = useState(value || init);

  useEffect(() => {
    if (!!style || !!init) {
      handleSave(style || init)
    }
  }, [style, init, handleSave])

  return (
    <fieldset
      className='flex flex-col gap-xxxs p-xxxs'
      data-theme={themeState}
    >
      {/* Choosen Brand Theme Choice: {brandTheme[0]?.name} */}
      {options.map(option => (
        <div className={"flex items-center"} key={option.codename}>
          <input type="radio"
            name="style-options"
            className={"mr-8 text-black"}
            id={option.codename}
            value={option.codename}
            checked={value === option.codename || option.codename === init}
            onChange={() => setStyle(option.codename)} />
          <label key={option.codename}
            htmlFor={option.codename}
            className={`brand-cta brand-cta--${option.codename}`}>
            {option.label}
          </label>
        </div>
      )
      )}
    </fieldset>
  )
};