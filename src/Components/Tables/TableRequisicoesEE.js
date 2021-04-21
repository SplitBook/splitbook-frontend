import React from 'react';
import MaterialTable from 'material-table';
import jwt_decode from 'jwt-decode';
import Cookies from 'js-cookie';
import Button from '@material-ui/core/Button';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';
import ImageOutlined from '@material-ui/icons/ImageOutlined';
import Slide from '@material-ui/core/Slide';
import api from '../../services/api';
import Localization from '../MaterialTable-Props/material-table-txt-traduction';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function TableRequisicoesEE() {
  const [state, setState] = React.useState({
    columns: [
      { title: 'Nome EE', field: 'guardian_name' },
      { title: 'Nº Aluno', field: 'student_number' },
      { title: 'Nome Aluno', field: 'student_name' },
      { title: 'Turma', field: 'class' },
      { title: 'Estado', field: 'state' },
      {
        title: ' ',
        field: 'state_id',
        render: (rowData) => (
          <>
            {rowData.state_id === 1 ? (
              <FiberManualRecordIcon className="status1" />
            ) : rowData.state_id === 2 ? (
              <FiberManualRecordIcon className="status2" />
            ) : (
              <FiberManualRecordIcon className="status3" />
            )}
          </>
        ),
      },
      {
        title: 'Mais informações',
        field: 'listalivros',
        render: (rowData) => (
          <Button onClick={() => handleChange(rowData.id, rowData.reason)}>
            Consultar
          </Button>
        ),
      },
    ],
    data: [],
  });

  const [idStatus, setIdStatus] = React.useState(1);
  var token = Cookies.get('token');
  var decoded = jwt_decode(token);
  const [reqId, setReqId] = React.useState(0);
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setReason(null);
    setOpen(false);
  };

  const handleCloseIMG = () => {
    setOpenPhoto(false);
  };

  const handleChange = (value, reasonValue) => {
    console.log('req id', value);
    setReqId(value);
    setReason(reasonValue);
    setOpen(true);
  };

  const [photo_photo, setPhoto_photo] = React.useState('');
  const [openPhoto, setOpenPhoto] = React.useState(false);
  const [reason, setReason] = React.useState(null);

  function openImg(path) {
    console.log(path);
    setPhoto_photo(path);
    setOpenPhoto(true);
  }

  const fullWidth = true;
  const maxWidth = 'sm';

  const tableRef = React.createRef();
  return (
    <>
      {idStatus === 1 ? (
        <MaterialTable
          title="Requisições"
          tableRef={tableRef}
          localization={Localization}
          columns={state.columns}
          options={{
            sorting: false,
          }}
          data={(query) =>
            new Promise((resolve, reject) => {
              let url = '';
              if (decoded.charge === 'Encarregado de Educação')
                url +=
                  (process.env.REACT_APP_API_HOST || 'http://localhost:8085') +
                  '/requisitions?current_school_year=true&guardian_id=' +
                  decoded.profile_id;
              else
                url +=
                  (process.env.REACT_APP_API_HOST || 'http://localhost:8085') +
                  '/requisitions?current_school_year=true&head_class_id=' +
                  decoded.profile_id;
              url += '&limit=' + query.pageSize;
              url += '&page=' + (query.page + 1);
              url += '&search=' + query.search;
              fetch(url, {
                headers: {
                  method: 'GET',
                  Authorization: 'Bearer ' + Cookies.get('token'),
                },
              })
                .then((response) => response.json())
                .then((result) => {
                  resolve({
                    data: result.data,
                    page: result.page - 1,
                    totalCount: result.totalCount,
                  });
                });
            })
          }
          actions={[
            {
              icon: 'refresh',
              tooltip: 'Atualizar informação',
              isFreeAction: true,
              onClick: () =>
                tableRef.current && tableRef.current.onQueryChange(),
            },
          ]}
        />
      ) : (
        <MaterialTable
          title="Requisições"
          tableRef={tableRef}
          localization={Localization}
          columns={state.columns}
          actions={[
            {
              icon: 'refresh',
              tooltip: 'Atualizar informação',
              isFreeAction: true,
              onClick: () =>
                tableRef.current && tableRef.current.onQueryChange(),
            },
          ]}
          options={{
            sorting: false,
          }}
          data={(query) =>
            new Promise((resolve, reject) => {
              let url = '';
              if (decoded.charge === 'Encarregado de Educação')
                url +=
                  (process.env.REACT_APP_API_HOST || 'http://localhost:8085') +
                  '/requisitions?guardian_id=' +
                  decoded.profile_id;
              else
                url +=
                  (process.env.REACT_APP_API_HOST || 'http://localhost:8085') +
                  '/requisitions?head_class_id=' +
                  decoded.profile_id;
              url += '&limit=' + query.pageSize;
              url += '&page=' + (query.page + 1);
              url += '&search=' + query.search;
              fetch(url, {
                headers: {
                  method: 'GET',
                  Authorization: 'Bearer ' + Cookies.get('token'),
                },
              })
                .then((response) => response.json())
                .then((result) => {
                  resolve({
                    data: result.data,
                    page: result.page - 1,
                    totalCount: result.totalCount,
                  });
                });
            })
          }
          localization={Localization}
        />
      )}

      <Dialog
        open={open}
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        //onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Lista de manuais escolares requisitados
        </DialogTitle>
        <DialogContent>
          {reason && (
            <div
              style={{
                marginBottom: '25px',
                border: '1px solid red',
                padding: '5px',
                borderRadius: '3px',
              }}
            >
              <h4>Observações</h4>
              <p>{reason}</p>
            </div>
          )}
          <MaterialTable
            title=" "
            localization={Localization}
            columns={[
              { title: 'Nome', field: 'name' },
              { title: 'ISBN', field: 'isbn' },
              {
                title: 'Capa',
                field: 'cover',
                render: (rowData) => (
                  <Button
                    disabled={rowData ? !rowData.cover : true}
                    onClick={() => openImg(rowData.cover)}
                  >
                    <ImageOutlined className="pointer" />
                  </Button>
                ),
              },
            ]}
            options={{
              search: false,
              sorting: false,
            }}
            data={(query) =>
              new Promise((resolve, reject) => {
                console.log('ID req::', reqId);
                let url = 'http://localhost:8085/requisitions/' + reqId;
                console.log('url::', url);
                fetch(url, {
                  headers: {
                    method: 'GET',
                    Authorization: 'Bearer ' + Cookies.get('token'),
                  },
                })
                  .then((response) => response.json())
                  .then((result) => {
                    resolve({
                      data: result.book_requisitions,
                      page: query.page,
                      totalCount: result.book_requisitions.length,
                    });
                  });
              })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Sair
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openPhoto}
        onClose={handleCloseIMG}
        TransitionComponent={Transition}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          Visualização da capa do livro
        </DialogTitle>
        <DialogContent>
          <img src={photo_photo} alt="capa do livro" />
        </DialogContent>
      </Dialog>
    </>
  );
}
