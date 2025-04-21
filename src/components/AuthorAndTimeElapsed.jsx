import { Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import getTimeElapsed from "../utils/getTimeElapsed";

function AuthorAndTimeElapsed({ ownerName, createdAt }) {
  return (
    <>
      <Typography variant="body2" color="text.secondary">
        {getTimeElapsed(createdAt)}
      </Typography>
      <Stack direction="row" spacing={0.5}>
        <Typography variant="body2" color="text.secondary">
          Dibuat oleh
        </Typography>
        <Typography variant="body2" fontWeight="bold">
          {ownerName}
        </Typography>
      </Stack>
    </>
  );
}

AuthorAndTimeElapsed.propTypes = {
  ownerName: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
};

export default AuthorAndTimeElapsed;
