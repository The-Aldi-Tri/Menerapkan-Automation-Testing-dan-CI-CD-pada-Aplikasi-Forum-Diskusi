import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link } from "react-router";
import * as yup from "yup";
import { asyncSetAuthUser } from "../states/authUser/authUserThunk";

const loginSchema = yup.object({
  email: yup.string().email().required(),
  password: yup
    .string()
    .min(8)
    .matches(/[a-z]/, "Must include at least one lowercase letter")
    .matches(/[A-Z]/, "Must include at least one uppercase letter")
    .matches(/\d/, "Must include at least one number")
    .required(),
});

function LoginForm() {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onChange",
  });

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(asyncSetAuthUser(data));
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <Stack spacing={2}>
        <Typography variant="h4" component="h1">
          Login
        </Typography>
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              label="Email"
              autoComplete="email"
              fullWidth
              {...field}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              label="Password"
              type="password"
              autoComplete="current-password"
              fullWidth
              {...field}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          )}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            bgcolor: "#2c3e50",
            "&:hover": {
              bgcolor: "#1a252f",
            },
          }}
        >
          Login
        </Button>
        <Box sx={{ textAlign: "left" }}>
          <Typography variant="body2">
            Belum punya akun? <Link to="/register">Daftar di sini.</Link>
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
}

export default LoginForm;
