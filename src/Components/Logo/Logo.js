import React, { Component } from "react";
import Tilt from "react-tilt";
import "../Logo/Logo.css";
import brain from "../Logo/brain.svg";

class Logo extends Component {
  render() {
    return (
      <div className="ma4 mt0">
        <Tilt
          className="Tilt br2 shadow-2"
          options={{ max: 15 }}
          style={{ height: 100, width: 100 }}
        >
          <div className="Tilt-inner">
            <img
              className="relative dib"
              style={{ paddingTop: "10px" }}
              alt="Brain Logo"
              width="80px"
              height="80px"
              src={brain}
            />
          </div>
        </Tilt>
      </div>
    );
  }
}

export default Logo;
