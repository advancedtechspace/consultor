import { useEffect } from "react";
import { api_url, checkAuth } from "../config";
import Logo from "../components/Logo";
import {
  Avatar,
  Button,
  FormGroup,
  Popover,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import Consultor from "../components/Consultor";
import { Link } from "react-router-dom";
import { MdAdd } from "react-icons/md";

export default () => {
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

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

  const getUsers = async () => {
    const r = await axios.get(api_url + "/user/app/consultor", {});
    if(checkAuth()) {
      setUsers(r.data.filter(({_id}) => _id === localStorage.getItem('user')));
    } else {
      setUsers(r.data);
    }
  };

  const getUser = async () => {
    const r = await axios.get(api_url + "/user/" + checkAuth());
    const { name, surname, tel, area, bairro, desc, email } = r.data;
    setName(name);
    setEmail(email);
  };

  useEffect(() => {
    getUsers();
    getUser();
  }, []);

  return (
    <div>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0px 1px 0 #eee",
          padding: 5,
          height: 45,
          background: "#fff",
          position: "sticky",
          top: 0,
          zIndex: 5,
        }}
      >
        <Logo />
        {/* <Button startIcon={<MdAdd />} variant="contained">
          Requisitar consulta
        </Button> */}
        {checkAuth() ? (
          <>
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
              >
                Sair
              </Button>
            </Popover>
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
              to="/"
            >
              Login
            </Link>
          </div>
        )}
      </header>
      <main>
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr)",
            flexWrap: "wrap",
            margin: "auto",
          }}
        >
          {users.map(({ _id, name, surname, tel, bairro, area }) => (
            <Consultor
              key={_id}
              name={name}
              surname={surname}
              tel={tel}
              bairro={bairro}
              area={area}
            />
          ))}
        </section>
      </main>
    </div>
  );
};
