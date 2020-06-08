import axios from 'axios';
import Cookies from 'js-cookie';



const api = axios.create({
    baseURL: 'http://localhost:8085',
    headers: {
        'Authorization': 'Bearer '+Cookies.get("token"),
        'content-type': 'multipart/form-data'
    }
});

export default api;

