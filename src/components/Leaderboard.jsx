import { Avatar, Box, Divider, Stack, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

function Leaderboard() {
  const leaderboards = useSelector((state) => state.leaderboards);

  return (
    <Stack spacing={2}>
      <Stack spacing={1}>
        <Typography variant="h5" fontWeight="medium">
          Klasemen Pengguna Aktif
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" fontWeight="normal">
            Pengguna
          </Typography>
          <Typography variant="h6" fontWeight="normal">
            Skor
          </Typography>
        </Box>
      </Stack>
      {leaderboards.map((entry) => (
        <Box key={entry.user.id}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Stack spacing={0.5} direction="row" sx={{ alignItems: "center" }}>
              <Avatar
                src={entry.user.avatar}
                sx={{ width: "1.5em", height: "1.5em" }}
              />
              <Typography>{entry.user.name}</Typography>
            </Stack>
            <Typography>{entry.score}</Typography>
          </Box>
          <Divider />
        </Box>
      ))}
    </Stack>
  );
}

export default Leaderboard;
