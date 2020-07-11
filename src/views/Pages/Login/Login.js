import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  CardImg,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
  Spinner,
} from "reactstrap";
import axios from "axios";
import * as APP_CONFIG from "../../../config/config";
import { Redirect, Route, Switch } from "react-router-dom";
import "./login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import swal from "sweetalert2";
import $ from "jquery";

const logo = require("../../../assets/img/brand/logo.svg");
const BgImage = require("../../../assets/img/brand/LoginImg0.jpg");

class Login extends Component {
  state = {
    username: "",
    password: "",
    loggedIn: false,
    isloading: false,
    fields: {},
    errors: {},
  };

  handleValidation() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    //Name
    if (!fields["username"]) {
      formIsValid = false;
      errors["username"] = "Please enter your username ";
    }

    if (!fields["password"]) {
      formIsValid = false;
      errors["password"] = "You haven't added a password";
    }

    this.setState({ errors: errors });
    return formIsValid;
  }

  handleChange(field, e) {
    let fields = this.state.fields;
    fields[field] = e.target.value;
    this.setState({ fields });
  }
  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );

  render() {
    // this.loading();
    // swal.fire({
    //   timer: 2000,
    //   background: '#ffffff00',
    //   onBeforeOpen: () => {
    //     swal.showLoading()
    //   }
    // })

    $(document).ready(function () {
      $("#loginFormHideBeforeDisplay").delay(0).fadeIn(2000);
    });

    const { isloading } = this.state;

    return (
      <div
        style={{
          backgroundImage: "url(" + BgImage + ")",
          backgroundColor: "#fff",
          backgroundSize: "100%",
          height: "100%",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div
          style={{ backgroundColor: "#ffffff", color: "#000", height: "50px" }}
        >
          {/* <img
            src={logo}
            width="100"
            style={{ paddingTop: "10px", paddingLeft: "5px" }}
          /> */}
          <a
            style={{
              float: "right",
              paddingTop: "10px",
              paddingRight: "15px",
              color: "#000",
              fontFamily: "tahoma",
              fontSize: "em",
            }}
          >
            Retail Internet Solutions
          </a>
        </div>
        <br />
        <div className="app align-items-center " style={{ clear: "both" }}>
          <Container
            className="container"
            style={{
              display: "flex",
              justifyContent: "center",
              paddingTop: "50px",
            }}
          >
            {/* <img src={logo} width="250" style={{ float: 'center', paddingTop: '80px', paddingLeft: '0px' }} /> */}
            <Row>
              <Col>
                <CardGroup
                  id="loginFormHideBeforeDisplay"
                  style={{
                    display: "none",
                    padding: "0px",
                    width: "400px",
                    height: "auto",
                  }}
                >
                  <Card className="p-4 lginbdr">
                    <CardBody>
                      <p
                        style={{
                          float: "right",
                          textTransform: "uppercase",
                          color: "red",
                        }}
                      >
                        World of convenience.
                      </p>
                      <br />
                      <br />
                      <hr />
                      <Form>
                        <p className="text-muted">Sign in to your account</p>

                        <div className="loginerror">
                          {this.state.errors.username}
                        </div>
                        <InputGroup className="mb-3">
                          <Input
                            type="text"
                            onChange={this.handleChange.bind(this, "username")}
                            onInput={(e) => {
                              this.setState({ username: e.target.value });
                            }}
                            placeholder="Username"
                            autoComplete="username"
                            required
                          />
                        </InputGroup>

                        <div className="loginerror">
                          {this.state.errors.password}
                        </div>
                        <InputGroup className="mb-4">
                          <Input
                            type="password"
                            onChange={this.handleChange.bind(this, "password")}
                            onInput={(e) => {
                              this.setState({ password: e.target.value });
                            }}
                            placeholder="Password"
                            autoComplete="current-password"
                            required
                          />
                        </InputGroup>
                        <br />
                        <Row style={{ float: "right" }}>
                          <Col xs="12">
                            <button
                              type="submit"
                              style={{
                                backgroundColor: "red",
                                color: "#fff",
                                borderRadius: 10,
                                paddingLeft: 20,
                                paddingRight: 20,
                                paddingTop: 2,
                                paddingBottom: 5,
                              }}
                              onClick={this.login}
                            >
                              <a style={{ fontSize: "14px" }}>Sign in</a>
                            </button>
                            <div className="loginerror">
                              {this.props?.user?.error}
                            </div>
                          </Col>
                        </Row>
                      </Form>
                    </CardBody>
                  </Card>
                </CardGroup>
              </Col>
            </Row>
          </Container>
          <p
            style={{
              color: "#ffffff",
              backgroundColor: "#4E4C45",
              marginTop: "50px",
              paddingLeft: "10px",
              paddingRight: "10px",
            }}
          >
            Solutions that helps you.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: "#4E4C45",
            color: "#fff",
            height: "50px",
            clear: "both",
            paddingTop: "15px",
          }}
        >
          Powered &copy;2020 | All Rights Reservred
        </div>
        {/* <span className="container" style={{ display: 'flex', justifyContent: 'center' }} >Powered &copy;2020 | All Rights Reservred </span> */}
      </div>
    );
  }

  login = (e) => {
    e.preventDefault();

    this.setState({ isloading: true });

    if (!this.handleValidation()) {
      return;
    }

    swal.fire({
      timer: 3000,
      background: "#ffffff00",
      onBeforeOpen: () => {
        swal.showLoading();
      },
    });
    // login
    axios
      .post(
        APP_CONFIG[APP_CONFIG.REACT_APP_ENVIRONMENT].BASE_API_URL_AUTH,
        {
          username: this.state.username,
          password: this.state.password,
        },
        {
          headers: {
            ContentType: "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then((token) => {
        // console.log("auth ===>", token);
        const userToken = token?.data;
        const userErrorCode = token?.status;
        const userErrorMessage = token?.statusText;

        const currentUser = {
          token: userToken,
          username: this.state.username,
          errCode: userErrorCode,
          errMsg: userErrorMessage,
          setTimeNow: Date.now() + 3600000,
        };

        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        this.setState({ isloading: false });
        window.location.href = "/dashboard";
      })
      .catch((error) => {
        toast.error("Wrong User Credentials",{
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          progress: undefined,
          });
        this.setState({ isloading: false });
      });
  };
}

export default Login;
