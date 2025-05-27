import { stackClientApp } from '../../stack/client';

// Check if user is already signed in
stackClientApp.getUser().then((user) => {
  if (user) {
    window.location.href = '/';
  }
});

// Handle Google Sign Up

document.getElementById('googleSignup')?.addEventListener('click', async () => {
  try {
    await stackClientApp.signInWithOAuth('google');
  } catch (error) {
    alert(`Failed to sign up ${error}`);
  }
});

// Handle Github Sign Up
document.getElementById('githubSignup')?.addEventListener('click', async () => {
  try {
    await stackClientApp.signInWithOAuth('github');
  } catch (error) {
    alert(`Failed to sign up ${error}`);
  }
});

// Handle Email/Password Sign Up
document.getElementById('signup')?.addEventListener('click', async () => {
  const email = document.getElementById('email') as HTMLInputElement;
  const password = document.getElementById('password') as HTMLInputElement;

  const result = await stackClientApp.signUpWithCredential({
    email: email.value,
    password: password.value,
  });

  if (result.status === 'error') {
    alert(`Sign up failed: ${result.error.humanReadableMessage}`);
    return;
  }

  const signInResult = await stackClientApp.signInWithCredential({
    email: email.value,
    password: password.value,
  });

  if (signInResult.status === 'error') {
    alert(
      `Account created but sign in failed: ${signInResult.error.humanReadableMessage}`,
    );
    window.location.href = '/src/oauth/signin';
  } else {
    window.location.href = '/';
  }
});
