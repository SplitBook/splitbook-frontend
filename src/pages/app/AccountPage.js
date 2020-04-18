import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';

export default function AccountPage(){

    return (
      <>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <TextField id="outlined-basic" label="User" variant="outlined" className="maxwidth"/>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <TextField id="outlined-basic" label="Contactos" variant="outlined" className="maxwidth"/>
        </Grid>
      </Grid>
      </>
        
      );

    
}