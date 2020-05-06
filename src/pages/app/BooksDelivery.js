import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import BooksDeliveryANDReturnTable from '../Components/BooksDeliveryANDReturnTable'
import './AppStyles.css';
import TextField from '@material-ui/core/TextField';
import Search from '@material-ui/icons/Search';


export default function BooksDelivery(){
    const [obs, setObs] = React.useState('');
    const [num, setNum] = React.useState(0);
    const [numAluno, setNumAluno] = React.useState(0);


    const handleChange = (event) => {
        setObs(event.target.value)
        console.log("Observações: ",obs);
      };

    const changeNum = (event) => {
        setNum(event.target.value)
      };

    const changeNumAluno = (event) => {
        setNumAluno(num)
        console.log("Ei",numAluno)
      };


    return (
      <>
        <h2 className="marginTitle" >Entrega de Manuais</h2>

        <Grid container spacing={1}>
            <Grid item >
                <TextField id="outlined-basic" label="Nº Aluno" value={num} onChange={changeNum} variant="outlined" />
            </Grid>
            <Grid item >
                <Button className="btnPermissoes" onClick={changeNumAluno} color="primary" >
                    <Search/>
                </Button>
            </Grid>
        </Grid>

        { numAluno>0 && <BooksDeliveryANDReturnTable numeroAluno={numAluno}/> }

      </>
    );
}