import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import api from '../../services/api';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));


export default function BooksDeliveryANDReturnTable({requisitionId,stdnumber,guardianName}) {
  const [obs, setObs] = React.useState('');
  const classes = useStyles();
  const [rows, setRows] = React.useState([]);
  var [booksListWithState, setBooksListWithState] = React.useState([]);
  const [state, setState] = React.useState('');
  const [bookStates,setBooksStates] = React.useState([]);
  
  if(bookStates.length===0){
    getBooksStates();
  }
  
 
  var bool = true
  if(rows.length===0 && bool)
    getBookRequisitions()

  async function getBookRequisitions(){
    bool=false
    const {data} = await api.get('/requisitions/'+requisitionId)
    setRows(data.reports[0].deliveries)
    console.log("data: ",data);
  }


  const handleChangeObs = (event) => {
    setObs(event.target.value)
    console.log(event.target.value)
  };

  function Submit(){
    console.log(booksListWithState);
    api.post('/physical-books/returns',booksListWithState);
  }

  
  async function getBooksStates(){
    const {data} = await api.get('/book-states')
    console.log("bookStates List: ",data)
    setBooksStates(data);     
}

function SelectBooksStates({rowId}) {
  const listItems = bookStates.map((state) =>
  <option value={state.id}>{state.state}</option>
  );
  return (
      <Select
      native
      value={state}
      onChange={(e) => handleChange(e.target.value,rowId)}
      label="Estado"
      inputProps={{
          name: 'Estado do livro',
      }}
      className="btn"
      >
      <option aria-label="None" value={''}/> 
      {listItems}
      </Select>
  );
}



const handleChange = (event,rowId) => {
  console.log('event:',Number(event))
  setState(event);
  if(Number(event)===0){
    var tmp = [];
    for(var i=0;i<booksListWithState.length;i++){
      if(booksListWithState[i].id !== rowId){
        tmp.push({id:rowId,book_state_id:Number(event)});
      }
    }
    booksListWithState = tmp;
  }
  else{
    let ok = true
    for(let i=0;i<booksListWithState.length;i++){
      if(booksListWithState[i].id === rowId){
        ok=false;
      }
    }
    if(ok){
      booksListWithState.push({id:rowId,book_state_id:Number(event)})
    }
  }
  console.log(booksListWithState);
};

 
  return (
    <>
    <Grid container spacing={2}>
      
      <Grid item >
        <TextField variant="outlined" defaultValue={guardianName} helperText="Encarregado de Educação" disabled/>
      </Grid>
    </Grid>
    <Grid container spacing={2}>
        <Grid item>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID Entrega</TableCell>
                <TableCell align="right">ID livro físico</TableCell>
                <TableCell align="right">ISBN</TableCell>
                <TableCell align="right">Estado</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="right">{row.physical_book_id}</TableCell>
                  <TableCell align="right">{row.book_isbn}</TableCell>
                  <TableCell align="right">
                    <SelectBooksStates rowId={row.id}/>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </Grid>
        <Grid item xs={1}>
            <h3><b>Observações:</b></h3>
            <textarea value={obs} onChange={handleChangeObs} rows="15" cols="40"/>
            <Button className="btnMargin" variant="outlined" color="primary" onClick={Submit}>
            Submeter
            </Button>
        </Grid>
    </Grid>
    
    </>
  );
}


/*
<Grid item >
   <TextField variant="outlined" defaultValue={stdnumber} helperText="Nº de Aluno" disabled/>
</Grid>
*/