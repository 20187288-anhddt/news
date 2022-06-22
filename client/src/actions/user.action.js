import axios from "axios";

export const addUser = data => ({
  type: "ADD",
  payload: data
});

const setUsers = (data) => ({
  type: "GET_USERS",
  payload: data
});

