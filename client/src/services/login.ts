import axios from 'axios';
import { Jwt, User } from '../interfaces';

export default async function login(userCredentials: User): Promise<Jwt> {
  try {
    const res = await axios.post('/api/login', userCredentials);
    return res.data;
  } catch (err) {
    console.log('error in login service');
    throw err;
  }
}
