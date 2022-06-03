import React from "react";
import Home from "./Components/Home.js";
import Header from "./Components/Header.js";
import Todo from "./Components/Todo.js";
import Login from "./Components/Login.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { useState, useEffect } from "react";
import Register from "./Components/Signup.js";
import { AuthContextProvider, useAuthState } from "./firebase";
import AuthProvider from "firebase/auth";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const App = () => {
  return (
    <AuthContextProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/Todo" element={<Todo />} />
          <Route path="/Login" element={<Login />} />

          <Route path="/SignUp" element={<Register />} />
        </Routes>
      </Router>
    </AuthContextProvider>
  );
};

export default App;
