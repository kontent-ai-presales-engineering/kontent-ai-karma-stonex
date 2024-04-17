import { FC } from 'react';
import {
  createElementSmartLink,
  createFixedAddSmartLink,
  createItemSmartLink,
} from '../../lib/utils/smartLinkUtils';
import { ContentChunk, contentTypes } from '../../models';
import { RichTextElement } from './richText/RichTextElement';

type Props = Readonly<{
  item: ContentChunk;
}>;

export const ContentChunkComponent: FC<Props> = (props) => {
  const textAlignClass = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };
  return (
    <div
    style={{ color: props.item.elements.layoutOptionTextColor?.value, backgroundColor: props.item.elements.layoutOptionBackgroundColor?.value, paddingTop: props.item.elements.layoutOptionPaddingTop?.value, paddingBottom: props.item.elements.layoutOptionPaddingBottom?.value }}
      className={` ${
        textAlignClass[props.item.elements.layoutOptionAlginment?.value[0]?.codename]
      }`}
    >
      <div
        className={`vis-container mx-auto w-full max-w-screen-xl p-4`}
        {...createItemSmartLink(
          props.item.system.id,
          props.item.system.name
        )}
        {...createElementSmartLink(
          contentTypes.content_chunk.elements.content.codename
        )}
        {...createFixedAddSmartLink('end')}
      >
        <RichTextElement
          element={props.item.elements.content}
          isInsideTable={false}
          language={props.item.system.language}
        />
      </div>
    </div>
  );
};
