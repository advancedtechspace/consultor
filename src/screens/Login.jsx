import { TextField, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from "../components/Logo";
import { api_url } from "../config";

import Toast from "../components/Toast";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const login = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const data = {
      email: form.get("email"),
      pass: form.get("pass"),
      app: "consultor",
    };

    setLoading(true);
    try {
      const res = await axios.post(api_url + "/user/login", data);
      localStorage.setItem("user", res.data.user);
      await Toast.fire({
        icon: "success",
        text: "Autenticado com êxito",
        timer: 3000,
      }).then(() => {
        navigate("/dashboard", { replace: true });
      });
    } catch (error) {
      console.log(error);
      Toast.fire({
        icon: "error",
        text: error.response.data.msg,
        timer: 3000,
      });
    }
    setLoading(false);
  };

  return (
    <>
      <form
        onSubmit={login}
        style={{
          width: window.innerWidth > 480 ? 400 : "auto",
          height: 520,
          display: "flex",
          margin: "50px auto",
          flexDirection: "column",
          justifyContent: "center",
          padding: 30,
          border: window.innerWidth > 480 ? "1px solid #ddd" : "none",
          borderRadius: 15,
        }}
      >
        <Logo />
        <TextField
          style={{ marginBottom: 10 }}
          label="Email"
          type="email"
          name="email"
          autoFocus={true}
          required={true}
        />
        <TextField
          style={{ marginBottom: 10 }}
          label="Senha"
          type="password"
          name="pass"
          required={true}
        />
        <Link to="/recovery-account" style={{ margin: 10, textAlign: "right" }}>
          Esqueci a senha
        </Link>
        <Button type="submit" variant="contained" disabled={loading}>
          Entrar
        </Button>
        <Link to="/signup" style={{ margin: 10 }}>
          Ainda não tenho uma conta
        </Link>
      </form>
    </>
  );
};

export default Login;
