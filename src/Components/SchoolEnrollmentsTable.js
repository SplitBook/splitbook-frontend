import React from 'react';
import MaterialTable from 'material-table';
import api from '../services/api';
import './ComponentsStyles.css';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import Button from '@material-ui/core/Button';
import Edit from '@material-ui/icons/Edit';
import Info from '@material-ui/icons/Info';
import DialogContentText from '@material-ui/core/DialogContentText';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useHistory } from 'react-router-dom';

export default function SchoolEnrollmentsTable() {
  const [bool, setBool] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const token = Cookies.get('token');
  var decoded = jwt_decode(token);
  const history = useHistory();
  const [state, setState] = React.useState({
    columns: [
      { title: 'Nome E.E', field: 'guardian_name' },
      { title: 'Ano escolar', field: 'school_year' },
      { title: 'Nome aluno', field: 'student_name' },
      { title: 'Nº Aluno', field: 'student_number' },
      { title: 'Turma', field: 'class' },
      {
        title: 'Alterar turma',
        render: (rowData) => (
          <Button onClick={() => changeClass(rowData.id)}>
            <Edit />
          </Button>
        ),
      },
      {
        //<Route path="/app/schoolenrollments/:id" component={Details}/>
        title: 'Detalhes',
        render: (rowData) => (
          <Button
            onClick={() => history.push('/app/schoolenrollments/' + rowData.id)}
          >
            <Info />
          </Button>
        ),
      },
    ],
    data: [],
  });

  const [schoolEnrollmentsID, setSchoolEnrollmentsID] = React.useState(0);
  const changeClass = (value) => {
    setOpen(true);
    setSchoolEnrollmentsID(value);
  };

  function deleteClasses(id) {
    api.delete('/school-enrollments/' + id);
  }

  const handleClose = () => {
    setOpen(false);
  };

  function SubmitNewStudentClass() {
    //console.log(classes,schoolEnrollmentsID)
    api.put('/school-enrollments/' + schoolEnrollmentsID, {
      class_id: classes.class_id,
    });
    setOpen(false);
  }

  const [classes, setClasses] = React.useState(null);
  const [classeslist, setClasseslist] = React.useState([]);

  if (bool) getClasses();

  async function getClasses() {
    setBool(false);
    const { data } = await api.get('/classes?current_school_year=true');
    setClasseslist(data.data);
  }

  const tableRef = React.createRef();

  if (decoded.charge === 'Administrador')
    return (
      <>
        <MaterialTable
          title=" "
          tableRef={tableRef}
          columns={state.columns}
          data={(query) =>
            new Promise((resolve, reject) => {
              let url = 'http://localhost:8085/school-enrollments';
              url += '?limit=' + query.pageSize;
              url += '&current_school_year=true';
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
          editable={{
            onRowDelete: (oldData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  setState((prevState) => {
                    deleteClasses(oldData.id);
                    const data = [...prevState.data];
                    data.splice(data.indexOf(oldData), 1);
                    return { ...prevState, data };
                  });
                }, 600);
              }),
          }}
        />

        <div>
          <Dialog
            open={open}
            //onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              Alteração de Turma
            </DialogTitle>
            <DialogContent>
              {/* <h3>ID: {schoolEnrollmentsID}</h3> */}
              <Autocomplete
                options={classeslist}
                getOptionLabel={(option) => option.class}
                onChange={(event, newValue) => {
                  //console.log(newValue)
                  setClasses(newValue);
                }}
                style={{ width: 300, marginTop: 15 }}
                renderInput={(params) => (
                  <TextField {...params} label="Turma" variant="outlined" />
                )}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancelar
              </Button>
              <Button
                onClick={SubmitNewStudentClass}
                color="primary"
                disabled={!classes}
              >
                Confirmar
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </>
    );
  else
    return (
      <>
        <MaterialTable
          title=" "
          columns={state.columns}
          data={(query) =>
            new Promise((resolve, reject) => {
              let url = 'http://localhost:8085/school-enrollments';
              url += '?limit=' + query.pageSize;
              url += '&page=' + (query.page + 1);
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
        />

        <div>
          <Dialog
            open={open}
            //onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              Alteração de Turma
            </DialogTitle>
            <DialogContent>
              <h3>ID: {schoolEnrollmentsID}</h3>
              <Autocomplete
                options={classeslist}
                getOptionLabel={(option) => option.class}
                onChange={(event, newValue) => {
                  //console.log(newValue)
                  setClasses(newValue);
                }}
                style={{ width: 300, marginTop: 15 }}
                renderInput={(params) => (
                  <TextField {...params} label="Turma" variant="outlined" />
                )}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancelar
              </Button>
              <Button
                onClick={SubmitNewStudentClass}
                color="primary"
                disabled={!classes}
              >
                Confirmar
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </>
    );
}

/*


*/
