import * as React from "react";

import Button from "@mui/material/Button";

import TextField from "@mui/material/TextField";

import Box from "@mui/material/Box";
import { useState } from "react";

import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Card } from "@mui/material";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const theme = createTheme();

function SignIn() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [curUser, setCurUser] = useState(null);
  const auth = getAuth();
  const user = auth.currentUser;
  const handleSubmit = (e) => {
    e.preventDefault();
    const authentication = getAuth();
    signInWithEmailAndPassword(authentication, email, password);

    setEmailError(false);
    setPasswordError(false);
    setCurUser(auth.currentUser);
    if (email === "") {
      setEmailError(true);
    }
    if (password === "") {
      setPasswordError(true);
    }

    if (password && email) {
      console.log(password, email);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
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
              <Button type="submit">Login</Button>
            </Box>
          </Card>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default SignIn;
