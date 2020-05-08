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
    const [open, setOpen] = React.useState(false);

    async function handleSubmit(e){
        e.preventDefault();
        console.log(username);
    }

    async function redirectToLoginPage(){
        history.push('/login');
    }

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            //setOpen(false);
            return;
        }
        setOpen(false);
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
                <button onClick={handleClick} className="btnRecoverPass">CONTINUAR</button>
                <div>
                <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success">
                    Enviado com sucesso!
                    </Alert>
                </Snackbar>
                </div>
            </form>

        </div>
        
        </>
    );
}
