import React, { Component, PropTypes } from 'react';
import update from 'react-addons-update';

import Avatar from 'material-ui/Avatar';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';

import CameraIcon from 'material-ui/svg-icons/action/camera-enhance';
import { pinkA200 } from 'material-ui/styles/colors';

import { parseStringToDate, showErrorMessage } from  "../../lib/employee/employeeHelper"

const avatarStyle={
    marginTop: 10,
    height: 100,
    width: 100
}

const cameraPickStyle={
    position: "absolute",
    zIndex: 2,
    marginTop: 10,
    marginLeft: -20
}

class EmployeeTabDetails extends Component {

    constructor(props) {
        super(props);
        this.state={
            avatar: '',
        }
        this.handleFirstNameChange=this.handleFirstNameChange.bind(this);
        this.handleLastNameChange=this.handleLastNameChange.bind(this);
        this.handleGenderChange=this.handleGenderChange.bind(this);
        this.handleDobChange=this.handleDobChange.bind(this);
        this.handleNationalityChange=this.handleNationalityChange.bind(this);
        this.handleMaritalStatusChange=this.handleMaritalStatusChange.bind(this);
        this.handlePhoneChange=this.handlePhoneChange.bind(this);
        this.handleSubDivisionChange=this.handleSubDivisionChange.bind(this);
        this.handleStatusChange=this.handleStatusChange.bind(this);
        this.handleSuspendDateChange=this.handleSuspendDateChange.bind(this);
        this.handleHireDateChange=this.handleHireDateChange.bind(this);
        this.handleGradeChange=this.handleGradeChange.bind(this);
        this.handleDivisionChange=this.handleDivisionChange.bind(this);
        this.handleEmailChange=this.handleEmailChange.bind(this);
        this.setSavedEmployee=this.setSavedEmployee.bind(this);
    }

    handleFirstNameChange=() => {
        var employee=update(this.props.currentEmployee, {'firstName': {$set: this.firstNameInput.input.value}});
        this.setSavedEmployee(employee);
    }

    handleLastNameChange=() => {
        var employee=update(this.props.currentEmployee, {'lastName': {$set: this.lastNameInput.input.value}});
        this.setSavedEmployee(employee);
    }

    handleGenderChange=(event, index, value) => {
        var employee=update(this.props.currentEmployee, {'gender': {$set: value}});
        this.setSavedEmployee(employee);
    }

    handleDobChange=(e, value) => {
        var employee=update(this.props.currentEmployee, {'dob': {$set: value}});
        this.setSavedEmployee(employee);
    }

    handleNationalityChange=() => {
        var employee=update(this.props.currentEmployee, {'nationality': {$set: this.nationalityInput.input.value}});
        this.setSavedEmployee(employee);
    }

    handleMaritalStatusChange=(e, index, value) => {
        var employee=update(this.props.currentEmployee, {'maritalStatus': {$set: value}});
        this.setSavedEmployee(employee);
    }

    handlePhoneChange=() => {
        var employee=update(this.props.currentEmployee, {'phone': {$set: this.phoneInput.input.value}});
        this.setSavedEmployee(employee);
    }

    handleSubDivisionChange=() => {
        var employee=update(this.props.currentEmployee, {'subDivision': {$set: this.subDivisionInput.input.value}});
        this.setSavedEmployee(employee);
    }

    handleStatusChange=(e, index, value) => {
        var employee=update(this.props.currentEmployee, {'status': {$set: value}});
        this.setSavedEmployee(employee);
    }

    handleSuspendDateChange=(e, value) => {
        var employee=update(this.props.currentEmployee, {'suspendDate': {$set: value}});
        this.setSavedEmployee(employee);
    }

    handleHireDateChange=(e, value) => {
        var employee=update(this.props.currentEmployee, {'hireDate': {$set: value}});
        this.setSavedEmployee(employee);
    }

    handleGradeChange=(e, index, value) => {
        var employee=update(this.props.currentEmployee, {'grade': {$set: value}});
        this.setSavedEmployee(employee);
    }

    handleDivisionChange=(e, index, value) => {
        var employee=update(this.props.currentEmployee, {'division': {$set: value}});
        this.setSavedEmployee(employee);
    }

    handleEmailChange=() => {
        var employee=update(this.props.currentEmployee, {'email': {$set: this.emailInput.input.value}});
        this.setSavedEmployee(employee);
    }

    setSavedEmployee=(employee) => {
        this.props.setSavedEmployee(employee, this.props.pageMode);
    }

    handleChangeAvatar=(event) => {
        let fReader=new FileReader();
        let file=event.target.files[0];
        fReader.readAsDataURL(file);
        fReader.onloadend=((e) => {
            let URI=encodeURI(e.target.result);
            var employee=update(this.props.currentEmployee, {'base64Image': {$set: URI}});
            this.setSavedEmployee(employee);
        });
    }

    handleUploadClick=(event) => {
        if(!this.props.viewMode){
            this.avatarInput.click();
        }
    }


    render=() => {
        var avatar,dob,hireDate,suspendDate;
        var avatarLetter;
        if (this.props.currentEmployee) {
            dob=this.props.currentEmployee.dob == null ? null : parseStringToDate(this.props.currentEmployee.dob);
            hireDate=this.props.currentEmployee.hireDate == null ? null : parseStringToDate(this.props.currentEmployee.hireDate);
            suspendDate=this.props.currentEmployee.suspendDate == null ? null : parseStringToDate(this.props.currentEmployee.suspendDate);
            avatar=this.props.currentEmployee.base64Image;
            avatarLetter=this.props.currentEmployee.firstName ? this.props.currentEmployee.firstName.charAt(0) : "?";
        } else {
            dob=null;
            hireDate=null;
            suspendDate=null;
            avatar=null;
        }

        if (this.props.lookUpData.gender.length >0 ) {
            var lookupGenderMenuItem=this.props.lookUpData.gender.map(lookupGender =>
                <MenuItem key={lookupGender.lookupCode} value={lookupGender.lookupCode} primaryText={lookupGender.lookupValue} />
            );
        }
        if (this.props.lookUpData.statusMarital.length >0 ) {
            var lookupMaritalStatusMenuItem=this.props.lookUpData.statusMarital.map(lookupMaritalStatus =>
                <MenuItem key={lookupMaritalStatus.lookupCode} value={lookupMaritalStatus.lookupCode} primaryText={lookupMaritalStatus.lookupValue} />
            );
        }
        if (this.props.lookUpData.status.length >0 ) {
            var lookupStatusMenuItem=this.props.lookUpData.status.map(lookupStatus =>
                <MenuItem key={lookupStatus.lookupCode} value={lookupStatus.lookupCode} primaryText={lookupStatus.lookupValue} />
            );
        }
        if (this.props.lookUpData.grade.length >0 ) {
            var lookupGradeMenuItem=this.props.lookUpData.grade.map(lookupGrade =>
                <MenuItem key={lookupGrade.lookupCode} value={lookupGrade.lookupCode} primaryText={lookupGrade.lookupValue} />
            );
        }
        if (this.props.lookUpData.division.length >0 ) {
            var lookupDivisionMenuItem=this.props.lookUpData.division.map(lookupDivision =>
                <MenuItem key={lookupDivision.lookupCode} value={lookupDivision.lookupCode} primaryText={lookupDivision.lookupValue} />
            );
        }
        return(
        <div className="menu-content">
            <h2>Employee Details</h2>
            <div className="content">
                <input type="hidden" id="employeeId"/>
                <TextField
                    floatingLabelText="First Name"
                    ref={(input) => this.firstNameInput=input}
                    onChange={this.handleFirstNameChange}
                    value={this.props.currentEmployee ? this.props.currentEmployee.firstName : ''}
                    errorText={showErrorMessage(this.props.openValidationMessage.detailValidation,
                        this.props.currentEmployee == null ? '' : this.props.currentEmployee.firstName, true)}
                    disabled={this.props.viewMode}
                /><br />
                <TextField
                    floatingLabelText="Last Name"
                    ref={(input) => this.lastNameInput=input}
                    onChange={this.handleLastNameChange}
                    value={this.props.currentEmployee ? this.props.currentEmployee.lastName : ''}
                    disabled={this.props.viewMode}
                /><br />
                <SelectField
                    floatingLabelText="Gender"
                    value={this.props.currentEmployee ? this.props.currentEmployee.gender : ''}
                    onChange={(e, i, value) => this.handleGenderChange(e, i, value)}
                    errorText={showErrorMessage(this.props.openValidationMessage.detailValidation,
                        this.props.currentEmployee == null ? '' : this.props.currentEmployee.gender, true)}
                    disabled={this.props.viewMode}>
                    {lookupGenderMenuItem}
                </SelectField><br />
                <DatePicker
                    floatingLabelText="Date of Birth"
                    value={dob}
                    onChange={(e, value) => this.handleDobChange(e, value)}
                    autoOk={true}
                    errorText={showErrorMessage(this.props.openValidationMessage.detailValidation, dob , true)}
                    disabled={this.props.viewMode}
                />
                <TextField
                    floatingLabelText="Nationality"
                    ref={(input) => this.nationalityInput=input}
                    value={this.props.currentEmployee ? this.props.currentEmployee.nationality : ''}
                    onChange={this.handleNationalityChange}
                    disabled={this.props.viewMode}
                /><br />
                <SelectField
                    floatingLabelText="Marital Status"
                    value={this.props.currentEmployee ? this.props.currentEmployee.maritalStatus : ''}
                    onChange={(e, i, value) => this.handleMaritalStatusChange(e, i, value)}
                    disabled={this.props.viewMode}>
                    {lookupMaritalStatusMenuItem}
                </SelectField><br />
                <TextField
                    floatingLabelText="Phone"
                    ref={(input) => this.phoneInput=input}
                    value={this.props.currentEmployee ? this.props.currentEmployee.phone : ''}
                    onChange={this.handlePhoneChange}
                    disabled={this.props.viewMode}
                /><br />
            </div>
            <div className="content">
                <TextField
                    floatingLabelText="Sub Division"
                    ref={(input) => this.subDivisionInput=input}
                    value={this.props.currentEmployee ? this.props.currentEmployee.subDivision : ''}
                    onChange={this.handleSubDivisionChange}
                    disabled={this.props.viewMode}
                /><br />
                <SelectField
                    floatingLabelText="Status"
                    value={this.props.currentEmployee ? this.props.currentEmployee.status : ''}
                    onChange={(e,i, value) => this.handleStatusChange(e, i, value)}
                    disabled={this.props.viewMode}>
                    {lookupStatusMenuItem}
                </SelectField><br />
                <DatePicker
                    floatingLabelText="Suspend Date"
                    value={suspendDate}
                    onChange={(e, value) => this.handleSuspendDateChange(e, value)}
                    autoOk={true}
                    disabled={this.props.viewMode}
                />
                <DatePicker
                    floatingLabelText="Hire Date"
                    value={hireDate}
                    onChange={(e, value) => this.handleHireDateChange(e, value)}
                    autoOk={true}
                    errorText={showErrorMessage(this.props.openValidationMessage.detailValidation, hireDate, true)}
                    disabled={this.props.viewMode}
                />
                <SelectField
                    floatingLabelText="Grade"
                    maxHeight={200}
                    value={this.props.currentEmployee ? this.props.currentEmployee.grade : ''}
                    onChange={(e, i, value) => this.handleGradeChange(e, i, value)}
                    disabled={this.props.viewMode}>
                    {lookupGradeMenuItem}
                </SelectField><br />
                <SelectField
                    floatingLabelText="Division"
                    value={this.props.currentEmployee ? this.props.currentEmployee.division : ''}
                    onChange={(e, i, value) => this.handleDivisionChange(e, i, value)}
                    disabled={this.props.viewMode}>
                    {lookupDivisionMenuItem}
                </SelectField><br />
                <TextField
                    floatingLabelText="Email"
                    ref={(input) => this.emailInput=input}
                    value={this.props.currentEmployee ? this.props.currentEmployee.email : ''}
                    onChange={this.handleEmailChange}
                    disabled={this.props.viewMode}
                /><br />
            </div>
            <div className="content">
                <input id="input-file" ref={(input) => this.avatarInput=input } type="file" name="avatar" accept="image/*" onChange={(e) => this.handleChangeAvatar(e)} />
                {
                    avatar != null ? <Avatar src={avatar} style={avatarStyle} onTouchTap={(e) => this.handleUploadClick(e)} />
                        : <Avatar style={avatarStyle} size={100} onTouchTap={(e) => this.handleUploadClick(e)}>
                            {avatarLetter}
                        </Avatar>
                }
                {this.props.viewMode ? "" : <CameraIcon className="material-icons" style={cameraPickStyle}
                                                                  hoverColor={pinkA200}
                                                                  onClick={(e) => this.handleUploadClick(e)}/>}
            </div>
        </div>
        )
    }
}

EmployeeTabDetails.propTypes={
    currentEmployee: PropTypes.object,
    lookUpData : PropTypes.object,
    pageMode: PropTypes.oneOf(['EDIT', 'NEW']),
    viewMode: PropTypes.bool,
    setSavedEmployee: PropTypes.func
}

export default EmployeeTabDetails;