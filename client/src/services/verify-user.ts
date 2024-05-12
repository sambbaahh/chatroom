import axios from 'axios';

export default async function verifyUser() {
  try {
    const res = await axios.get('/api/verify-user');
    return res.data;
  } catch (err) {
    console.log('User could not verified');
    throw err;
  }
}
