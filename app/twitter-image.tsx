import { ImageResponse } from "next/og";
import {
  loadSocialFonts,
  SOCIAL_IMAGE_SIZE,
  SocialCard,
} from "@/lib/seo/social-card";
import { SOCIAL_IMAGE_ALT } from "@/lib/seo/site";

export const alt = SOCIAL_IMAGE_ALT;
export const size = SOCIAL_IMAGE_SIZE;
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(<SocialCard />, {
    ...size,
    fonts: await loadSocialFonts(),
  });
}
