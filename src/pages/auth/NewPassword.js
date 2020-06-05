import React, {useState,useEffect} from 'react';
import api from '../../services/api';
import logo from '../../assets/Icons/SplitBookTransparent/XD/icon_192.png';
import './Auth.css';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
//import api from '../../services/api';
import Cookies from 'js-cookie';
import { ThemeProvider } from '@material-ui/core';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  

export default function NewPassword({ history,props}){
    const [password,setPassword]= useState('');
    const [password1,setPassword1]= useState('');
    const [password2,setPassword2]= useState('');
    const [alertTxt,setAlertTxt]= useState('');
    const [open, setOpen] = React.useState(false);

    //admin@splitbook.com
    //admin

    async function handleSubmit(e){
        e.preventDefault();
        console.log("Ok");
        if(password1!==password2 || password1===''){
            setAlertTxt('A os campos com nova palavra-passe não coincidem!')
            setOpen(true);
        }
        /*try{
            const {data} = await api.post('/login',{password: username,password: password});
            console.log(data);
            Cookies.set('token',data.token,{ expires: 7 });
            Cookies.set('profiles',data.user.profiles,{ expires: 7 });
            console.log(data.user.profiles.length)
            if(data.user.profiles.length!==1)
                history.push('/user/group')
            else
                history.push('/app/home')
        }
        catch(Error){
            setOpen(true);
        }*/
        
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
                {
                    true &&
                    <input 
                        placeholder="Password atual"
                        value={password}
                        type="password"
                        onChange={e => setPassword(e.target.value)}
                    />
                }
                <input 
                    placeholder="Nova Password"
                    value={password1}
                    type="password"
                    onChange={e => setPassword1(e.target.value)}
                />
                <input 
                    placeholder="Nova Password"
                    value={password2}
                    type="password"
                    onChange={e => setPassword2(e.target.value)}
                />
                <p onClick={redirectToRecoverPassword}></p>
                <button type="submit" className="btnLogin">SUBMETER </button>
                <div>
                <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error">
                        {alertTxt}
                    </Alert>
                </Snackbar>
                </div>
            </form>
        </div>
    );
}

