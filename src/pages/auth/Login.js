import React, {useState} from 'react';
import logo from '../../assets/Icons/SplitBookTransparent/XD/icon_192.png';
import './Auth.css';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
//import api from '../../services/api';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  

export default function Login({ history,props}){
    const [username,setUsername]= useState('');
    const [password,setPassword]= useState('');
    const [open, setOpen] = React.useState(false);
    console.log(props,history)

    async function handleSubmit(e){
        e.preventDefault();
        history.push('/user/group')

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
                    Credênciais incorretas!
                    </Alert>
                </Snackbar>
                </div>
            </form>
        </div>
    );
}

