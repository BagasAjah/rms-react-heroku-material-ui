import React, { Component, PropTypes } from 'react';
import update from 'react-addons-update';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import {List} from 'material-ui/List';

import ContentAdd from 'material-ui/svg-icons/content/add';

import EmployeeLocationDetail from "../containers/employee/EmployeeLocationDetail"
import EmployeeLocationDetailDialog from "../containers/employee/EmployeeLocationDetailDialog"

import { handleDataBeforeSaveOrUpdate, setDefaultEmployee, validateEmployeeLocation } from "../../lib/employee/employeeHelper";

class EmployeeTabLocation extends Component {
    constructor(props) {
        super(props);
        this.addOfficeLocationClick = this.addOfficeLocationClick.bind(this);
        this.openDialogClick = this.openDialogClick.bind(this);
        this.closeDialogClick = this.closeDialogClick.bind(this);
    }

    openDialogClick = () => {
        this.props.handleStateChanged('newEmployee', setDefaultEmployee());
        this.props.handleStateChanged('selectedIndex', null);
        this.props.handleOpenDialogChanged('locationDialog', true);
        this.props.handleOpenValidationMessage('locationValidation', false);
    }

    closeDialogClick = () => {
        this.props.handleOpenDialogChanged('locationDialog', false);
    }

    addOfficeLocationClick = () => {
        var location = this.props.newEmployee.location[0];
        if(validateEmployeeLocation(location) && this.props.enableToggle.enableLocationToggle) {
            this.props.handleOpenValidationMessage('locationValidation', true);
        } else {
            var currentEmployee = this.props.currentEmployee;
            var updatedEmployee = update(currentEmployee, {'location': {
                $push: [{
                    officeStartDate: location.officeStartDate,
                    officeEndDate: location.officeEndDate,
                    officeLocation: location.officeLocation,
                    officeAddress: location.officeAddress
                }]
            }});
            this.props.setSavedEmployee(handleDataBeforeSaveOrUpdate(updatedEmployee), this.props.pageMode);
            this.closeDialogClick();
        }
    }

    render = () => {
        const actionsButton = [
            <FlatButton
                label="Add"
                primary={true}
                onTouchTap={this.addOfficeLocationClick}
            />
        ];
        var employeeLocationDetail = [];
        if (this.props.currentEmployee) {
            var locationList = this.props.currentEmployee.location;
            employeeLocationDetail = locationList.map((locationList, locationIndex) => (
                <EmployeeLocationDetail
                    key={locationIndex}
                    locationIndex={locationIndex}
                    locationList={locationList}
                    currentEmployee={this.props.currentEmployee}
                    pageMode={this.props.pageMode}/>
            ));

        }
        return (
            <div className="menu-content">
                <h2>Employee Location Details</h2>
                {(employeeLocationDetail.length === 0) ?
                    <div style={{textAlign: 'center'}}>Location Details Not Found</div>
                :
                    (<List >
                            {employeeLocationDetail}
                    </List>)
                }
                <FloatingActionButton className="btn-add-tab-position"
                    secondary={true}
                    onClick={this.openDialogClick}
                    disabled={this.props.viewMode}>
                    <ContentAdd />
                </FloatingActionButton>
                <Dialog
                    contentStyle={{width: '70%',maxWidth: 'none'}}
                    title="Office Location Details"
                    actions={actionsButton}
                    modal={false}
                    open={this.props.openDialog.locationDialog}
                    onRequestClose={this.closeDialogClick}>
                        <EmployeeLocationDetailDialog
                            pageMode={'NEW'}/>
                </Dialog>
            </div>
        )
    }
}

EmployeeTabLocation.propTypes = {
    currentEmployee: PropTypes.object,
    newEmployee: PropTypes.object,
    openDialog: PropTypes.object,
    pageMode: PropTypes.oneOf(['EDIT', 'NEW']),
    selectedIndex: PropTypes.number,
    viewMode: PropTypes.bool,
    setSavedEmployee: PropTypes.func,
    handleOpenDialogChanged: PropTypes.func,
    handleOpenValidationMessage: PropTypes.func,
    handleStateChanged: PropTypes.func
}

export default EmployeeTabLocation;
