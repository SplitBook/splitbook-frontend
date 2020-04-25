import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import BooksDeliveryANDReturnTable from '../Components/BooksDeliveryANDReturnTable'

export default function BooksDelivery(){

    return (
      <>
        <h2 className="marginTitle" >Entrega de Manuais</h2>
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