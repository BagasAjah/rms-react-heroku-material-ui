import React, { Component, PropTypes } from 'react';
import update from 'react-addons-update';

import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';

import ActionAdd from 'material-ui/svg-icons/content/add-circle';
import {handleEmployeeDetailsInfo, showErrorMessage} from "../../lib/employee/employeeHelper"

class EmployeeHistoryDetailDialog extends Component {
    constructor(props) {
        super(props);
        this.addNewHistoryJobDesc = this.addNewHistoryJobDesc.bind(this);
        this.handleStartDateChanged = this.handleStartDateChanged.bind(this);
        this.handleEndDateChanged = this.handleEndDateChanged.bind(this);
        this.handleCompanyChanged = this.handleCompanyChanged.bind(this);
        this.handlePositionChanged = this.handlePositionChanged.bind(this);
        this.handleJobDescChanged = this.handleJobDescChanged.bind(this);
        this.handleToggleChanged = this.handleToggleChanged.bind(this);
    }

    handleStartDateChanged = (e, value) => {
        var updatedEmployee = handleEmployeeDetailsInfo('history', 'historyStartDate', value, this.props.newEmployee);
        this.props.handleStateChanged('newEmployee', updatedEmployee);
    }

    handleEndDateChanged = (e, value) => {
        var updatedEmployee = handleEmployeeDetailsInfo('history', 'historyEndDate', value, this.props.newEmployee);
        this.props.handleStateChanged('newEmployee', updatedEmployee);
    }

    handleCompanyChanged = (e, value) => {
        var updatedEmployee = handleEmployeeDetailsInfo('history', 'company', value, this.props.newEmployee);
        this.props.handleStateChanged('newEmployee', updatedEmployee);
    }

    handlePositionChanged = (e, value) => {
        var updatedEmployee = handleEmployeeDetailsInfo('history', 'position', value, this.props.newEmployee);
        this.props.handleStateChanged('newEmployee', updatedEmployee);
    }

    handleJobDescChanged = (e, value, index) => {
        var updatedJobDesc = update(this.props.newEmployee.history[0].jobDescList, {
            [index]: {
                "jebDescName": {$set: value}
            }
        });
        var updatedEmployee = handleEmployeeDetailsInfo('history', 'jobDescList', updatedJobDesc, this.props.newEmployee);
        this.props.handleStateChanged('newEmployee', updatedEmployee);
    }

    addNewHistoryJobDesc = () => {
        var updatedJobDesc = update(this.props.newEmployee.history[0].jobDescList, {$push: [{"jebDescName" : ''}]});
        var updatedEmployee = handleEmployeeDetailsInfo('history', 'jobDescList', updatedJobDesc, this.props.newEmployee);
        this.props.handleStateChanged('newEmployee', updatedEmployee);
    }

    handleToggleChanged = (e, isInputChecked) => {
        this.props.handleToggleChanged('enableHistoryToggle', isInputChecked);
    }

    render = () => {
        var jobDescList = this.props.newEmployee.history[0].jobDescList;
        var jobDescListRender = jobDescList.map((jobDescList, index) => (
            <div style={{width:'100%'}} key={index}>
                <TextField
                    floatingLabelText="Job Description"
                    value={jobDescList.jebDescName}
                    onChange={(e, value) => this.handleJobDescChanged(e, value, index)}
                    underlineShow={true}/>
            </div>
        ));
        return(
            <div>
                <Toggle
                  label="Enable History"
                  defaultToggled={this.props.enableToggle.enableHistoryToggle}
                  className='toggle-position'
                  onToggle={(e, isInputChecked) => this.handleToggleChanged(e, isInputChecked)}
                />
                <DatePicker
                    className='detail-dialog'
                    floatingLabelText="History Start Date"
                    disabled={!this.props.enableToggle.enableHistoryToggle}
                    value={this.props.enableToggle.enableHistoryToggle ? this.props.newEmployee.history[0].historyStartDate : null}
                    onChange={(e, value) => this.handleStartDateChanged(e, value)}
                    errorText={showErrorMessage(
                        this.props.openValidationMessage.historyValidation, this.props.newEmployee.history[0].historyStartDate, this.props.enableToggle.enableHistoryToggle
                    )}
                    autoOk={true} />
                <DatePicker
                    className='detail-dialog'
                    floatingLabelText="History End Date"
                    disabled={!this.props.enableToggle.enableHistoryToggle}
                    value={this.props.enableToggle.enableHistoryToggle ? this.props.newEmployee.history[0].historyEndDate : null}
                    onChange={(e, value) => this.handleEndDateChanged(e, value)}
                    autoOk={true} />
                <TextField
                    className='detail-dialog'
                    floatingLabelText="Company Name"
                    disabled={!this.props.enableToggle.enableHistoryToggle}
                    value={this.props.enableToggle.enableHistoryToggle ? this.props.newEmployee.history[0].company : ''}
                    onChange={(e, value) => this.handleCompanyChanged(e, value)}
                    errorText={showErrorMessage(
                        this.props.openValidationMessage.historyValidation, this.props.newEmployee.history[0].company, this.props.enableToggle.enableHistoryToggle
                    )}
                    underlineShow={true}/>
                <TextField
                    className='detail-dialog'
                    style={{paddingLeft:10}}
                    floatingLabelText="Position"
                    disabled={!this.props.enableToggle.enableHistoryToggle}
                    value={this.props.enableToggle.enableHistoryToggle ? this.props.newEmployee.history[0].position : ''}
                    onChange={(e, value) => this.handlePositionChanged(e, value)}
                    errorText={showErrorMessage(
                        this.props.openValidationMessage.historyValidation, this.props.newEmployee.history[0].position, this.props.enableToggle.enableHistoryToggle
                    )}
                    underlineShow={true}/><br />
                <div className="detail-dialog" style={{width:'100%'}}>
                    <div className="detail-dialog" style={{paddingLeft:0}}>Job Description</div>
                    <div className="detail-dialog" style={{paddingLeft:10}}>
                        <ActionAdd
                            onClick={this.addNewHistoryJobDesc}
                            disabled={!this.props.enableToggle.enableHistoryToggle}/>
                    </div>
                </div>
                <div className="detail-dialog" style={{width:'100%'}}>
                    {(jobDescListRender.length>0 && this.props.enableToggle.enableHistoryToggle)? jobDescListRender : ''}
                </div>
            </div>
        )
    }
}

EmployeeHistoryDetailDialog.propTypes = {
    currentEmployee: PropTypes.object,
    setSavedEmployee: PropTypes.func,
    handleStateChanged: PropTypes.func
}

export default EmployeeHistoryDetailDialog;
