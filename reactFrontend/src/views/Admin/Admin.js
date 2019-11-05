import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Row, Progress, TabContent, TabPane, Nav, NavItem, NavLink, Button, FormGroup, Label, Input } from 'reactstrap';

import landscapeImage from '../../assets/img/landscape.png';
import portraitImage from '../../assets/img/portrait.png';

import landscape1 from '../../assets/img/landscape1.png';
import landscape2 from '../../assets/img/landscape2.png';
import landscape3 from '../../assets/img/landscape3.png';

import portrait1 from '../../assets/img/portrait1.png';
import portrait2 from '../../assets/img/portrait2.png';
import portrait3 from '../../assets/img/portrait3.png';

import axios from "axios";

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
    const data = new FormData()
    data.append('file', this.state.file);
    axios.post("http://localhost:7000/upload", data, {
    })
      .then(res => {
        console.log(res.statusText);
      });
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

    this.setState({
      progress: 25
    });
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

    this.setState({
      progress: 50
    });
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
              <Col style={{ textAlign: "center" }}>
                <img src={landscape1} />
              </Col>
              <Col style={{ textAlign: "center" }}>
                <img src={landscape2} />
              </Col>
              <Col style={{ textAlign: "center" }}>
                <img src={landscape3} />
              </Col>
            </Row>
            <Row>
              <Col>
                <br />
                <div align="left"><Button block color={this.state.layoutFirstColor} onClick={() => { this.chooseLayout(1); }}>Choose</Button></div>
              </Col>
              <Col>
                <br />
                <div align="middle"><Button block color={this.state.layoutSecondColor} onClick={() => { this.chooseLayout(2); }}>Choose</Button></div>
              </Col>
              <Col>
                <br />
                <div align="right"><Button block color={this.state.layoutThirdColor} onClick={() => { this.chooseLayout(3); }}>Choose</Button></div>
              </Col>
            </Row>
            <Row>
              <Col>
                <br />
                <div align="right"><Button color="primary" onClick={() => { this.toggle(3, '3'); }}>Next</Button></div>
              </Col>
            </Row>
          </>
      });
    else
      this.setState({
        secondPane:
          <>
            <Row>
              <Col style={{ textAlign: "center" }}>
                <img src={portrait1} />
              </Col>
              <Col style={{ textAlign: "center" }}>
                <img src={portrait2} />
              </Col>
              <Col style={{ textAlign: "center" }}>
                <img src={portrait3} />
              </Col>
            </Row>
            <Row>
              <Col>
                <br />
                <div align="left"><Button block color={this.state.layoutFirstColor} onClick={() => { this.chooseLayout(1); }}>Choose</Button></div>
              </Col>
              <Col>
                <br />
                <div align="middle"><Button block color={this.state.layoutSecondColor} onClick={() => { this.chooseLayout(2); }}>Choose</Button></div>
              </Col>
              <Col>
                <br />
                <div align="right"><Button block color={this.state.layoutThirdColor} onClick={() => { this.chooseLayout(3); }}>Choose</Button></div>
              </Col>
            </Row>
            <Row>
              <Col>
                <br />
                <div align="right"><Button color="primary" onClick={() => { this.toggle(3, '3'); }}>Next</Button></div>
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
            <Row>
              <Col>
                <p>A:</p>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="select">Select</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="select" name="select-a" id="select-a">
                      <option value="0">Please select</option>
                      <option value="1">Option #1</option>
                      <option value="2">Option #2</option>
                      <option value="3">Option #3</option>
                    </Input>
                  </Col>
                </FormGroup>
                <form onSubmit={this._handleSubmit}>
                  <input type="file" accept=".png,.jpg,.jpeg" onChange={this._handleImageChange} />
                  <button type="submit" onClick={this._handleSubmit}>Upload Image</button>
                </form>
                {$imagePreview}
              </Col>
              <Col>
                <p>A:</p>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="select">Select</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="select" name="select-b" id="select-b">
                      <option value="0">Please select</option>
                      <option value="1">Option #1</option>
                      <option value="2">Option #2</option>
                      <option value="3">Option #3</option>
                    </Input>
                  </Col>
                </FormGroup>
                <form onSubmit={this._handleSubmit}>
                  <input type="file" onChange={this._handleImageChange} />
                  <button type="submit" onClick={this._handleSubmit}>Upload Image</button>
                </form>
                {$imagePreview}
              </Col>
              <Col>
                <p>A:</p>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="select">Select</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="select" name="select-c" id="select-c">
                      <option value="0">Please select</option>
                      <option value="1">Option #1</option>
                      <option value="2">Option #2</option>
                      <option value="3">Option #3</option>
                    </Input>
                  </Col>
                </FormGroup>
                <form onSubmit={this._handleSubmit}>
                  <input type="file" onChange={this._handleImageChange} />
                  <button type="submit" onClick={this._handleSubmit}>Upload Image</button>
                </form>
                {$imagePreview}
              </Col>
            </Row>
          </>
      });
    else
      this.setState({
        thirdPane:
          <>
            <Row>
              <Col>
                <p>A:</p>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="select">Select</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="select" name="select-a" id="select-a">
                      <option value="0">Please select</option>
                      <option value="1">Option #1</option>
                      <option value="2">Option #2</option>
                      <option value="3">Option #3</option>
                    </Input>
                  </Col>
                </FormGroup>
                <form onSubmit={this._handleSubmit}>
                  <input type="file" onChange={this._handleImageChange} />
                  <button type="submit" onClick={this._handleSubmit}>Upload Image</button>
                </form>
                {$imagePreview}
              </Col>
              <Col>
                <p>A:</p>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="select">Select</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="select" name="select-b" id="select-b">
                      <option value="0">Please select</option>
                      <option value="1">Option #1</option>
                      <option value="2">Option #2</option>
                      <option value="3">Option #3</option>
                    </Input>
                  </Col>
                </FormGroup>
                <form onSubmit={this._handleSubmit}>
                  <input type="file" onChange={this._handleImageChange} />
                  <button type="submit" onClick={this._handleSubmit}>Upload Image</button>
                </form>
                {$imagePreview}
              </Col>
              <Col>
                <p>A:</p>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="select">Select</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="select" name="select-c" id="select-c">
                      <option value="0">Please select</option>
                      <option value="1">Option #1</option>
                      <option value="2">Option #2</option>
                      <option value="3">Option #3</option>
                    </Input>
                  </Col>
                </FormGroup>
                <form onSubmit={this._handleSubmit}>
                  <input type="file" onChange={this._handleImageChange} />
                  <button type="submit" onClick={this._handleSubmit}>Upload Image</button>
                </form>
                {$imagePreview}
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
              <Button block color={this.state.verticalColor} onClick={() => { this.chooseOrientation(1); }}>Vertical</Button>
            </Col>
            <Col>
              <br />
              <Button block color={this.state.horizontalColor} onClick={() => { this.chooseOrientation(2); }}>Horizontal</Button>
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
