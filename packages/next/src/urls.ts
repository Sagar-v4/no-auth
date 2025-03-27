export const sso_url = new URL(
  process.env.NEXT_PUBLIC_NO_AUTH_SSO_URL as string,
);
export const server_url = new URL(
  process.env.NEXT_PUBLIC_NO_AUTH_SERVER_URL as string,
);
export const access_token_url = `${server_url.toString()}/api/v1/sessions/sign/access`;
