import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  Avatar,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { asyncUnsetAuthUser } from "../states/authUser/authUserThunk";

function AvatarNameMenu() {
  const authUser = useSelector((state) => state.authUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    dispatch(asyncUnsetAuthUser());
    handleClose();
    navigate("/login");
  };

  return (
    <Stack direction="row" alignItems="center">
      <Avatar sx={{ height: "1.5em", width: "1.5em" }} src={authUser.avatar} />
      <IconButton color="inherit" onClick={handleClick}>
        <Typography>{authUser.name}</Typography>
        <ArrowDropDownIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Stack>
  );
}

export default AvatarNameMenu;
