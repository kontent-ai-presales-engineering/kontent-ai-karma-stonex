import { FC } from "react";
import { createItemSmartLink } from "../../lib/utils/smartLinkUtils";
import { EmbeddedCode } from "../../models";

type Props = Readonly<{
  item: EmbeddedCode;
}>;

export const EmbeddedCodeComponent: FC<Props> = props => {
  return (
    <div
      className="absolute right-0 top-0 w-12 h-12 m-0"      
      {...createItemSmartLink(
        props.item.system.id,
        props.item.system.name,
        true
      )} >
      <div dangerouslySetInnerHTML={{ __html: props.item.elements.code.value }} />
    </div>
  );
};
