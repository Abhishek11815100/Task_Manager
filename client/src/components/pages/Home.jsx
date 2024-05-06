import React from 'react';
import { Button, Container, Typography, Paper, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Task from "../TaskList/task";
import {useSelector, useDispatch} from 'react-redux';
import { SaveProfile } from "../../redux/Actions/AuthActions";

const Home = () => {

  const authState = useSelector(state=>state.authReducer);
  const {loading, isLoggedIn} = authState;
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");
  const [flag,setFlag] = useState(false);

  const verifyCookie = async () => {
    console.log("e!!",cookies.token);
    
    // if (!cookies.token) {
    //   navigate("/login");
    // }
    const res = await axios.post('http://localhost:8000',
      {},
      { withCredentials: true }
    );
    const { status} = res;
    
    setUsername(res.data.user.username);
   
    
    return status
      ? (
      //   toast(`Hello ${res.data.user.username}`, {
      //     position: "top-right",
      // }),
      dispatch(SaveProfile()))
      : (removeCookie("token"));
  };

  useEffect(() => {
    if(!flag){
      verifyCookie();
    }
    setFlag(true);
  }, [flag]);
  
  const Logout = () => {
    removeCookie("token");
    navigate("/signup");
  };


  return (
    <>
      {/* <div className="home_page">
        <h4>
          {" "}
          Welcome <span>{username}</span>
        </h4>
        <button onClick={Logout}>LOGOUT</button>
      </div> */}

      {
        !isLoggedIn ? (
          <div>
              <Container maxWidth="md">
                <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
                  <Grid item xs={12} md={6}>
                    <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
                      <Typography variant="h4" gutterBottom>
                        Welcome to Task Management
                      </Typography>
                      <Typography paragraph>
                        Empower yourself and your team with efficient and intuitive task management. Stay organized, boost productivity, and achieve your goals effortlessly.
                      </Typography>
                      <Link to="/login" style={{ textDecoration: 'none' }}>
                        <Button variant="contained" color="primary">
                          Get Started
                        </Button>
                      </Link>
                    </Paper>
                  </Grid>
                </Grid>
              </Container>
          </div>
        ): (
          <div>
            <h1>Welcome {username}</h1>
            <Task/>
          </div>
        )
      }
      <ToastContainer />
    </>
  );
};

export default Home;