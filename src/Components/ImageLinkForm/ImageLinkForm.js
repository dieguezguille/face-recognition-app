import React, { Component } from "react";
import "../ImageLinkForm/ImageLinkForm.css";

class ImageLinkForm extends Component {
  render() {
    //Destructuring props to pass onInputChange method
    const { onInputChange, onButtonSubmit } = this.props;
    return (
      <div>
        <p className="f3 white">
          {"This magic brain will detect faces. Give it a try"}
        </p>
        <div className="center">
          <div className="form center pa4 br3 shadow-5">
            <input
              className="f4 pa2 w-70 center"
              type="text"
              onChange={onInputChange}
            />
            <button
              className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple"
              onClick={onButtonSubmit}
            >
              Detect
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ImageLinkForm;
