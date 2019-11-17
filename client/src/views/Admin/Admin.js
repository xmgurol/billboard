import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Progress, TabContent, TabPane, Button, FormGroup, Label, Input } from 'reactstrap';

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
      fileSelectType1: 'Choose Type...',
      fileSelectType2: 'Choose Type...',
      fileSelectType3: 'Choose Type...',
      firstPane: <></>,
      secondPane: <></>,
      thirdPane: <></>,
      fourthPane: <></>
    };

    this._handleImageChange = this._handleImageChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleChange3 = this.handleChange3.bind(this);
  }

  _handleSubmit(e) {
    e.preventDefault();
    const data = new FormData();
    data.append('file', this.state.file);
    axios.post("http://localhost:7000/upload", data, {})
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
                <div align="left"><Button color="primary" onClick={() => { this.toggle(3, '1'); }}>Prev</Button></div>
              </Col>
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
                <div align="left"><Button color="primary" onClick={() => { this.toggle(3, '1'); }}>Prev</Button></div>
              </Col>
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
                    <Label htmlFor="select">File Type</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="select" value={this.state.fileSelectType1} onChange={this.handleChange1}>
                      <option value="image">Image</option>
                      <option value="text">Text</option>
                    </Input>
                  </Col>
                </FormGroup>
                <form onSubmit={this._handleSubmit}>
                  <input type="file" onChange={this._handleImageChange} />
                  <button type="submit" onClick={this._handleSubmit}>Upload</button>
                </form>
                {$imagePreview}
              </Col>
              <Col>
                <p>B:</p>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="select">File Type</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="select" value={this.state.fileSelectType2} onChange={this.handleChange2}>
                      <option value="image">Image</option>
                      <option value="text">Text</option>
                    </Input>
                  </Col>
                </FormGroup>
                <form onSubmit={this._handleSubmit}>
                  <input type="file" onChange={this._handleImageChange} />
                  <button type="submit" onClick={this._handleSubmit}>Upload</button>
                </form>
                {$imagePreview}
              </Col>
              <Col>
                <p>C:</p>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="select">File Type</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="select" value={this.state.fileSelectType3} onChange={this.handleChange3}>
                      <option value="image">Image</option>
                      <option value="text">Text</option>
                    </Input>
                  </Col>
                </FormGroup>
                <form onSubmit={this._handleSubmit}>
                  <input type="file" onChange={this._handleImageChange} />
                  <button type="submit" onClick={this._handleSubmit}>Upload</button>
                </form>
                {$imagePreview}
              </Col>
            </Row>
            <Row>
              <Col>
                <br />
                <div align="left"><Button color="primary" onClick={() => { this.toggle(3, '2'); }}>Prev</Button></div>
              </Col>
              <Col>
                <br />
                <div align="right"><Button color="primary" onClick={() => { this.toggle(3, '4'); }}>Next</Button></div>
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
                    <Label htmlFor="select">File Type</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="select" value={this.state.fileSelectType1} onChange={this.handleChange1}>
                      <option value="image">Image</option>
                      <option value="text">Text</option>
                    </Input>
                  </Col>
                </FormGroup>
                <form onSubmit={this._handleSubmit}>
                  <input type="file" onChange={this._handleImageChange} />
                  <button type="submit" onClick={this._handleSubmit}>Upload</button>
                </form>
                {$imagePreview}
              </Col>
              <Col>
                <p>B:</p>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="select">File Type</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="select" value={this.state.fileSelectType2} onChange={this.handleChange2}>
                      <option value="image">Image</option>
                      <option value="text">Text</option>
                    </Input>
                  </Col>
                </FormGroup>
                <form onSubmit={this._handleSubmit}>
                  <input type="file" onChange={this._handleImageChange} />
                  <button type="submit" onClick={this._handleSubmit}>Upload</button>
                </form>
                {$imagePreview}
              </Col>
              <Col>
                <p>C:</p>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="select">File Type</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="select" value={this.state.fileSelectType3} onChange={this.handleChange3}>
                      <option value="image">Image</option>
                      <option value="text">Text</option>
                    </Input>
                  </Col>
                </FormGroup>
                <form onSubmit={this._handleSubmit}>
                  <input type="file" onChange={this._handleImageChange} />
                  <button type="submit" onClick={this._handleSubmit}>Upload</button>
                </form>
                {$imagePreview}
              </Col>
            </Row>
            <Row>
              <Col>
                <br />
                <div align="left"><Button color="primary" onClick={() => { this.toggle(3, '2'); }}>Prev</Button></div>
              </Col>
              <Col>
                <br />
                <div align="right"><Button color="primary" onClick={() => { this.toggle(3, '4'); }}>Next</Button></div>
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

  handleChange1(event) {
    this.setState({ fileSelectType1: event.target.value }, function(){this.thirdPane();});
  }

  handleChange2(event) {
    this.setState({ fileSelectType2: event.target.value }, function(){this.thirdPane();});
  }

  handleChange3(event) {
    this.setState({ fileSelectType3: event.target.value }, function(){this.thirdPane();});
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
