import { Avatar } from "@mui/material";
import { areas } from "../config";

export default ({ name, surname, tel, bairro, area }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        border: "1px solid #eee",
        boxShadow: "0px 0px 0 #eee",
        padding: 30,
        margin: 10,
        borderRadius: 5,
        background: "#fff",
      }}
    >
      <Avatar style={{ marginRight: 20 }}></Avatar>
      <div>
        <p>
          {name} {surname}
        </p>
        {area && (
          <p>
            <small>{areas.find(({ id }) => id === area).label}</small>
          </p>
        )}

        <small>{tel}</small>
      </div>
    </div>
  );
};
