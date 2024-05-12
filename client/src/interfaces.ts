export interface User {
  username: string;
  password: string;
}

export interface Jwt {
  token: string;
  expiresIn: string;
}

export interface Room {
  id: number;
  name: string;
  users: string[];
}

export interface Message {
  username: string;
  content: string;
  timestamp: string;
}
