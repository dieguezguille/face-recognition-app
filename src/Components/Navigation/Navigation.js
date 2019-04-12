import React, { Component } from "react";

class Navigation extends Component {
  render() {
    const { onRouteChange, isSignedIn } = this.props;

    if (isSignedIn) {
      return (
        <nav style={{ display: "flex", justifyContent: "flex-end" }}>
          <p
            onClick={() => onRouteChange("SignOut")}
            className="f3 link dim white underline pa3 pointer"
          >
            Sign Out
          </p>
        </nav>
      );
    } else {
      return (
        <nav style={{ display: "flex", justifyContent: "flex-end" }}>
          <p
            onClick={() => onRouteChange("SignIn")}
            className="f3 link dim white underline pa3 pointer"
          >
            Sign In
          </p>
          <p
            onClick={() => onRouteChange("Register")}
            className="f3 link dim white underline pa3 pointer"
          >
            Register
          </p>
        </nav>
      );
    }
  }
}

export default Navigation;
