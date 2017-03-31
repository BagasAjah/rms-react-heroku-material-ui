import React, {Component, PropTypes} from 'react';
import update from 'react-addons-update';

import {List} from 'material-ui/List';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Constants from "../styles/Constants"

import EmployeeListDetail from "../containers/employee/EmployeeListDetail"
import NewEmployeeDialog from "../containers/employee//NewEmployeeDialog"
import SimplePagination from "../common/SimplePagination"

import C from '../../constants'

import { generatePageDetailParam } from  "../../lib/employee/employeeHelper"

class EmployeeList extends Component {

    constructor(props){
        super(props);
        this.onPageChangeFromPagination=this.onPageChangeFromPagination.bind(this);
    }

    onPageChangeFromPagination(newPage) {
        this.props.changePageDetailValue("currentPage", newPage);
        var nextState=update(this.props.pageDetail, {
            currentPage : {
                $set: newPage
            }
        });
        var criteria=generatePageDetailParam(nextState);
        this.props.loadEmployeeData(criteria);
    }

    render=() => {
        var employee=this.props.employees;
        var employeeListDetail=employee.map( (employee, index) =>
            <EmployeeListDetail
                key={index}
                index={index}
                employee={employee}/>
        );
        return (
            <MuiThemeProvider muiTheme={getMuiTheme(Constants.themeIndigo400)}>
                <div>
                    {(employeeListDetail.length > 0) ?
                    (<List className="employee-list-group">
                            {employeeListDetail}
                    </List>)
                    :
                        (<div className="no-record">
                            <span>We couldn't find what you were looking for</span>
                        </div>)
                    }
                    <SimplePagination
                        currentPage={this.props.pageDetail.currentPage}
                        totalPages={Math.ceil(this.props.pageDetail.totalEmployees/C.PAGE_DATA_SIZE)}
                        boundaryPagesRange={1}
                        siblingPagesRange={1}
                        onChange={this.onPageChangeFromPagination}/>
                    <NewEmployeeDialog pageMode={'NEW'} />
                </div>
            </MuiThemeProvider>
        )
    }
}

EmployeeList.propTypes={
    employees: PropTypes.array,
    pageDetail: PropTypes.object,
    loadEmployeeData: PropTypes.func,
    changePageDetailValue: PropTypes.func
}

export default EmployeeList;