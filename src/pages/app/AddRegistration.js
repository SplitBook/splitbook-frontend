import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Header from '../Components/Header';
import Search from '@material-ui/icons/Search';
import Tooltip from '@material-ui/core/Tooltip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import './AppStyles.css';
import api from '../../services/api';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import MenuItem from '@material-ui/core/MenuItem';



export default function AddRegistration(){
    const [guardian, setGuardian] = React.useState('');
    const [student, setstudent] = React.useState(null);
    const [classes, setClasses] = React.useState(null);


    //if(classeslist.length===0)
      //getClasses();


    async function getClasses(){
      const {data} = await api.get('/general-classes');
      setClasseslist(data);
    }

    const sleep = (milliseconds) => {
      return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    const [guardianList, setGuardianList] = React.useState([]);
    const [classeslist, setClasseslist] = React.useState([]);
    const [studentlist, setStudentList] = React.useState([]);

    const handlerAutoCompleteGuardians = (event) => {
      console.log(event.target.value)
      sleep(300);
      var tmp = "";
      tmp = event.target.value;
      if(tmp.length>2)
        getGuardians(tmp);
    };

    async function getGuardians(tmp){
      const {data} = await api.get('/guardians?search=',tmp);
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
      const {data} = await api.get('/students?search=',tmp);
      setStudentList(data.data);
      console.log(studentlist)
    }


    const handleChangeClass = (event) => {
      sleep(300);
      var tmp = "";
      tmp = event.target.value;
      if(tmp.length>2)
        getClass(tmp);
    };

    async function getClass(tmp){
      const {data} = await api.get('/students?search=',tmp);
      setClasseslist(data.data);
      console.log(classeslist)
    }

    return (
      <>
      <Header title='Criar matrícula'/>
      <div>
      
         
      <Autocomplete
        options={guardianList}
        getOptionLabel={(option) => option.name}
        style={{ width: 300, marginTop:15}}
        onChange={(event,newValue) => {
          console.log(newValue)
          setGuardian(newValue)
        }}
        renderInput={(params) => <TextField {...params} label="Enc. de Educação" onChange={handlerAutoCompleteGuardians} variant="outlined" />}
      />

      <Autocomplete
        options={studentlist}
        getOptionLabel={(option) => option.name}
        onChange={(event,newValue) => {
          //console.log(newValue)
          setstudent(newValue)
        }}
        style={{ width: 300 , marginTop:15}}
        renderInput={(params) => <TextField {...params} label="Aluno" onChange={handlerAutoCompleteStudents} variant="outlined" />}
      />

      
      
      <div className="margTop">
        <Button variant="outlined" color="primary">
          Criar matrícula
        </Button>
      </div>

      </div>
      </>
      );

}

//registration