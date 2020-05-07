import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import BooksDeliveryANDReturnTable from '../Components/BooksDeliveryANDReturnTable'
import TextField from '@material-ui/core/TextField';
import Search from '@material-ui/icons/Search';
import Tooltip from '@material-ui/core/Tooltip';


export default function BooksReturn(){
    const [num, setNum] = React.useState(0);
    const [numAluno, setNumAluno] = React.useState(0);

    const changeNum = (event) => {
        setNum(event.target.value)
      };

    const changeNumAluno = (event) => {
        setNumAluno(num)
        console.log("Ei",numAluno)
      };

  
    return (
      <>
        <h2 className="marginTitle" >Recolha de Manuais</h2>
        <Grid container spacing={2}>
            <Grid item >
                <TextField id="outlined-basic" label="Nº Aluno" value={num} onChange={changeNum} variant="outlined" />
            </Grid>
            <Grid item >
                <Tooltip title="Procurar">
                  <Button className="btnMargin" onClick={changeNumAluno} color="primary" >
                      <Search/>
                  </Button>
                </Tooltip>
            </Grid>
        </Grid>

        { numAluno>0 && <BooksDeliveryANDReturnTable/> }
        
      </>
    );
}