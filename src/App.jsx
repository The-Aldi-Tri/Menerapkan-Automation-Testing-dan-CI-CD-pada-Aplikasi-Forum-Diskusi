import { Backdrop, CircularProgress } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import LeaderboardPage from "./pages/LeaderboardPage";
import LoginPage from "./pages/LoginPage";
import NewThreadPage from "./pages/NewThreadPage";
import NotFoundPage from "./pages/NotFoundPage";
import RegisterPage from "./pages/RegisterPage";
import ThreadDetailPage from "./pages/ThreadDetailPage";
import { asyncPreloadProcess } from "./states/isPreload";

function App() {
  const isPreload = useSelector((state) => state.isPreload);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  if (isPreload) {
    return (
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/leaderboard" element={<LeaderboardPage />} />
      <Route path="/threads/:threadId" element={<ThreadDetailPage />} />
      <Route path="/new" element={<NewThreadPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
