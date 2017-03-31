import React, { Component, PropTypes } from 'react';

import DatePicker from 'material-ui/DatePicker';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';

import {handleEmployeeDetailsInfo, showErrorMessage} from "../../lib/employee/employeeHelper"

class EmployeeLocationDetailDialog extends Component {

    constructor(props) {
        super(props);
        this.handleStartDateChanged=this.handleStartDateChanged.bind(this);
        this.handleEndDateChanged=this.handleEndDateChanged.bind(this);
        this.handleOfficeLocationChanged=this.handleOfficeLocationChanged.bind(this);
        this.handleOfficeAddressChanged=this.handleOfficeAddressChanged.bind(this);
        this.handleToggleChanged =this.handleToggleChanged.bind(this);
    }

    handleStartDateChanged=(e, value) => {
        var updatedEmployee=handleEmployeeDetailsInfo('location', 'officeStartDate', value, this.props.newEmployee);
        this.props.handleStateChanged('newEmployee', updatedEmployee);
    }

    handleEndDateChanged=(e, value) => {
        var updatedEmployee=handleEmployeeDetailsInfo('location', 'officeEndDate', value, this.props.newEmployee);
        this.props.handleStateChanged('newEmployee', updatedEmployee);
    }

    handleOfficeLocationChanged=(e, index, value) => {
        var updatedEmployee=handleEmployeeDetailsInfo('location', 'officeLocation', value, this.props.newEmployee);
        this.props.handleStateChanged('newEmployee', updatedEmployee);
    }

    handleOfficeAddressChanged=(e, value) => {
        var updatedEmployee=handleEmployeeDetailsInfo('location', 'officeAddress', value, this.props.newEmployee);
        this.props.handleStateChanged('newEmployee', updatedEmployee);
    }

    handleToggleChanged=(e, isInputChecked) => {
        this.props.handleToggleChanged('enableLocationToggle', isInputChecked);
    }

    render=() => {
        if (this.props.lookUpData.location.length >0 ) {
            var lookupLocationMenuItem=this.props.lookUpData.location.map(lookupLocation =>
                <MenuItem key={lookupLocation.lookupCode} value={lookupLocation.lookupCode} primaryText={lookupLocation.lookupValue} />
            );
        }
        return(
            <div>
                <Toggle
                  label="Enable Location"
                  defaultToggled={this.props.enableToggle.enableLocationToggle}
                  className='toggle-position'
                  onToggle={(e, isInputChecked) => this.handleToggleChanged(e, isInputChecked)}
                />
                <DatePicker
                    className='detail-dialog'
                    floatingLabelText="Office Start Date"
                    name="Office Start Date"
                    value={this.props.enableToggle.enableLocationToggle ? this.props.newEmployee.location[0].officeStartDate : null}
                    disabled={!this.props.enableToggle.enableLocationToggle}
                    errorText={showErrorMessage(
                        this.props.openValidationMessage.locationValidation, this.props.newEmployee.location[0].officeStartDate, this.props.enableToggle.enableLocationToggle
                    )}
                    onChange={(e, value) => this.handleStartDateChanged(e, value)}
                    autoOk={true} />
                <DatePicker
                    className='detail-dialog'
                    floatingLabelText="Office End Date"
                    value={this.props.enableToggle.enableLocationToggle ? this.props.newEmployee.location[0].officeEndDate : null}
                    disabled={!this.props.enableToggle.enableLocationToggle}
                    onChange={(e, value) => this.handleEndDateChanged(e, value)}
                    autoOk={true} />
                <br />
                <SelectField
                    className='detail-dialog'
                    floatingLabelText="Office Location"
                    maxHeight={200}
                    value={this.props.enableToggle.enableLocationToggle ? this.props.newEmployee.location[0].officeLocation : ''}
                    disabled={!this.props.enableToggle.enableLocationToggle}
                    errorText={showErrorMessage(
                        this.props.openValidationMessage.locationValidation, this.props.newEmployee.location[0].officeLocation, this.props.enableToggle.enableLocationToggle
                    )}
                    onChange={(e, index, value) => this.handleOfficeLocationChanged(e, index, value)}>
                    {lookupLocationMenuItem}
                </SelectField>
                <TextField
                    className='detail-dialog'
                    floatingLabelText="Office Address"
                    value={this.props.enableToggle.enableLocationToggle ? this.props.newEmployee.location[0].officeAddress : ''}
                    disabled={!this.props.enableToggle.enableLocationToggle}
                    errorText={showErrorMessage(
                        this.props.openValidationMessage.locationValidation, this.props.newEmployee.location[0].officeAddress, this.props.enableToggle.enableLocationToggle
                    )}
                    onChange={(e, value) => this.handleOfficeAddressChanged(e, value)}
                    multiLine={true}
                    rows={2}
                    rowsMax={2}
                    underlineShow={false}/>
            </div>
        )
    }
}

EmployeeLocationDetailDialog.propTypes={
    lookUpData : PropTypes.object,
    currentEmployee: PropTypes.object,
    setSavedEmployee: PropTypes.func,
    handleStateChanged: PropTypes.func
}

export default EmployeeLocationDetailDialog;