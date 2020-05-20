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
import Cookies from 'universal-cookie';


function sleep(delay = 0) {
    return new Promise((resolve) => {
      setTimeout(resolve, delay);
    });
  }

export default function NovoRequisito(){
    const [filiado, setFiliado] = React.useState('');
    const [tmp, setTmp] = React.useState(0);

    const cookies = new Cookies();
    const [grupo,setGrupo] = React.useState(cookies.get('Grupo'));

    const handleChange = (event) => {
        setFiliado(event.target.value);
        if(event.target.value != null && event.target.value !== ''){
            setTmp(1)
        }
        else{
            setTmp(0)
        }
    };

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

        {
            grupo==='Encarregado de Educação' && 

            <Grid container spacing={2}>
                <Grid item>
                <FormControl variant="outlined" className="maxwidth">
                    <InputLabel htmlFor="outlined-age-native-simple" >Educando</InputLabel>
                        <Select
                            native
                            value={filiado}
                            onChange={handleChange}
                            label="Educando"
                            inputProps={{
                                name: 'NomeEducando',
                            }}
                            >
                            <option aria-label="None" value="" />
                            <option value={10}>Rafael Martins Santos Costa</option>
                            <option value={20}>Guilherme Martins de Sousa</option>
                        </Select>
                </FormControl>
                </Grid>
            </Grid>
        }

        {
            grupo!=='Encarregado de Educação' && 

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
            tmp>0 &&
            <>
                <TabelasLivros/>
            </>
        }
        
        </>
    );
    

}