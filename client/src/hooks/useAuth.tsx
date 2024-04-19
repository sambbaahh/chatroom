import { createContext, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from './useLocalStorage';

const AuthContext = createContext();

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setUser] = useLocalStorage('token', null);
  const [expires, setExpires] = useLocalStorage('expires', null);

  const navigate = useNavigate();

  // call this function when you want to authenticate the user
  const login = async (username: string, password: string) => {
    setUser(data);
    navigate('/');
  };

  const register = async (username: string, password: string) => {};

  // call this function to sign out logged in user
  const logout = () => {
    setUser(null);
    navigate('/login', { replace: true });
  };

  const value = useMemo(
    () => ({
      token,
      login,
      logout,
    }),
    [user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};
