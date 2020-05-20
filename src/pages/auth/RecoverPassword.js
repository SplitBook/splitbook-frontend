import React, {useState} from 'react';
import logo from '../../assets/Icons/SplitBookTransparent/XD/icon_192.png';
import './Auth.css';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
//import './ComponentsStyles.css'

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}



export default function Login({history}){
    const [username,setUsername]= useState('');
    const [open1, setOpen1] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);

    async function handleSubmit(e){
        e.preventDefault();
        if(username!=null && username.trim()!==''){
            console.log(username);
            setOpen2(false);
            setOpen1(true);
        }
        else{
            setOpen1(false);
            setOpen2(true);
        }
        
    }

    async function redirectToLoginPage(){
        history.push('/login');
    }
    
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }

      setOpen1(false);
      setOpen2(false);
    };



    return(
        <>
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <img src={logo} alt="logotipo"/>
                <input 
                    placeholder="Insira o seu endereço de email"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <p onClick={redirectToLoginPage}>Retroceder</p>
                <button type="submit" className="btnRecoverPass">CONTINUAR</button>
                <div>
                <Snackbar open={open1} autoHideDuration={3000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="info">
                    OK
                    </Alert>
                </Snackbar>
                <Snackbar open={open2} autoHideDuration={3000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="warning">
                    É necessário preencher o campo a cima!
                    </Alert>
                </Snackbar>
                </div>
            </form>

        </div>
        </>
    );
}
