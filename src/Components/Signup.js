import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Card, useFormControl } from "@mui/material";

import { useState } from "react";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import user from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

const theme = createTheme();
const auth = getAuth();

if (!auth.currentUser) {
  userID = "No user";
} else {
  userID = auth.currentUser.uid;
}

export default function SignUp() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [passwordConfirm, setPasswordConfirm] = React.useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordConfirmError, setPasswordConfirmError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const authentication = getAuth();
    createUserWithEmailAndPassword(authentication, email, password);

    setEmailError(false);
    setNameError(false);
    setPasswordError(false);

    setPasswordConfirmError(false);

    if (name == "") {
      setNameError(true);
    }

    if (email == "") {
      setEmailError(true);
    }
    if (password == "") {
      setPasswordError(true);
    }
    if (passwordConfirm == "") {
      setPasswordConfirmError(true);
    }
    if (passwordConfirm !== password) {
      setPasswordConfirmError(true);
    }
    console.log(auth.currentUser.uid);
    function handleClick(e) {
      e.preventDefault();
      console.log(auth.currentUser.uid);
    }
  };

  const authh = getAuth();

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <Card>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column"
              }}
              component="form"
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              <TextField
                onChange={(e) => setEmail(e.target.value)}
                label="Email"
                variant="outlined"
                error={emailError}
                required
                margin="normal"
                value={email}
                sx={{
                  marginLeft: "20px",
                  marginRight: "20px"
                }}
              />
              <TextField
                onChange={(e) => setPassword(e.target.value)}
                label="Password"
                variant="outlined"
                error={passwordError}
                margin="normal"
                required
                value={password}
                sx={{
                  marginLeft: "20px",
                  marginRight: "20px"
                }}
              />
              <TextField
                onChange={(e) => setPasswordConfirm(e.target.value)}
                label="Password Confirm"
                variant="outlined"
                error={passwordConfirmError}
                margin="normal"
                required
                value={passwordConfirm}
                sx={{
                  marginLeft: "20px",
                  marginRight: "20px"
                }}
              />
              <Button type="submit">Sign up</Button>

              <Button
                color="primary"
                onClick={() => {
                  console.log(userID);
                }}
              >
                Primary
              </Button>
            </Box>
          </Card>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
