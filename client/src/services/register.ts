import axios from 'axios';
import { Jwt, User } from '../interfaces/auth';

export default async function register(registrationData: User): Promise<Jwt> {
  try {
    const res = await axios.post('/api/register', registrationData);
    return res.data;
  } catch (err) {
    console.log('error in register service');
    throw err;
  }
}
