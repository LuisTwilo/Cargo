import React from "react";
import "./Navbar.css";
import NavbarItem from "./NavbarItem";
import { Link } from "react-router-dom";
import { ReactComponent as Network } from "../assets/fontawesome-free-5.15.1-web/svgs/solid/network-wired.svg";
import { ReactComponent as Jobs } from "../assets/fontawesome-free-5.15.1-web/svgs/solid/poll-h.svg";
import { ReactComponent as Settings } from "../assets/fontawesome-free-5.15.1-web/svgs/solid/cog.svg";

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar__nav">
        <li className="navbar__item">
          <Link to="/">
            <div className = 'logo'>
              <span className="logo-text">CARGO</span>
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fad"
                data-icon="angle-double-right"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                class="svg-inline--fa fa-angle-double-right fa-w-14 fa-5x"
              >
                <g class="fa-group">
                  <path
                    fill="currentColor"
                    d="M224 273L88.37 409a23.78 23.78 0 0 1-33.8 0L32 386.36a23.94 23.94 0 0 1 0-33.89l96.13-96.37L32 159.73a23.94 23.94 0 0 1 0-33.89l22.44-22.79a23.78 23.78 0 0 1 33.8 0L223.88 239a23.94 23.94 0 0 1 .1 34z"
                    class="fa-secondary"
                  ></path>
                  <path
                    fill="currentColor"
                    d="M415.89 273L280.34 409a23.77 23.77 0 0 1-33.79 0L224 386.26a23.94 23.94 0 0 1 0-33.89L320.11 256l-96-96.47a23.94 23.94 0 0 1 0-33.89l22.52-22.59a23.77 23.77 0 0 1 33.79 0L416 239a24 24 0 0 1-.11 34z"
                    class="fa-primary"
                  ></path>
                </g>
              </svg>
            </div>
          </Link>
        </li>
        <li className="navbar__item">
          <Link to="/integration">
            <NavbarItem Icon={Network} label="Integrations" />
          </Link>
        </li>
        <li className="navbar__item">
          <Link to="/jobs">
            <NavbarItem Icon={Jobs} label="Jobs" />
          </Link>
        </li>
        <li className="navbar__item settings">
          <Link to="/settings">
            <NavbarItem Icon={Settings} label="Settings" />
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
