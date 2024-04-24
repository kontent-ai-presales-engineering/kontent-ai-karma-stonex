import React, { useEffect, useState, useCallback } from 'react';

interface IProps {
  element: CustomElement.Element;
  context: CustomElement.Context;
  handleSave: (value: string) => void;
  value: string;
}

export const GetValueCustomElement: React.FC<IProps> = ({
  element,
  handleSave,
  value,
}) => {
  const [elementValue, setElementValue] = useState<string>(value);


  useEffect(() => {
    CustomElement.getElementValue(element.config["elementToWatch"], (elementValue) => {
      setElementValue(elementValue);
      console.log(elementValue)
    });
  }, [value]);

  CustomElement.observeElementChanges([element.config["elementToWatch"]], () => {
    CustomElement.getElementValue(element.config["elementToWatch"], (elementValue) => {
      setElementValue(elementValue);
      console.log(elementValue)
    });
  });

  return (
    <div className='custom-element'>
      test
    </div>
  );
};