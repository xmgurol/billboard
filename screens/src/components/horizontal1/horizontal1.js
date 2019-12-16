import React from 'react';
import './horizontal1.css';
import socketIOClient from "socket.io-client";

class horizontal1 extends React.Component {
    constructor() {
        super();
        this.state =
            {
                orientation: 0,
                layout: 0,
                FileA: "fox.jpg",
                FileB: "img_lights.jpg",
                FileC: "fox.jpg",
                endpoint: 'http://localhost:7000/'
            }
    }

    componentDidMount() {
        const { endpoint } = this.state;
        //Very simply connect to the socket
        const socket = socketIOClient(endpoint);
        //Listen for data on the "outgoing data" namespace and supply a callback for what to do when we get one. In this case, we set a state variable
        socket.on("changePictureOnScreen", data => this.setState({ FileA: data.FileA, FileB: data.FileB, FileC: data.FileC }));
    }
    render() {
        return (
            <div className="container-fluid">
                <div className="split1 left">
                    <div className="centered">
                        <img src={'http://localhost:7000/public/' + this.state.FileA} />
                    </div>
                </div>
                <div className="split1 middle">
                    <div className="centered">
                        <img src={'http://localhost:7000/public/' + this.state.FileB} />
                    </div>
                </div>
                <div className="split1 right">
                    <div className="centered">
                        <img src={'http://localhost:7000/public/' + this.state.FileC} />
                    </div>
                </div>
                <div>
                    <marquee>
                        CSE 492 - Engineering Project (2019 Spring)
                  </marquee>
                </div>
            </div>
        );
    }
}

export default horizontal1;


