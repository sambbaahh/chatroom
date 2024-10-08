import { createContext, useContext, useMemo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import axios from 'axios';

import { useLocalStorage } from './use-localstorage';
import loginService from '../services/login';
import registerService from '../services/register';
import verifyUserService from '../services/verify-user';
import { User, Jwt } from '../interfaces';
import getUnixTimeStamp from '../utils/get-unix-time-stamp';

interface AuthContextInterface {
  token: string | null;
  username: string | null;
  login: (userCredentials: User) => Promise<Jwt>;
  register: (registrationData: User) => Promise<Jwt>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextInterface>(
  {} as AuthContextInterface
);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useLocalStorage('token', null);
  const [expiresIn, setExpiresIn] = useLocalStorage('expiresIn', null);
  const [username, setUsername] = useState<string>('');

  const navigate = useNavigate();

  useEffect(() => {
    if (!expiresIn || !token || dayjs().isAfter(expiresIn)) {
      delete axios.defaults.headers.common['Authorization'];
      logout();
    }
  }, []);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        if (token) {
          axios.defaults.headers.common['Authorization'] = token;
          const result = await verifyUserService();
          setUsername(result.username);
        }
      } catch (err) {
        delete axios.defaults.headers.common['Authorization'];
        logout();
      }
    };

    verifyUser();
  }, [token]);

  const login = async (userCredentials: User): Promise<Jwt> => {
    try {
      const result: Jwt = await loginService(userCredentials);
      setToken(result.token);
      setExpiresIn(getUnixTimeStamp(result.expiresIn));
      navigate('/');
      return result;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  const register = async (registrationData: User): Promise<Jwt> => {
    try {
      const result: Jwt = await registerService(registrationData);
      setToken(result.token);
      setExpiresIn(getUnixTimeStamp(result.expiresIn));
      navigate('/');
      return result;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  const logout = (): void => {
    setToken(null);
    setExpiresIn(null);
    setUsername('');
    navigate('/login', { replace: true });
  };

  const value = useMemo(
    () => ({
      token,
      username,
      login,
      register,
      logout,
    }),
    [token, username]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};
