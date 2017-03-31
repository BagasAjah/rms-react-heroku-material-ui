import React, { Component } from 'react';

import Header from "../component/common/Header"

import EmployeeToolbar from "../component/containers/employee/EmployeeToolbar"
import EmployeeList from "../component/containers/employee/EmployeeList"

import { generatePageDetailParam } from  "../lib/employee/employeeHelper"

class EmployeeDetails extends Component {

    componentWillMount = () => {
        this.props.getLookupByTpe('statusMarital');
        this.props.getLookupByTpe('gender');
        this.props.getLookupByTpe('status');
        this.props.getLookupByTpe('grade');
        this.props.getLookupByTpe('division');
        this.props.getLookupByTpe('familyType');
        this.props.getLookupByTpe('location');
    }

    componentDidMount = () => {
        var criteria = generatePageDetailParam(this.props.pageDetail);
        this.props.loadEmployeeData(criteria);
    }

    render = () => {
        return(
            <div>
                <Header/>
                <EmployeeToolbar />
                <EmployeeList />
            </div>
        )
    }
}

export default EmployeeDetails;