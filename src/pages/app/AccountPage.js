import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';

export default function AccountPage(){

    return (
      <>
      <Grid container spacing={4}>
        <Grid item xs={2} >
          <TextField id="outlined-basic" label="Nome" variant="outlined" />
        </Grid>
        <Grid item xs={2} >
          <TextField id="outlined-basic" label="Apelido" variant="outlined" />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <TextField id="outlined-basic" label="Email" variant="outlined" className="maxwidth"/>
        </Grid>
      </Grid>
      </>
        
      );

    
}