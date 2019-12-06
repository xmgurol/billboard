import React, { Component } from 'react';
import {
  Button, Card, CardBody, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from 'reactstrap';
import axios from "axios";

class Register extends Component {

  constructor(props) {
    super(props);

    this.state = {
      failure: false
    };

    this.toggleFailure = this.toggleFailure.bind(this);
  }

  registerPressed() {
    var username1 = document.getElementById("username").value
    var password2 = document.getElementById("password").value
    console.log(username1, password2);
    const data = { username: username1, password: password2 }
    axios.get(`http://localhost:7000/register`, {
      auth: {
        username: data.username,
        password: data.password
      }
    })
      .then(res => {
        console.log(res);
        console.log('AXİOS İÇİ' + res.data);
        if (res.data !== "User already exists.") {
          this.props.history.push('/login');
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
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form>
                    <h1>Register</h1>
                    <p className="text-muted">Create your account</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" id="username" placeholder="Username" autoComplete="username" />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" id="password" placeholder="Password" autoComplete="new-password" />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" placeholder="Repeat password" autoComplete="new-password" />
                    </InputGroup>
                    <Button color="success" block onClick={() => { this.registerPressed() }}>Create Account</Button>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
        <Modal isOpen={this.state.failure} toggle={this.clickSubmit}
          className={'modal-warning ' + this.props.className}>
          <ModalHeader toggle={this.toggleSuccess}>Warning</ModalHeader>
          <ModalBody>
            User Already Exists
          </ModalBody>
          <ModalFooter>
            <Button color="warning" onClick={this.toggleFailure}>OK</Button>{' '}
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default Register;
