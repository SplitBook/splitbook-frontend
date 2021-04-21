import React from 'react';
import Grid from '@material-ui/core/Grid';
import BooksReturnTable from '../../Components/Tables/BooksReturnTable';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Header from '../../Components/Header';
import Autocomplete from '@material-ui/lab/Autocomplete';
import api from '../../services/api';
import HighlightOff from '@material-ui/icons/HighlightOff';
import Button from '@material-ui/core/Button';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';

export default function BooksReturn() {
  const [requisitionId, setRequisitionId] = React.useState(0);
  const [text, setText] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [studentOfList, setStudentOfList] = React.useState();
  const [studentsList, setStudentsList] = React.useState([]);
  const [group, setGroup] = React.useState('');
  const [teacherclasses, setTeacherClasses] = React.useState('');

  if (group === '') {
    var token = Cookies.get('token');
    var decoded = jwt_decode(token);
    setGroup(decoded.charge);
    if (decoded.charge === 'Professor') {
      getTeacherClassId(decoded.profile_id);
    }
  }

  async function getTeacherClassId(id) {
    const { data } = await api.get('/teachers/' + id);
    console.log('getTeacherClassId', data);
    var tmp = [];
    tmp = data.classes;
    let txt = '';
    for (let i = 0; i < tmp.length; i++) {
      txt += tmp[i].class_id + ',';
      //setTeacherClasses([...teacherclasses, tmp[i].class_id]);
    }
    setTeacherClasses(txt);
  }

  const handlerAutoCompleteStudents = (event) => {
    console.log(event.target.value);
    var tmp;
    tmp = event.target.value;
    if (tmp.length > 2) getStudents(tmp);
  };

  async function getStudents(tmp) {
    console.log('/school-enrollments?search=' + tmp);
    const { data } = await api.get(
      '/school-enrollments?current_school_year=true&search=' + tmp
    );
    setStudentsList(data.data);
    console.log(studentsList);
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  async function submit(value) {
    if (value) {
      if (value.requisition_id === null) {
        setText(
          'Não é possivel entregar os manuais escolares, uma vez que não foi efetuada requisição'
        );
        setOpen(true);
      } else {
        try {
          console.log('value:', value.requisition_id);
          setStudentOfList(value);
          setRequisitionId(value.requisition_id);
        } catch (error) {
          alert(error);
        }
      }
    }
  }

  const handlerAutoCompleteTeachersStudents = (event) => {
    console.log(event.target.value);
    var tmp = '';
    tmp = event.target.value;
    if (tmp.length > 2) getTeachersStudents(tmp);
  };

  async function getTeachersStudents(tmp) {
    //console.log("IPE", teacherclasses);
    console.log(
      '/school-enrollments?current_school_year=true&class_id=' +
        teacherclasses +
        '&search=' +
        tmp
    );
    const { data } = await api.get(
      '/school-enrollments?current_school_year=true&class_id=' +
        teacherclasses +
        '&search=' +
        tmp
    );
    setStudentsList(data.data);
  }

  return (
    <>
      <Header title="Recolha de manuais escolares" />
      {group === 'Professor' ? (
        <Grid container spacing={2}>
          <Grid item>
            <Autocomplete
              options={studentsList}
              getOptionLabel={(option) =>
                option.student_name + ' - ' + option.student_number
              }
              style={{ width: 300 }}
              onChange={(event, newValue) => {
                submit(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Alunos"
                  onChange={handlerAutoCompleteTeachersStudents}
                  variant="outlined"
                />
              )}
            />
          </Grid>
          <Grid item>
            <Button
              color="primary"
              style={{ padding: 15 }}
              onClick={() => setRequisitionId(0)}
            >
              <HighlightOff />
            </Button>
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={2}>
          <Grid item>
            <Autocomplete
              options={studentsList}
              getOptionLabel={(option) =>
                option.student_name + ' - ' + option.student_number
              }
              style={{ width: 300 }}
              onChange={(event, newValue) => {
                submit(newValue);
                console.log(newValue);
              }}
              disabled={requisitionId > 0}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Alunos"
                  onChange={handlerAutoCompleteStudents}
                  variant="outlined"
                />
              )}
            />
          </Grid>
          <Grid item>
            <Button
              color="primary"
              style={{ padding: 15 }}
              onClick={() => setRequisitionId(0)}
            >
              <HighlightOff />
            </Button>
          </Grid>
        </Grid>
      )}

      {requisitionId > 0 && (
        <BooksReturnTable
          requisitionId={requisitionId}
          stdnumber={studentOfList.student_number}
          guardianName={studentOfList.guardian_name}
        />
      )}

      <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={open}
          autoHideDuration={5000}
          onClose={handleClose}
          message={text}
          action={
            <React.Fragment>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </React.Fragment>
          }
        />
      </div>
    </>
  );
}
