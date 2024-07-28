import { TextField, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from "../components/Logo";
import { useEffect } from "react";
import { api_url, checkAuth } from "../config";
import Toast from "../components/Toast";

const RecoveryAccount = () => {
  const navigate = useNavigate();
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

    try {
      const res = await axios.post(api_url + "/user/send-recovery-code", data);
      console.log(res);
      try {
        const code = prompt("Introduza o código de recuperação:");
        const res2 = await axios.post(api_url + "/user/change-pass", {
          ...data,
          code,
        });
        if (res2.status === 200) {
          Toast.fire({
            icon: "success",
            text: res2.data.msg,
            timer: 3000,
          });
          navigate("/login");
        }
      } catch (error) {
        Toast.fire({
          icon: "error",
          text: error.response.data.msg,
          timer: 3000,
        });
      }
    } catch (error) {
      console.log(error);
      Toast.fire({
        icon: "error",
        text: error.response.data.info,
        timer: 3000,
      });
    }
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
          label="Nova senha"
          type="password"
          name="pass"
          required={true}
        />
        <TextField
          style={{ marginBottom: 10 }}
          label="Confirmar nova senha"
          type="password"
          name="c-pass"
          required={true}
        />
        <Button type="submit" variant="contained">
          Recuperar
        </Button>
        <Link to="/login" style={{ margin: 10 }}>
          Já tenho uma conta
        </Link>
      </form>
    </>
  );
};

export default RecoveryAccount;
