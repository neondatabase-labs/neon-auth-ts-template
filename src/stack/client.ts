import { StackClientApp } from '@stackframe/js';

export const stackClientApp = new StackClientApp({
  tokenStore: 'cookie',

  // get your Stack Auth API keys from https://app.stack-auth.com and store them in a safe place (eg. environment variables)
  projectId: import.meta.env.VITE_STACK_PROJECT_ID,
  publishableClientKey: import.meta.env.VITE_STACK_PUBLISHABLE_CLIENT_KEY,
  urls: {
    oauthCallback: window.location.origin + '/src/oauth/callback',
  },
});
