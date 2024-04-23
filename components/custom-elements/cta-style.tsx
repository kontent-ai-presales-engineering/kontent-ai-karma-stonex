import React from 'react';

export type StyleOption = "solid-primary"
  | "solid-secondary"
  | "solid-tertiary"
  | "transparent-primary"
  | "transparent-secondary"
  | "transparent-tertiary"
  | "arrow-right"
  | "arrow-left"
  | "arrow-light-right"
  | "arrow-light-left";

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
    codename: "solid-tertiary",
    label: "Solid Tertiary"
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
    codename: "transparent-tertiary",
    label: "Transparent Tertiary"
  },
  {
    codename: "arrow-right",
    label: "Arrow Right"
  },
  {
    codename: "arrow-left",
    label: "Arrow Left"
  },
  {
    codename: "arrow-light-right",
    label: "Arrow Light Right"
  },
  {
    codename: "arrow-light-left",
    label: "Arrow Light Left"
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
                                                          context,
                                                          handleSave,
                                                        }) => {
  // @ts-ignore
  const init = !!element.config?.default && options.find(({label}) => label === element.config?.default )?.codename;

  console.log({value, context, element, init})

  return (
    <fieldset
      className='flex flex-col gap-4 text-black'>
      {options.map(option => (
        <label key={option.codename}
               htmlFor={option.codename}
               className={`flex align-center`}>
          <input type="radio"
                 name="style-options"
                 className={"mr-8 text-black"}
                 id={option.codename}
                 value={option.codename}
                 checked={value === option.codename || option.codename === init}
                 onChange={() => handleSave(option.codename)}/>
          {option.label}
        </label>
      ))}

      <span
        className={`brand-cta brand-cta--${value}`}>{options.find(({codename}) => codename === value)?.label}</span>
    </fieldset>
  )
};