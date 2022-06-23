import React, { useEffect } from "react";
import { useSelector } from "react-redux";

export default function Infomation() {
  const {users} = useSelector(state => state);
  return (
    <ul className="list-group shadow">
      <li className="list-group-item text-muted">
        Thông tin <i className="fa fa-dashboard fa-1x" />
      </li>
      <li className="list-group-item text-left">
        <span>
          <strong>Tên: </strong>
        </span>
        {users.data?.username}
      </li>
      <li className="list-group-item text-left">
        <span>
          <strong>Email: </strong>
        </span>
        {users.data?.email}
      </li>
      <li className="list-group-item text-left">
        <span>
          <strong>Quyền: </strong>
        </span>
        {users.data?.role}
      </li>
    </ul>
  );
}
