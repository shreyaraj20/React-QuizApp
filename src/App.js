import React, { Component } from "react";
import "./styles.css";
import Quiz from "./Quiz/Quiz";
class App extends Component {
  state = {
    visible: true
  };
  render() {
    return (
      <div className="App">
        {this.state.visible ? (
          <h1 className="heading">Test Your Knowledge</h1>
        ) : (
          <Quiz />
        )}
        <button
          className="button"
          onClick={() => {
            this.setState({ visible: false });
          }}
          visible={this.state.visible}
        >
          Start
        </button>
      </div>
    );
  }
}

export default App;
