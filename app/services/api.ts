import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://api.enem.dev/v1',
});
