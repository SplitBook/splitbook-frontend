import axios from 'axios';
import Cookies from 'js-cookie';

var token=Cookies.get('token');
const apiLogin = axios.create({
    baseURL: 'http://localhost:8085',
    headers: {'Authorization': 'Bearer '+token}
});

export default apiLogin;

