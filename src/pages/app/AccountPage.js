import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import ListaFiliados from '../Components/ListaFiliados';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import './AppStyles.css'

export default function AccountPage(){
  const [open, setOpen] = React.useState(false);
  const [pass1, setPass1] = React.useState('');
  const [pass2, setPass2] = React.useState('');
  const [pass3, setPass3] = React.useState('');
  const [showWarnText, setShowWarnText] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setShowWarnText(false);
  };

  function submeter(){
    if(pass2!==pass3){
      setShowWarnText(true);
      console.log("Variaveis: ",pass1,pass2,pass3)
    }
    else{
      setOpen(false);
    }
  }

  const PassAtual = (event) => {
    setPass1(event.target.value)
  };

  const NovaPass1 = (event) => {
    setPass2(event.target.value)
  };

  const NovaPass2 = (event) => {
    setPass3(event.target.value)
  };

    return (
      <>
      <Grid container spacing={4}>
        <Grid item xs={2} >
          <TextField id="outlined-basic" label="Nome" variant="outlined" value="Rogério" disabled/>
        </Grid>
        <Grid item xs={2} >
          <TextField id="outlined-basic" label="Apelido" variant="outlined" value="Costa" disabled/>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <TextField id="outlined-basic" label="Email" variant="outlined" className="maxwidth" value="rogernuno@gmail.com" disabled/>
        </Grid>
        
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Button variant="outlined" color="primary" onClick={handleClickOpen}>
            Alterar palavra-passe
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item >
          <ListaFiliados/>
        </Grid>
      </Grid>

        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Alterar palavra-passe</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="firstpassowrd"
              value={pass1}
              onChange={PassAtual}
              label="Palavra-passe"
              type="password"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="secondpassowrd"
              value={pass2}
              onChange={NovaPass1}
              label="Nova palavra-passe"
              type="password"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="thirdpassowrd"
              value={pass3}
              onChange={NovaPass2}
              label="Nova palavra-passe"
              type="password"
              fullWidth
            />
            {
              showWarnText && 
              <p className="warnText">As novas palavras-passe não coincidem!</p>
            }
            
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancelar
            </Button>
            <Button onClick={submeter} color="primary">
              Submeter
            </Button>
          </DialogActions>
        </Dialog>

      </>  
      );

      /*
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Button variant="contained" color="primary">
              Guardar
            </Button>
          </Grid>
        </Grid>
      */

    
}