import React, {useState,useEffect} from 'react';
import api from '../../services/api';
import logo from '../../assets/Icons/SplitBookTransparent/XD/icon_192.png';
import './Auth.css';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
//import api from '../../services/api';
import Cookies from 'js-cookie';
import { ThemeProvider } from '@material-ui/core';
import jwt_decode from 'jwt-decode';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  

export default function Login({ history,props}){
    const [username,setUsername]= useState('');
    const [password,setPassword]= useState('');
    const [open, setOpen] = React.useState(false);

    //console.log(props,history)

    //admin@splitbook.com
    //admin

    async function handleSubmit(e){
        e.preventDefault();
        try{
            const {data} = await api.post('/login',{email: username,password: password});
            console.log(data);
            Cookies.set('tokenLogin',data.token,{ expires: 7 });
            Cookies.set('profiles',data.user.profiles,{ expires: 7 });
            console.log(data.user.profiles.length)
            if(data.user.profiles.length!==1)
                history.push('/user/group')
            else{
                const data2 = await api.post('/login/profile',{profile_id:data.user.profiles[0].id,charge:data.user.profiles[0].name,token:data.token});
                console.log("Login2:: ",data2.data);
                Cookies.set('token',data2.data.token,{ expires: 7 });
                //var decoded = jwt_decode(data2.data.token);
                //console.log("decoded",decoded)
                history.push('/app/home')
            }
                
        }
        catch(Error){
            Cookies.remove('tokenLogin')
            console.log('Authentication Error:',Error)
            setOpen(true);
        }
        
        //setOpen(true); //mensagem de error
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

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
      };

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
                <div>
                <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error">
                    Acesso Negado!
                    </Alert>
                </Snackbar>
                </div>
            </form>
        </div>
    );
}

