import React, { useState, Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Spinner, Col, FormGroup, Form, Label, Input, Card } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as APP_CONFIG from '../../config/config';
import axios from 'axios';
import { post } from 'jquery';


toast.configure()

const AccountTransfer = (props) => {
    const {
        buttonLabelView,
        className,
        errorInput = "",
        currentUser = ""
    } = props;

    const [modal, setModal] = useState(false);
    const [ subscriptionTypes, subscriptionDataTypes] = useState();

    function passSubscriptionData(){
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        const createdBy = currentUser?.role;

        // Get subscription types 
        let _that = this
        
        axios.get(APP_CONFIG[APP_CONFIG.REACT_APP_ENVIRONMENT].API_GET_SUBSCRIPTION_TYPE,
            {
                headers: {
                    ContentType: "application/json",
                    Authorization: currentUser.token
                }

            }
        ).then(res=>{

            let postSubscriptionResults = res?.data;
            // console.log("subscription types Data  ==>", postSubscriptionResults);
    
            subscriptionDataTypes(postSubscriptionResults);
        
        })
    }
    function addSubscriptionClick(e) {
        e.preventDefault();


        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        const createdBy = currentUser?.role;

        let formID = document.querySelector("#channelData");
        const formData = new FormData(formID);

        var subscriptionType = formData.get('subscriptionType');
        var msisdn = formData.get('msisdn'); //number
        var campaignId = formData.get('campaignId'); //name
        var subscriptionRemarks = formData.get('subscriptionRemarks'); //amt

        var request = new XMLHttpRequest();

        request.onreadystatechange = function () {
            if (this.readyState === 4 & this.status === 200) {
                alert('Uploaded!');
            }
        };

        let errorInputType = "Check Swift Code / Routing # field ";
        let errorInputMsisdn = "Check Account Number field";
        let errorInputCampaignId = "Check Account name field";
        let errorInputAmt = "Check Ammount field";
        
        if (subscriptionType == "" ) {
            
            toast.error(errorInputType,{
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                progress: undefined,
                });
        }
        if ( subscriptionRemarks == "") {
            toast.error(errorInputAmt,{
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                progress: undefined,
                });
        }
        if (msisdn == "") {
            toast.error(errorInputMsisdn,{
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                progress: undefined,
                });
        }
        if (campaignId == "") {
            toast.error(errorInputCampaignId,{
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                progress: undefined,
                });
        }
        if(msisdn != "" && campaignId != "" && subscriptionRemarks != "") {
            let accountData = props?.posts.map((post, id) =>{
                return post;
            });
            
            var today = new Date();
            var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            var dateTime = date+' '+time;            
            var calBal = accountData[accountData.length - 1].balance;

            axios.post(APP_CONFIG[APP_CONFIG.REACT_APP_ENVIRONMENT].BASE_URL_ACC, 
                {
                    "accountNumber": accountData[accountData.length - 1]?.accountNumber,
                    "description": 'E-Transect/Trenfer/'+ dateTime +'/' + msisdn +'/'+ campaignId + '/' + subscriptionRemarks,
                    "currency": accountData[(accountData.length - 1)].currency,
                    "transactionDate": date.toString(),
                    "checkNumber": (post?.checkNumber).toString(),
                    "creditAmount": 0.00,
                    "debitAmount": subscriptionRemarks,
                    "balance": calBal-subscriptionRemarks
                },
                {
                    headers: {
                        ContentType: "application/json",
                    }
                }).then(function (res) {
                    //handle success
                    toast.error('Successfull Transfer to' + msisdn,{
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        progress: undefined,
                        });
                    setTimeout(function () {
                        window.location.reload();
                    }, 2000)
                }).catch(function (error) {
                });

        }


    }
    // Intialize modal
    const toggle = () => setModal(!modal);

    return (
        <div className="container">
            {/* Button to Create Subscription */}
            {/* <br /> */}

            <button className="btn btn-outline btn-sm m-2 " onClick={function(event){ toggle(); passSubscriptionData()}} style={{ backgroundColor: 'blue', color: '#fff', borderRadius: 0, paddingLeft: 5, paddingRight: 10, paddingTop: 5, paddingBottom: 5, float: 'right' }} role="button">
                <a style={{ fontFamily: 'Roboto' }}> Fund Transfer </a>
            </button>


            <br />
            {/* Create Subscription modal */}
            <Modal isOpen={modal} size="lg" toggle={toggle} className={className}>
                <Form id="channelData" onSubmit={addSubscriptionClick}>
                    {/* modal content for the head section */}
                    <ModalHeader toggle={toggle}><a style={{ fontFamily: 'Roboto' }}> Funds Transfer </a>

                    </ModalHeader>
                    <ModalBody>
                        <ToastContainer closeButton={false} style={{ color: '#fff' }} />

                        <a style={{ color: 'black' }} className="float-left">
                            * Required
                        </a>
                        <br />
                        <br />
                        <div className="container">

                            <FormGroup row>
                                <Label htmlFor="subscriptionType" sm="12" md={{ size: 2, offset: 1 }} style={{ color: '#E60000' }}><a style={{ color: 'black' }}>*</a>Swift Code /Routing #:</Label>
                                <Col sm="12" md={{ size: 8, offset: 0 }} style={{ paddingLeft: '15px' }}>
                                    <Input type="number" name="subscriptionType" id="subscriptionType" placeholder="Provide Swift Code /Routing #" required />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="msisdn" sm="12" md={{ size: 2, offset: 1 }} style={{ color: '#E60000' }}><a style={{ color: 'black' }}>*</a>A/C #:</Label>
                                <Col sm="12" md={{ size: 8, offset: 0 }} style={{ paddingLeft: '15px' }}>
                                    <Input type="text" name="msisdn" id="msisdn" placeholder="Provide A/C number" required />
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Label htmlFor="campaignId" sm="12" md={{ size: 2, offset: 1 }} style={{ color: '#E60000' }}><a style={{ color: 'black' }}>*</a>A/C Name:</Label>
                                <Col sm="12" md={{ size: 8, offset: 0 }}>
                                    <Input type="text" name="campaignId" id="campaignId" placeholder="Provide account name" required />
                                </Col>
                            </FormGroup>
                            
                            <FormGroup row>
                                <Label htmlFor="subscriptionRemarks" sm="12" md={{ size: 2, offset: 1 }} style={{ color: '#E60000', paddingLeft: '25px' }}>Amount:</Label>
                                <Col sm="12" md={{ size: 8, offset: 0 }} style={{ paddingLeft: '15px'}}>
                                    <Input type="number" step="0.01" mim="0" name="subscriptionRemarks" id="subscriptionRemarks" placeholder="Provide amount" />
                                </Col>
                            </FormGroup>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <div className="btn-group">

                            <button type="submit" onClick={addSubscriptionClick} className="btn btn-lg" style={{ backgroundColor: 'red', color: '#fff', paddingLeft: 5, paddingRight: 5, paddingTop: 0, paddingBottom: 0, textTransform: 'unset' }} >Confirm</button>
                            <a style={{ paddingRight: '5px' }}>
                                <button className="btn btn-lg" onClick={toggle} style={{ backgroundColor: 'black', color: '#fff', paddingLeft: 5, paddingRight: 5, paddingTop: 0, paddingBottom: 0, textTransform: 'unset' }}>Close</button>{' '}
                            </a>
                        </div>
                    </ModalFooter>
                </Form>

            </Modal>

        </div>
    );
}

export default AccountTransfer;