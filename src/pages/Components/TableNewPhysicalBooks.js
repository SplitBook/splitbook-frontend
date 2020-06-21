import React from 'react';
import MaterialTable from 'material-table';
import Button from '@material-ui/core/Button';
import api from '../../services/api';
import CropFree from '@material-ui/icons/CropFree';
import Tooltip from '@material-ui/core/Tooltip';
import Grid from '@material-ui/core/Grid';

import './ComponentsStyles.css';


export default function TableNewPhysicalBooks({physicalBooks,num}) {
  const [state, setState] = React.useState({
    columns: [
      { title: 'ID', field: 'id'},
      { title: 'Gerar QR-Code',render: rowData => (     
        <>   
        <Tooltip title="Gerar QR-Code">
          <Button color="primary" style={{ padding: 14}} onClick={() => generateOneQRCode(rowData.id)}>
              <CropFree/>
          </Button> 
        </Tooltip>
        </>
      )},
    ],
    data: physicalBooks,
  });

  async function generateOneQRCode(){
    var txt = '';
    for(var i=0;i<num;i++){
      txt+=physicalBooks[0].id
      txt+=','
    }
    const {data} = await api.get('/generate/qr-codes?codes='+txt);
    console.log(data);
    var fileDownload = require('js-file-download');
    fileDownload(data,'file.csv');
  }
  

  return (

    <>
    <Grid container spacing={2}>
      <Grid item >
        <p style={{ padding: 5}}><b>Descarregar todos os QR-Codes:</b></p>
      </Grid>
      <Grid item>
        <Tooltip title="Gerar QR-Codes para todos os livros">
          <Button color="primary" style={{ padding: 14}} onClick={() => generateOneQRCode()}>
              <CropFree/>
          </Button> 
        </Tooltip>
      </Grid>
      
    </Grid>
    <Grid container spacing={2}>
      <Grid item>
        <MaterialTable
            title=" "
            columns={state.columns}
            data={state.data}
          />
      </Grid>
    </Grid>
    
    

    </>
  );
}
