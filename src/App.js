import React, { Component } from "react";
import Particles from "react-particles-js";
import Navigation from "./Components/Navigation/Navigation";
import SignIn from "./Components/SignIn/SignIn";
import Register from "./Components/Register/Register";
import FaceRecognition from "./Components/FaceRecognition/FaceRecognition";
import Logo from "./Components/Logo/Logo";
import Rank from "./Components/Rank/Rank";
import ImageLinkForm from "./Components/ImageLinkForm/ImageLinkForm";
import "./App.css";
import "tachyons";

const particlesOptions = {
  particles: {
    number: { value: 80, density: { enable: true, value_area: 800 } },
    color: { value: "#ffffff" },
    shape: {
      type: "circle",
      stroke: { width: 0, color: "#000000" },
      polygon: { nb_sides: 5 },
      image: { src: "img/github.svg", width: 100, height: 100 }
    },
    opacity: {
      value: 0.3,
      random: false,
      anim: { enable: false, speed: 0.5, opacity_min: 0.1, sync: false }
    },
    size: {
      value: 3,
      random: true,
      anim: { enable: false, speed: 20, size_min: 0.1, sync: false }
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#ffffff",
      opacity: 0.4,
      width: 1
    },
    move: {
      enable: true,
      speed: 3,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: { enable: false, rotateX: 600, rotateY: 1200 }
    }
  },
  retina_detect: true
};
const initialState = {
  input: "",
  imageUrl: "",
  box: {},
  route: "SignIn",
  isSignedIn: false,
  user: {
    id: "",
    name: "",
    entries: 0
  }
};
class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: "",
      box: {},
      route: "SignIn",
      isSignedIn: false,
      user: {
        id: "",
        name: "",
        entries: 0
      }
    };
  }

  loadUser = data => {
    this.setState(
      Object.assign(this.state.user, {
        id: data.id,
        name: data.name,
        entries: data.entries
      })
    );
  };

  calculateFaceLocation = response => {
    const clarifaiFace =
      response.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height
    };
  };

  displayFaceBox = box => {
    this.setState({
      box: box
    });
  };

  onInputChange = event => {
    this.setState({
      input: event.target.value
    });
  };

  onButtonSubmit = () => {
    this.setState({
      imageUrl: this.state.input
    });

    fetch("http://localhost:3000/imageurl", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        //Primero envio la id del usuario en JSON al server
        input: this.state.input
      })
    }).then(response => response.json())
      .then(response => {
        if (response) {
          //Actualizo la cantidad de entries del usuario
          fetch("http://localhost:3000/image", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              //Primero envio la id del usuario en JSON al server
              id: this.state.user.id
            })
          })
            //Parseo la respuesta del server a JSON
            .then(response => response.json())
            .then(count => {
              //Actualizo las entries del usuario que vienen del server
              this.setState(Object.assign(this.state.user, { entries: count }));
            })
            .catch(err => { console.log(err) })
        }
        //Dibujo el marco sobre la cara detectada
        this.displayFaceBox(this.calculateFaceLocation(response));
      })
      .catch(error => console.log(error));
  };

  onRouteChange = (route, loggedUserEntries, loggedUserId, loggedUserName) => {
    if (route === "SignOut") {
      this.setState(initialState);
    } else if (route === "Home") {
      this.setState({
        isSignedIn: true,
        user: {
          id: loggedUserId,
          name: loggedUserName,
          entries: loggedUserEntries
        }
      });
    } else if (route === "SignIn") {
      this.setState({ isSignedIn: false });
    }
    this.setState({
      route: route
    });
  };

  render() {
    const { isSignedIn, imageUrl, route, box } = this.state;
    return (
      <div className="App">
        <Particles params={particlesOptions} className="particles" />
        <Navigation
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
        />

        {route === "Home" ? (
          //Returns Home
          <div>
            <Logo />
            <Rank
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition box={box} imageUrl={imageUrl} />
          </div>
        ) : route === "SignIn" ? (
          //Returns SignIn
          <SignIn onRouteChange={this.onRouteChange} elRodre={this.rodre} />
        ) : (
              //Returns Register
              <Register
                loadUser={this.loadUser}
                onRouteChange={this.onRouteChange}
              />
            )}
      </div>
    );
  }
}

export default App;
