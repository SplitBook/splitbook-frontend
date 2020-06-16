import React from 'react';
import MaterialTable from 'material-table';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import api from '../../services/api';
import api_formdata from '../../services/api_multipart_form_data';
import ImageOutlined from '@material-ui/icons/ImageOutlined';
import NoteAddOutlined from '@material-ui/icons/NoteAddOutlined';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import CropFree from '@material-ui/icons/CropFree';
import Tooltip from '@material-ui/core/Tooltip';
import Grid from '@material-ui/core/Grid';

import './ComponentsStyles.css';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


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
