import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import Button from '@material-ui/core/Button';
import api from '../../services/api';
import CropFree from '@material-ui/icons/CropFree';
import Tooltip from '@material-ui/core/Tooltip';
import Grid from '@material-ui/core/Grid';
import Localization from '../MaterialTable-Props/material-table-txt-traduction';

import '../ComponentsStyles.css';

export default function TableNewPhysicalBooks({ physicalBooks, num }) {
  const [state, setState] = useState({
    columns: [
      { title: 'Código do livro', field: 'id' },
      {
        title: 'Gerar QR-Code',
        render: (rowData) => (
          <>
            <Tooltip title="Gerar QR-Code">
              <Button
                color="primary"
                style={{ padding: 14 }}
                onClick={() => generateQRCode(rowData.id)}
              >
                <CropFree />
              </Button>
            </Tooltip>
          </>
        ),
      },
    ],
    data: physicalBooks,
  });

  useEffect(() => {
    setState({ ...state, data: physicalBooks });
  }, [physicalBooks]);

  async function generateQRCode(code = undefined) {
    const codes =
      code || physicalBooks.map((physicalBook) => physicalBook.id).join(',');

    const { data } = await api.get('/generate/qr-codes?codes=' + codes, {
      responseType: 'blob',
    });

    const file = new Blob([data], { type: 'application/pdf' });
    const fileURL = URL.createObjectURL(file);
    window.open(fileURL);
  }

  return (
    <>
      <Grid container spacing={2}>
        <Grid item>
          <p style={{ padding: 5 }}>
            <b>Descarregar todos os QR-Codes:</b>
          </p>
        </Grid>
        <Grid item>
          <Tooltip title="Gerar QR-Codes para todos os manuais">
            <Button
              color="primary"
              style={{ padding: 14 }}
              onClick={() => generateQRCode()}
            >
              <CropFree />
            </Button>
          </Tooltip>
        </Grid>
      </Grid>

      <MaterialTable title=" " columns={state.columns} data={state.data} localization={Localization} />
    </>
  );
}
