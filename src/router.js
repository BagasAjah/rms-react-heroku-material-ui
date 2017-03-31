import React, {Component} from 'react';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';

import EmployeeDetails from "./component/containers/employee/EmployeeDetails"
import EmployeeToolbar from "./component/containers/employee/EmployeeToolbar"
import EmployeeTab from "./component/containers/employee/EmployeeTab"
import EmployeeTabDetails from "./component/containers/employee/EmployeeTabDetails"
import EmployeeTabFamilyMember from "./component/containers/employee/EmployeeTabFamilyMember"
import EmployeeTabGradeHistory from "./component/containers/employee/EmployeeTabGradeHistory"
import EmployeeTabHistory from "./component/containers/employee/EmployeeTabHistory"
import EmployeeTabAddress from "./component/employee/EmployeeTabAddress"
import EmployeeTabLocation from "./component/containers/employee/EmployeeTabLocation"

class RouterApp extends Component {
    render(){
        return(
            <Router history={hashHistory}>
                <Route path='/employee' component={EmployeeDetails}>
                    <IndexRoute component={EmployeeToolbar}/>
                    <Route component={EmployeeTab}>
                        <IndexRoute component={EmployeeTabDetails}/>
                        <Route path='/employee/details' component={EmployeeTabDetails} />
                        <Route path='/employee/history' component={EmployeeTabHistory} />
                        <Route path='/employee/grade' component={EmployeeTabGradeHistory} />
                        <Route path='/employee/family' component={EmployeeTabFamilyMember} />
                        <Route path='/employee/address' component={EmployeeTabAddress} />
                        <Route path='/employee/location' component={EmployeeTabLocation} />
                    </Route>
                </Route>
            </Router>
        )
    }
}

export default RouterApp;