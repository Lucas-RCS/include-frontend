import React from "react";
import "./App.scss";

class App extends React.Component<any, any> {
  render() {
    return (
      <>
        {this.props.children}
      </>
    );
  }
}

export default App;