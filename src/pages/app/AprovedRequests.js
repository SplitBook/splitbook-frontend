import React from 'react';
import MaterialTable from 'material-table';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Header from '../Components/Header';
import Cookies from 'js-cookie';
import ImageOutlined from '@material-ui/icons/ImageOutlined';
import Slide from '@material-ui/core/Slide';
import DialogActions from '@material-ui/core/DialogActions';

const Transition = React.forwardRef(function Transition(props, ref) {
      return <Slide direction="up" ref={ref} {...props} />;
    });



export default function AprovedRequests() {

      const [txt, setTxt] = React.useState({});
      const [open, setOpen] = React.useState(false);
      const [state, setState] = React.useState([
            { id: 1, ee: 'Rogério Costa', naluno: 478, nomealuno: 'Rafael Santos Costa', ano: 12,listalivros:["Português","Matemática A","Fisico-Quimica A","Inglês","Matemática"]},
            { id: 2, ee: 'Rosa Maria Cardiga', naluno: 129, nomealuno: 'Gonçalo Afonso', ano: 12,listalivros:["Inglês","Matemática"]},
            { id: 3, ee: 'Francisco Costa', naluno: 70, nomealuno: 'Guilherme Sousa', ano: 12,listalivros:["Português","Matemática A"]},
      ]);

      const [reqId, setReqId] = React.useState(0);
      const [openBookList, setOpenBookList] = React.useState(false);
      const handleChange = (value) => {
            console.log("req id",value)
            setReqId(value);
            setOpenBookList(true);
      };

      const handleClose = () => {
            setOpenBookList(false)
      };

      const [photo_photo, setPhoto_photo] = React.useState('');
      const [openPhoto, setOpenPhoto] = React.useState(false);

      function openImg(path){
      console.log(path)
      setPhoto_photo(path)
      setOpenPhoto(true);
      }

      const handleCloseIMG = () => {
            setOpenPhoto(false);
      };  


  const tableRef = React.createRef();
  return (
        <>
            <Header title='Requisições aprovadas'/>

            <MaterialTable
                  title="Lista de Requisições"
                  columns={[
                        { title: 'ID', field: 'id' },
                        { title: 'EE', field: 'guardian_name' },
                        { title: 'Nº Aluno', field: 'student_number'},
                        { title: 'Nome Aluno', field: 'student_name'},
                        { title: 'Turma', field: 'class'},
                        { title: 'Ano letivo', field: 'school_year'},
                        { title: 'Mais informações', field: 'listalivros',render: rowData => (        
                              <Button onClick={() => handleChange(rowData.id)}>Consultar</Button>
                        ),},
                  ]}
                  tableRef={tableRef}
                  data={query =>
                        new Promise((resolve, reject) => {
                        let url = 'http://localhost:8085/requisitions?state_id=2'
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
                  actions={[
                        {
                        icon: 'refresh',
                        tooltip: 'Atualizar informação',
                        isFreeAction: true,
                        onClick: () => tableRef.current && tableRef.current.onQueryChange(),
                        }
                  ]}
                  
            />

            <Dialog
            open={openBookList}
            //onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title">Lista de Livros requisitados</DialogTitle>
            <DialogContent>
            <MaterialTable
                  title=" "
                  columns={[
                  { title: 'Id', field: 'id'},
                  { title: 'Nome', field: 'name'},
                  { title: 'ISBN', field: 'isbn' },
                  { title: 'Capa', field: 'cover',render: rowData => (     
                  <>
                  <ImageOutlined onClick={() => openImg(rowData.cover)} className="pointer"/>
                  </>
                  )},
      
            ]}
                  data={query =>
                  new Promise((resolve, reject) => {
                  console.log('ID req::',reqId)
                  let url = 'http://localhost:8085/requisitions/'+reqId
                  console.log('url::',url)
                  fetch(url,{headers: {method: 'GET','Authorization': 'Bearer '+Cookies.get("token")}})
                  .then(response => response.json())
                  .then(result => {
                        resolve({
                        data: result.book_requisitions,
                        
                        })
                  })
                  })
            }
            />
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} color="primary">
                  Sair
            </Button>
            </DialogActions>

            </Dialog>

            <Dialog
                  open={openPhoto}
                  onClose={handleCloseIMG}
                  TransitionComponent={Transition}
                  aria-labelledby="alert-dialog-slide-title"
                  aria-describedby="alert-dialog-slide-description"
                  >
                  <DialogTitle id="alert-dialog-slide-title">Visualização da capa do livro</DialogTitle>
                  <DialogContent>
                        <img src={photo_photo} alt="capa do livro"/>
                  </DialogContent>
            </Dialog>

    </>
  );
}

/*

editable={{
         onRowDelete: (oldData) =>
         new Promise((resolve) => {
               setTimeout(() => {
               resolve();
               //console.log('GunsNRoses',oldData)
               setState((prevState) => {
                     const data = [...prevState.data];
                     data.splice(data.indexOf(oldData), 1);
                     return { ...prevState, data };
               });
               }, 600);
         }),
         }}

*/
