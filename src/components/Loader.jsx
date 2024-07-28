import Logo from "./Logo";
import lodaerImg from '../assets/loading.gif'

export default () => {
  return (
    <div
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        background: "#fff",
        zIndex: 5,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Logo />
      <div style={{display: 'flex', alignItems: 'center'}}>
        <img style={{marginRight: 5}} src={lodaerImg} width={25} />
        <span>Loading...</span>
      </div>
    </div>
  );
};
