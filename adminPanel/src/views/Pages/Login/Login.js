import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader } from 'reactstrap';
import axios from "axios";

class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      failure: false
    };

    this.toggleFailure = this.toggleFailure.bind(this);
  }

  loginPressed() {
    var username1 = document.getElementById("username").value
    var password2 = document.getElementById("password").value
    console.log(username1, password2);
    const data = { username: username1, password: password2 }
    axios.get(`http://localhost:7000/login`, {
        auth: {
            username: data.username,
            password: data.password
        }
    })
    .then(res => {
        console.log(res);
        console.log('AXİOS İÇİ' + res.data);
        if (res.data.length > 0 ) {
          this.props.history.push('/admin');
        }
        else {
          this.setState({ failure: true });
        }
    });
  }

  toggleFailure() {
    this.setState({
      failure: false,
    });
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" id="username" placeholder="Username" autoComplete="username" />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" id="password" placeholder="Password" autoComplete="current-password" />
                      </InputGroup>
                      <Row>
                        <Col>
                          <Button color="primary" className="px-4" onClick={()=>{this.loginPressed()}}>Login</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>Seviyom çok.</p>
                      <Link to="/register">
                        <Button color="primary" className="mt-3" active tabIndex={-1}>Register Now!</Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
        <Modal isOpen={this.state.failure} toggle={this.clickSubmit}
          className={'modal-warning ' + this.props.className}>
          <ModalHeader toggle={this.toggleSuccess}>Warning</ModalHeader>
          <ModalBody>
            User Not Found.
          </ModalBody>
          <ModalFooter>
            <Button color="warning" onClick={this.toggleFailure}>OK</Button>{' '}
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default Login;
