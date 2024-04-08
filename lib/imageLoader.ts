import { transformImageUrl } from "@kontent-ai/delivery-sdk";
import { ImageLoader } from "next/image";

const loader: ImageLoader = props =>
  transformImageUrl(props.src)
    .withQuality(props.quality ?? 50)
    .withWidth(props.width)
    .withCompression("lossless")
    .withAutomaticFormat()
    .getUrl();

export default loader;
