import axios from 'axios';

export const KataApi = axios.create({
  baseURL: 'https://blog.kata.academy/api/',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json',
  },
});
