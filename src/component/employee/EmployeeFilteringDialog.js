import React, {Component, PropTypes} from 'react';
import update from 'react-addons-update';

import Checkbox from 'material-ui/Checkbox';
import {List, ListItem} from 'material-ui/List';

class EmployeeFilteringDialog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            gradeObj: [],
        }
        this.handleChangeAllGenderValue = this.handleChangeAllGenderValue.bind(this);
        this.handleChangeAllGradeValue = this.handleChangeAllGradeValue.bind(this);
        this.handleChangeGradeValue = this.handleChangeGradeValue.bind(this);
        this.handleChangeGenderValue = this.handleChangeGenderValue.bind(this);
    }

    componentWillMount = () => {
        var newGradeObj = this.filterByChanged(this.props.lookUpData.grade, true);
        var nextState = update(this.props.pageDetail.filteringProps, {
            "byGrade" : {$set: newGradeObj}
        });
        var newGenderObj = this.filterByChanged(this.props.lookUpData.gender, true);
        nextState = update(nextState, {
            "byGender" : {$set: newGenderObj}
        });
        this.props.changePageDetailValue("filteringProps",nextState);
    }

    filterByChanged = (lookup, checked) => {
        var newObj  = lookup.map ( lookup => {
            lookup.isChecked = checked;
            return lookup;
        })
        return newObj;
    }

    handleChangeAllGradeValue = (e, checked) => {
        var nextState = update(this.props.pageDetail.filteringProps, {
            "byGrade" : {$set: this.filterByChanged(this.props.lookUpData.grade, checked)}
        });
        this.props.changePageDetailValue("filteringProps",nextState);
    }

    handleChangeGradeValue = (e, checked, index) => {
        var nextState = update(this.props.pageDetail.filteringProps, {
            "byGrade" : {
                [index]: {
                    "isChecked": {$set: checked}
                }
            }
        });
        this.props.changePageDetailValue("filteringProps",nextState);
    }

    handleChangeAllGenderValue = (e, checked) => {
        var nextState = update(this.props.pageDetail.filteringProps, {
            "byGender" : {$set: this.filterByChanged(this.props.lookUpData.gender, checked)}
        });
        this.props.changePageDetailValue("filteringProps",nextState);
    }

    handleChangeGenderValue = (e, checked, index) => {
        var nextState = update(this.props.pageDetail.filteringProps, {
            "byGender" : {
                [index]: {
                    "isChecked": {$set: checked}
                }
            }
        });
        this.props.changePageDetailValue("filteringProps",nextState);
    }

    render = () => {
        var allGrade = true;
        var allGender = true;
        var lookupGrade = this.props.pageDetail.filteringProps.byGrade.map ( (grade, gradeIndex) => {
            if (!grade.isChecked) {
                allGrade = false;
            }
            return <ListItem
                key={grade.lookupCode}
                primaryText={grade.lookupValue}
                leftCheckbox={
                    <Checkbox
                        checked={grade.isChecked}
                        onCheck={(event, checked) => this.handleChangeGradeValue(event, checked, gradeIndex)}
                    />}
                />
        });
        var lookupGender = this.props.pageDetail.filteringProps.byGender.map ( (gender, genderIndex) => {
                    if (!gender.isChecked) {
                        allGender = false;
                    }
                    return <ListItem
                        key={gender.lookupCode}
                        primaryText={gender.lookupValue}
                        leftCheckbox={
                            <Checkbox
                                checked={gender.isChecked}
                                onCheck={(event, checked) => this.handleChangeGenderValue(event, checked, genderIndex)}
                            />}
                        />
                });
        return (
            <div className="content-min-container">
                <List>
                    <ListItem
                        primaryText="Gender"
                        leftCheckbox={
                            <Checkbox
                                checked={allGender}
                                onCheck={(event, checked) => this.handleChangeAllGenderValue(event, checked)}
                            />}
                        nestedItems={lookupGender}
                    />
                    <ListItem
                        primaryText="Grade"
                        leftCheckbox={
                            <Checkbox
                                checked={allGrade}
                                onCheck={(event, checked) => this.handleChangeAllGradeValue(event, checked)}
                            />}
                        nestedItems={lookupGrade}
                    />
                </List>
            </div>
        )

    }
}
EmployeeFilteringDialog.propTypes = {
    pageDetail: PropTypes.object,
    changePageDetailValue: PropTypes.func
}

export default EmployeeFilteringDialog;