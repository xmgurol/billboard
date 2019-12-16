import React from 'react';
import Horizontal1 from "./components/horizontal1/horizontal1";
import Horizontal2 from "./components/horizontal2/horizontal2";
import socketIOClient from "socket.io-client";

class App extends React.Component {
  constructor() {
    super();
    this.state =
      {
        //orientation: 0,
        layout: 0,
        layoutToShow: <><Horizontal1 /></>,
        endpoint: 'http://localhost:7000/'
      }
  }

  componentDidMount() {
    const { endpoint } = this.state;

    //Very simply connect to the socket
    const socket = socketIOClient(endpoint);

    //Listen for data on the "outgoing data" namespace and 
    //supply a callback for what to do when we get one. In this case, we set a state variable
    socket.on("changePictureOnScreen", (data) => {
      console.log(data);
      this.setState({
        layoutToShow: data.Layout === 1 ? <><Horizontal1 /></> : <><Horizontal2 /></>,
        FileA: data.FileA,
        FileB: data.FileB,
        FileC: data.FileC
      });
    });
  }

  render() {
    return (
      <>{this.state.layoutToShow}</>
    )
  }
}

export default App;