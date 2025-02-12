import { type AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

const handlerLogOut = (callback: AppRouterInstance) => {
  if (typeof window !== 'undefined') {
    // remove cookies
    document.cookie =
      'session_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie =
      'auth_data=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

    callback.replace('/sign-in');
  }
};

export default handlerLogOut;
