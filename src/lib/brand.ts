export const BRAND_NAME = "Regulome";
export const BRAND_DOMAIN = "regulome.io";
export const BRAND_URL = `https://${BRAND_DOMAIN}`;
export const BRAND_EMAIL_HELLO = `hello@${BRAND_DOMAIN}`;
export const BRAND_EMAIL_EDITORS = `editors@${BRAND_DOMAIN}`;

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? BRAND_URL
).trim();
