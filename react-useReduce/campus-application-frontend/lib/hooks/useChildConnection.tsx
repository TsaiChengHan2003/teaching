import { useSession } from 'next-auth/react';
import { useCallback } from 'react';

export function useChildConnection() {
  const { 'data': session } = useSession();

  const childConnection = useCallback(async (childUrl: string) => {
    const token = localStorage.getItem('token');

    if (!session) {
      alert('請先登入');
      return;
    }

    const sessionData = {
      'name': session.user?.name,
      'email': session.user?.email,
      'image': session.user?.image,
      'token': token,
    };

    if (!childUrl) {
      try {
        const res = await fetch('https://lost-corner.ntubimdbirc.tw/sso-login/', {
          'method': 'POST',
          'headers': { 'Content-Type': 'application/json' },
          'body': JSON.stringify(sessionData)
        });

        const result = await res.json();

        if (result.access) {
          localStorage.setItem('django_access', result.access);

          window.open(`https://lost-corner.ntubimdbirc.tw/?token=${result.access}`);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      const childWindow = window.open(childUrl);

      const childConnection = (event: MessageEvent) => {
        if (
          event.origin === new URL(childUrl).origin &&
          event.data === 'child-ready'
        ) {
          childWindow?.postMessage(sessionData, childUrl);
          window.removeEventListener('message', childConnection);
        }
      };

      window.addEventListener('message', childConnection);
    }
  }, [session]);

  return childConnection;
}