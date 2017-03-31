import React, { Component, PropTypes } from 'react';

import DatePicker from 'material-ui/DatePicker';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import Toggle from 'material-ui/Toggle';

import { handleEmployeeDetailsInfo, showErrorMessage } from "../../lib/employee/employeeHelper"

const styles={
  customWidthField: {
    width: 150
  },
  customStyleDate: {
    width: 200,
    marginRight: 60
  }
};

class EmployeeGradeDialog extends Component {
    constructor(props) {
        super(props);
        this.handleDsChange=this.handleDsChange.bind(this);
        this.handleGradeChange=this.handleGradeChange.bind(this);
        this.handleToggleChanged=this.handleToggleChanged.bind(this);
        this.handleStartDateChange=this.handleStartDateChange.bind(this);
        this.handleEndDateChange=this.handleEndDateChange.bind(this);
    }

    handleDsChange=(e, index, value) => {
        var updatedEmployee=handleEmployeeDetailsInfo('gradeHistory','ds', value, this.props.newEmployee);
        this.props.handleStateChanged('newEmployee', updatedEmployee);
    }

    handleGradeChange=(e, index, value) => {
        var updatedEmployee=handleEmployeeDetailsInfo('gradeHistory','grade', value, this.props.newEmployee);
        this.props.handleStateChanged('newEmployee', updatedEmployee);
    }

    handleStartDateChange=(e, value) => {
        var updatedEmployee=handleEmployeeDetailsInfo('gradeHistory','startDate', value, this.props.newEmployee);
        this.props.handleStateChanged('newEmployee', updatedEmployee);
    }

    handleEndDateChange=(e, value) => {
        var updatedEmployee=handleEmployeeDetailsInfo('gradeHistory','endDate', value, this.props.newEmployee);
        this.props.handleStateChanged('newEmployee', updatedEmployee);
    }

    handleToggleChanged=(e, isInputChecked) => {
        this.props.handleToggleChanged('enableGradeToggle', isInputChecked);
    }

    render=() => {
        var dsData=[];
        for(var i=1; i<23; i++){
            dsData.push(i);
        }

        if(typeof this.props.currentEmployee !== 'undefined') {
            var gradeHistory=this.props.currentEmployee.gradeHistory;
            for(var j=0; j<gradeHistory.length; j++){
                delete dsData[dsData.indexOf(gradeHistory[j].ds)];
            }
        }

        var lookupDS=dsData.map( dsData =>
            <MenuItem key={dsData} value={dsData} primaryText={"DS"+dsData} />
        );

        if (this.props.lookUpData.grade.length >0 ) {
            var lookupGradeMenuItem=this.props.lookUpData.grade.map(lookupGrade =>
                <MenuItem key={lookupGrade.lookupCode} value={lookupGrade.lookupCode} primaryText={lookupGrade.lookupValue} />
            );
        }
        return(
            <div>
                <Toggle
                  label="Enable Grade"
                  defaultToggled={this.props.enableToggle.enableGradeToggle}
                  className='toggle-position'
                  onToggle={(e, isInputChecked) => this.handleToggleChanged(e, isInputChecked)}
                />
                <SelectField
                    className="grade-history-width"
                    style={styles.customWidthField}
                    floatingLabelText="DS"
                    maxHeight={200}
                    disabled={!this.props.enableToggle.enableGradeToggle}
                    value={this.props.enableToggle.enableGradeToggle ? this.props.newEmployee.gradeHistory[0].ds : ''}
                    errorText={showErrorMessage(
                        this.props.openValidationMessage.gradeValidation, this.props.newEmployee.gradeHistory[0].ds, this.props.enableToggle.enableGradeToggle
                    )}
                    onChange={(e, i, value) => this.handleDsChange(e, i, value)}>
                    {lookupDS}
                </SelectField>
                <SelectField
                    className="grade-history-width"
                    style={styles.customWidthField}
                    floatingLabelText="Grade"
                    maxHeight={200}
                    disabled={!this.props.enableToggle.enableGradeToggle}
                    value={this.props.enableToggle.enableGradeToggle ? this.props.newEmployee.gradeHistory[0].grade : ''}
                    errorText={showErrorMessage(
                        this.props.openValidationMessage.gradeValidation, this.props.newEmployee.gradeHistory[0].grade, this.props.enableToggle.enableGradeToggle
                    )}
                    onChange={(e, i, value) => this.handleGradeChange(e, i, value)}>
                    {lookupGradeMenuItem}
                </SelectField>
                <DatePicker
                    className="grade-history-width"
                    style={styles.customStyleDate}
                    floatingLabelText="Start Date"
                    disabled={!this.props.enableToggle.enableGradeToggle}
                    value={this.props.enableToggle.enableGradeToggle ? this.props.newEmployee.gradeHistory[0].startDate : null}
                    errorText={showErrorMessage(
                        this.props.openValidationMessage.gradeValidation, this.props.newEmployee.gradeHistory[0].startDate, this.props.enableToggle.enableGradeToggle
                    )}
                    onChange={(e, value) => this.handleStartDateChange(e, value)}
                    autoOk={true} />
                <DatePicker
                    className="grade-history-width"
                    style={styles.customStyleDate}
                    floatingLabelText="End Date"
                    disabled={!this.props.enableToggle.enableGradeToggle}
                    value={this.props.enableToggle.enableGradeToggle ? this.props.newEmployee.gradeHistory[0].endDate : null}
                    onChange={(e, value) => this.handleEndDateChange(e, value)}
                    autoOk={true} />
            </div>
        )
    }
}

EmployeeGradeDialog.propTypes={
    currentEmployee: PropTypes.object,
    lookUpData : PropTypes.object,
    newEmployee: PropTypes.object,
    openValidationMessage: PropTypes.object,
    pageMode: PropTypes.oneOf(['EDIT', 'NEW']),
    setSavedEmployee: PropTypes.func,
    handleStateChanged: PropTypes.func
}

export default EmployeeGradeDialog;