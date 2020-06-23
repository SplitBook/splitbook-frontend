import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Header from '../Components/Header';
import Autocomplete from '@material-ui/lab/Autocomplete';
import './AppStyles.css';
import api from '../../services/api';




export default function AddRegistration(){
    const [guardian, setGuardian] = React.useState(null);
    const [student, setstudent] = React.useState(null);
    const [classes, setClasses] = React.useState(null);
    const [guardianList, setGuardianList] = React.useState([]);
    const [classeslist, setClasseslist] = React.useState([]);
    const [studentlist, setStudentList] = React.useState([]);
    var num = 0;

    if(classeslist.length===0 && num===0)
      getClasses();

    async function getClasses(){
      num=1
      const {data} = await api.get('/classes?current_school_year=true');
      setClasseslist(data.data);
    }

    const sleep = (milliseconds) => {
      return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    const handlerAutoCompleteGuardians = (event) => {
      console.log(event.target.value)
      sleep(300);
      var tmp = "";
      tmp = event.target.value;
      if(tmp.length>2)
        getGuardians(tmp);
    };

    async function getGuardians(tmp){
      const {data} = await api.get('/guardians?search='+tmp);
      setGuardianList(data.data);
      console.log(guardianList)
    }

    const handlerAutoCompleteStudents = (event) => {
      sleep(300);
      var tmp = "";
      tmp = event.target.value;
      if(tmp.length>2)
        getStudents(tmp);
    };

    async function getStudents(tmp){
      const {data} = await api.get('/students?search='+tmp);
      setStudentList(data.data);
      console.log(studentlist)
    }

    async function submit(){
      //console.log(guardian,student,classes)
      console.log(guardian.id,student.id,classes.class_id)
      const {data} = await api.post('/school-enrollments',{guardian_id:guardian.id,student_id:student.id,class_id:classes.class_id});
      setClasses(null)
      setGuardian(null)
      setstudent(null)
    }

    return (
      <>
      <Header title='Criar matrícula'/>
      <div>
      
         
      <Autocomplete
        options={guardianList}
        getOptionLabel={(option) => option.name+' - '+option.email}
        style={{ width: 300, marginTop:15}}
        onChange={(event,newValue) => {
          console.log(newValue)
          setGuardian(newValue)
        }}
        renderInput={(params) => <TextField {...params} label="Enc. de Educação" onChange={handlerAutoCompleteGuardians} variant="outlined" />}
      />

      <Autocomplete
        options={studentlist}
        getOptionLabel={(option) => option.name+' - '+option.number}
        onChange={(event,newValue) => {
          //console.log(newValue)
          setstudent(newValue)
        }}
        style={{ width: 300 , marginTop:15}}
        renderInput={(params) => <TextField {...params} label="Aluno" onChange={handlerAutoCompleteStudents} variant="outlined" />}
      />

      <Autocomplete
        options={classeslist}
        getOptionLabel={(option) => option.class}
        onChange={(event,newValue) => {
          //console.log(newValue)
          setClasses(newValue)
        }}
        style={{ width: 300 , marginTop:15}}
        renderInput={(params) => <TextField {...params} label="Turma" variant="outlined" />}
      />

      <div className="margTop">
        <Button variant="outlined" color="primary" onClick={submit} disabled={(classes===null || guardian===null || student===null)? true:false}>
          Criar matrícula
        </Button>
      </div>

      </div>
      </>
      );

}

//registration