import React from "react";
import { AppBar, Toolbar } from "@mui/material";

const Header = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#0a2846", height: "64px" }}>
      <Toolbar>
        <img src={`${import.meta.env.BASE_URL}/stackline_logo.svg`} alt="Logo" style={{ height: "32px" }} />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
