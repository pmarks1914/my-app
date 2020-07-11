import React from 'react';
import { MDBContainer, MDBDataTable, MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import $ from 'jquery';


const DataTableAccount = ({ posts }) => {

    const data = {
        columns: [
            {
                label: 'Date',
                field: 'transactionDate',
                sort: 'asc',
                width: 40
            },
            {
                label: 'Description',
                field: 'description',
                sort: 'asc',
                width: '40'
            },
            {
                label: 'Check Number',
                field: 'checkNumber',
                sort: 'asc',
                width: 40
            },
            {
                label: 'Debit',
                field: 'debitAmount',
                sort: 'disabled',
                width: 50,
                height: 5
            },
            {
                label: 'Credit',
                field: 'creditAmount',
                sort: 'disabled',
                width: 50,
                height: 5
            },
            {
                label: 'Balance',
                field: 'balance',
                sort: 'disabled',
                width: 50,
                height: 5
            }
        ],
        rows: posts
    };

    return (
        <MDBContainer>
            <MDBTable 
                scrollY
                maxHeight="300px"
                small = {true}
                searching="false"
                paging="true"
                theadColor = "white" 
                responsiveXl 
                responsiveSm  
                striped 
                data={data } 
                sortable="true"
                bordered
                >
                <MDBTableHead columns={data.columns} />
                <MDBTableBody rows={data.rows} />
            </MDBTable>
        </MDBContainer>
    );
};

export default DataTableAccount;