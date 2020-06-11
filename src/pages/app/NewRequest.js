import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import './AppStyles.css'

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
    const [numAluno, setNumAluno] = React.useState(0);
    const [group,setGroup] = React.useState('');
    const [profileId,setProfileId] = React.useState(0);
    const [students,setStudents] = React.useState([]);
    

    if(group===''){
        var token = Cookies.get('token');
        var decoded = jwt_decode(token);
        setGroup(decoded.charge)
        setProfileId(decoded.profile_id);
        console.log("decoded",decoded)
        if(group==='Encarregado de Educação')
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
            onChange={handleChange}
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
        setAluno(event.target.value);
        if(event.target.value != null && event.target.value !== ''){
            getClassId(event.target.value);
        }
        else{
            setNumAluno(0)
        }
    };

    async function getClassId(student_id){
        console.log('student_id: ',student_id)
        const {data} = await api.get('/school-enrollments/'+student_id)
        getStudentBooks(data.class_id)
    }

    async function getStudentBooks(class_id){
        console.log("Class id: ",class_id)
        const {data} = await api.get('/resumes/adopted-books?class_id='+class_id)
        console.log('Lista de Livros::: ',data)
    }

    function efetuarRequisicao(){
        console.log();
    }

    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const loading = open && options.length === 0;

    React.useEffect(() => {
        let active = true;

        if (!loading) {
        return undefined;
        }

        (async () => {
        const response = await fetch('https://country.register.gov.uk/records.json?page-size=5000');
        await sleep(1e3); // For demo purposes.
        const countries = await response.json();

        if (active) {
            setOptions(Object.keys(countries).map((key) => countries[key].item[0]));
        }
        })();

        return () => {
            active = false;
            };
    }, [loading]);

    React.useEffect(() => {
        if (!open) {
        setOptions([]);
        }
    }, [open]);

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
            group!=='Encarregado de Educação' && 

            <Grid container spacing={2}>
                <Grid item>
                <Autocomplete
                    id="asynchronous-demo"
                    style={{ width: 300 }}
                    open={open}
                    onOpen={() => {
                        setOpen(true);
                    }}
                    onClose={() => {
                        setOpen(false);
                    }}
                    onChange={handleChange}
                    getOptionSelected={(option, value) => option.name === value.name}
                    getOptionLabel={(option) => option.name}
                    options={options}
                    loading={loading}
                    renderInput={(params) => (
                        <TextField
                        {...params}
                        label="Aluno"
                        variant="outlined"
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                            <React.Fragment>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                            ),
                        }}
                        />
                    )}
                />
                </Grid>
            </Grid>
        }
        {
            numAluno>0 &&
            <>
                <TabelasLivros/>
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