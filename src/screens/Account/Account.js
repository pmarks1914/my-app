import React, { Component, Fragment } from "react";
import DataTableAccount from "./DataTableAccount";
import AccountTransfer from "./AccountTransfer";
import { MDBIcon, MDBBtn, MDBBtnGroup } from "mdbreact";
import { Spinner, CardBody, CardGroup, Row } from "reactstrap";
// import "../Channel/channel.css";
import axios from "axios";
import * as APP_CONFIG from "../../config/config";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import $, { post } from "jquery";
import DataTable from "datatables.net";
import CreatableSelect from "react-select/creatable";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Col,
  FormGroup,
  Form,
  Label,
  Input,
  Card,
} from "reactstrap";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { parseTwoDigitYear } from "moment";
import FormText from "reactstrap/lib/FormText";
import swal from "sweetalert2";

const moment = require("moment");

let loading = <Spinner color="danger" />;

export class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ProductData: [],
      ProductDataHideId: [],
      FilterData: [],
      channelData: [],
      campaignData: [],
      selectedSubscriptionId: "",
      loading: true,
      currentUserErrorCode: null,
      startDate: null,
      endDate: null,
    };
  }

  componentDidMount() {
    let _that = this;

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    var request = new XMLHttpRequest();
    this.setState({ loading: true }, () => {
      axios
        .get(APP_CONFIG[APP_CONFIG.REACT_APP_ENVIRONMENT].BASE_URL_ACCS, {
          headers: {
            ContentType: "application/json",
            //   Authorization: currentUser.token,
          },
        })
        .then((res) => {
          let currentUserErrorCode = res?.data?.errCode;

          let resAccounts = res?.data?.accounts || [];
          let resAccountsPass = resAccounts;

          const postList = resAccountsPass?.length
            ? resAccountsPass.map((post, id) => {
                let effectedDate = new Date(post.createdOn);
                return {
                  accountNumber: post?.accountNumber,
                  accountName: post?.accountName,
                  accountType: post?.accountType,
                  description: post?.description,
                  currency: post?.currency,
                  transactionDate: moment(post?.transactionDate).format(
                    "DD/MM/YYYY"
                  ),
                  effectedDate: moment(post?.effectedDate).format("DD/MM/YYYY"),
                  creditAmount: post?.creditAmount,
                  debitAmount: post?.debitAmount,
                  balance: post?.balance,
                  id: post?.id,
                };
              })
            : [];


            const postListHideId = resAccountsPass?.length
            ? resAccountsPass.map((post, id) => {
                let effectedDate = new Date(post.createdOn);

                let balance = new Intl.NumberFormat("GBP", {
                  style: "currency",
                  currency: "GBP",
                }).format(post?.balance);

                let creditAmt = new Intl.NumberFormat("GBP", {
                  style: "currency",
                  currency: "GBP",
                }).format(post?.creditAmount);

                let debitAmt = new Intl.NumberFormat("GBP", {
                  style: "currency",
                  currency: "GBP",
                }).format(post?.debitAmount);

                return {
                  transactionDate: moment(post?.transactionDate).format(
                    "DD/MM/YYYY"
                  ) == "Invalid date" ? "" : (post?.transactionDate),
                  description: post?.description,
                  checkNumber: post?.checkNumber,
                  debitAmount: debitAmt,
                  creditAmount: creditAmt,
                  balance: balance,
                };
              })
            : [];

          _that.setState({
            ProductDataHideId: postListHideId,
            ProductData: postList,
            currentUserErrorCode: currentUserErrorCode,
          });
        });
    });
  }

  // unhide Date Picker To
  selectedDateTo(e) {
    // e.preventDefault();

    if (document.querySelector("#dateFrom")) {
      document.querySelector("#hideDateTo").style.display = "block";
    }
  }
  handleChangeFrom = (e) => {
    this.setState({
      startDate: e,
    });
  };

  handleChange = (e) => {
    this.setState({
      endDate: e,
    });
  };

  render() {
    const createOption = (label, dataId) => ({
      label,
      value: dataId,
    });
    const channelOptions = this.state?.channelData?.map((post, id) => {
      return createOption(post?.label, post?.id);
    });

    const campaignOptions = this.state?.campaignData?.map((post, id) => {
      return createOption(post?.label, post.id);
    });

    const today = moment();
    // if (this.state?.currentUserErrorCode == "200") {
    //     window.location.href = "/login";
    //     localStorage.removeItem("currentUser")
    // }

    return (
      <div className="container">
        <AccountTransfer posts={this.state.ProductData} />
        <hr />
        {/* <div style={{ paddingRight: "20px", height: "1px" }}>
                    <ReactHTMLTableToExcel
                        className="btn btn-outline-info btn-sm m-0  waves-effec float-right"
                        table="idforSubscription"
                        filename="ReportExcel"
                        sheet="Sheet"
                        buttonText="Export excel"
                        
                    />
                </div> */}
        <div style={{paddingLeft: '15px' }}>
            <Card style={{ width: '340px'}}>
                <CardBody>
                    <CardGroup>
                        <Col>
                            <Row>A/C Name: <a style={{ paddingLeft: '30px', textDecoration: 'underLine', fontFamily: 'adobe'}}> { this.state.ProductData[0]?.accountName } </a></Row>
                            <Row>A/C Number: <a style={{ paddingLeft: '16px', textDecoration: 'underLine', fontFamily: 'adobe'}}>{ this.state.ProductData[0]?.accountNumber }</a></Row>
                            <Row>A/C Type: <a style={{ paddingLeft: '40px', textDecoration: 'underLine', fontFamily: 'adobe'}}>{ this.state.ProductData[0]?.accountType }</a></Row>
                            <Row>Currency: <a style={{ paddingLeft: '41px', textDecoration: 'underLine', fontFamily: 'adobe'}}>{ this.state.ProductData[0]?.currency }</a></Row>
                        </Col>
                    </CardGroup>
                </CardBody>
            </Card>
        </div>

        <DataTableAccount posts={this.state.ProductDataHideId} />
      </div>
    );
  }
}

export default Account;
