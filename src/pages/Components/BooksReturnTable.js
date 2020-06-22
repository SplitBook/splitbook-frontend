import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles,useTheme } from '@material-ui/core/styles';
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
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import IconButton from '@material-ui/core/IconButton';


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

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};


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
    setRows(data.book_requisitions)
    console.log("data: ",data);
  }


  const handleChangeObs = (event) => {
    setObs(event.target.value)
    console.log(event.target.value)
  };

  function Submit(){
    console.log(rows);
    //api.post('/physical-books/returns',booksListWithState);
  }

  
  async function getBooksStates(){
    const {data} = await api.get('/book-states')
    console.log("bookStates List: ",data)
    setBooksStates(data);     
}

function SelectBooksStates({rowId,rowbookstate}) {
  console.log('Dureex:',rowbookstate)
  const [statebook,setStatebook] = React.useState('');
  const listItems = bookStates.map((state) =>
  <option value={state.id}>{state.state}</option>
  );
  return (
      <Select
      native
      value={rowbookstate}
      onChange={(e) => handleChange(e.target.value,rowId) && setStatebook(Number(e.target.value))}
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
  console.log('event:',Number(event),rowId)
  for(let k=0;k<rows.length;k++){
    if(rows[k].id === rowId){
      rows[k].bookstate = Number(event)
    }
  }
  setState(event);
  /*if(Number(event)===0){
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
  console.log(booksListWithState);*/
};

const [page, setPage] = React.useState(0);
const [rowsPerPage, setRowsPerPage] = React.useState(5);

const handleChangePage = (event, newPage) => {
  setPage(newPage);
};

const handleChangeRowsPerPage = (event) => {
  setRowsPerPage(parseInt(event.target.value, 10));
  setPage(0);
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
              {(rowsPerPage > 0
                  ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  : rows
                ).map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="right">{row.physical_book_id}</TableCell>
                  <TableCell align="right">{row.isbn}</TableCell>
                  <TableCell align="right">
                    <SelectBooksStates rowId={row.id} rowbookstate={row.bookstate}/>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                  colSpan={3}
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: { 'aria-label': 'rows per page' },
                    native: true,
                  }}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
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