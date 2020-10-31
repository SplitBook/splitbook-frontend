import React from 'react';
import PermissionsTable from '../../Components/permissionsPageComponents/PermissionsTable';
import CardPermissions from '../../Components/permissionsPageComponents/CardPermissions';
import Grid from '@material-ui/core/Grid';
import Header from '../../Components/Header';
import './AppStyles.css';

export default function GestaoPermissoes() {
  return (
    <>
      <Header title="Centro de gestão de permissões" />
      <Grid container>
        <Grid item>
          <PermissionsTable />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item>
          <CardPermissions />
        </Grid>
      </Grid>
    </>
  );
}
