import React, {useState} from 'react';
import logo from '../../assets/Icons/SplitBookTransparent/XD/icon_192.png';
import './Auth.css';
//import api from '../../services/api';

export default function Login({ history,props}){
    const [username,setUsername]= useState('');
    const [password,setPassword]= useState('');
    console.log(props,history)

    async function handleSubmit(e){
        e.preventDefault();
        history.push('/app/ee/home')
        /*console.log(username);
        const response = await api.post('/devs',{
          username:username ,
        });
        console.log(response)
        const {_id}= response.data
        history.push(`/dev/${_id}`);*/
    }

    async function redirectToRecoverPassword(){
        history.push('/recover/password')
    }

    return(
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <img src={logo} alt="logotipo"/>
                <input 
                    placeholder="Username"
                    value={username}
                    type="usernam"
                    onChange={e => setUsername(e.target.value)}
                />
                <input 
                    placeholder="Password"
                    value={password}
                    type="password"
                    onChange={e => setPassword(e.target.value)}
                />
                <p onClick={redirectToRecoverPassword}>Recuperar password</p>
                <button type="submit" className="btnLogin">LOGIN </button>
            </form>
        </div>
    );
}

