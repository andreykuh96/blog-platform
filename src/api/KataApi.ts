import axios from 'axios';

export const KataApi = axios.create({
  baseURL: 'https://blog.kata.academy/api/',
  headers: {
    Authorization: 'Bearer your_token_here',
    'Content-Type': 'application/json',
  },
});
