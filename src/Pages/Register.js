import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Link, Container, Typography, Paper, Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import { endLoader, startLoader } from "../store/loaderSlice";
import Page from "../component/Page";
import apiClient from "../service/service";
import toast from "react-hot-toast";
import LoginForm from "../component/models/LoginForm"
import RegisterForm from "../component/models/RegisterForm";

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
}));

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  // for handle login and remember the machine
  const onSubmit = async (item) => {
    try {
      let payload = {
        firstName: item.firstName,
        lastName: item.lastName,
        email: item.email,
        password: item.password,
      };
      const url = `/user/`;
      dispatch(startLoader())
      const response = await apiClient().post(url, payload, {
        withCredentials: true,
      });
      dispatch(endLoader())
      console.log('response',response)
      if (response.data) {
        navigate("/login", { replace: true });
        toast.success(response.data.message || "Success")
      }
    } catch (error) {
      dispatch(endLoader());
      console.log('error in login',error)
      toast.error(error.response.data.message || "Error while Login")
    }
  };

  const handleEvent = () => {
    setShow(!show);
  };

  return (
    <Page title="Register">
      <RootStyle>
        <Container maxWidth="lg">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <ContentStyle>
                <Paper elevation={3} sx={{ padding: "16px" }}>
                  <Typography variant="h4" gutterBottom>
                    Register
                  </Typography>
                  <Typography sx={{ color: "text.secondary", mb: 5 }}>
                    Enter your details below.
                  </Typography>
                  <RegisterForm onSubmit={onSubmit} />
                </Paper>
              </ContentStyle>
            </Grid>
           
          </Grid>
        </Container>
      </RootStyle>
    </Page>
  );
}
