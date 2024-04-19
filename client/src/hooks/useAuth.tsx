import { createContext, useContext, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from './useLocalStorage';
import loginService from '../services/login';

const AuthContext = createContext();

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useLocalStorage('token', null);
  const [expires, setExpires] = useLocalStorage('expires', null);

  const navigate = useNavigate();

  useEffect(() => {}, []);

  // call this function when you want to authenticate the user
  const login = (username: string, password: string) => {
    loginService()
      .then((result) => {
        setToken(result.token);
        setExpires(result.expires);
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const register = (username: string, password: string) => {};

  const logout = () => {
    setToken(null);
    setExpires(null);
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
