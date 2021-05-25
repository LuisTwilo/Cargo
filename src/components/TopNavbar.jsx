import React from "react";
import { Link } from "react-router-dom";


import "./TopNavbar.css";

function TopNavbar() {
  return (
    <nav className="topNavbar">
      <ul>
        <li>
          <Link>
            <div className="item"> logout</div>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default TopNavbar;
