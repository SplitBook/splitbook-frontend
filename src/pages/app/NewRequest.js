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
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
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
                        value={age}
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
        <TabelasLivros/>
        <Button variant="contained" color="primary">
            Efetura requesição
        </Button>
        </>
    );
    /*
        <Grid item xs={1}>
            <TextField id="outlined-basic" label="Ano" variant="outlined" />
        </Grid>
    */ 
}