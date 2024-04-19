import { createContext, useContext, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from './useLocalStorage';
import loginService from '../services/login';
import { User, Jwt } from '../interfaces/auth';

const AuthContext = createContext();

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useLocalStorage('token', null);
  const [expiresIn, setExpiresIn] = useLocalStorage('expires', null);

  const navigate = useNavigate();

  useEffect(() => {}, []);

  const login = (userCredentials: User) => {
    loginService(userCredentials)
      .then((result: Jwt) => {
        setToken(result.token);
        setExpiresIn(result.expiresIn);
        navigate('/');
      })
      .catch((err: Error) => {
        console.log(err);
      });
  };

  const register = (registrationData: User) => {};

  const logout = () => {
    setToken(null);
    setExpiresIn(null);
    navigate('/login', { replace: true });
  };

  const value = useMemo(
    () => ({
      token,
      login,
      logout,
    }),
    [token, expiresIn]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};
