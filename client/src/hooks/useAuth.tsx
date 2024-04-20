import { createContext, useContext, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import axios from 'axios';

import { useLocalStorage } from './useLocalStorage';
import loginService from '../services/login';
import registerService from '../services/register';
import { User, Jwt } from '../interfaces/auth';
import getUnixTimeStamp from '../utils/getUnixTimeStamp';

interface AuthContextInterface {
  token: string | null;
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

  const navigate = useNavigate();

  useEffect(() => {
    if (!expiresIn || !token || dayjs().isAfter(expiresIn)) {
      logout();
    }
  }, []);

  useEffect(() => {
    //need to attach the token to http requests
    //token includes "Bearer"
    if (token) {
      axios.defaults.headers.common['Authorization'] = token;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  const login = async (userCredentials: User): Promise<Jwt> => {
    try {
      const result: Jwt = await loginService(userCredentials);
      setToken(result.token);
      setExpiresIn(getUnixTimeStamp(result.expiresIn));
      navigate('/');
      return result;
    } catch (err) {
      console.log('Error in useAuth');
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
      console.log('Error in useAuth');
      console.log(err);
      throw err;
    }
  };

  const logout = (): void => {
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
    [token]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};
