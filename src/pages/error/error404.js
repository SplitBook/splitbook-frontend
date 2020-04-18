import React from 'react';
import Grid from '@material-ui/core/Grid';
import './errors.css';
import {
    Link,
  } from 'react-router-dom';

export default function Error404(){

    return (
      <Grid container alignItems="center" justify="center" className="height">
        <Grid item>Page Not Found</Grid>
        <Grid item>
            <Link to='/login'>Login</Link>
        </Grid>
    </Grid>
      );

    
}