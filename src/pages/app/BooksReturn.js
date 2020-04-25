import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import BooksDeliveryANDReturnTable from '../Components/BooksDeliveryANDReturnTable'


export default function BooksReturn(){

    return (
      <>
        <h2 className="marginTitle" >Recolha de Manuais</h2>
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <BooksDeliveryANDReturnTable/>
            </Grid>
            <Grid item xs={6}>
                <Grid container xs={1}>
                    <Grid item>
                        <h3><b>Observações:</b></h3>
                        <textarea rows="12" cols="50"/>
                    </Grid>
                    <Grid item >
                        <Button className="btnPermissoes" variant="outlined" color="primary" >
                            Submeter
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
            
        </Grid>
      </>
    );
}