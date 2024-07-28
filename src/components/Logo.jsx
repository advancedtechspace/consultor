import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default () => {
  return (
    <Link
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: '#000'
      }}
      to='/'
    >
      <img src={logo} width="30" style={{ marginRight: 10 }} alt="logo" /> 
      <h2>{"Consultor"}</h2>
    </Link>
  );
};
