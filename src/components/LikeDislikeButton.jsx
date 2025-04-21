import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import { IconButton, Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";

function LikeDislikeButton({
  upVotes,
  downVotes,
  onUpVote,
  onDownVote,
  onNeutralizeVote,
}) {
  const authUser = useSelector((state) => state.authUser);

  const handleNoAuth = () => {
    alert("You must be logged in to take this action");
  };

  return (
    <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
      <Stack direction="row" spacing={0.5} sx={{ alignItems: "center" }}>
        {authUser && upVotes && upVotes.includes(authUser.id) ? (
          <IconButton color="inherit" onClick={() => onNeutralizeVote()}>
            <ThumbUpIcon fontSize="small" />
          </IconButton>
        ) : (
          <IconButton
            color="inherit"
            onClick={() => (authUser ? onUpVote() : handleNoAuth())}
          >
            <ThumbUpOutlinedIcon fontSize="small" />
          </IconButton>
        )}
        <Typography variant="body2">{upVotes.length}</Typography>
      </Stack>
      <Stack direction="row" spacing={0.5} sx={{ alignItems: "center" }}>
        {authUser && downVotes && downVotes.includes(authUser.id) ? (
          <IconButton color="inherit" onClick={() => onNeutralizeVote()}>
            <ThumbDownIcon fontSize="small" />
          </IconButton>
        ) : (
          <IconButton
            color="inherit"
            onClick={() => (authUser ? onDownVote() : handleNoAuth())}
          >
            <ThumbDownOutlinedIcon fontSize="small" />
          </IconButton>
        )}
        <Typography variant="body2">{downVotes.length}</Typography>
      </Stack>
    </Stack>
  );
}

LikeDislikeButton.propTypes = {
  upVotes: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotes: PropTypes.arrayOf(PropTypes.string).isRequired,
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
  onNeutralizeVote: PropTypes.func.isRequired,
};

export default LikeDislikeButton;
