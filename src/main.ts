import './style.css';
import { stackClientApp } from './stack/client';
import type { User } from '@stackframe/js';

const updateHeader = (user: User | null) => {
  const header = document.getElementById('header-ctas')!;
  if (user) {
    header.innerHTML = `
      <span class="inline-flex h-8 items-end flex-col">
            ${
              user.displayName
                ? `<span class="text-[14px] text-gray-300"> 
                Hello ${user.displayName}
              </span>`
                : ''
            }
            <button
              type="button"
              id="signOut"
              class="px-1 underline text-[11px]  hover:no-underline cursor-pointer"
            >
              Sign Out
            </button>
    `;

    document.getElementById('signOut')?.addEventListener('click', async () => {
      const user = await stackClientApp.getUser();
      if (user) {
        await user.signOut();
        updateHeader(null);
      }
    });
  } else {
    header.innerHTML = `
      <button
            onclick="window.location.href='/src/oauth/signin'"
            class="inline-flex h-8 items-center justify-center rounded-md px-4 text-[13px] font-medium cursor-pointer text-gray-300 transition-all "
          >
            Log In
          </button>
          <button
            id="signup"
            class="inline-flex h-8 items-center justify-center font-medium  text-center rounded-full outline-none cursor-pointer   text-black bg-primary hover:bg-[#00e5bf] whitespace-nowrap px-6 text-[13px] transition-colors duration-200"
          >
            Sign Up
          </button>
    `;

    document.getElementById('signup')?.addEventListener('click', async () => {
      window.location.href = '/src/oauth/signup';
    });
  }
};

stackClientApp.getUser().then(updateHeader);
