import LoginIcon from "@mui/icons-material/Login";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import LoadingBar from "react-redux-loading-bar";
import { useNavigate } from "react-router";
import AvatarNameMenu from "./AvatarNameMenu";

function Header() {
  const authUser = useSelector((state) => state.authUser);

  const navigate = useNavigate();

  return (
    <AppBar position="fixed" sx={{ bgcolor: "#2c3e50" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h5">FORUM APP</Typography>
        {authUser ? (
          <AvatarNameMenu />
        ) : (
          <IconButton color="inherit" onClick={() => navigate("/login")}>
            <LoginIcon />
            <Typography sx={{ ml: 0.5 }}>Login</Typography>
          </IconButton>
        )}
      </Toolbar>
      <LoadingBar />
    </AppBar>
  );
}

export default Header;
