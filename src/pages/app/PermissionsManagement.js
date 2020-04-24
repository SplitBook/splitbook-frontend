import React from 'react';
import PermissionsTable from '../Components/permissionsPageComponents/PermissionsTable';
import CardPermissions from '../Components/permissionsPageComponents/CardPermissions'
import Grid from '@material-ui/core/Grid';
import './AppStyles.css';

export default function GestaoPermissoes() {
  
  return (
    <>
      <h2 className="marginTitle" >Gestão de permissões</h2>
      <Grid container xs={1} >
        <Grid item>
          <PermissionsTable/>
        </Grid>
        <Grid item >
          <CardPermissions/>
        </Grid>
      </Grid>
    </>
  );
}
