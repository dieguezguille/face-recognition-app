import React, { Component } from "react";

class Rank extends Component {
  render() {
    const {userName, entries} = this.props;
    return (
      <div>
        <div className="white f3">
          {`${userName}, your current entry count is...`}
        </div>
        <div className="white f1">
            {entries}
        </div>
      </div>
    );
  }
}

export default Rank;
