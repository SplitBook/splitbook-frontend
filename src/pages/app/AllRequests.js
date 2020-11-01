import React from 'react';
import MaterialTable from 'material-table';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import './AppStyles.css';
import Header from '../../Components/Header';
import Cookies from 'js-cookie';
import api from '../../services/api';
import ImageOutlined from '@material-ui/icons/ImageOutlined';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AllRequests() {
  const [state, setState] = React.useState({
    columns: [
      { title: 'Nº Aluno', field: 'student_number' },
      { title: 'Nome Aluno', field: 'student_name' },
      { title: 'EE', field: 'guardian_name' },
      { title: 'Turma', field: 'class' },
      { title: 'Ano letivo', field: 'school_year' },
      {
        title: 'Detalhes',
        field: 'listalivros',
        render: (rowData) => (
          <Button onClick={() => handleChange(rowData.id)}>Consultar</Button>
        ),
      },
    ],
  });
  const [obs, setObs] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [dataDeletedRow, setDataDeletedRow] = React.useState({});
  const [showWarning, setShowWarning] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [reqId, setReqId] = React.useState(0);
  const [openBookList, setOpenBookList] = React.useState(false);
  const handleChange = (value) => {
    console.log('req id', value);
    setReqId(value);
    setOpenBookList(true);
  };

  const handleClose = () => {
    setOpenBookList(false);
  };

  const handleClose1 = () => {
    setOpen(false);
  };

  const handleClose2 = (oldData) => {
    if (obs !== null && obs !== '') {
      setOpen(false);
      setState((prevState) => {
        DenyRequistion();
        const data = [...prevState.data];
        data.splice(data.indexOf(dataDeletedRow), 1);
        return { ...prevState, data };
      });
    } else {
      setShowWarning(true);
    }
  };

  const handleChangeObs = (event) => {
    setObs(event.target.value);
    console.log(event.target.value);
  };

  const handleCloseIMG = () => {
    setOpenPhoto(false);
  };

  async function EditRequisition(data) {
    //console.log(data)
    api.put('/requisitions/' + data.id, { state_id: 2 });
  }

  async function DenyRequistion() {
    api.put('/requisitions/' + dataDeletedRow.id, { state_id: 3, reason: obs });
  }

  const [photo_photo, setPhoto_photo] = React.useState('');
  const [openPhoto, setOpenPhoto] = React.useState(false);

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
      <Header title="Requisições por aprovar" />

      <MaterialTable
        title="Lista de Requisições"
        tableRef={tableRef}
        columns={state.columns}
        data={(query) =>
          new Promise((resolve, reject) => {
            let url =
              (process.env.REACT_APP_API_HOST || 'http://localhost:8085') +
              '/requisitions?current_school_year=true&state_id=1';
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
            icon: 'done',
            tooltip: 'Aceitar pedido',
            onClick: (event, rowData) =>
              EditRequisition(rowData) &&
              tableRef.current &&
              tableRef.current.onQueryChange(),
          },
          {
            icon: 'refresh',
            tooltip: 'Atualizar informação',
            isFreeAction: true,
            onClick: () => tableRef.current && tableRef.current.onQueryChange(),
          },
        ]}
        editable={{
          onRowDelete: (oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                setDataDeletedRow(oldData);
                setOpen(true);
                /*setState((prevState) => {
                                    const data = [...prevState.data];
                                    data.splice(data.indexOf(oldData), 1);
                                    return { ...prevState, data };
                                    });*/
              }, 600);
            }),
        }}
      />

      <div>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            Tem a certeza que pretende eliminar a requisição
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <br />
              <b>Encarregado de Educação:</b> {dataDeletedRow.guardian_name}
              <br />
              <b>Nome do Aluno:</b> {dataDeletedRow.student_name}
              <br />
              Esta ação necessita de uma justificação:
            </DialogContentText>
            <textarea
              value={obs}
              onChange={handleChangeObs}
              rows="10"
              cols="60"
            />
            {showWarning && (
              <p className="warnText">
                Por favor preencha o campo das observações
              </p>
            )}
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose1} color="primary">
              Cancelar
            </Button>
            <Button onClick={handleClose2} color="primary">
              Submeter
            </Button>
          </DialogActions>
        </Dialog>
      </div>

      <Dialog
        open={openBookList}
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
          <MaterialTable
            title=" "
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
                let url =
                  (process.env.REACT_APP_API_HOST || 'http://localhost:8085') +
                  '/requisitions/' +
                  reqId;
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

/*

onRowAdd: (newData) =>
new Promise((resolve) => {
      setTimeout(() => {
      resolve();
      setState((prevState) => {
      const data = [...prevState.data];
      data.push(newData);
      return { ...prevState, data };
      });
      }, 600);
}),

onRowUpdate: (newData, oldData) =>
new Promise((resolve) => {
      setTimeout(() => {
      resolve();
      if (oldData) {
      setState((prevState) => {
            const data = [...prevState.data];
            data[data.indexOf(oldData)] = newData;
            return { ...prevState, data };
      });
      }
      }, 600);
}),




      //'Português,Matemática A,Fisico-Quimica A,Inglês,Matemática'

onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          }),


                  onRowDelete: (oldData) =>
                  new Promise((resolve) => {
                        setTimeout(() => {
                        resolve();
                        setDataDeletedRow(oldData)
                        setOpen(true);
                        if(deleted)
                        setState((prevState) => {
                              const data = [...prevState.data];
                              data.splice(data.indexOf(oldData), 1);
                              return { ...prevState, data };
                        });
                        }, 600);
                  }),
            

*/
