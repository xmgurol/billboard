import React, { Component } from 'react';

class Orientation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            verticalColor: 'primary',
            horizontalColor: 'primary',
            orientation: 0,
        }
    }

    chooseOrientation(selection) {
        if (selection === 1) {
            this.setState({
                verticalColor: 'success',
                horizontalColor: 'primary',
                orientation: selection
            });
        }
        else {
            this.setState({
                verticalColor: 'primary',
                horizontalColor: 'success',
                orientation: selection
            });
        }
    }
}

export default Orientation;