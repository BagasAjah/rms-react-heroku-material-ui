import React, {Component, PropTypes} from 'react';
import update from 'react-addons-update';

import IconButton from 'material-ui/IconButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';

import ContentAdd from 'material-ui/svg-icons/content/add';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

import Constants from "../styles/Constants";

class EmployeeSortingDialog extends Component {

    constructor(props) {
        super(props);
        this.handleAddCriteria=this.handleAddCriteria.bind(this);
        this.handleDeleteCriteria=this.handleDeleteCriteria.bind(this);
        this.handleSortByChanged=this.handleSortByChanged.bind(this);
        this.handleSortTypeChanged=this.handleSortTypeChanged.bind(this);
    }

    handleAddCriteria=() => {
        if (this.props.pageDetail.sortCriteria.length < 4) {
            var nextState=update(this.props.pageDetail.sortCriteria, {
                $push: ['']
            });
            this.props.changePageDetailValue("sortCriteria", nextState);
        }
    }

    handleDeleteCriteria=(e, value) => {
        var index=this.props.pageDetail.sortCriteria.indexOf(value);
        var nextState=update(this.props.pageDetail.sortCriteria, {
            $splice: [[index,1]]
        });
        this.props.changePageDetailValue("sortCriteria", nextState);
    }

    handleSortByChanged=(e, index, value, sortCriteriaIndex) => {
        var nextState=this.handleDataChanged(value, null, sortCriteriaIndex);

        this.props.changePageDetailValue("sortCriteria", nextState);
    }

    handleSortTypeChanged=(e, index, value, sortCriteriaIndex) => {
        var nextState=this.handleDataChanged(null, value, sortCriteriaIndex);
        this.props.changePageDetailValue("sortCriteria", nextState);
    }

    handleDataChanged=(sortBy, sortType, sortCriteriaIndex) => {
        var prevState=this.props.pageDetail.sortCriteria[sortCriteriaIndex];
        var sortByValue=sortBy != null ? sortBy : prevState.split(',')[0];
        var sortTypeValue=sortType != null ? sortType : 'asc';
        prevState=sortByValue + ',' + sortTypeValue;
        var nextState=update(this.props.pageDetail.sortCriteria, {
            [sortCriteriaIndex] : {$set: prevState}
        });
        return nextState;
    }

    render=() => {
        let sortCriteria=this.props.pageDetail.sortCriteria;
        var criteriaList=["firstName", "office", "grade", "hireDate"];
        var sortCriteriaList=[];
        if (sortCriteria.length > 0) {
            sortCriteriaList=sortCriteria.map((sortCriteria, sortCriteriaIndex) => {
                var criteriaMenuList=criteriaList.map( criteria => {
                    var primaryText='';
                    if (criteria === "firstName") {
                        primaryText="Name";
                    } else if (criteria === "office") {
                        primaryText="Office";
                    } else if (criteria === "grade") {
                        primaryText="Grade";
                    } else if (criteria === "hireDate"){
                        primaryText="Join Date";
                    }
                    return <MenuItem key={criteria} value={criteria} primaryText={primaryText} />
                });

                var criteriaValue=sortCriteria.split(',')[0];
                if (criteriaList.includes(criteriaValue)) {
                    var index=criteriaList.indexOf(criteriaValue);
                    criteriaList.splice(index, 1);
                }
                return(
                    <div className="content-min" key={sortCriteriaIndex}>
                        <IconButton className="content-x"
                            iconStyle={Constants.smallIcon}
                            onClick={(e) => this.handleDeleteCriteria(e, sortCriteria)}>
                                <NavigationClose />
                        </IconButton>
                        <SelectField
                            hintText="Sort By"
                            style={{width: "150px"}}
                            className="content-min"
                            value={sortCriteria.split(',')[0]}
                            onChange={(e, index, value) => this.handleSortByChanged(e, index, value, sortCriteriaIndex)}>
                                {criteriaMenuList}
                        </SelectField>
                        <SelectField
                            hintText="Sort Type"
                            style={{width: "150px"}}
                            className="content-min"
                            value={sortCriteria.split(',')[1]}
                            onChange={(e, index, value) => this.handleSortTypeChanged(e, index, value, sortCriteriaIndex)}>
                                <MenuItem value={"asc"} primaryText="Ascending" />
                                <MenuItem value={"desc"} primaryText="Descending" />
                        </SelectField>
                    </div>
                )
            });
        }
        return (
            <div className="content-min-container">
                <div className="content-min">
                    <div className="content-min" style={{marginLeft: 50}}>
                        <span>Sort By</span>
                    </div>
                    <div className="content-min">
                        <span>Sort type</span>
                    </div>
                </div>
                {sortCriteriaList.length > 0 ? sortCriteriaList : ''}
                <FloatingActionButton
                    className="sort-criteria-add"
                    secondary={true} mini={true}
                    onClick={this.handleAddCriteria}
                    disabled={this.props.pageDetail.sortCriteria.length >= 4}>
                        <ContentAdd />
                </FloatingActionButton>
            </div>
        )

    }
}
EmployeeSortingDialog.propTypes={
    pageDetail: PropTypes.object,
    changePageDetailValue: PropTypes.func
}

export default EmployeeSortingDialog;