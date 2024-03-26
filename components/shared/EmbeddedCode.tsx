import { FC } from "react";
import { createItemSmartLink } from "../../lib/utils/smartLinkUtils";
import { EmbeddedCode } from "../../models";

type Props = Readonly<{
  item: EmbeddedCode;
}>;

export const EmbeddedCodeComponent: FC<Props> = props => {
  return (
    <div
      className={`vis-container mx-auto w-full max-w-screen-xl p-4`}
      {...createItemSmartLink(
        props.item.system.id,
        props.item.system.name,
        true
      )} >
      <div dangerouslySetInnerHTML={{ __html: props.item.elements.code.value }} />
    </div>
  );
};
