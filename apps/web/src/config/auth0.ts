export default new class implements Auth0ClientOptions {
  domain = process.env.AUTH0_DOMAIN ?? "dev-7h6ae2vd.auth0.com";
  client_id = process.env.AUTH0_CLIENT_ID ?? "QdcFeu7zGKDq7DhIu11MjsJK6dxNcx3I";
  redirect_uri = process.env.AUTH0_REDIRECT_URI ?? window.location.origin;
};
