import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Stack, TextField } from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { asyncAddComment } from "../states/threadDetail/threadDetailThunk";

const commentSchema = yup.object({
  comment: yup.string().min(3).required(),
});

function CommentForm() {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(commentSchema),
    mode: "onChange",
  });

  const threadDetail = useSelector((state) => state.threadDetail);

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(
      asyncAddComment({ content: data.comment, threadId: threadDetail.id }),
    );
  };

  return (
    <Stack
      spacing={0.5}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <Controller
        name="comment"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            label="Comment"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            placeholder="Tulis komentar anda"
            {...field}
            error={!!errors.comment}
            helperText={errors.comment?.message}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />
        )}
      />
      <Button variant="contained" sx={{ bgcolor: "#2c3e50" }} type="submit">
        Kirim Komentar
      </Button>
    </Stack>
  );
}

export default CommentForm;
