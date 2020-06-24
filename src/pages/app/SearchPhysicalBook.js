import React from "react";
import TextField from "@material-ui/core/TextField";
import Header from "../Components/Header";
import Autocomplete from "@material-ui/lab/Autocomplete";
import "./AppStyles.css";
import api from "../../services/api";
import Grid from "@material-ui/core/Grid";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Edit from "@material-ui/icons/Edit";
import CropFree from "@material-ui/icons/CropFree";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import Tooltip from "@material-ui/core/Tooltip";
import Select from "@material-ui/core/Select";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import NativeSelect from "@material-ui/core/NativeSelect";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SearchPhysicalBook() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [physicalBook, setPhysicalBook] = React.useState(null);
  const [physicalBookList, setPhysicalBookList] = React.useState([]);

  const handlerAutoCompletePhysicalBooks = (event) => {
    console.log(event.target.value);
    var tmp = "";
    tmp = event.target.value;
    console.log(tmp.length > 2);
    if (tmp.length > 2) getPhysicalBook(tmp);
  };

  async function getPhysicalBook(tmp) {
    const { data } = await api.get("/physical-books?search=" + tmp);
    setPhysicalBookList(data.data);
    console.log(physicalBookList);
  }

  async function generateOneQRCode(code) {
    const { data } = await api.get("/generate/qr-codes?codes=" + code, {
      responseType: "blob",
    });

    const file = new Blob([data], { type: "application/pdf" });
    const fileURL = URL.createObjectURL(file);
    window.open(fileURL);
  }
  const handleChangeState = (event) => {
    setState(event);
  };

  const handleChangeLocation = (event) => {
    setLocation(event);
  };

  const [bookstates, setBookstates] = React.useState([]);
  const [state, setState] = React.useState(0);
  const [bool, setBool] = React.useState(true);

  async function getList() {
    setBool(false);
    const { data } = await api.get("/book-states");
    setBookstates(data);
  }

  if (bool) {
    getList();
  }

  function SelectState({ id }) {
    if (state === 0) setState(id);
    const listItems = bookstates.map((state) => (
      <option value={state.id}>{state.state}</option>
    ));
    return (
      <FormControl className={classes.formControl}>
        <Select
          native
          value={state}
          onChange={(e) => handleChangeState(e.target.value)}
          label="Estado do livro"
          variant="outlined"
          inputProps={{
            name: "estado",
          }}
          className="btn"
        >
          <option aria-label="None" value="" />
          {listItems}
        </Select>
        <FormHelperText>Estado</FormHelperText>
      </FormControl>
    );
  }

  const [locationList, setLocationList] = React.useState([]);
  const [location, setLocation] = React.useState(0);
  const [description, setDescription] = React.useState("");
  const [bool2, setBool2] = React.useState(true);

  async function getLocations() {
    setBool2(false);
    const { data } = await api.get("/book-locations");
    setLocationList(data);
  }

  if (locationList.length === 0 && bool2) {
    getLocations();
  }

  function SelectLocation({ id }) {
    if (location === 0) setLocation(id);
    const listItems = locationList.map((location) => (
      <option value={location.id}>{location.location}</option>
    ));
    return (
      <FormControl className={classes.formControl}>
        <Select
          native
          value={location}
          onChange={(e) => handleChangeLocation(e.target.value)}
          label="Localização"
          variant="outlined"
          inputProps={{
            name: "localização",
          }}
          className="btn"
        >
          <option aria-label="None" value="" />
          {listItems}
        </Select>
        <FormHelperText>Localização</FormHelperText>
      </FormControl>
    );
  }

  function submitChanges() {
    console.log(description, location, state);
    api.put("/physical-books/" + physicalBook.id, {
      state_id: state,
      description: description || null,
      location_id: location,
    });
    setOpen(false);
  }

  return (
    <>
      <Header title="Pesquisar livro físico" />
      <div>
        <Grid container spacing={1}>
          <Grid item>
            <Autocomplete
              options={physicalBookList}
              getOptionLabel={(option) => option.id + " - " + option.name}
              style={{ width: 300 }}
              onChange={(event, newValue) => {
                console.log(newValue);
                setPhysicalBook(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Livro físico"
                  onChange={handlerAutoCompletePhysicalBooks}
                  variant="outlined"
                />
              )}
            />
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              color="primary"
              style={{ padding: 14 }}
              disabled={
                physicalBook !== null && physicalBook !== "" ? false : true
              }
              onClick={() => setOpen(true)}
            >
              <Edit />
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              color="primary"
              style={{ padding: 14 }}
              disabled={
                physicalBook !== null && physicalBook !== "" ? false : true
              }
              onClick={() => generateOneQRCode(physicalBook.id)}
            >
              <Tooltip title="Gerar QR-Code">
                <CropFree />
              </Tooltip>
            </Button>
          </Grid>
        </Grid>

        {physicalBook && (
          <>
            <div className="margTop">
              <Grid container spacing={2}>
                <Grid item>
                  <TextField
                    variant="outlined"
                    defaultValue={physicalBook.name}
                    helperText="Nome do Livro"
                    disabled
                  />
                </Grid>
                <Grid item>
                  <TextField
                    variant="outlined"
                    defaultValue={physicalBook.book_isbn}
                    helperText="ISBN"
                    disabled
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item>
                  <TextField
                    variant="outlined"
                    defaultValue={physicalBook.publishing_company}
                    helperText="Editora"
                    disabled
                  />
                </Grid>
                <Grid item>
                  <TextField
                    variant="outlined"
                    defaultValue={physicalBook.state}
                    helperText="Estado"
                    disabled
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item>
                  <TextField
                    variant="outlined"
                    defaultValue={physicalBook.location}
                    helperText="Localização"
                    disabled
                  />
                </Grid>
                <Grid item>
                  <Checkbox
                    defaultChecked={physicalBook.available}
                    disabled
                    inputProps={{ "aria-label": "indeterminate checkbox" }}
                  />
                  Dísponivel
                </Grid>
              </Grid>
              <div className="margTop">
                <p>
                  <i>Descrição:</i>
                </p>
                <textarea
                  cols={50}
                  rows={15}
                  defaultValue={physicalBook.description}
                  disabled
                />
              </div>
            </div>

            <Dialog
              open={open}
              //onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                Editar informações do livro:{physicalBook.id}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  <Grid container spacing={2}>
                    <Grid item>
                      <SelectState id={physicalBook.state_id} />
                    </Grid>
                    <Grid item>
                      <SelectLocation id={physicalBook.location_id} />
                    </Grid>
                  </Grid>
                  <div className="margTop">
                    <p>
                      <i>Descrição:</i>
                    </p>
                    <textarea
                      cols={50}
                      rows={15}
                      defaultValue={physicalBook.description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button color="primary" onClick={() => setOpen(false)}>
                  Cancelar
                </Button>
                <Button color="primary" onClick={submitChanges}>
                  Efetuar Alterações
                </Button>
              </DialogActions>
            </Dialog>
          </>
        )}
      </div>
    </>
  );
}

//registration
