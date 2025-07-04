import { stackClientApp } from '../../stack/client';

// Check if user is already signed in
stackClientApp.getUser().then((user) => {
  if (user) {
    window.location.href = '/';
  }
});

// Handle OAuth redirect
window.addEventListener('load', async () => {
  try {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const state = params.get('state');

    if (code && state) {
      const user = await stackClientApp.callOAuthCallback();
      if (user) {
        window.location.href = '/';
      }
    }
  } catch (error) {
    console.error('Failed to handle OAuth redirect:', error);
    alert('Authentication failed. Please try again.');
  }
});
