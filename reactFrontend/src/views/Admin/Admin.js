import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Row, Progress, TabContent, TabPane, Nav, NavItem, NavLink, Button } from 'reactstrap';

var alreadySelected = false;

class Admin extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: new Array(4).fill('1'),
      verticalColor: 'primary',
      horizontalColor: 'primary',
      orientation: 0,
      progress: 0,
      secondPane: <></>,
      thirdPane: <></>,
      fourthPane: <></>
    };
  }

  chooseOrientation(selection) {
    if (selection === 1)
      this.setState({
        verticalColor: 'success',
        horizontalColor: 'primary',
        orientation: selection
      }, function () {
        this.secondPane();
      });
    else
      this.setState({
        verticalColor: 'primary',
        horizontalColor: 'success',
        orientation: selection
      }, function () {
        this.secondPane();
      });

    if (alreadySelected === false) {
      alreadySelected = true;
      this.setState({
        progress: this.state.progress + 25
      });
    }
  }

  toggle(tabPane, tab) {
    const newArray = this.state.activeTab.slice()
    newArray[tabPane] = tab
    this.setState({
      activeTab: newArray,
    });
  }

  publish() {

  }

  secondPane() {
    if (this.state.orientation === 1)
      this.setState({
        secondPane:
        <>
          <Row>
            <Col>
              <div align="right"><Button color="primary" onClick={() => { this.toggle(3, '3'); }}>A</Button></div>
            </Col>
          </Row>
        </>
      });
    else
      this.setState({
        secondPane:
        <>
          <Row>
            <Col>
              <div align="right"><Button color="primary" onClick={() => { this.toggle(3, '3'); }}>B</Button></div>
            </Col>
          </Row>
        </>
      });
  }

  tabPane() {
    return (
      <>
        <TabPane tabId="1">
          <Row>
            <Col>
              <Button color={this.state.verticalColor} onClick={() => { this.chooseOrientation(1); }}>Vertical</Button>
            </Col>
            <Col>
              <Button color={this.state.horizontalColor} onClick={() => { this.chooseOrientation(2); }}>Horizontal</Button>
            </Col>
          </Row>
          <Row>
            <Col>
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
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader className="bg-white">
                <div className="text-center">Progress</div>
                <Progress value={this.state.progress} className="mb-3">{this.state.progress}%</Progress>
              </CardHeader>
              <CardBody>
                <Nav tabs>
                  <NavItem>
                    <NavLink
                      active={this.state.activeTab[3] === '1'}
                      onClick={() => { this.toggle(3, '1'); }}
                    >
                      <i className="icon-calculator"></i>
                      <span className={this.state.activeTab[3] === '1' ? '' : 'd-none'}>AAAAAAAAAAAAAAAAAAAAAAA</span>
                      {'\u00A0'}<Badge color="success">New</Badge>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      active={this.state.activeTab[3] === '2'}
                      onClick={() => { this.toggle(3, '2'); }}
                    >
                      <i className="icon-basket-loaded"></i>
                      <span className={this.state.activeTab[3] === '2' ? '' : 'd-none'}>BBBBBBBBBBBBBBBBBBBBBBBBBB</span>
                      {'\u00A0'}<Badge pill color="danger">29</Badge>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      active={this.state.activeTab[3] === '3'}
                      onClick={() => { this.toggle(3, '3'); }}
                    >
                      <i className="icon-pie-chart"></i>
                      <span className={this.state.activeTab[3] === '3' ? '' : 'd-none'}>CCCCCCCCCCCCCCCCCCCCCCCCC</span>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      active={this.state.activeTab[3] === '4'}
                      onClick={() => { this.toggle(3, '4'); }}
                    >
                      <i className="icon-pie-chart"></i>
                      <span className={this.state.activeTab[3] === '4' ? '' : 'd-none'}>DDDDDDDDDDDDDDDDDDDDDDDD</span>
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab[3]}>
                  {this.tabPane()}
                </TabContent>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Admin;
