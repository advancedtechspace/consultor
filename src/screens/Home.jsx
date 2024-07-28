import { useEffect } from "react";
import { FormValidator, api_url, areas, checkAuth } from "../config";
import Logo from "../components/Logo";

import {
  Autocomplete,
  Avatar,
  Badge,
  Button,
  IconButton,
  Popover,
  TextField,
  Typography,
} from "@mui/material";
import { MdDoorbell } from "react-icons/md";
import { AiFillBell } from "react-icons/ai";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

import Swal from "sweetalert2";
import Loader from "../components/Loader";
import Toast from "../components/Toast";
import NotificationIcon from "../components/NotificationIcon";

export default () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [bairros, setBairros] = useState([]);

  const [area, setArea] = useState(null);
  const [desc, setDesc] = useState(null);
  const [bairro, setBairro] = useState(null);
  const [tel, setTel] = useState(null);

  const logout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleOptionArea = (e, option) => {
    setArea(option);
  };

  const getUser = async () => {
    if (checkAuth()) {
      const r = await axios.get(api_url + "/user/" + checkAuth());
      const { name, surname, tel, area, bairro, desc, email } = r.data;
      setName(name);
      setEmail(email);
    }
  };

  const getBairros = async () => {
    let err = true;

    while (err) {
      console.log('Trying to get bairros from api')
      try {
        const res = await axios.get(api_url + "/maputo/bairros");
        setBairros(res.data);
        if (res.status === 200) {
          err = false;
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = {
      area,
      desc,
      bairro,
      tel,
    };

    if (!new FormValidator().contact(tel)) {
      Toast.fire({
        icon: "error",
        text: "Introduza um contacto válido",
        timer: 3000,
      });
      return;
    }

    setLoading(true);
    try {
      const r = await axios.post(api_url + "/tecnico/consulta", data);
      setLoading(false);
      console.log(r);
      Swal.fire({
        icon: "success",
        text: "Requisição efectuada com êxito",
      });
    } catch (error) {
      console.log(error);
      alert("Erro");
    }
    setLoading(false);
  };

  useEffect(() => {
    getUser();
    getBairros();
  }, []);

  return (
    <div style={{ background: "#fcfcfc" }}>
      {bairros.length === 0 && <Loader />}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0px 1px 0 #eee",
          padding: "10px 20px",
          height: 45,
          background: "#fff",
          position: "sticky",
          top: 0,
          zIndex: 4,
        }}
      >
        <Logo />
        {checkAuth() ? (
          <>
            <div style={{ display: "flex" }}>
              {/* {checkAuth() && (
                <Link>
                  <NotificationIcon />
                </Link>
              )} */}

              <Avatar
                style={{ cursor: "pointer" }}
                aria-describedby={id}
                onClick={handleClick}
              >
                {name?.charAt(0) || email?.charAt(0).toUpperCase()}
              </Avatar>
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
              >
                <Typography sx={{ p: 2 }}>
                  <Link to="/dashboard">Dashboard</Link>
                </Typography>
                <Button
                  variant="text"
                  style={{ display: "block", width: "100%" }}
                  onClick={logout}
                  disabled={loading}
                >
                  Sair
                </Button>
              </Popover>
            </div>
          </>
        ) : (
          <div>
            <Link
              style={{
                border: "1px solid #aaa",
                borderRadius: 5,
                padding: 5,
                width: 120,
                textAlign: "center",
                marginRight: 10,
              }}
              to="/signup"
            >
              Sign Up
            </Link>
            <Link
              style={{
                border: "1px solid #aaa",
                borderRadius: 5,
                padding: 5,
                width: 120,
                textAlign: "center",
              }}
              to="/login"
            >
              Login
            </Link>
          </div>
        )}
      </header>
      <main style={{ minHeight: '100vh' }}>
        <form
          style={{
            margin: "20px auto",
            paddingLeft: 10,
            paddingRight: 10,
            width: window.innerWidth > 480 ? 400 : "auto",
            display: "flex",
            flexDirection: "column",
          }}
          onSubmit={onSubmit}
        >
          <h2 style={{ textAlign: "center", color: "#777" }}>
            Requisite um consultor
          </h2>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={areas}
            sx={{ width: 300 }}
            style={{ marginBottom: 10, width: "100%" }}
            renderInput={(params) => (
              <TextField autoFocus={true} required {...params} label="Área" />
            )}
            onChange={handleOptionArea}
          />

          <TextField
            required
            label="Descreva o serviço que procura"
            multiline
            rows={5}
            name="desc"
            style={{ marginBottom: 10, width: "100%" }}
            onChange={(e) => setDesc(e.target.value)}
          />
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={bairros}
            sx={{ width: 300 }}
            disabled={bairros.length === 0}
            style={{ marginBottom: 10, width: "100%" }}
            renderInput={(params) => (
              <TextField required={true} {...params} label="Seu bairro" />
            )}
            // onInputChange={(e) => handleSearchDestino(e.target.value)}
            onChange={(e, opt) => setBairro(opt)}
          />
          <TextField
            required
            label="Seu telefone"
            name="tel"
            type="number"
            style={{ marginBottom: 10, width: "100%" }}
            onChange={(e) => setTel(e.target.value)}
          />
          <Button
            variant="contained"
            type="submit"
            style={{ marginTop: 10 }}
            disabled={loading || bairros.length === 0}
          >
            Requisitar
          </Button>
        </form>
      </main>
      <footer style={{borderTop: '1px solid #ddd'}}>
        <p style={{textAlign: 'center'}}>Consultor &copy; 2024</p>
      </footer>
    </div>
  );
};
