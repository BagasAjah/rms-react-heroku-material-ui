import React, {Component, PropTypes} from 'react';

import Dialog from 'material-ui/Dialog';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';

import ContentAdd from 'material-ui/svg-icons/content/add';

import EmployeeTabDetails from "../containers/employee/EmployeeTabDetails"
import EmployeeHistoryDetailDialog from "../containers/employee/EmployeeHistoryDetailDialog"
import EmployeeGradeDialog from "../containers/employee/EmployeeGradeDialog"
import EmployeeTabFamilyMember from "../containers/employee/EmployeeTabFamilyMember"
import EmployeeLocationDetailDialog from "../containers/employee/EmployeeLocationDetailDialog"

import { handleDataBeforeSaveOrUpdate, setDefaultEmployee,
    validateEmployeeDetails, validateEmployeeHistory,
    validateEmployeeGrade, validateEmployeeFamily } from "../../lib/employee/employeeHelper";

class NewEmployeeDialog extends Component {
    constructor(props) {
        super(props);
        this.state={
            stepIndex: 0,
            finished: false,
        }
        this.openDialogClick=this.openDialogClick.bind(this);
        this.closeDialogClick=this.closeDialogClick.bind(this);
        this.handleNext=this.handleNext.bind(this);
        this.handlePrev=this.handlePrev.bind(this);
    }

    componentDidMount=() => {
        this.addNewEmployee=this.addNewEmployee.bind(this);
    }


    addNewEmployee=(employeeData) => {
        this.props.addCurrentEmployee(handleDataBeforeSaveOrUpdate(employeeData));
    }

    setSavedEmployee=(employee) => {
        this.props.setSavedEmployee(employee);
    }

    openDialogClick=() => {
        this.props.handleOpenDialogChanged('newEmployeeDialog', true);
        this.props.handleStateChanged('newEmployee', setDefaultEmployee());
        this.setState({
            stepIndex: 0,
            finished: false
        });
    }

    closeDialogClick=() => {
        this.props.handleOpenDialogChanged('newEmployeeDialog', false);
    }

    handleNext=() => {
        const {stepIndex}=this.state;
        if (stepIndex === 0) {
            if (validateEmployeeDetails(this.props.newEmployee)) {
                this.props.handleOpenValidationMessage('detailValidation', true);
                return;
            }
            this.props.handleOpenValidationMessage('detailValidation', false);
            this.props.handleOpenValidationMessage('historyValidation', false);
        } else if (stepIndex === 1) {
            if (validateEmployeeHistory(this.props.newEmployee.history[0]) && this.props.enableToggle.enableHistoryToggle) {
                this.props.handleOpenValidationMessage('historyValidation', true);
                return;
            }
            this.props.handleOpenValidationMessage('historyValidation', false);
            this.props.handleOpenValidationMessage('gradeValidation', false);
        } else if (stepIndex === 2) {
            if (validateEmployeeGrade(this.props.newEmployee.gradeHistory[0]) && this.props.enableToggle.enableGradeToggle) {
                this.props.handleOpenValidationMessage('gradeValidation', true);
                return;
            }
            this.props.handleOpenValidationMessage('gradeValidation', false);
            this.props.handleOpenValidationMessage('familyValidation', false);
        } else if (stepIndex === 3) {
            var familyMember=this.props.newEmployee.familyMember;
            for (var i=0; i < familyMember.length; i++) {
                if(validateEmployeeFamily(familyMember[i])){
                    this.props.handleOpenValidationMessage('familyValidation', true);
                    return;
                }
            }
            this.props.handleOpenValidationMessage('familyValidation', false);
        }
        this.setState({
          stepIndex: stepIndex + 1,
          finished: stepIndex >= 5,
        });
        if(stepIndex > 5){
            this.addNewEmployee(this.props.newEmployee);
        }
    }

    handlePrev=() => {
        const {stepIndex}=this.state;
        if (stepIndex > 0) {
            this.setState({
                stepIndex: stepIndex - 1,
                finished: false
            });
        }
    }

    getStepContent=(stepIndex) => {
        switch (stepIndex) {
          case 0:
            return (
                <EmployeeTabDetails
                    currentEmployee={this.props.newEmployee}
                    pageMode={'NEW'}
                    viewMode={false}/>);
          case 1:
            return (
                <div>
                    <h2>Employee History Details</h2>
                    <EmployeeHistoryDetailDialog
                        pageMode={'NEW'}/>
                </div>);
          case 2:
            return (
                <div>
                    <h2>Employee Grade Details</h2>
                    <EmployeeGradeDialog
                        pageMode={'NEW'}/>
                </div>);
          case 3:
            return (
                <EmployeeTabFamilyMember
                    currentEmployee={this.props.newEmployee}
                    pageMode={'NEW'}
                    viewMode={false}/>);
          case 4:
            return (
                <div>
                    <h2>Employee Address</h2>
                </div>);
          case 5:
          case 6:
          case 7:
            return (
                <div>
                    <h2>Employee Location Details</h2>
                    <EmployeeLocationDetailDialog
                        pageMode={'NEW'} />
                </div>);
          default:
            return 'You\'re a long way from home sonny jim!';
        }
    }

    render=() => {
        const {stepIndex, finished}=this.state;
        const actionsButton=[
            <RaisedButton
                label="Cancel"
                style={{float:"left"}}
                onClick={this.closeDialogClick}
            />,
            <RaisedButton
                label="Back"
                disabled={stepIndex === 0}
                onTouchTap={this.handlePrev}
            />,
            <RaisedButton
                label={finished ? 'Create Employee' : 'Next'}
                secondary={true}
                onTouchTap={this.handleNext}
            />
        ];
        const title=[
            <Stepper key="newEmployeeStepper" activeStep={stepIndex}>
                <Step>
                    <StepLabel>Details</StepLabel>
                </Step>
                <Step>
                    <StepLabel>History</StepLabel>
                </Step>
                <Step>
                    <StepLabel>Grade</StepLabel>
                </Step>
                <Step>
                    <StepLabel>Family</StepLabel>
                </Step>
                <Step>
                    <StepLabel>Address</StepLabel>
                </Step>
                <Step>
                    <StepLabel>Location</StepLabel>
                </Step>
            </Stepper>
        ];
        return(
            <div>
                <FloatingActionButton className="add-button-position" secondary={true} onClick={this.openDialogClick}>
                  <ContentAdd />
                </FloatingActionButton>
                <Dialog
                    title={title}
                    actions={actionsButton}
                    modal={false}
                    contentStyle={{width: "65%", maxWidth: "none", height:"65%", maxHeight:"none"}}
                    open={this.props.openDialog.newEmployeeDialog}
                    autoScrollBodyContent={true}
                    onRequestClose={this.closeDialogClick}>
                    <div>
                        {this.getStepContent(stepIndex)}
                    </div>
                </Dialog>
            </div>
        )
    }
}

NewEmployeeDialog.propTypes={
    openDialog: PropTypes.object,
    newEmployee: PropTypes.object,
    pageMode: PropTypes.oneOf(['EDIT', 'NEW']),
    addCurrentEmployee: PropTypes.func,
    handleOpenDialogChanged: PropTypes.func
}

export default NewEmployeeDialog;