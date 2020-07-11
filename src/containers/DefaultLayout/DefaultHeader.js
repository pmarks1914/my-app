import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Badge, UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem } from 'reactstrap';
import PropTypes from 'prop-types';

import { AppAsideToggler, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/logo_main.svg'
import sygnet from '../../assets/img/brand/logo_main.svg'
import { connect } from 'react-redux';





const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  componentDidMount() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    this.setState({
      currentUser: currentUser
    })
  }

  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        {/* Font page logo display */}
       
      <div
          style={{ height: "50px" }}
        >
          <img
            src={logo}
            width="100"
            style={{ paddingTop: "10px", paddingLeft: "5px" }}
          />
        </div>

        <Nav className="ml-auto" navbar >
          <a style={{ color: '#00', float: 'right', fontSize: '15px', textTransform: 'uppercase',marginRight: '10px'}}> Account </a>
          <a>|</a>  
          <a className="icon-user" style={{ marginLeft: '10px', color: '#000', float: 'right', fontSize: '15px', textTransform: 'uppercase' }} onClick={e => this.props.onLogout(e)} > Logout </a>
        
        </Nav>

      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;


export default DefaultHeader;