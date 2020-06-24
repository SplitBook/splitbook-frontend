import React, { useState } from "react";
import api from "../../services/api";
import logo from "../../assets/Icons/SplitBookTransparent/XD/icon_192.png";
import "./Auth.css";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
//import api from '../../services/api';
import queryString from "query-string";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function NewPassword({ location }) {
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const [open, setOpen] = React.useState(false);

  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("Ok");
    if (password !== password1 || !password || !password1) {
      setOpen(true);
    } else {
      try {
        const { token } = queryString.parse(location.search);

        if (token) {
          const { data } = await api.post("/change-password?token=" + token, {
            password: password,
          });

          history.replace("/login");

          toast.success("Palavra passe alterada com sucesso.");
        } else {
          toast.error("Token não encontrado.");
        }
      } catch (error) {
        toast.error("Token expirado.");
      }
    }
  }

  async function redirectToRecoverPassword() {
    history.push("/recover/password");
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <img src={logo} alt="logotipo" />
        <input
          placeholder="Nova Password"
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          placeholder="Nova Password"
          value={password1}
          type="password"
          onChange={(e) => setPassword1(e.target.value)}
        />
        <p onClick={redirectToRecoverPassword}></p>
        <button type="submit" className="btnLogin">
          SUBMETER{" "}
        </button>
        <div>
          <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
              A os campos com nova palavra-passe não coincidem!
            </Alert>
          </Snackbar>
        </div>
      </form>
    </div>
  );
}
