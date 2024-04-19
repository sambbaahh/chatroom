import axios from 'axios';

export default function register(registrationData) {
  axios
    .post('/api/login', registrationData)
    .then((res) => res)
    .catch((err) => {
      console.log('error in login service');
      return err;
    });
}
