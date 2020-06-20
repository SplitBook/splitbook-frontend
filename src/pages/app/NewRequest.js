import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import './AppStyles.css'
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TabelasLivros from '../Components/TabelasLivrosRequisicao';

import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import fetch from 'cross-fetch';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import Header from '../Components/Header';
import api from '../../services/api';


function sleep(delay = 0) {
    return new Promise((resolve) => {
      setTimeout(resolve, delay);
    });
  }

export default function NovoRequisito(){
    const [aluno, setAluno] = React.useState('');
    const [group,setGroup] = React.useState('');
    const [profileId,setProfileId] = React.useState(0);
    const [students,setStudents] = React.useState([]);
    const [books,setBooks] = React.useState([]);
    const [schoolEnrollmentsID,setSchoolEnrollmentsID] = React.useState(null);
    



    if(group===''){
        var token = Cookies.get('token');
        var decoded = jwt_decode(token);
        setGroup(decoded.charge)
        setProfileId(decoded.profile_id);
        //console.log("decoded",decoded)
        if(decoded.charge==='Encarregado de Educação')
            getStudents(decoded.profile_id);
    }

    async function getStudents(profile_id){
        const {data} = await api.get('/guardians/'+profile_id)
        console.log("Students List: ",data)
        setStudents(data.students);     
    }

    function SelectStudents() {
        const listItems = students.map((student) =>
        <option value={student.id}>{student.name}</option>
        );
        return (
            <Select
            native
            value={aluno}
            onChange={(e) => handleChange(e.target.value)}
            label="Educando"
            inputProps={{
                name: 'NomeEducando',
            }}
            className="btn"
            >
            <option aria-label="None" value="" />
            {listItems}
            </Select>
        );
  }

    const handleChange = (event) => {
        setAluno(event);
        if(event != null && event !== ''){
            getClassId(event);
        }
    };

    async function getClassId(student_id){
        console.log('student_id: ',student_id)
        const {data} = await api.get('/school-enrollments/'+student_id)
        setSchoolEnrollmentsID(data.id)
        getStudentBooks(data.class_id)
    }

    async function getStudentBooks(class_id){
        const {data} = await api.get('/resumes/adopted-books?class_id='+class_id)
        setBooks(data)        
        //console.log('Lista de Livros::: ',books)
    }

    const [studentOfList,setStudentOfList] = React.useState(null);
    const [studentsList,setStudentsList] = React.useState([]);

    const handlerAutoCompleteAllStudents = (event) => {
        console.log(event.target.value)
        var tmp = "";
        tmp = event.target.value;
        if(tmp.length>3)
          getAllStudents(tmp);
      };
  
      async function getAllStudents(tmp){
        const {data} = await api.get('/school-enrollments?search='+tmp);
        setStudentsList(data.data);
        console.log(studentsList)
      }

      const handlerAutoCompleteTeachersStudents = (event) => {
        console.log(event.target.value)
        var tmp = "";
        tmp = event.target.value;
        if(tmp.length>3)
            getTeachersStudents(tmp);
      };

      async function getTeachersStudents(tmp){
        //const {data} = await api.get('/school-enrollments?search='+tmp);
        //setStudentsList(data.data);
        //console.log(studentsList)
        alert('Á espera de saber como ir buscar a lista de alunos da turma do prof logado!');
      }

    return (
        <>
        <Header title='Nova requisição'/>

        {
            group==='Encarregado de Educação' && 

            <Grid container spacing={2}>
                <Grid item>
                <FormControl variant="outlined" className="maxwidth">
                    <InputLabel htmlFor="outlined-age-native-simple" >Educando</InputLabel>
                        <SelectStudents/>
                </FormControl>
                </Grid>
            </Grid>
        }
        {
            group==='Professor' && 

            <Grid container spacing={2}>
                <Grid item>
                <Autocomplete
                    options={studentsList}
                    getOptionLabel={(option) => option.student_name+' - '+option.student_number}
                    style={{ width: 300}}
                    onChange={(event,newValue) => {
                    console.log(event,'ola',newValue)
                    //setStudentOfList(newValue)
                    }}
                    renderInput={(params) => <TextField {...params} label="Alunos" onChange={handlerAutoCompleteTeachersStudents} variant="outlined" />}
                />
                </Grid>
            </Grid>
        }
        {
            (group==='Docente' || group==='Administrador') && 

            <Grid container spacing={2}>
                <Grid item>
                <Autocomplete
                    options={studentsList}
                    getOptionLabel={(option) => option.student_name+' - '+option.student_number}
                    style={{ width: 300}}
                    onChange={(event,newValue) => {
                    //console.log(event,'ola',newValue)
                    handleChange(newValue.id)
                    //setStudentOfList(newValue)
                    }}
                    renderInput={(params) => <TextField {...params} label="Alunos" onChange={handlerAutoCompleteAllStudents} variant="outlined" />}
                />
                </Grid>
            </Grid>
        }
        {
            books.length>0 &&
            <>
                <TabelasLivros books={books} schoolEnrollmentsID={schoolEnrollmentsID}/>
            </>
        }
        
        </>
    );
    

}

/*

        <Grid container spacing={2}>
            <Grid item >
                <TextField
                    className="maxwidth"
                    label="Encarregado de Educação"
                    defaultValue="Rogério Nuno Santos Costa"
                    InputProps={{
                        readOnly: true,
                    }}
                    variant="outlined"
                    disabled
                />            
            </Grid>
            <Grid item>
                <TextField
                    label="Contacto"
                    defaultValue="939348447"
                    InputProps={{
                        readOnly: true,
                    }}
                    variant="outlined"
                    disabled
                />       
            </Grid>
        </Grid>

*/