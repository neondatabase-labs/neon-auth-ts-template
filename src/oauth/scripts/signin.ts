import { stackClientApp } from '../../stack/client';

// Check if user is already signed in, if so, redirect to home
stackClientApp.getUser().then((user) => {
  if (user) {
    window.location.href = '/';
  }
});

// Handle Google Sign In
document.getElementById('googleSignin')?.addEventListener('click', async () => {
  try {
    await stackClientApp.signInWithOAuth('google');
  } catch (error) {
    console.error('Google sign in failed:', error);
    alert('Failed to initialize Google sign in');
  }
});

// Handle Github Sign In
document.getElementById('githubSignin')?.addEventListener('click', async () => {
  try {
    await stackClientApp.signInWithOAuth('github');
  } catch (error) {
    console.error('Github sign in failed:', error);
    alert('Failed to initialize Github sign in');
  }
});

// Handle Email/Password Sign In
document.getElementById('signin')?.addEventListener('click', async () => {
  const email = document.getElementById('email') as HTMLInputElement;
  const password = document.getElementById('password') as HTMLInputElement;

  const result = await stackClientApp.signInWithCredential({
    email: email.value,
    password: password.value,
  });

  if (result.status === 'error') {
    alert(`Sign in failed: ${result.error.humanReadableMessage}`);
  } else {
    window.location.href = '/';
  }
});
