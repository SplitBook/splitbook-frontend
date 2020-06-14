import React from 'react';
import TextField from '@material-ui/core/TextField';
import Header from '../Components/Header';
import Autocomplete from '@material-ui/lab/Autocomplete';
import './AppStyles.css';
import api from '../../services/api';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Edit from '@material-ui/icons/Edit';



export default function SearchPhysicalBook(){
    const [physicalBook, setPhysicalBook] = React.useState(null);
    const [physicalBookList, setPhysicalBookList] = React.useState([]);


    const sleep = (milliseconds) => {
      return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    const handlerAutoCompletePhysicalBooks = (event) => {
      console.log(event.target.value)
      sleep(300);
      var tmp = "";
      tmp = event.target.value;
      if(tmp.length>4)
      getPhysicalBook(tmp);
    };

    async function getPhysicalBook(tmp){
      const {data} = await api.get('/physical-books?search=',tmp);
      setPhysicalBookList(data.data);
      console.log(physicalBookList)
    }

    return (
      <>
      <Header title='Pesquisar livro físico'/>
      <div>
      
      <Grid container spacing={1}>
            <Grid item >
              <Autocomplete
                options={physicalBookList}
                getOptionLabel={(option) => option.id}
                style={{ width: 300}}
                onChange={(event,newValue) => {
                  console.log(newValue)
                  setPhysicalBook(newValue)
                }}
                renderInput={(params) => <TextField {...params} label="Livro físico" onChange={handlerAutoCompletePhysicalBooks} variant="outlined" />}
              />
            </Grid>
            <Grid item >
              <Button variant="outlined" color="primary" style={{ padding: 14}} disabled={(physicalBook!==null && physicalBook!=='')? false:true}>
                <Edit/>
              </Button> 
            </Grid>
      </Grid>
      

      {
        physicalBook &&
        <>
        <div className="margTop">
          <Grid container spacing={2}>
            <Grid item >
              <TextField variant="outlined" defaultValue={physicalBook.name} helperText="Nome do Livro" disabled/>
            </Grid>
            <Grid item >
              <TextField variant="outlined" defaultValue={physicalBook.book_isbn} helperText="ISBN" disabled/>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item >
              <TextField variant="outlined" defaultValue={physicalBook.publishing_company} helperText="Editora" disabled/>
            </Grid>
            <Grid item >
              <TextField variant="outlined" defaultValue={physicalBook.state} helperText="Estado" disabled/>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item >
              <TextField variant="outlined" defaultValue={physicalBook.location} helperText="Localização" disabled/>
            </Grid>
            <Grid item >
              <Checkbox
                defaultChecked={physicalBook.available}
                disabled
                inputProps={{ 'aria-label': 'indeterminate checkbox' }}
              />
              Dísponivel
            </Grid>
          </Grid>
          <div className="margTop">
          <p><i>Descrição:</i></p>
          <textarea cols={50} rows={15} defaultValue={physicalBook.description}  disabled/>
          </div>
        </div>
        </>
      }



      </div>
      </>
      );

}

//registration