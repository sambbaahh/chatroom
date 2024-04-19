import axios from 'axios';

export default function login(userCredentials) {
  axios
    .post('/api/login', userCredentials)
    .then((res) => res)
    .catch((err) => {
      console.log('error in login service');
      return err;
    });
}
