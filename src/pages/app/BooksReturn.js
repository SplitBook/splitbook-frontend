import React from 'react';
import Grid from '@material-ui/core/Grid';
import BooksReturnTable from '../Components/BooksReturnTable'
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Header from '../Components/Header';
import Autocomplete from '@material-ui/lab/Autocomplete';
import api from '../../services/api';
import HighlightOff from '@material-ui/icons/HighlightOff';
import Button from '@material-ui/core/Button';


export default function BooksReturn(){

    const [requisitionId, setRequisitionId] = React.useState(0);
    const [text, setText] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [studentOfList,setStudentOfList] = React.useState();
    const [studentsList,setStudentsList] = React.useState([]);

    const handlerAutoCompleteStudents = (event) => {
      console.log(event.target.value)
      var tmp;
      tmp = event.target.value;
      if(tmp.length>2)
          getStudents(tmp);
    };

    async function getStudents(tmp){
      console.log('/school-enrollments?search='+tmp)
      const {data} = await api.get('/school-enrollments?search='+tmp);
      setStudentsList(data.data);
      console.log(studentsList)
    }


    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }

      setOpen(false);
    };

    async function submit(value){
      if(value){
        if(value.requisition_id===null){
          setText('Não é possivel entregar livros, uma vez que não foi efetuada requisição')
          setOpen(true)
        }
        else{
          try{
            console.log('value:',value.requisition_id)
            setStudentOfList(value)
            setRequisitionId(value.requisition_id)
          }
          catch(error){
            alert(error)
          }
        }
      }
    }
    

    return (
      <>
        <Header title='Recolha de Livros'/>
        <Grid container spacing={2}>
            <Grid item>
              <Autocomplete
                  options={studentsList}
                  getOptionLabel={(option) => option.student_name+' - '+option.student_number}
                  style={{ width: 300}}
                  onChange={(event,newValue) => {
                    submit(newValue)
                    console.log(newValue)
                  }}
                  disabled={requisitionId>0}
                  renderInput={(params) => <TextField {...params} label="Alunos" onChange={handlerAutoCompleteStudents} variant="outlined" />}
              />
            </Grid>
            <Grid item>
              <Button color="primary" style={{padding:15}} onClick={() => setRequisitionId(0)}>
                <HighlightOff/>
              </Button>
            </Grid>
        </Grid>

        { requisitionId>0 && <BooksReturnTable requisitionId={requisitionId} stdnumber={studentOfList.student_number} guardianName={studentOfList.guardian_name}/> }

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
                <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              </React.Fragment>
            }
          />
        </div>
        
      </>
    );
}