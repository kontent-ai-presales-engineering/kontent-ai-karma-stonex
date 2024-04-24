import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';

interface IProps {
  element: CustomElement.Element;
  context: CustomElement.Context;
  handleSave: (value: string) => void;
  value: string;
}

interface IDataEntry {
  id: string;
  name: string;
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
    });
  }, [value]);

  CustomElement.observeElementChanges([element.config["elementToWatch"]], () => {
    CustomElement.getElementValue(element.config["elementToWatch"], (elementValue) => {
      setElementValue(elementValue);
    });
  });

  return (
    <div className='custom-element'>
      {elementValue}
    </div>
  );
};