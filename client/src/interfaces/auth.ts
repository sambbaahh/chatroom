export interface User {
  username: string;
  password: string;
}

export interface Jwt {
  token: string;
  expiresIn: string;
}
