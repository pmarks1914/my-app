import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, CardImg, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Spinner } from 'reactstrap';
import axios from "axios";
import * as APP_CONFIG from '../../config/config';
import { Redirect, Route, Switch } from 'react-router-dom';
import "./Home.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import swal from 'sweetalert2';
import $ from 'jquery';

const logo = require('../../assets/img/brand/LoginImg0.jpg');
const BgImage = require('../../assets/img/brand/LoginImg0.jpg');

class Home extends Component {
  state = {
    username: '',
    password: '',
    loggedIn: false,
    isloading: false,
    fields: {},
    errors: {}
  }
  
  loading = () => <div className="animated fadeIn pt-1 text-center" >Loading...</div>  

  render() {
    
    // this.loading();
    // swal.fire({
    //   timer: 2000,
    //   background: '#ffffff00',
    //   onBeforeOpen: () => {
    //     swal.showLoading()
    //   }
    // })
    
    $(document).ready(function() {
      $('#loginFormHideBeforeDisplay').delay(2000).fadeIn(2000);
  });

    const { isloading } = this.state;
    if (this.props?.user?.customer && this.props?.user?.customer?.accountName) {
      return <Redirect from="/" to="/dashboard" />
    }
    return (
      <div  style={{
        backgroundImage: "url(" + BgImage + ")",
        backgroundColor: '#fff',
        backgroundSize: '100%',
        height: '100%',
        backgroundRepeat: 'no-repeat',

      }}>
        <div style={{ backgroundColor: '#4E4C45', color: '#fff', height: '50px'}}>fff</div>
        
        <div style={{ backgroundColor: '#4E4C45', color: '#fff', height: '25px', clear: 'both'}}> &copy;Copyright 2020.  <a style={{color: "#fff", float: "right", paddingRight: "5px"}} >All rights reserved | Powered by</a></div>
      </div>

    );
  }
}





export default Home;