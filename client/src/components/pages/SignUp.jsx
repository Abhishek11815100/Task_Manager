import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Box,
} from "@mui/material";

const Signup = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    username: "",
  });
  const { email, password, username } = inputValue;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });

  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-right",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://task-manager-aq2n.onrender.com/signup",
        {
          ...inputValue,
        },
        { withCredentials: true }
      );
      const { success, message } = data;
      if (success) {
        handleSuccess(message);

        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
    }
    setInputValue({
      email: "",
      password: "",
      username: "",
    });
  };

  return (
    <Container maxWidth="sm">
      <Grid
        container
        spacing={3}
        justifyContent="center"
        alignItems="center"
        style={{ height: "100vh" }}
      >
        <Grid item xs={12}>
          <Paper elevation={3} style={{ padding: "20px" }}>
            <Typography variant="h5" align="center" gutterBottom>
              Signup for Your Account
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={email}
                onChange={handleOnChange}
                margin="normal"
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Username"
                name="username"
                value={username}
                onChange={handleOnChange}
                margin="normal"
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                name="password"
                value={password}
                onChange={handleOnChange}
                margin="normal"
                variant="outlined"
              />
              <Box mt={2} mb={1} textAlign="center">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={!email || !password || !username}
                >
                  Submit
                </Button>
              </Box>
            </form>
            <Typography align="center">
              Already have an account? <Link to="/login">Login</Link>
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      <ToastContainer />
    </Container>
  );
};

export default Signup;
