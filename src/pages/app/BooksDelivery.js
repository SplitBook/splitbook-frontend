import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import BooksDeliveryTable from '../Components/BooksDeliveryTable'
import './AppStyles.css';
import TextField from '@material-ui/core/TextField';
import Search from '@material-ui/icons/Search';
import Tooltip from '@material-ui/core/Tooltip';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Header from '../Components/Header';


export default function BooksDelivery(){
    const [num, setNum] = React.useState(0);
    const [numAluno, setNumAluno] = React.useState(0);


    const changeNum = (event) => {
        setNum(event.target.value)
      };

    const [text, setText] = React.useState('');
    const changeNumAluno = (event) => {
        setNumAluno(num)
        console.log("Ei",numAluno)
        if(!(num>0)){
          setText('Please enter a valid number!')
          setOpen(true);
        }
      };

    //snacbar
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
      setOpen(true);
    };

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }

      setOpen(false);
    };
    //


    return (
      <>
        <Header title='Entrega de Livros'/>

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

        { numAluno>0 && <BooksDeliveryTable numeroAluno={numAluno}/> }

        <div>
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            open={open}
            autoHideDuration={5000}
            onClose={handleClose}
            message={text}
            action={
              <React.Fragment>
                <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              </React.Fragment>
            }
          />
        </div>

      </>
    );

}