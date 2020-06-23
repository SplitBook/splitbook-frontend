import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Header from "../Components/Header";
import Autocomplete from "@material-ui/lab/Autocomplete";
import "./AppStyles.css";
import api from "../../services/api";
import { toast } from "react-toastify";

export default function AddResumes() {
  const [subject, setSubject] = React.useState(null);
  const [classes, setClasses] = React.useState(null);
  const [subjectslist, setSubjectslist] = React.useState([]);
  const [classeslist, setClasseslist] = React.useState([]);
  var num1 = 0;
  var num2 = 0;

  if (classeslist.length === 0 && num1 === 0) getClasses();

  if (subjectslist.length === 0 && num2 === 0) getSubjects();

  async function getClasses() {
    num1 = 1;
    const { data } = await api.get("/classes?current_school_year=true");
    setClasseslist(data.data);
  }

  async function getSubjects() {
    num2 = 1;
    const { data } = await api.get("/school-subjects");
    setSubjectslist(data);
  }

  async function submit() {
    //console.log(subject,classes)
    console.log(subject.id, classes.class_id);
    try {
      await api.post("/resumes", {
        school_subject_id: subject.id,
        class_id: classes.class_id,
      });
      setSubject(null);
      setClasses(null);
      toast.success("Currículo criado com sucesso.");
    } catch (err) {
      toast.error("Currículo já existente.");
    }
  }

  return (
    <>
      <Header title="Criar Currículo" />
      <div>
        <Autocomplete
          options={subjectslist}
          value={subject}
          getOptionLabel={(option) => option.school_subject}
          style={{ width: 300, marginTop: 15 }}
          onChange={(event, newValue) => {
            console.log(newValue);
            setSubject(newValue);
          }}
          renderInput={(params) => (
            <TextField {...params} label="Disciplina" variant="outlined" />
          )}
        />

        <Autocomplete
          options={classeslist}
          value={classes}
          getOptionLabel={(option) => option.class}
          onChange={(event, newValue) => {
            //console.log(newValue)
            setClasses(newValue);
          }}
          style={{ width: 300, marginTop: 15 }}
          renderInput={(params) => (
            <TextField {...params} label="Turma" variant="outlined" />
          )}
        />

        <div className="margTop">
          <Button
            variant="outlined"
            color="primary"
            onClick={submit}
            disabled={!classes || !subject}
          >
            Criar Currículo
          </Button>
        </div>
      </div>
    </>
  );
}

//registration
