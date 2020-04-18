import React, {useState} from 'react';
import logo from '../../assets/Icons/SplitBookTransparent/XD/icon_192.png';
import './Auth.css';
import SnackbarAlert from '../Components/SnackBar';
//import api from '../../services/api';


export default function Login({history}){
    const [username,setUsername]= useState('');
    const [open, setOpen] = React.useState(false);

    async function handleSubmit(e){
        e.preventDefault();
        console.log(username);
        setOpen(true)
        console.log(open)
        //const response = await api.post('/devs',{
        //  username:username ,
        //});
        //console.log(response)
        //const {_id}= response.data
        //history.push(`/dev/${_id}`);
    }

    async function redirectToLoginPage(){
        history.push('/login');
    }


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
                <SnackbarAlert history={history}/>                
            </form>
            
            
        </div>
        
        </>
    );
}
