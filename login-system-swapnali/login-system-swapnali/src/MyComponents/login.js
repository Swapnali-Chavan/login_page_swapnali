import React, { useState } from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
  Alert,
} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import LoginIcon from "@mui/icons-material/Login";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 280,
    margin: "30px auto",
  };
  const avatarStyle = { backgroundColor: "blue" };
  const btnstyle = { margin: "8px 0" };
  const typestyle = { margin: "8px 0" };

  const handleLogin = () => {
    if (username === "" || password === "") {
      setError("Please enter both username and password.");
      return;
    }
    else if(username === "swapnali@gmail.com" || password === "abc@1234"){
        navigate("dashboard");
    }
    else{
        setError("Invalid Credentials");
        return;
    }

    fetch("https://rickandmortyapi.com/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((data) => {
        // Perform any necessary login handling
        //   setLoggedIn(true);
        setUsername(username);
      })
      .catch((error) => {
        console.error("Error logging in:", error);
      });
  };

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        {error && <Alert severity="error">{error}</Alert>}

        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LoginIcon />
          </Avatar>
          <h2>Login</h2>
        </Grid>

        <TextField
          label="Username"
          placeholder="Enter username"
          type="email"
          variant="standard"
          onChange={handleUsernameChange}
          fullWidth
          required
        />

        <TextField
          label="Password"
          type="password"
          placeholder="Enter password"
          variant="standard"
          onChange={handlePasswordChange}
          fullWidth
          required
        />

        <FormControlLabel control={<Checkbox />} label="Remember me" />

        <Button
          type="submit"
          variant="contained"
          onClick={handleLogin}
          style={btnstyle}
          fullWidth
        >
          Login
        </Button>

        <Typography style={typestyle}>
          <Link href="#">Forgot Password?</Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default Login;
