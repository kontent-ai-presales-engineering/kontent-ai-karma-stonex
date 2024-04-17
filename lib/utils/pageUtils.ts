import { PreviewData } from "next";
import { defaultEnvId } from "./env";

export const getPreviewApiKeyFromPreviewData = (previewData: PreviewData | undefined) =>
  previewData && typeof previewData === 'string'
    ? previewData
    : undefined;

export const getEnvIdFromCookie = () => defaultEnvId;
