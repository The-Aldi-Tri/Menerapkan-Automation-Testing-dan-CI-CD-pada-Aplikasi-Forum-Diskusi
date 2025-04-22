import { Avatar, Box, Divider, Stack, Typography } from "@mui/material";
import parse from "html-react-parser";
import PropTypes from "prop-types";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  asyncToggleDownVoteComment,
  asyncToggleNeutralizeVoteComment,
  asyncToggleUpVoteComment,
} from "../states/threadDetail/threadDetailThunk";
import getTimeElapsed from "../utils/getTimeElapsed";
import LikeDislikeButton from "./LikeDislikeButton";

function Comment({ comment }) {
  const threadDetail = useSelector((state) => state.threadDetail);

  const dispatch = useDispatch();

  return (
    <Box>
      <Stack spacing={1}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Stack direction="row" spacing={0.5} alignItems="center">
            <Avatar
              sx={{ height: "1em", width: "1em" }}
              src={comment.owner.avatar}
            />
            <Typography>{comment.owner.name}</Typography>
          </Stack>
          <Typography variant="body2">
            {getTimeElapsed(comment.createdAt)}
          </Typography>
        </Box>
        <Typography component="div">{parse(comment.content)}</Typography>
        <LikeDislikeButton
          upVotes={comment.upVotesBy}
          downVotes={comment.downVotesBy}
          onUpVote={() =>
            dispatch(
              asyncToggleUpVoteComment({
                threadId: threadDetail.id,
                commentId: comment.id,
              }),
            )
          }
          onDownVote={() =>
            dispatch(
              asyncToggleDownVoteComment({
                threadId: threadDetail.id,
                commentId: comment.id,
              }),
            )
          }
          onNeutralizeVote={() =>
            dispatch(
              asyncToggleNeutralizeVoteComment({
                threadId: threadDetail.id,
                commentId: comment.id,
              }),
            )
          }
        />
      </Stack>
      <Divider />
    </Box>
  );
}

Comment.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    owner: PropTypes.shape({
      avatar: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
    upVotesBy: PropTypes.arrayOf(PropTypes.string),
    downVotesBy: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default Comment;
