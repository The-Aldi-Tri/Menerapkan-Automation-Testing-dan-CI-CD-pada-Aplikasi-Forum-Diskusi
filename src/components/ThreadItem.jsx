import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import { Chip, Divider, Stack, Typography } from "@mui/material";
import parse from "html-react-parser";
import PropTypes from "prop-types";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import {
  asyncToggleDownVoteThread,
  asyncToggleNeutralizeVoteThread,
  asyncToggleUpVoteThread,
} from "../states/threads";
import truncateText from "../utils/truncateText";
import AuthorAndTimeElapsed from "./AuthorAndTimeElapsed";
import LikeDislikeButton from "./LikeDislikeButton";

function ThreadItem({ thread }) {
  const users = useSelector((state) => state.users);

  const dispatch = useDispatch();

  return (
    <Stack key={thread.id} spacing={0.5}>
      <Chip
        label={`#${thread.category}`}
        variant="outlined"
        sx={{ width: "fit-content" }}
      />
      <Link to={`/threads/${thread.id}`}>
        <Typography variant="h5" fontWeight="bold">
          {thread.title}
        </Typography>
      </Link>
      <Typography variant="body2" component="div">
        {parse(truncateText(thread.body))}
      </Typography>
      <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
        <LikeDislikeButton
          upVotes={thread.upVotesBy}
          downVotes={thread.downVotesBy}
          onUpVote={() => dispatch(asyncToggleUpVoteThread(thread.id))}
          onDownVote={() => dispatch(asyncToggleDownVoteThread(thread.id))}
          onNeutralizeVote={() =>
            dispatch(asyncToggleNeutralizeVoteThread(thread.id))
          }
        />
        <Stack direction="row" spacing={0.5}>
          <ReplyOutlinedIcon fontSize="small" />
          <Typography variant="body2">{thread.totalComments}</Typography>
        </Stack>
        <AuthorAndTimeElapsed
          ownerName={
            users.find((user) => user.id === thread.ownerId)?.name ||
            "Unknown User"
          }
          createdAt={thread.createdAt}
        />
      </Stack>
      <Divider />
    </Stack>
  );
}

ThreadItem.propTypes = {
  thread: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    ownerId: PropTypes.string.isRequired,
    upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    totalComments: PropTypes.number.isRequired,
  }).isRequired,
};

export default ThreadItem;
