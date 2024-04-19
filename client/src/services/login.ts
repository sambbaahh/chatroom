import axios from 'axios';
import { User } from '../interfaces/auth';

export default function login(userCredentials: User) {
  axios
    .post('/api/login', userCredentials)
    .then((res) => res)
    .catch((err) => {
      console.log('error in login service');
      return err;
    });
}
