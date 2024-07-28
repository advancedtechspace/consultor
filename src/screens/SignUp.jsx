import { TextField, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from "../components/Logo";
import { useEffect, useState } from "react";
import { api_url, checkAuth } from "../config";
import Toast from "../components/Toast";

const SignUp = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const login = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);

    if (form.get("c-pass") !== form.get("pass")) {
      Toast.fire({
        icon: "error",
        text: "As senhas não coincidem",
        timer: 3000,
      });
      return;
    }

    const data = {
      email: form.get("email"),
      pass: form.get("pass"),
      app: "consultor",
    };

    setLoading(true);
    try {
      const res = await axios.post(
        api_url + "/user/send-confirmation-code",
        data
      );
      Toast.fire({
        icon: "sucess",
        text: "Enviamos o código de confirmação para " + data.email,
        timer: 3000,
      });
      const code = prompt("Introduza o código de confirmação: ");
      if (res.data.code === code) {
        try {
          const res2 = await axios.post(api_url + "/user/create", {
            ...data,
            code,
          });
          Toast.fire({
            icon: "success",
            text: "Cadastrado com sucesso",
            timer: 3000,
          });
          navigate("/login");
        } catch (error) {
          alert(error.response.data.msg);
        }
      } else {
        Toast.fire({
          icon: "error",
          text: "O código de confirmação é incorrecto.",
          timer: 3000,
        });
      }
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

  useEffect(() => {
    if (checkAuth()) {
      window.location.href = "/dashboard";
    }
  }, []);

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
        <TextField
          style={{ marginBottom: 10 }}
          label="Confirmar senha"
          type="password"
          name="c-pass"
          required={true}
        />
        <Link to="/recovery-account" style={{ margin: 10, textAlign: "right" }}>
          Esqueci a senha
        </Link>
        <Button type="submit" variant="contained" disabled={loading}>
          Registar
        </Button>
        <Link to="/login" style={{ margin: 10 }}>
          Já tenho uma conta
        </Link>
      </form>
    </>
  );
};

export default SignUp;
