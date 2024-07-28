import { useEffect } from "react";
import { FormValidator, api, api_url, areas, checkAuth } from "../config";
import Logo from "../components/Logo";
import {
  Autocomplete,
  Avatar,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Popover,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import Toast from "../components/Toast";
import NotificationIcon from "../components/NotificationIcon";

export default () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [tel, setTel] = useState("");
  const [bairro, setBairro] = useState(null);
  const [area, setArea] = useState(null);
  const [desc, setDesc] = useState("");
  const [bairros, setBairros] = useState([]);
  const [email, setEmail] = useState("");

  const [emailNotify, setEmailNotify] = useState(true);

  const [loading, setLoading] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const getBairros = async () => {
    const res = await axios.get(api_url + "/maputo/bairros");
    setBairros(res.data);
  };

  const logout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const getUser = async () => {
    const r = await axios.get(api_url + "/user/" + checkAuth());
    console.log(r.data);
    const { name, surname, tel, area, bairro, desc, email } = r.data;
    setName(name);
    setSurname(surname);
    setTel(tel);
    setArea(area);
    setBairro(bairro);
    setDesc(desc);
    setEmail(email);
  };

  const update = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const data = {
      name: form.get("name"),
      surname: form.get("surname"),
      tel: form.get("tel"),
      // emailNotify,
      area,
      bairro,
      desc: form.get("desc"),
    };

    if (!new FormValidator().contact(data.tel)) {
      Toast.fire({
        icon: "error",
        text: "Introduza um contacto válido",
        timer: 3000,
      });
      return;
    }

    setLoading(true);

    const r = await api.post("/user/update", data);
    if (r.status === 200) {
      Toast.fire({
        icon: "success",
        text: "Dados actualizados",
        timer: 3000,
      });
    }

    setLoading(false);
  };

  useEffect(() => {
    if (!checkAuth()) {
      window.location.href = "/login";
    }
    getUser();
    getBairros();
  }, []);

  return (
    <div>
      {checkAuth() && (
        <div>
          <header
            style={{
              display: "flex",
              justifyContent: "space-between",
              boxShadow: "0px 1px 0 #eee",
              padding: "10px 20px",
              background: "#fff",
              height: 45,
              position: "sticky",
              top: 0,
              zIndex: 4,
            }}
          >
            <Logo />

            <div style={{ display: "flex", alignItems: "center" }}>
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
                {name?.charAt(0).toUpperCase() ||
                  email?.charAt(0).toUpperCase()}
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
                  <Link to="/" style={{ fontSize: 14 }}>
                    PÁGINA INICIAL
                  </Link>
                </Typography>
                <Button
                  variant="text"
                  style={{ display: "block", width: "100%" }}
                  onClick={logout}
                >
                  Sair
                </Button>
              </Popover>
            </div>
          </header>
          <main>
            <form
              style={{
                margin: "20px auto",
                width: window.innerWidth > 480 ? 400 : "auto",
                padding: 20,
              }}
              onSubmit={update}
            >
              <TextField
                required
                name="name"
                label="Nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ marginBottom: 10, width: "100%" }}
              />
              <TextField
                required
                name="surname"
                label="Apelido"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                style={{ marginBottom: 10, width: "100%" }}
              />
              <FormGroup>
                <Autocomplete
                  value={area && areas.find(({ id }) => id === area).label}
                  disablePortal
                  id="combo-box-demo"
                  options={areas}
                  sx={{ width: 300 }}
                  style={{ marginBottom: 10, width: "100%" }}
                  renderInput={(params) => (
                    <TextField required {...params} label="Área" />
                  )}
                  onChange={(e, option) => setArea(option.id)}
                />

                <Autocomplete
                  value={
                    bairro && bairros.find(({ id }) => id === bairro)?.label
                  }
                  disablePortal
                  id="combo-box-demo"
                  options={bairros}
                  sx={{ width: 300 }}
                  style={{ marginBottom: 10, width: "100%" }}
                  renderInput={(params) => (
                    <TextField required {...params} label="Bairro" />
                  )}
                  onChange={(e, option) => setBairro(option.id)}
                />
                <FormGroup style={{ marginBottom: 10 }}>
                  <TextField
                    required
                    name="tel"
                    label="Telefone"
                    value={tel}
                    onChange={(e) => setTel(e.target.value)}
                  />
                </FormGroup>
                <TextField
                  label="Descreva os serviços que oferece"
                  multiline
                  rows={5}
                  name="desc"
                  value={desc}
                  style={{ marginBottom: 10, width: "100%" }}
                  onChange={(e) => setDesc(e.target.value)}
                />
              </FormGroup>
              {/*<FormControlLabel
                control={
                  <Checkbox
                    defaultChecked={true}
                    onChange={() => setEmailNotify(!emailNotify)}
                  />
                }
                label="Receber ofertas por email"
              />*/}

              <Button
                style={{ marginTop: 10, width: "100%" }}
                variant="contained"
                type="submit"
                disabled={loading}
              >
                Actualizar
              </Button>
            </form>
          </main>
        </div>
      )}
    </div>
  );
};
