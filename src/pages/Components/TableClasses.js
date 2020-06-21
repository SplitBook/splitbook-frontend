import React from 'react';
import MaterialTable from 'material-table';
import api from '../../services/api';
import Button from '@material-ui/core/Button';
import AddBox from '@material-ui/icons/AddBox';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import './ComponentsStyles.css';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';



export default function TableClasses() {
  const [bool, setBool] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState({
    columns: [
      { title: 'Nome Turma', field: 'class' },
      { title: 'criar turma',render: rowData => (     
        <>
            <AddBox onClick={() => createClass(rowData.id,rowData.class)} className="pointer"/>
        </>
      )},
    ],
    data: [],
  });

  const [classId, setClassId] = React.useState(0);
  const [class_name, setClassName] = React.useState('');

  function createClass(id,className){
    setClassId(id)
    setClassName(className)
    setOpen(true)
  }


  if(bool)
  getGeneralClasses();

  async function getGeneralClasses(){
    setBool(false)
    const {data} = await api.get('/general-classes');
    console.log(data);
    state.data=data;
  }

  async function deleteGeneralClasses(id){
    const {data} = await api.delete('/general-classe/'+id);
    console.log(data);
  }

  async function addGeneralClasses(classname){
    const {data} = await api.post('/general-classe',{class:classname});
    console.log(data);
  }

  async function EditGeneralClasses(classname,id){
    const {data} = await api.post('/general-classe/'+id,{class:classname,active:false});
    console.log(data);
  }

  function handleClose(){
    setOpen(false);
  };

  const [teacher, setTeacher] = React.useState(null);
  const [teacherlist, setTeacherlist] = React.useState([]);

  async function submitClass(){
    //console.log(classId,teacher.id)
    api.post('/classes',{class_id:classId,head_class_id:teacher.id})
    setOpen(false)
  }


  const handlerAutoCompleteTeachers = (event) => {
    console.log(event.target.value)
    var tmp = "";
    tmp = event.target.value;
    if(tmp.length>2)
      getTeachers(tmp);
  };

  async function getTeachers(tmp){
    const {data} = await api.get('/teachers?search='+tmp);
    setTeacherlist(data.data);
    console.log(teacherlist)
  }


  return (
    <>
    <MaterialTable
      title=" "
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                console.log("Data:",newData)
                addGeneralClasses(newData.class);
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
                  EditGeneralClasses(newData.class,oldData.id)
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
            }, 600);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                deleteGeneralClasses(oldData.id)
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          }),
      }}
    />
    <Dialog
        open={open}
        //onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Criar Turma ({class_name})</DialogTitle>
        <DialogContent>
          <div>

          <Autocomplete
            options={teacherlist}
            getOptionLabel={(option) => option.name+' - '+option.email}
            style={{ width: 300, marginTop:15}}
            onChange={(event,newValue) => {
              console.log(newValue)
              setTeacher(newValue)
            }}
            renderInput={(params) => <TextField {...params} label="Professor" onChange={handlerAutoCompleteTeachers} variant="outlined" />}
          />


        </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button  color="primary" onClick={submitClass} disabled={!teacher}>
            Continuar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
