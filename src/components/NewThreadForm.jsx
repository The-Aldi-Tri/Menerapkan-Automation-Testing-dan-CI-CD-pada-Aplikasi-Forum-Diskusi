import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import * as yup from "yup";
import { asyncAddThread } from "../states/threads";

const newThreadSchema = yup.object({
  title: yup.string().min(3).required(),
  category: yup.string().min(3).required(),
  body: yup.string().min(3).required(),
});

function NewThreadForm() {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(newThreadSchema),
    mode: "onChange",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    dispatch(asyncAddThread(data));
    navigate("/");
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <Stack spacing={2}>
        <Typography variant="h4" component="h1">
          Buat Diskusi Baru
        </Typography>
        <Controller
          name="title"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              label="Judul"
              fullWidth
              {...field}
              error={!!errors.title}
              helperText={errors.title?.message}
            />
          )}
        />
        <Controller
          name="category"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              label="Kategori"
              fullWidth
              {...field}
              error={!!errors.category}
              helperText={errors.category?.message}
            />
          )}
        />
        <Controller
          name="body"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              label="Isi"
              fullWidth
              multiline
              rows={4}
              {...field}
              error={!!errors.body}
              helperText={errors.body?.message}
            />
          )}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ bgcolor: "#2c3e50" }}
        >
          Buat
        </Button>
      </Stack>
    </Box>
  );
}

export default NewThreadForm;
