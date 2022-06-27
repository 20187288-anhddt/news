import React from "react";
import { Link } from "react-router-dom";

export default function CheckAdmin(props) {
  return (
    <React.Fragment>
      {
        props.role === "admin"
          ? (
            <li className="nav-item dropdown">
              <Link to="/admin" className="nav-link text-color font-weight">
                Admin Dashboard
              </Link>
            </li>
          )
          : null
      }
    </React.Fragment>
  )
}