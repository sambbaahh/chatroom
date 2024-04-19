import { createContext, useContext, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import axios from 'axios';

import { useLocalStorage } from './useLocalStorage';
import loginService from '../services/login';
import { User, Jwt } from '../interfaces/auth';

const AuthContext = createContext();

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useLocalStorage('token', null);
  const [expiresIn, setExpiresIn] = useLocalStorage('expiresIn', null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!expiresIn || dayjs().isBefore(expiresIn)) {
      logout();
    }
  }, []);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
      localStorage.setItem('token', token);
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
    }
  }, [token]);

  const login = (userCredentials: User) => {
    loginService(userCredentials)
      .then((result: Jwt) => {
        setToken(result.token);
        setExpiresIn(
          dayjs()
            .add(Number(result.expiresIn.toString().charAt(0)), '7d')
            .valueOf()
        );
        navigate('/');
      })
      .catch((err: Error) => {
        console.log(err);
        return err;
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
      register,
      logout,
    }),
    [token, expiresIn]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};
