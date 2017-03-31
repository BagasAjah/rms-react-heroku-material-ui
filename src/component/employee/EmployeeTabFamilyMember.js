import React, { Component, PropTypes } from 'react';
import update from 'react-addons-update';

import Checkbox from 'material-ui/Checkbox';
import DatePicker from 'material-ui/DatePicker';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import MenuItem from 'material-ui/MenuItem';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';

import ActionDelete from 'material-ui/svg-icons/action/delete';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentUpdate from 'material-ui/svg-icons/content/create';

import {grey500} from 'material-ui/styles/colors';

import { parseStringToDate, showErrorMessage, validateEmployeeFamily } from  "../../lib/employee/employeeHelper"

class EmployeeTabFamilyMember extends Component {

    constructor(props) {
        super(props);
        this.handleFamilyNameChanged=this.handleFamilyNameChanged.bind(this);
        this.handleFamilyGenderChanged=this.handleFamilyGenderChanged.bind(this);
        this.handleFamilyDobChanged=this.handleFamilyDobChanged.bind(this);
        this.handleFamilyTypeChanged=this.handleFamilyTypeChanged.bind(this);
        this.handleFamilyIsActiveChanged=this.handleFamilyIsActiveChanged.bind(this);
        this.addFamilyMemberClick=this.addFamilyMemberClick.bind(this);
    }

    handleFamilyNameChanged=(e, value, familyIndex) => {
        var updatedEmployee=update(this.props.currentEmployee, {
            'familyMember': {
                [familyIndex]: {
                    'familyName': {$set: value}
                }
            }
        });
        this.props.setSavedEmployee(updatedEmployee, this.props.pageMode);
    }

    handleFamilyGenderChanged=(e, index, value, familyIndex) => {
        var updatedEmployee=update(this.props.currentEmployee, {
            'familyMember': {
                [familyIndex]: {
                    'familyGender': {$set: value}
                }
            }
        });
        this.props.setSavedEmployee(updatedEmployee, this.props.pageMode);
    }

    handleFamilyDobChanged=(e, value, familyIndex) => {
        var updatedEmployee=update(this.props.currentEmployee, {
            'familyMember': {
                [familyIndex]: {
                    'familyDob': {$set: value}
                }
            }
        });
        this.props.setSavedEmployee(updatedEmployee, this.props.pageMode);
    }

    handleFamilyTypeChanged=(e, index, value, familyIndex) => {
        var updatedEmployee=update(this.props.currentEmployee, {
            'familyMember': {
                [familyIndex]: {
                    'familyType': {$set: value}
                }
            }
        });
        this.props.setSavedEmployee(updatedEmployee, this.props.pageMode);
    }

    handleFamilyIsActiveChanged=(e, isInputChecked, familyIndex) => {
        var updatedEmployee=update(this.props.currentEmployee, {
            'familyMember': {
                [familyIndex]: {
                    'isActive': {$set: isInputChecked}
                }
            }
        });
        this.props.setSavedEmployee(updatedEmployee, this.props.pageMode);
    }

    addFamilyMemberClick=() => {
        var currentEmployee=this.props.currentEmployee;
        var familyMember=currentEmployee.familyMember;
        for (var i=0; i < familyMember.length; i++) {
            if(validateEmployeeFamily(familyMember[i])){
                this.props.handleOpenValidationMessage('familyValidation', true);
                return;
            }
        }
        var updatedEmployee=update(currentEmployee, {
            familyMember: {
                $push: [{
                    familyName: '',
                    familyGender: '',
                    familyDob: null,
                    familyType: '',
                    isActive: false
                }]
            }
        });
        this.props.setSavedEmployee(updatedEmployee, this.props.pageMode);
        this.props.handleStateChanged('selectedIndex', null);
        this.props.handleOpenValidationMessage('familyValidation', false);
    }

    updateClick=(index) => {
        if(!this.props.viewMode){
            this.props.handleStateChanged('selectedIndex', index);
        }
    }

    deleteClick=(index) => {
        if(!this.props.viewMode){
            var updatedEmployee=update(this.props.currentEmployee, {'familyMember': {$splice: [[index,1]]}});
            this.props.setSavedEmployee(updatedEmployee, this.props.pageMode);
        }
    }

    render=() => {
        const noDataFound=[
            <TableRow key='not-found'>
                <TableRowColumn style={{textAlign: 'center'}}>
                    <TextField
                        id="not-found-field"
                        value={"No Family Member Found"}
                        disabled={true}
                        underlineShow={false}/>
                </TableRowColumn>
            </TableRow>
        ];
        if (this.props.lookUpData.gender.length >0 ) {
            var lookupGenderMenuItem=this.props.lookUpData.gender.map(lookupGender =>
                <MenuItem key={lookupGender.lookupCode} value={lookupGender.lookupCode} primaryText={lookupGender.lookupValue} />
            );
        }
        if (this.props.lookUpData.familyType.length >0 ) {
            var lookupTypeMenuItem=this.props.lookUpData.familyType.map(lookupType =>
                <MenuItem key={lookupType.lookupCode} value={lookupType.lookupCode} primaryText={lookupType.lookupValue} />
            );
        }
        var employeeNotFound=true;
        if (this.props.currentEmployee) {
            var familyMember=this.props.currentEmployee.familyMember;
            var familyMemberListDetail=familyMember.map( (familyMember, familyIndex) =>
                (<TableRow key={familyIndex}>
                    <TableRowColumn width={"25%"}>
                        <TextField
                            id={"family-name-"+familyMember.familyId}
                            value={familyMember.familyName}
                            disabled={familyIndex===this.props.selectedIndex?false:true}
                            errorText={showErrorMessage(
                                this.props.openValidationMessage.familyValidation, familyMember.familyName, true
                            )}
                            onChange={(event, value) =>  this.handleFamilyNameChanged(event, value, familyIndex)}
                            underlineShow={false}/>
                    </TableRowColumn>
                    <TableRowColumn width={"10%"}>
                        <SelectField
                            id={"family-gender-"+familyMember.familyId}
                            maxHeight={200}
                            value={familyMember.familyGender}
                            disabled={familyIndex===this.props.selectedIndex?false:true}
                            onChange={(event, index, value) =>  this.handleFamilyGenderChanged(event, index, value, familyIndex)}
                            underlineShow={false}>
                            {lookupGenderMenuItem}
                        </SelectField>
                    </TableRowColumn>
                    <TableRowColumn width={"25%"}>
                        <DatePicker
                            id={"family-dob-"+familyMember.familyId}
                            value={parseStringToDate(familyMember.familyDob)}
                            autoOk={true}
                            disabled={familyIndex===this.props.selectedIndex?false:true}
                            onChange={(event, value) =>  this.handleFamilyDobChanged(event, value, familyIndex)}
                            underlineShow={false}
                        />
                    </TableRowColumn>
                    <TableRowColumn width={"15%"}>
                        <SelectField
                            id={"family-type-"+familyMember.familyId}
                            maxHeight={200}
                            value={familyMember.familyType}
                            disabled={familyIndex===this.props.selectedIndex?false:true}
                            errorText={showErrorMessage(
                                this.props.openValidationMessage.familyValidation, familyMember.familyType, true
                            )}
                            onChange={(event, index, value) =>  this.handleFamilyTypeChanged(event, index, value, familyIndex)}
                            underlineShow={false}>
                            {lookupTypeMenuItem}
                        </SelectField>
                    </TableRowColumn>
                    <TableRowColumn width={"5%"}>
                        <Checkbox
                            label="Simple"
                            checked={familyMember.isActive}
                            onCheck={(event, isInputChecked) =>  this.handleFamilyIsActiveChanged(event, isInputChecked, familyIndex)}
                            disabled={familyIndex===this.props.selectedIndex?false:true}/>
                    </TableRowColumn>
                    <TableRowColumn width={"20%"}>
                        <ContentUpdate className='pen-icon-margin' color={grey500} onClick={this.updateClick.bind(this, familyIndex)}/>
                        <ActionDelete color={grey500} onClick={this.deleteClick.bind(this, familyIndex)}/>
                    </TableRowColumn>
                </TableRow>)
            );
            employeeNotFound=false;
        }
        return(
            <div className="menu-content">
                <h2>Employee Family Member</h2>
                {employeeNotFound ? (<div style={{textAlign: 'center'}}>Family Member Not Found</div>) :
                <Table selectable={false}>
                    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn width={"25%"}>Name</TableHeaderColumn>
                            <TableHeaderColumn width={"10%"}>Gender</TableHeaderColumn>
                            <TableHeaderColumn width={"25%"}>DOB</TableHeaderColumn>
                            <TableHeaderColumn width={"15%"}>Type</TableHeaderColumn>
                            <TableHeaderColumn width={"5%"}>Active</TableHeaderColumn>
                            <TableHeaderColumn width={"20%"}></TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}>
                        {(familyMemberListDetail.length === 0) ?
                            (noDataFound) : (familyMemberListDetail)}
                    </TableBody>
                </Table>
                }
                <FloatingActionButton className="btn-add-tab-position"
                    secondary={true}
                    onClick={this.addFamilyMemberClick}
                    disabled={this.props.viewMode}>
                    <ContentAdd />
                </FloatingActionButton>
            </div>
        )
    }
}

EmployeeTabFamilyMember.propTypes={
    currentEmployee: PropTypes.object,
    lookUpData : PropTypes.object,
    newEmployee: PropTypes.object,
    openDialog: PropTypes.object,
    openValidationMessage: PropTypes.object,
    pageMode: PropTypes.oneOf(['EDIT', 'NEW']),
    selectedIndex: PropTypes.number,
    viewMode: PropTypes.bool,
    setSavedEmployee: PropTypes.func,
    handleStateChanged: PropTypes.func
}

export default EmployeeTabFamilyMember;