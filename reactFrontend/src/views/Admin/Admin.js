import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Row, Progress, TabContent, TabPane, Nav, NavItem, NavLink, Button } from 'reactstrap';
import landscapeImage from '../../assets/img/landscape.png';
import portraitImage from '../../assets/img/portrait.png';

class Admin extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: new Array(4).fill('1'),
      file: '',
      imagePreviewUrl: '',
      verticalColor: 'primary',
      horizontalColor: 'primary',
      layoutFirstColor: 'primary',
      layoutSecondColor: 'primary',
      layoutThirdColor: 'primary',
      orientation: 0,
      layout: 0,
      progress: 0,
      secondPane: <></>,
      thirdPane: <></>,
      fourthPane: <></>
    };

    this._handleImageChange = this._handleImageChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _handleSubmit(e) {
    e.preventDefault();
    // TODO: do something with -> this.state.file
  }

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(file)
  }

  chooseOrientation(selection) {
    if (selection === 1) {
      this.setState({
        verticalColor: 'success',
        horizontalColor: 'primary',
        layoutFirstColor: 'primary',
        layoutSecondColor: 'primary',
        layoutThirdColor: 'primary',
        orientation: selection
      }, function () {
        this.secondPane();
      });
    }
    else {
      this.setState({
        verticalColor: 'primary',
        layoutFirstColor: 'primary',
        layoutSecondColor: 'primary',
        layoutThirdColor: 'primary',
        horizontalColor: 'success',
        orientation: selection
      }, function () {
        this.secondPane();
      });
    }

    if (this.state.progress === 0) {
      this.setState({
        progress: this.state.progress + 25
      });
    }
  }

  chooseLayout(selection) {
    if (selection === 1) {
      this.setState({
        layoutFirstColor: 'success',
        layoutSecondColor: 'primary',
        layoutThirdColor: 'primary',
        layout: selection
      }, function () {
        this.secondPane();
        this.thirdPane();
      });
    }
    else if (selection === 2) {
      this.setState({
        layoutFirstColor: 'primary',
        layoutSecondColor: 'success',
        layoutThirdColor: 'primary',
        layout: selection
      }, function () {
        this.secondPane();
        this.thirdPane();
      });
    }
    else {
      this.setState({
        layoutFirstColor: 'primary',
        layoutSecondColor: 'primary',
        layoutThirdColor: 'success',
        layout: selection
      }, function () {
        this.secondPane();
        this.thirdPane();
      });
    }

    if (this.state.progress === 25) {
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
                <div align="left"><Button color={this.state.layoutFirstColor} onClick={() => { this.chooseLayout(1); }}>Choose</Button></div>
              </Col>
              <Col>
                <div align="middle"><Button color={this.state.layoutSecondColor} onClick={() => { this.chooseLayout(2); }}>Choose</Button></div>
              </Col>
              <Col>
                <div align="right"><Button color={this.state.layoutThirdColor} onClick={() => { this.chooseLayout(3); }}>Choose</Button></div>
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
                <div align="left"><Button color={this.state.layoutFirstColor} onClick={() => { this.chooseLayout(1); }}>Choose</Button></div>
              </Col>
              <Col>
                <div align="middle"><Button color={this.state.layoutSecondColor} onClick={() => { this.chooseLayout(2); }}>Choose</Button></div>
              </Col>
              <Col>
                <div align="right"><Button color={this.state.layoutThirdColor} onClick={() => { this.chooseLayout(3); }}>Choose</Button></div>
              </Col>
            </Row>
          </>
      });
  }

  thirdPane() {
    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} />);
    }

    if (this.state.layout === 1)
      this.setState({
        thirdPane:
          <>
            <div>
              <form onSubmit={this._handleSubmit}>
                <input type="file" onChange={this._handleImageChange} />
                <button type="submit" onClick={this._handleSubmit}>Upload Image</button>
              </form>
              {$imagePreview}
            </div>
          </>
      });
    else
      this.setState({
        thirdPane:
          <>
            <div>
              <form onSubmit={this._handleSubmit}>
                <input type="file" onChange={this._handleImageChange} />
                <button type="submit" onClick={this._handleSubmit}>Upload Image</button>
              </form>
              {$imagePreview}
            </div>
          </>
      });
  }

  tabPane() {
    return (
      <>
        <TabPane tabId="1">
          <Row>
            <Col style="align=middle">
                <img src={landscapeImage} />
            </Col>
            <Col style="align=middle">
                <img src={portraitImage} />
            </Col>
          </Row>
          <Row>
            <Col>
              <br />
              <Button block color={this.state.verticalColor} onClick={() => { this.chooseOrientation(1); }}>Vertical</Button>
            </Col>
            <Col>
              <br />
              <Button block color={this.state.horizontalColor} onClick={() => { this.chooseOrientation(2); }}>Horizontal</Button>
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
                      <span className={this.state.activeTab[3] === '1' ? '' : 'd-none'}> Choose Orientation </span>
                      {'\u00A0'}<Badge color="success">New</Badge>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      active={this.state.activeTab[3] === '2'}
                      onClick={() => { this.toggle(3, '2'); }}
                    >
                      <i className="icon-basket-loaded"></i>
                      <span className={this.state.activeTab[3] === '2' ? '' : 'd-none'}> Choose Layout </span>
                      {'\u00A0'}<Badge pill color="danger">29</Badge>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      active={this.state.activeTab[3] === '3'}
                      onClick={() => { this.toggle(3, '3'); }}
                    >
                      <i className="icon-pie-chart"></i>
                      <span className={this.state.activeTab[3] === '3' ? '' : 'd-none'}> Choose & Upload Files </span>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      active={this.state.activeTab[3] === '4'}
                      onClick={() => { this.toggle(3, '4'); }}
                    >
                      <i className="icon-pie-chart"></i>
                      <span className={this.state.activeTab[3] === '4' ? '' : 'd-none'}> Show Preview & Publish </span>
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
