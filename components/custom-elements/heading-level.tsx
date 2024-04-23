import React, {useEffect, useState} from 'react';

export type HeadingTag = 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'span';

type Option = {
  codename: HeadingTag,
  label: string
}

const options: Option[] = [
  {
    codename: "h1",
    label: "Heading 1"
  },
  {
    codename: "h2",
    label: "Heading 2"
  },
  {
    codename: "h3",
    label: "Heading 3"
  },
  {
    codename: "h4",
    label: "Heading 4"
  },
  {
    codename: "h5",
    label: "Heading 5"
  },
  {
    codename: "h6",
    label: "Heading 6"
  },
  {
    codename: "span",
    label: "No SEO heading <span>"
  },
]

interface IProps {
  element: CustomElement.Element;
  context: CustomElement.Context;
  handleSave: (value: HeadingTag) => void;
  value: HeadingTag;
}

export const HeadingLevelCustomElement: React.FC<IProps> = ({
                                                              element,
                                                              value,
                                                              context,
                                                              handleSave,
                                                            }) => {
  // @ts-ignore
  const init: HeadingTag = !!element.config?.default && options.find(({label}) => label === element.config?.default )?.codename;

  const [level, setLevel] = useState(value || init);

  useEffect(() => {
    if (!!level || !!init) {
      handleSave(level || init)
    }
  }, [level, init])


  return (
    <fieldset
      className='flex flex-col gap-4 text-black'>
      {options.map(option => (
        <label key={option.codename}
               htmlFor={option.codename}
               className={`flex align-center`}>
          <input type="radio"
                 name="heading-options"
                 className={"mr-8 text-black"}
                 id={option.codename}
                 value={option.codename}
                 checked={value === option.codename || option.codename === init}
                 onChange={() => setLevel(option.codename)}/>
                 
      {React.createElement(
        option.codename || "span",
        {className: "mt-8"},
        option.label
      )}
        </label>
      ))}
    </fieldset>
  )
};