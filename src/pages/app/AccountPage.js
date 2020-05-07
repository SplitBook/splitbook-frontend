import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import ListaFiliados from '../Components/ListaFiliados';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


export default function AccountPage(){
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
              label="Palavra-passe"
              type="password"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="secondpassowrd"
              label="Nova palavra-passe"
              type="password"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="thirdpassowrd"
              label="Nova palavra-passe"
              type="password"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancelar
            </Button>
            <Button onClick={handleClose} color="primary">
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