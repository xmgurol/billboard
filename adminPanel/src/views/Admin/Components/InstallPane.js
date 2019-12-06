import React from 'react';
import { Col, Row, TabPane, Button } from 'reactstrap';
import OrientationPane from './OrientationPane';
import landscapeImage from '../../../assets/img/landscape.png';
import portraitImage from '../../../assets/img/portrait.png';

const InstallPane = () => {
    return (
    <>
      <TabPane tabId="1">
        <Row>
          <Col style={{ top: "40px", textAlign: "center" }}>
            <img src={landscapeImage} />
          </Col>
          <Col style={{ textAlign: "center" }}>
            <img src={portraitImage} />
          </Col>
        </Row>
        <Row>
          <Col>
            <br />
            <Button block color={OrientationPane.state.verticalColor} onClick={() => { OrientationPane.chooseOrientation(1); }}>Vertical</Button>
          </Col>
          <Col>
            <br />
            <Button block color={OrientationPane.state.horizontalColor} onClick={() => { OrientationPane.chooseOrientation(2); }}>Horizontal</Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <br />
            <div align="right"><Button color="primary" onClick={() => { this.toggle(3, '2'); }}>Next</Button></div>
          </Col>
        </Row>
      </TabPane>
      <TabPane tabId="2">
        {this.state.secondPane}
      </TabPane>
      <TabPane tabId="3">
        {this.state.thirdPane}
      </TabPane>
      <TabPane tabId="4">
        {this.state.fourthPane}
      </TabPane>
    </>
  );
};

export default InstallPane;