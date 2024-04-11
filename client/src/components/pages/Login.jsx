import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { Button, Container, CssBaseline, TextField, Typography, Grid, Paper } from "@mui/material";
import { styled } from "@mui/system";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { postLoginData } from '../../redux/Actions/AuthActions'

const FormContainer = styled(Paper)({
  padding: "20px",
  textAlign: "center",
});

const LoginButton = styled(Button)({
  marginTop: "20px",
});

const SignUpLink = styled(Link)({
  marginTop: "10px",
  display: "block",
  textDecoration: "none",
});

const Login = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputValue;

  const authState = useSelector(state => state.authReducer);
  const { loading, isLoggedIn } = authState;
  const dispatch = useDispatch();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [authState, isLoggedIn]);

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });

  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-left",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        'http://localhost:8000/login',
        {
          ...inputValue,
        },
        { withCredentials: true }
      );

      const { success, message } = data;
      if (success) {
        handleSuccess(message);

        dispatch(postLoginData(email, password, navigate));
      } else {
        handleError(message);
      }
    } catch (error) {
      console.error(error);
      handleError("An error occurred. Please try again.");
    }

    setInputValue({
      ...inputValue,
      email: "",
      password: "",
    });
  };

  return (
    <Container component="main" maxWidth="xs" style={{ padding: '20px' }}>
      <CssBaseline />
      <FormContainer elevation={3}>
        <Typography component="h1" variant="h5">
          Login Account
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={email}
            onChange={handleOnChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={handleOnChange}
          />
          <LoginButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          
          </LoginButton>
          <SignUpLink to="/signup">
            Don't have an account? Sign Up
          </SignUpLink>
        </form>
      </FormContainer>
      <ToastContainer />
    </Container>
  );
};

export default Login;
