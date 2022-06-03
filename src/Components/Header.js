import React from "react";

import { AppBar, Toolbar, Button, Typography } from "@mui/material";

import "./Header.css";
import { getAuth, signOut } from "firebase/auth";
import { useState, useEffect, forceUpdate } from "react";
import firebase from "../firebase";
const auth = getAuth();

const UnLogined = () => {
  return (
    <div>
      <Button href="/Login" color="inherit">
        Login
      </Button>

      <Button href="/SignUp" id="modal2" color="inherit">
        Sign Up
      </Button>
    </div>
  );
};

const Logined = () => {
  return (
    <div>
      <Button
        onClick={() => {
          signOut(auth);
        }}
        color="inherit"
      >
        Sign out
      </Button>
    </div>
  );
};

const LiveUpdate = () => {
  const [date, setDate] = useState(new Date());

  function refreshLiveUpdate() {
    setDate(new Date());
    forceUpdate;
  }
  useEffect(() => {
    const timerId = setInterval(refreshLiveUpdate, 1000);
    return function cleanup() {
      clearInterval(timerId);
    };
  }, []);
};

const LogButtons = () => {
  if (auth.currentUser) {
    return <Logined />;
  } else {
    return <UnLogined />;
  }
};

const Header = () => {
  LiveUpdate();

  return (
    <AppBar position="static">
      <Toolbar>
        <Button href="/Home" color="inherit">
          Home
        </Button>
        <Button href="/Todo" color="inherit">
          Todo
        </Button>
        <Typography sx={{ flexGrow: 1 }}></Typography>
        <LogButtons />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
