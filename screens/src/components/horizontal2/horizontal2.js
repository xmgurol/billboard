import React from 'react';
import './horizontal2.css';
import socketIOClient from "socket.io-client";

class horizontal2 extends React.Component {
    constructor() {
        super();
        this.state =
            {
                orientation: 0,
                layout: 0,
                FileA: "fox.jpg",
                FileB: "img_lights.jpg",
                endpoint: 'http://localhost:7000/'
            }
    }

    componentDidMount() {
        const { endpoint } = this.state;
        //Very simply connect to the socket
        const socket = socketIOClient(endpoint);
        //Listen for data on the "outgoing data" namespace and supply a callback for what to do when we get one. In this case, we set a state variable
        socket.on("changePictureOnScreen", data => this.setState({ FileA: data.FileA, FileB: data.FileB }));
    }
    render() {
        return (
            <div className="container-fluid">
                <div className="split left">
                    <div className="centered">
                    <img src={'http://localhost:7000/public/' + this.state.FileA} />
                    </div>
                </div>
                <div className="split right">
                    <div className="centered">
                    <img src={'http://localhost:7000/public/' + this.state.FileB} />
                    </div>
                </div>
                <div className="container-fluid">
                    <marquee>
                        CSE 492 - Engineering Project (2019 Spring)
				</marquee>
                </div>
            </div>
        );
    }
}

export default horizontal2;


