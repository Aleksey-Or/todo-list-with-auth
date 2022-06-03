import React from "react";
import Button from "@mui/material/Button";
import Firebase from "../firebase";
import { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { getAuth } from "firebase/auth";
import Container from "@mui/material/Container";
import {
  collection,
  addDoc,
  query,
  orderBy,
  where,
  onSnapshot,
  snapshot
} from "firebase/firestore";

import LiveUpdate from "./Header";
import db from "../firebase";
const taskCollection = collection(db, "tasks");
const auth = getAuth();

const userEmail = () => {
  if (auth.currentUser) {
    return auth.currentUser.email;
  } else {
    return "UnLogined ";
  }
};

const Todo = () => {
  LiveUpdate();
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [techList, setTechList] = useState([]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(taskCollection, {
        task: task,
        userEmail: userEmail
      });
    } catch (err) {
      alert(err);
    }
  };

  const getTasks = async () => {
    try {
      const list = [];
      var snapshot = await taskCollection.get();
      snapshot.forEach((doc) => {
        list.push(doc.data().task);
      });
      setTechList([...list]);
      console.log(list);
    } catch (e) {
      alert("error");
    }
  };
  console.log(techList);

  return (
    <Container>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <TextField
          onChange={(e) => setTask(e.target.value)}
          fullWidth
          id="standard-basic"
          label="Enter your tasks"
          variant="standard"
          value={task}
        />
        <Button
          onClick={handleSubmit}
          sx={{
            marginTop: 2
          }}
          variant="outlined"
        >
          Add
        </Button>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        ></Box>
      </Box>
    </Container>
  );
};

export default Todo;
