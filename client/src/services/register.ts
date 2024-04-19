import axios from 'axios';
import { User } from '../interfaces/auth';

export default function register(registrationData: User) {
  axios
    .post('/api/register', registrationData)
    .then((res) => res)
    .catch((err) => {
      console.log('error in register service');
      return err;
    });
}
