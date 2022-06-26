import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactTable from "react-table-v6"
import 'react-table-v6/react-table.css'

import { setMessage } from "../../../../actions/message.action";
import { useDispatch } from "react-redux";

import Message from "../../Message";
import { closeMessage } from "../../closeMessage";

export default function Member() {
  const [users, setUsers] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setMessage({ message: "" }));
    const fetchUsers = async () => {
      const res = await axios.get("/users");
      const datas = res.data.data;
      setUsers(datas);
      setUsersData(datas);
    };

    fetchUsers();
  }, [dispatch]);

  const handleChangeRole = async (id, value) => {
    const userExist = users.find(item => item._id === id);
    if (!userExist)
      return
    const res = await axios.put(`/users/updateRole/${id}`, { role: value });
    const { code, message, data } = res.data;
    setUsers(data);
    setUsersData(data);
    dispatch(setMessage({ code, message }));
    dispatch(closeMessage());
  };

  // locked user
  const handleLockUser = async (id, isDelete) => {
    const userExist = users.find(item => item._id === id);
    if (!userExist)
      return
    const res = await axios.post(`/users/locked/${id}`, {
      isDelete: !isDelete
    });
    const { code, message, data } = res.data;
    setUsers(data);
    setUsersData(data);
    dispatch(setMessage({ code, message }));
    dispatch(closeMessage());
  };

  // delete user
  const handleDeleteUser = async (id) => {
    const userExist = users.find(item => item._id === id);
    if (!userExist)
      return
    const res = await axios.delete(`/users/${id}`);
    const { code, message, data } = res.data;
    setUsers(data);
    setUsersData(data);
    dispatch(setMessage({ code, message }));
    dispatch(closeMessage());
  }

  // filter ROLE
  const hanldeFilterRole = (e) => {
    const role = e.target.value;
    if (role === "all") {
      setUsersData(users);
    } else {
      const rs = users.filter(user => user.role === role);
      setUsersData(rs);
    }
  };

  const columns = [
    {
      Header: "AVATAR",
      accessor: "image",
      sortable: false,
      filterable: false,
      maxWidth: 100,
      maxHeight: 100,
      Cell: props => {
        return (
          <div
            style={{
              maxHeight: "100px",
              width: "100%",
              overflow: "hidden"
            }}
          >
            <img
              src={`/uploads/users/${props.original.image}`}
              style={{ maxWidth: "100%", transform: "scale(1.5)" }}
              alt="avatar"
            />
          </div>
        );
      }
    },
    {
      Header: "TÊN",
      accessor: "username",
      sortable: true
    },
    {
      Header: "EMAIL",
      accessor: "email",
      sortable: true
    },
    {
      Header: "ROLE",
      filterable: false,
      sortable: true,
      Cell: props => {
        return (
          <React.Fragment>
            <div className="form-group">
              <span className="d-inline-block">
                <select
                  name="role"
                  className="form-control"
                  onChange={e =>
                    handleChangeRole(props.original._id, e.target.value)
                  }
                  value={props.original.role}
                >
                  <option value="admin">admin</option>
                  <option value="customer">customer</option>
                </select>
              </span>
              {props.original.isDelete ? (
                <i className="mdi mdi-account-off text-danger"></i>
              ) : (
                <i className="mdi mdi-account-check text-success"></i>
              )}
            </div>
          </React.Fragment>
        );
      }
    },
  ];
}
