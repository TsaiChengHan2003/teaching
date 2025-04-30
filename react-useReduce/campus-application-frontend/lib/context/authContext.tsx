import { createContext, useContext, useEffect } from 'react';
import { signOut, useSession } from 'next-auth/react';

import userAPI from '@/lib/api/userAPI';

const defaultInfoValue = { 'value': '' };

export const AuthContext =
    createContext<typeof defaultInfoValue>(defaultInfoValue);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { 'data': session } = useSession();

  useEffect(() => {
    if (session && !localStorage.getItem('token')) {
      const login = async () => {
        try {
          await userAPI.login(session?.id_token);
        } catch {
          signOut();
          localStorage.clear();
        }
      };

      login();
    }
  }, [session]);

  return (
    <AuthContext.Provider value={{ 'value': '' }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;

export const useAuthContext = () => useContext(AuthContext);