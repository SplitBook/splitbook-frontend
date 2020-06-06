import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import ListaFiliados from '../Components/ListaFiliados';
import Button from '@material-ui/core/Button';
//import Input from '@material-ui/core/Input';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import ImageUploader from 'react-images-upload';
import './AppStyles.css'
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import api from '../../services/api';
import jwt_decode from 'jwt-decode';
import Cookies from 'js-cookie';



const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));



export default function AccountPage(){
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [state,setState] = React.useState({ pictures: [] });

  function onDrop(picture) {
    setState({
        pictures: this.state.pictures.concat(picture),
    });
    console.log("State",state)
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function ChangePassword(){
    var token = Cookies.get('token');
    var decoded = jwt_decode(token);
    var {data} = await api.get('/users/'+decoded.user_id);
    var dataPass = api.post('/recover-password?change_password=true',{email: data.email});
    setOpen(false);
    console.log("infouser:",data.email,"ChangePass_data",dataPass)
  }

  /*const PassAtual = (event) => {
    setPass1(event.target.value)
  };

  const NovaPass1 = (event) => {
    setPass2(event.target.value)
  };

  const NovaPass2 = (event) => {
    setPass3(event.target.value)
  };*/

  const fileSelectedHandler = (event) => {
    console.log(event);
    //console.log(event.target.files[0])
  }

//https://www.npmjs.com/package/react-images-upload
    return (
      <>
      <Grid container spacing={2}>
        <Grid item >
          <TextField id="outlined-basic" label="Nome" variant="outlined" value="Rogério" disabled/>
        </Grid>
        <Grid item >
          <TextField id="outlined-basic" label="Apelido" variant="outlined" value="Costa" disabled/>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item >
          <TextField id="outlined-basic" label="Email" variant="outlined" className="maxwidth" value="rogernuno@gmail.com" disabled/>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item >
          <Button variant="outlined" color="primary" onClick={handleClickOpen}>
            Alterar palavra-passe
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item >
        <form encType="multipart/form-data" action="">
            <ImageUploader
                withIcon={true}
                singleImage={true}
                buttonText='Descarregar foto de perfil'
                onChange={fileSelectedHandler}
                imgExtension={['.jpg','.png']}
                maxFileSize={5242880}
                label='Max file size: 5mb, accepted: jpg, png'
            />
        </form>
        </Grid>
      </Grid>
      
      <Grid container spacing={2}>
        <Grid item >
          <ListaFiliados/>
        </Grid>
      </Grid>


      <Dialog
        open={open}
        //onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Alteração de palavra-passe</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Ao clicar <b>Confirmar</b>, ser-lhe à enviado um email para proceder à alteração de palavra-passe de forma segura.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={ChangePassword} color="primary" autoFocus>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>

      </>  
      );


    
}