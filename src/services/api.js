import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_HOST || 'http://localhost:8085',
  headers: { Authorization: 'Bearer ' + Cookies.get('token') },
});

export default api;
