export default new class implements Auth0ClientOptions {
  domain = process.env.AUTH0_DOMAIN!;
  client_id = process.env.AUTH0_CLIENT_ID!;
  redirect_uri = process.env.AUTH0_REDIRECT_URI!;
}
