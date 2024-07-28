import { Badge, IconButton } from "@mui/material";
import { AiFillBell } from "react-icons/ai";

export default () => {
  return (
    <Badge
      style={{
        marginRight: 20,
        backgroundColor: "#fcfcfc",
        borderRadius: "100%",
      }}
      badgeContent={
        <div
          style={{
            width: 16,
            height: 16,
            backgroundColor: "red",
            color: "#fff",
            borderRadius: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <strong style={{ fontWeight: "bolder" }}>0</strong>
        </div>
      }
    >
      <IconButton>
        <AiFillBell />
      </IconButton>
    </Badge>
  );
};
