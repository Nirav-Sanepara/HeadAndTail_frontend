import * as Yup from "yup";
import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, Stack, IconButton, InputAdornment, Button, Typography} from "@mui/material";
import Iconify from "../Iconify";
import { FormProvider, RHFTextField } from "../hook-form";

export default function LoginForm({ onSubmit }) {
  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      // .min(6, "Password must be at least 6 characters long"),
  });

  const defaultValues = {
    email: "",
    password: "",
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} sx={{ my: 2 }}>
          <RHFTextField name="email" label="Email Address" />

          <RHFTextField
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    <Iconify
                      icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>

        <Typography
          variant="body2"
          sx={{ my: 3, textAlign: "center" }}
        >
          Don't have account? Create{" "}
          <Link
            variant="subtitle2"
            href="/register"
            style={{ cursor: "pointer" }}
          >
            New user
          </Link>
        </Typography>

        <Button
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Login
        </Button>
      </FormProvider>
    </>
  );
}
