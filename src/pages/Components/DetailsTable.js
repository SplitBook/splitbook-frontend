import React from "react";
import MaterialTable from "material-table";
import api from "../../services/api";
import api_formdata from "../../services/api_multipart_form_data";
import { useParams } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Info from "@material-ui/icons/Info";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Cookies from "js-cookie";

export default function DetailsTable() {
  let { id } = useParams();
  const [open, setOpen] = React.useState(false);
  const [bool, setBool] = React.useState(true);
  const [enrollmentsInfo, setEnrollmentsInfo] = React.useState([]);
  const [reportID, setReportID] = React.useState(null);
  const [type, setType] = React.useState(null);
  const [file, setFile] = React.useState(null);
  const [valid, setValid] = React.useState(null);

  const [fileimg, setFileimg] = React.useState({ file: null });

  function fileUpload(e) {
    //setFileimg(e.target.files[0])
    fileimg.file = e.target.files[0];
    console.log("file::: ", fileimg);
  }

  async function SubmitNewReport() {
    const formData = new FormData();
    if (fileimg.file !== null) {
      formData.append("file", fileimg.file);
      formData.append("valid", true);
      const { data } = await api_formdata.put("/reports/" + reportID, formData);
      console.log("Data: ", data);
      setFile(data.file);
      setFileimg({ file: null });
    }
  }

  const [state, setState] = React.useState({
    columns: [
      { title: "ISBN", field: "isbn" },
      { title: "Nome", field: "name" },
      { title: "Disciplina", field: "school_subject" },
    ],
    data: [],
  });

  const handleClose = () => {
    setOpen(false);
  };

  const [state2, setState2] = React.useState({
    columns: [
      { title: "Tipo", field: "type" },
      {
        title: "Valido",
        field: "valid",
        render: (rowData) => (
          <>{rowData.valid ? <span>Sim</span> : <span>Não</span>}</>
        ),
      },
      {
        title: "Detalhes",
        render: (rowData) => (
          <>
            <Button onClick={() => getInfo(rowData.id, rowData.type)}>
              <Info />
            </Button>
          </>
        ),
      },
    ],
    data: [],
  });

  const [state3, setState3] = React.useState({
    columns: [
      { title: "Código do Livro", field: "physical_book_id" },
      { title: "ISBN", field: "book_isbn" },
      { title: "Nome", field: "name" },
      { title: "Disciplina", field: "school_subject" },
    ],
    data: [],
  });

  function getInfo(id, type) {
    setValid(null);
    setFileimg({ file: null });
    setFile(null);
    setReportID(id);
    setType(type);
    setOpen(true);
  }

  if (bool) getSchoolEnrollments();

  async function getSchoolEnrollments() {
    const { data } = await api.get("/school-enrollments/" + id);
    console.log(data);
    setEnrollmentsInfo(data);
    state.data = data.book_requisitions;
    state2.data = data.reports;
    //state.data = data;
    setBool(false);
  }

  async function generateReport(id) {
    const { data } = api.get("/generate/report/" + id);
    console.log("generateReport", data);
    setFile(data.file);
  }

  async function ValidateReport() {
    const formData = new FormData();
    formData.append("valid", true);
    const { data } = await api.put("/reports/" + reportID, formData);
    setValid(data.valid);
    console.log(data);
  }

  const fullWidth = true;
  const maxWidth = "md";

  return (
    <>
      <Grid container spacing={2} style={{ marginBottom: 20 }}>
        <Grid item>
          <TextField
            variant="outlined"
            value={enrollmentsInfo.student_name}
            helperText="Nome do Aluno"
            disabled
          />
        </Grid>
        <Grid item>
          <TextField
            variant="outlined"
            value={enrollmentsInfo.student_number}
            helperText="Nº do Aluno"
            disabled
          />
        </Grid>
        <Grid item>
          <TextField
            variant="outlined"
            value={enrollmentsInfo.class}
            helperText="Turma"
            disabled
          />
        </Grid>
        <Grid item>
          <TextField
            variant="outlined"
            value={enrollmentsInfo.guardian_name}
            helperText="Encarregado de Educação"
            disabled
          />
        </Grid>
      </Grid>
      {enrollmentsInfo.requisition_id && (
        <MaterialTable
          title="Livros requisitados"
          columns={state.columns}
          data={state.data}
          style={{ marginBottom: 20 }}
        />
      )}

      {enrollmentsInfo.reports && (
        <MaterialTable
          title="Relatório"
          columns={state2.columns}
          data={state2.data}
        />
      )}

      <Dialog
        open={open}
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        //onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Grid
            container
            spacing={2}
            direction="row"
            justify="space-between"
            alignItems="flex-start"
          >
            <Grid item>Relatórios</Grid>
            <Grid item>
              <Button
                onClick={() => ValidateReport()}
                disabled={valid}
                variant="outlined"
              >
                Validar relatório
              </Button>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item>
              <Button
                onClick={() => window.open(file)}
                disabled={file === null}
                variant="outlined"
              >
                Abrir Relatório
              </Button>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item>
              <input type="file" onChange={fileUpload} />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item>
              <Button
                onClick={SubmitNewReport}
                variant="outlined"
                style={{ marginBottom: 10 }}
              >
                Submeter relatório assinado
              </Button>
            </Grid>
          </Grid>

          <MaterialTable
            title="Lista de Livros"
            columns={state3.columns}
            data={(query) =>
              new Promise((resolve, reject) => {
                let url = "http://localhost:8085/reports/" + reportID;
                fetch(url, {
                  headers: {
                    method: "GET",
                    Authorization: "Bearer " + Cookies.get("token"),
                  },
                })
                  .then((response) => response.json())
                  .then((result) => {
                    setValid(result.valid);
                    if (result.file) {
                      setFile(result.file);
                    } else {
                      generateReport(result.id);
                    }
                    if (type === "Entrega")
                      resolve({
                        data: result.deliveries,
                        page: query.page,
                        totalCount: result.deliveries.length,
                      });
                    else {
                      resolve({
                        data: result.returns,
                        page: query.page,
                        totalCount: result.returns.length,
                      });
                    }
                  });
              })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Voltar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
