import React, {useEffect, useState} from 'react'
import Image from "next/image";
import classNames from "classnames";

export type BrandName = 'forex' | 'city-index' | 'stonex' | 'farm-advantage'

const brands: Brand[] = [
  {
    name: 'Forex',
    codename: 'forex',
    iconUrl: "https://www.forex.com/en-uk/-/media/project/gain-capital/forex/icons/core/header/fxall-forex-logo-clear-background-bl.png",
    colorToken: "border-blue-600"
  },
  {
    name: 'City Index',
    codename: 'city-index',
    iconUrl: "https://www.cityindex.com/en-uk/-/media/project/gain-capital/city-index/logos/city-index-brand/city-index-logo-black.png",
    colorToken: "border-orange-600"
  },
  {
    name: 'Stonex',
    codename: 'stonex',
    iconUrl: "https://www.stonex.com/-/media/project/gain-capital/stonex/stonex-main/logos/stonex-logo-black.svg",
    colorToken: "border-blue-800"
  },
  {
    name: 'Farm Advantage',
    codename: 'farm-advantage',
    iconUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQszWFKcLFq3ukCkWXrOiSWQzdjRnmAcJiDT5cM5rIQ&s",
    colorToken: "border-orange-200"
  },
]

type Brand = {
  name: string,
  codename: BrandName,
  iconUrl: string,
  colorToken: string,
}

type BrandChoiceProps = {
  element: CustomElement.Element;
  context: CustomElement.Context;
  handleSave: (value: BrandName) => void;
  value: BrandName;
}

export const BrandChoice = ({
                              element,
                              value,
                              handleSave,
                              context
                            }: BrandChoiceProps) => {
  // @ts-ignore
  const init: BrandName = !!element.config?.default && brands.find(({name}) => name === element.config?.default)?.codename;

  useEffect(() => {
    if (!value && !!init) {
      handleSave(init)
    }
  }, [value, init, handleSave])

  return (
    <div className="max-w-[500px] m-auto inline-flex flex-col gap-16">
      {brands.map(({iconUrl, codename, name, colorToken}) => (
        <button type={"button"} key={name}
                className={classNames(
                  codename === value && colorToken,
                  "border-2 bg-white group relative inline-flex items-center justify-between gap-48 h-[50px] rounded-[25px] px-20",
                )}
                onClick={() => handleSave(codename)}>
          <div className="font-bold text-gray-900">
            {name}
          </div>

          <div className="flex flex-none items-center justify-center">
            <Image src={iconUrl}
                   alt={name}
                   width={100}
                   height={50}
                   aria-hidden="true"
                   loading={"lazy"}/>
          </div>
        </button>
      ))}
    </div>
  )
}
