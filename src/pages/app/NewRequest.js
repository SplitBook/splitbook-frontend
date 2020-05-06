import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import './AppStyles.css'

import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import TabelasLivros from '../Components/TabelasLivrosRequisicao';



export default function NovoRequisito(){
    const [filiado, setFiliado] = React.useState('');
    const [tmp, setTmp] = React.useState(0);

    const handleChange = (event) => {
        setFiliado(event.target.value);
        if(event.target.value != null && event.target.value !== ''){
            setTmp(1)
        }
        else{
            setTmp(0)
        }
      };

    return (
        <>
        <Grid container spacing={2}>
            <Grid item xs={3}>
                <TextField
                    className="maxwidth"
                    label="Encarregado de Educação"
                    defaultValue="Rogério Nuno Santos Costa"
                    InputProps={{
                        readOnly: true,
                    }}
                    variant="outlined"
                />            
            </Grid>
            <Grid item xs={2}>
                <TextField
                    label="Contacto"
                    defaultValue="939348447"
                    InputProps={{
                        readOnly: true,
                    }}
                    variant="outlined"
                />       
            </Grid>
        </Grid>

        <Grid container spacing={2}>
            <Grid item xs={3}>
            <FormControl variant="outlined" className="maxwidth">
                <InputLabel htmlFor="outlined-age-native-simple" >Educando</InputLabel>
                    <Select
                        native
                        value={filiado}
                        onChange={handleChange}
                        label="Educando"
                        inputProps={{
                            name: 'NomeEducando',
                            id: 'outlined-age-native-simple',
                        }}
                        >
                        <option aria-label="None" value="" />
                        <option value={10}>Rafael Martins Santos Costa</option>
                        <option value={20}>Guilherme Martins de Sousa</option>
                    </Select>
            </FormControl>
            </Grid>
            
        </Grid>

        {
            tmp>0 &&
            <>
                <TabelasLivros/>
                <Button variant="contained" color="primary">
                    Efetuar requisição
                </Button>
            </>
        }
        
        </>
    );
    /*
        <Grid item xs={1}>
            <TextField id="outlined-basic" label="Ano" variant="outlined" />
        </Grid>
    */ 
}