import React from 'react';
import Grid from '@material-ui/core/Grid';
import './errors.css';
import img404 from '../../assets/images/404error_img.png';
import {
    Link,
  } from 'react-router-dom';

export default function Error404(){

    return (
      <>
      <Grid container alignItems="center" justify="center" className="height">
        <Grid item>
          <img src={img404} alt="logotipo" className="img"/>
        </Grid> 
      </Grid>
      <Grid container justify="center" className="height">
        <Grid item>
          <Link to='/login'>Voltar</Link>
        </Grid>
      </Grid>
      

      </>
      );

    
}
/*


*/