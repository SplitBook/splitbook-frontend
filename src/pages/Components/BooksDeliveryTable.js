import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
import Checkbox from '@material-ui/core/Checkbox';
import api from '../../services/api';
import TextField from '@material-ui/core/TextField';
import MaterialTable from 'material-table';
import Cookies from 'js-cookie';
import Search from '@material-ui/icons/Search';
import Tooltip from '@material-ui/core/Tooltip';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';



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
        for(var i=0;i<rows.length;i++){
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
      for(var i=0;i<selectedPhysicalBooks.length;i++){
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
                          totalCount: result.total,
                          
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
        setText('Por favor verifique se a requisição já foi aceite!')
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

  return (
    <>
    <Grid container spacing={2}>
      <Grid item >
        <TextField variant="outlined" defaultValue={stdnumber} helperText="Nº de Aluno" disabled/>
      </Grid>
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
                {rows.map((row) => (
                  <Row key={row.disciplina} row={row} />
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


/*const rows = [
  {disciplina: 'PT',isbn: "192-9472-12",nome: "LETRAS",ano:12},
  {disciplina: 'ING',isbn: "192-9472-12",nome: "Matemática +",ano:12},
  {disciplina: 'EF',isbn: "341-1403-33",nome: "correr para crer",ano:12},
  {disciplina: 'PSI',isbn: "055-1234-15",nome: "Programação C++",ano:12},
];*/