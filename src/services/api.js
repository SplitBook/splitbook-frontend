import axios from 'axios';
import Cookies from 'js-cookie';


//const [token, setToken] = React.useState(localStorage.getItem('token'));

const api = axios.create({
    baseURL: 'http://localhost:8085',
    headers: {'Authorization': 'Bearer '+Cookies.get("token")}
});

export default api;

