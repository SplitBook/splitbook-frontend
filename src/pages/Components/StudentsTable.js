import React from 'react';
import MaterialTable from 'material-table';
import api from '../../services/api';
import Cookies from 'js-cookie';


export default function StudentsTable() {
  const [open, setOpen] = React.useState(false);
  //const [photo_photo, setPhoto_photo] = React.useState({photo:null,number:null});
  //const [fileimg, setFileimg] = React.useState({file:null});
  function BornDate(data){
    var tmp = data.born_date;
    console.log(tmp)
    if(tmp!==null){
      var new_date = tmp.split('T');
      tmp=new_date[0];
      console.log("info",new_date)
    }
    return(
      <>
      {tmp}
      </>
    );
  }

  const [state, setState] = React.useState({
    columns: [
      { title: 'ID', field: 'id',editable: 'never' },
      { title: 'Nome', field: 'name'},
      { title: 'Nº Aluno', field: 'number',editable: 'never'},
      { title: 'Data de nascimento', field: 'date',editable: 'never',render: rowData => (     
        <>
          <BornDate born_date={rowData.born_date}/>
        </>
      )},
      /*{ title: 'Foto', field: 'photo',render: rowData => (     
        <>
          <ImageOutlined onClick={() => openImg(rowData.photo,rowData.number)} className="pointer"/>
        </>
      ),editable: 'never'},
      { title: 'Descarregar Foto',render: rowData => (     
        <>   
        <input type="file" onChange={fileUpload} />
        </>
      )},*/
    ],
    data: [],
  });

  /*function openImg(path){
    console.log(path)
    setPhoto_photo(path)
    setOpen(true);
  }

  function fileUpload(e){
    //setFileimg(e.target.files[0])
    fileimg.file=e.target.files[0]
    console.log("file::: ",fileimg);
  }*/

  const handleClose = () => {
    setOpen(false);
  };

  async function deleteStudent(id){
    const {data} = await api.delete('/students/'+id);
    console.log(data);
  }

  async function addStudent(newData){
    const {data} = await api.post('/students',{name:newData.name,number:newData.number,born_date:newData.born_date});
    console.log(data);
  }

  async function EditStudent(newData,id){
    console.log('ola',newData)
    const {data} = await api.put('/students/'+id,{name:newData.name,born_date:newData.born_date});
    console.log(data);
  }

  
  const tableRef = React.createRef();

  return (
    <>
    <MaterialTable
      title=" "
      tableRef={tableRef}
      columns={state.columns}
      data={query =>
        new Promise((resolve, reject) => {
          let url = 'http://localhost:8085/students?orderBy=number'
          url += '&limit=' + query.pageSize
          url += '&page=' + (query.page + 1)
          url += '&search=' + query.search
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
      editable={{
        /*onRowAdd: (newData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                console.log("Data:",newData)
                addStudent(newData.state);
                const data = [...prevState.data];
                data.push(newData);
                return { ...prevState, data };
              });
            }, 600);
          }),*/
        onRowUpdate: (newData, oldData) =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve();
            if (oldData) {
              setState((prevState) => {
                EditStudent(newData,oldData.id)
                const data = [...prevState.data];
                data[data.indexOf(oldData)] = newData;
                return { ...prevState, data };
              });
            }
          }, 600);
          
        }),
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                deleteStudent(oldData.id)
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          }),
      }}
    />

    
    </>
  );
}
/*<Dialog
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      keepMounted
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">Foto aluno</DialogTitle>
      <DialogContent>
        <img src={photo_photo} alt="capa do livro"/>
      </DialogContent>
    </Dialog>*/