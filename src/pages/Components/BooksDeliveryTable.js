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
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import api from '../../services/api';
import TextField from '@material-ui/core/TextField';
import MaterialTable from 'material-table';
import Cookies from 'js-cookie';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

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
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
}));

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));


var selectedPhysicalBooks = [];

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const [numberOfRows, setNumberOfRows] = React.useState(0);

  function SelectionChange(rows,id,event){
    console.log(rows,'::',event)
    setNumberOfRows(rows.length)
    console.info(id)
    if(rows.length===1){
      console.log('Rows: ',rows)
      if(rows.length>1){
        var num=0
        for(let i=0;i<rows.length;i++){
          if(rows[0].isbn===rows[i].isbn)
            num+=1
        }
        if(num===1){
          verifyList(rows[0],id)
        }
      }
      else{
        verifyList(rows[0],id)
      }
    }
    else if(rows.length!==1){
      var tmp = []
      for(let i=0;i<selectedPhysicalBooks.length;i++){
        if(selectedPhysicalBooks[i].book_requisition_id!==id){
          tmp.push(selectedPhysicalBooks[i])
        }
      }
      selectedPhysicalBooks=tmp
      console.log(tmp,'Done',selectedPhysicalBooks)      
    }
    
  }

  function verifyList(row,id){
    console.log('Row:',row)
    var bool=true
    for(var i=0;i<selectedPhysicalBooks.length;i++){
      if(row.isbn === selectedPhysicalBooks[i].isbn){
        bool=false
        selectedPhysicalBooks[i]={book_requisition_id:id,physical_book_id:row.id,book_state_id:row.state_id}
        break;
      }
    }
    if(bool){
      row.book_requisition_id=id
      //row
      selectedPhysicalBooks.push({book_requisition_id:id,physical_book_id:row.id,book_state_id:row.state_id})
      console.log(selectedPhysicalBooks)
    }
  }


  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.isbn}
        </TableCell>
        <TableCell align="right">{row.name}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Manuais disponiveis:
              </Typography>
              <MaterialTable
                title=" "
                columns={[
                { title: 'ID', field: 'id' },
                { title: 'Estado', field: 'state' },
                ]}
                options={{
                  selection: true,
                  selectionProps: rowData => ({
                    disabled: rowData.id!==null && numberOfRows>0,
                    color: 'primary'
                  })
                }}
                onSelectionChange={(rows,event) => SelectionChange(rows,row.id,event)}
                data={query =>
                  new Promise((resolve, reject) => {
                    let url = 'http://localhost:8085/physical-books?available=true&book_isbn='+row.isbn
                    url += '&limit=' + query.pageSize
                    url += '&page=' + (query.page + 1)
                    fetch(url,{headers: {method: 'GET','Authorization': 'Bearer '+Cookies.get("token")}})
                      .then(response => response.json())
                      .then(result => {
                        resolve({
                          data: result.data,
                          page: result.page - 1,
                          totalCount: result.totalCount,
                          
                        })
                      })
                  })
                }  
              />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

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
  const [rows, setRows] = React.useState([]);
  const [bookRequisitionsLength, setBookRequisitionsLength] = React.useState(0);
  const [text, setText] = React.useState('');
  const [open, setOpen] = React.useState(false);

  var bool = true
  if(rows.length===0 && bool)
    getBookRequisitions()

  async function getBookRequisitions(){
    bool=false
    const {data} = await api.get('/requisitions/'+requisitionId)
    setRows(data.book_requisitions)
    console.log("data: ",data);
    setBookRequisitionsLength(data.book_requisitions.length)
  }

  const handleChangeObs = (event) => {
    setObs(event.target.value)
    console.log(event.target.value)
  };

  async function Submit(){
    console.log('Submit',bookRequisitionsLength,':',selectedPhysicalBooks)
    if(selectedPhysicalBooks.length!==1){
      alert('Para submeter a entrega dos livros é necessário efetuar a entrega de livros fisicos')
    }
    else{
      try{
        const {data} = await api.post('/physical-books/deliveries',{requisitions_physical_book:selectedPhysicalBooks})
        console.log(data);
        setText('Efetuado com Sucesso!')
        setOpen(true)
      }
      catch(error){
        setText('Por favor verifique se a requisição já foi aceite ou entregue!')
        setOpen(true)
      }
    }
  }

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }

      setOpen(false);
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
        <Grid item xs={8}>
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>ISBN</TableCell>
                  <TableCell align="right">Nome</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  : rows
                ).map((row) => (
                  <Row key={row.disciplina} row={row} />
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




/*<Grid item >
    <TextField variant="outlined" defaultValue={stdnumber} helperText="Nº de Aluno" disabled/>
  </Grid>*/