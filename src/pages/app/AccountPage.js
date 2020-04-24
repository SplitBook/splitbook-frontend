import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import ListaFiliados from '../Components/ListaFiliados';
import Button from '@material-ui/core/Button';


export default function AccountPage(){

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
          <Button variant="outlined" color="primary" >
            Alterar palavra-passe
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item >
          <ListaFiliados/>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Button variant="contained" color="primary">
            Guardar
          </Button>
        </Grid>
      </Grid>
      </>
        
      );

    
}