import React from "react";
import { Verified, Dangerous } from "@mui/icons-material";

function CustomBodyCell(props) {
  return <div>{props.value ? <Dangerous color="error" /> : <Verified color="success" />}</div>;
}

export default CustomBodyCell;