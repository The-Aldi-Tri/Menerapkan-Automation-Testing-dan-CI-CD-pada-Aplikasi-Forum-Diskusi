import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ForumIcon from "@mui/icons-material/Forum";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import {
  AppBar,
  BottomNavigation,
  BottomNavigationAction,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";

function BottomNav() {
  const authUser = useSelector((state) => state.authUser);

  const navigate = useNavigate();
  const location = useLocation();

  const currentIndex = location.pathname;

  return (
    <AppBar position="fixed" sx={{ top: "auto", bottom: 0 }}>
      <BottomNavigation
        showLabels
        value={currentIndex}
        onChange={(event, newValue) => {
          navigate(newValue);
        }}
      >
        <BottomNavigationAction
          label="Threads"
          value="/"
          icon={<ForumIcon />}
        />
        {authUser && (
          <BottomNavigationAction
            label="Diskusi Baru"
            value="/new"
            icon={<AddCircleOutlineIcon />}
          />
        )}
        <BottomNavigationAction
          label="Leaderboards"
          value="/leaderboard"
          icon={<LeaderboardIcon />}
        />
      </BottomNavigation>
    </AppBar>
  );
}

export default BottomNav;
