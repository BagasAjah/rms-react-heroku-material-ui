import React, { Component, PropTypes } from 'react';
import update from 'react-addons-update';

import DatePicker from 'material-ui/DatePicker';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import TextField from 'material-ui/TextField';

import ActionDelete from 'material-ui/svg-icons/action/delete';
import ContentAdd from 'material-ui/svg-icons/content/add';

import {grey500} from 'material-ui/styles/colors';

import EmployeeGradeDialog from "../containers/employee/EmployeeGradeDialog"
import { setDefaultEmployee, handleDataBeforeSaveOrUpdate, parseStringToDate, validateEmployeeGrade } from "../../lib/employee/employeeHelper"

class EmployeeTabGradeHistory extends Component {

    constructor(props) {
        super(props);
        this.addGradeHistoryClick=this.addGradeHistoryClick.bind(this);
        this.openDialogClick=this.openDialogClick.bind(this);
        this.closeDialogClick=this.closeDialogClick.bind(this);
        this.deleteClick=this.deleteClick.bind(this);
    }

    openDialogClick=() => {
        this.props.handleOpenDialogChanged('gradeDialog', true);
        this.props.handleOpenValidationMessage('gradeValidation', false);
        this.props.handleStateChanged('newEmployee', setDefaultEmployee());
    }

    closeDialogClick=() => {
        this.props.handleOpenDialogChanged('gradeDialog', false);
        this.props.handleOpenValidationMessage('gradeValidation', false);
    }

    deleteClick=() => {
        if(!this.props.viewMode){
            var updatedEmployee=update(this.props.currentEmployee, {'gradeHistory': {$splice: [[0,1]]}});
            this.props.setSavedEmployee(updatedEmployee, this.props.pageMode);
        }
    }

    addGradeHistoryClick=() => {
        var gradeHistory=this.props.newEmployee.gradeHistory[0];
        if(validateEmployeeGrade(gradeHistory) && this.props.enableToggle.enableGradeToggle) {
            this.props.handleOpenValidationMessage('gradeValidation', true);
        } else {
            var currentEmployee=this.props.currentEmployee;
            var updatedEmployee=update(currentEmployee, {'gradeHistory': {
                $push: [{
                    ds: gradeHistory.ds,
                    grade: gradeHistory.grade,
                    startDate: gradeHistory.startDate,
                    endDate: gradeHistory.endDate
                }]
            }});
            this.props.setSavedEmployee(handleDataBeforeSaveOrUpdate(updatedEmployee), this.props.pageMode);
            this.closeDialogClick();
        }
    }

    render=() => {
        const noDataFound=[
            <TableRow key='not-found'>
                <TableRowColumn style={{textAlign: 'center'}}>
                    <TextField
                        id="not-found-field"
                        value={"No Grade Data Found"}
                        disabled={true}
                        underlineShow={false}/>
                </TableRowColumn>
            </TableRow>
        ];
        const actionsButton=[
            <FlatButton
                label="Add"
                primary={true}
                onTouchTap={this.addGradeHistoryClick}
            />
        ];
        var employeeNotFound=true;
        if (this.props.currentEmployee) {
            var gradeHistory=this.props.currentEmployee.gradeHistory;
            if (this.props.lookUpData.grade.length >0 ) {
                var lookupGradeMenuItem=this.props.lookUpData.grade.map(lookupGrade =>
                    <MenuItem key={lookupGrade.lookupCode} value={lookupGrade.lookupCode} primaryText={lookupGrade.lookupValue} />
                );
            }
            var startDate=parseStringToDate(gradeHistory.startDate);
            var endDate=parseStringToDate(gradeHistory.endDate);

            var gradeHistoryListDetail=gradeHistory.map( (gradeHistory, index) =>
                (<TableRow key={index}>
                    <TableRowColumn>
                        <TextField
                            id={"ds-"+gradeHistory.ds}
                            value={"DS"+gradeHistory.ds}
                            disabled={true}
                            underlineShow={false}/>
                    </TableRowColumn>
                    <TableRowColumn>
                        <SelectField
                            id={"grade-"+gradeHistory.ds}
                            className="grade-history-width"
                            maxHeight={200}
                            value={gradeHistory.grade}
                            disabled={true}
                            underlineShow={false}>
                            {lookupGradeMenuItem}
                        </SelectField>
                    </TableRowColumn>
                    <TableRowColumn>
                        <DatePicker
                            id={"start-date-"+gradeHistory.ds}
                            value={startDate}
                            autoOk={true}
                            disabled={true}
                            underlineShow={false}
                        />
                    </TableRowColumn>
                    <TableRowColumn>
                        <DatePicker
                            id={"end-date-"+gradeHistory.ds}
                            value={endDate}
                            autoOk={true}
                            disabled={true}
                            underlineShow={false}
                        />
                    </TableRowColumn>
                    <TableRowColumn>{
                        (index === 0) ?
                            <ActionDelete color={grey500} onClick={this.deleteClick}/>
                        : ''
                    }</TableRowColumn>
                </TableRow>)
            );
            employeeNotFound=false;
        }
        return(
            <div className="menu-content">
                <h2>Employee Grade History</h2>
                {employeeNotFound ? (<div style={{textAlign: 'center'}}>Employee Grade Not Found</div>) :
                <Table>
                    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn>DS</TableHeaderColumn>
                            <TableHeaderColumn>Grade</TableHeaderColumn>
                            <TableHeaderColumn>Start Date</TableHeaderColumn>
                            <TableHeaderColumn>End Date</TableHeaderColumn>
                            <TableHeaderColumn>Action</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}>
                        {(gradeHistoryListDetail.length === 0) ?
                                (noDataFound) : (gradeHistoryListDetail)}
                    </TableBody>
                </Table>
                }
                <FloatingActionButton className="btn-add-tab-position"
                    secondary={true}
                    onClick={this.openDialogClick}
                    disabled={this.props.viewMode}>
                    <ContentAdd />
                </FloatingActionButton>
                <Dialog
                    title="New Grade History"
                    contentStyle={{width: '65%',maxWidth: 'none'}}
                    actions={actionsButton}
                    modal={false}
                    open={this.props.openDialog.gradeDialog}
                    onRequestClose={this.closeDialogClick}>
                        <EmployeeGradeDialog
                            currentEmployee={this.props.currentEmployee}
                            pageMode={'NEW'}/>
                </Dialog>
            </div>
        )
    }

}

EmployeeTabGradeHistory.propTypes={
    currentEmployee: PropTypes.object,
    openDialog: PropTypes.object,
    lookUpData : PropTypes.object,
    pageMode: PropTypes.oneOf(['EDIT', 'NEW']),
    viewMode: PropTypes.bool,
    setSavedEmployee: PropTypes.func,
    handleOpenDialogChanged: PropTypes.func,
    handleOpenValidationMessage: PropTypes.func,
    handleStateChanged: PropTypes.func
}

export default EmployeeTabGradeHistory;