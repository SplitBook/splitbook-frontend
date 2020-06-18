import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import BooksDeliveryTable from '../Components/BooksDeliveryTable'
import './AppStyles.css';
import TextField from '@material-ui/core/TextField';
import Header from '../Components/Header';
import Autocomplete from '@material-ui/lab/Autocomplete';
import api from '../../services/api';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

export default function BooksDelivery(){
    const [num, setNum] = React.useState(0);
    const [requisitionId, setRequisitionId] = React.useState(0);
    const [text, setText] = React.useState('');
    const [open, setOpen] = React.useState(false);

    const changeNum = (event) => {
        setNum(event.target.value)
      };

    

    async function submit(value){
      console.log(value.requisition_id);
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

    //snacbar
    const [studentOfList,setStudentOfList] = React.useState();
    

    const [studentsList,setStudentsList] = React.useState([]);
    const handlerAutoCompleteStudents = (event) => {
      console.log(event.target.value)
      var tmp;
      tmp = event.target.value;
      if(tmp.length>3)
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


    return (
      <>
        <Header title='Entrega de Livros'/>
        <Grid container spacing={2}>
            <Grid item>
              <Autocomplete
                  options={studentsList}
                  getOptionLabel={(option) => option.student_name}
                  style={{ width: 300}}
                  onChange={(event,newValue) => {
                    submit(newValue)
                    console.log(newValue)
                  }}
                  disabled={requisitionId>0}
                  renderInput={(params) => <TextField {...params} label="Alunos" onChange={handlerAutoCompleteStudents} variant="outlined" />}
              />
            </Grid>
        </Grid>

        { requisitionId>0 && <BooksDeliveryTable requisitionId={requisitionId} stdnumber={studentOfList.student_number} guardianName={studentOfList.guardian_name}/> }
        
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