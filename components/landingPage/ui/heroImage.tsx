import { FC, ReactNode } from 'react';
import Image from 'next/image';
import { createItemSmartLink } from '../../../lib/utils/smartLinkUtils';

type Props = Readonly<{
  url: string;
  alt: string;
  children: ReactNode;
  className?: string;
  itemId?: string;
  itemName?: string;
  type: string;
}>;

export const HeroImage: FC<Props> = (props) => (
  <figure
    className={`relative m-0 w-full py-40 ${props.className ?? ''}`}
    {...createItemSmartLink(props.itemId, props.itemName)}
  >
    {props.type?.startsWith('image') && (
      <Image
        src={props.url + '?dpr=1'}
        alt={props.alt}
        fill
        sizes='100vw, 100vh'
        className='object-cover absolute top-0 left-0 w-full h-full'
        priority
      />
    )}
    {props.type?.startsWith('video') && (
      <video
        src={props.url}
        autoPlay={true}
        loop={true}
        muted={true}
        className='object-cover'
      />
    )}
    <div className='flex flex-col items-center md:items-start justify-end'>
      <div className='backdrop-blur-sm bg-black/50 flex flex-col mx-auto rounded-lg p-4'>
        {props.children}
      </div>
    </div>
  </figure>
);

HeroImage.displayName = 'HeroImage';
