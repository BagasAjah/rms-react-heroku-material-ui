import React, {Component, PropTypes} from 'react';
import update from 'react-addons-update';

import Chip from 'material-ui/Chip';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import {ToolbarGroup, ToolbarSeparator} from 'material-ui/Toolbar';

import ActionSearch from 'material-ui/svg-icons/action/search';
import ContentFilterList from 'material-ui/svg-icons/content/filter-list';
import ContentSort from 'material-ui/svg-icons/content/sort';

import {white} from 'material-ui/styles/colors';

import EmployeeFilteringDialog from "../containers/employee/EmployeeFilteringDialog"
import EmployeeSortingDialog from "../containers/employee/EmployeeSortingDialog"
import Constants from "../styles/Constants";

import { generatePageDetailParam } from  "../../lib/employee/employeeHelper"

class EmployeeSearch extends Component {

    constructor(props) {
        super(props);
        this.handleSearchingClick=this.handleSearchingClick.bind(this);
        this.handleFilteringClick=this.handleFilteringClick.bind(this);
        this.handleOpenFilteringDialog=this.handleOpenFilteringDialog.bind(this);
        this.handleOpenSortingDialog=this.handleOpenSortingDialog.bind(this);
        this.handleCloseFilteringDialog=this.handleCloseFilteringDialog.bind(this);
        this.handleCloseSortingDialog=this.handleCloseSortingDialog.bind(this);
        this.handleSearchingProcess=this.handleSearchingProcess.bind(this);
        this.handleSortingClick=this.handleSortingClick.bind(this);
    }

    handleSearchingClick=() => {
        var criteria=generatePageDetailParam(this.props.pageDetail);
        this.props.loadEmployees(criteria);
    }

    handleSearchingProcess=(e) =>{
        if (e.keyCode === 13) {
            var nextState=update(this.props.pageDetail, {
                currentPage : {
                    $set: 0
                },
                searchText : {
                    $set: this.filterTextInput.input.value
                }
            });
            this.props.changePageDetailValue("currentPage", 1);
            this.props.changePageDetailValue("searchText", this.filterTextInput.input.value);
            var criteria=generatePageDetailParam(nextState);
            this.props.loadEmployees(criteria);
        } else {
            this.props.changePageDetailValue("searchText", this.filterTextInput.input.value);
        }
    }

    handleFilteringClick=() => {
        var criteria=generatePageDetailParam(this.props.pageDetail);
        this.props.loadEmployees(criteria);
        this.props.handleOpenDialogChanged("filteringDialog", false);
    }

    handleOpenFilteringDialog=() => {
        this.props.handleOpenDialogChanged("filteringDialog", true);
    }

    handleCloseFilteringDialog=() => {
        this.props.handleOpenDialogChanged("filteringDialog", false);
    }

    handleOpenSortingDialog=() => {
        var nextState=update(this.props.pageDetail.sortCriteria, {
            $set: ['']
        });
        this.props.changePageDetailValue("sortCriteria", nextState);
        this.props.handleOpenDialogChanged("sortingDialog", true);
    }

    handleCloseSortingDialog=() => {
        this.props.handleOpenDialogChanged("sortingDialog", false);
    }

    handleSortingClick=() => {
        var criteria=generatePageDetailParam(this.props.pageDetail);
        this.props.loadEmployees(criteria);
        this.props.handleOpenDialogChanged("sortingDialog", false);
    }

    render=() => {
        const actionsFilteringBtn=[
            <RaisedButton
                label="Ok"
                secondary={true}
                onTouchTap={this.handleFilteringClick.bind(this)}
            />
        ];
        const actionsSortingBtn=[
            <RaisedButton
                label="Ok"
                secondary={true}
                onTouchTap={this.handleSortingClick.bind(this)}
            />
        ];
        return(
            <ToolbarGroup className="toolbar-search-group">
                <IconButton style={Constants.small}>
                    <ActionSearch color={white} onClick={this.handleSearchingClick}/>
                </IconButton>
                <TextField
                    ref={(input) => this.filterTextInput=input}
                    onChange={(e) => this.handleSearchingProcess(e)}
                    onKeyDown={(e) => this.handleSearchingProcess(e)}
                    value={this.props.pageDetail.searchText}
                    hintText="Search"
                    underlineStyle={{display: 'none'}}
                    style={{width: '40%', float:'right'}}
                    inputStyle={{color: white}}
                    hintStyle={{color: white}}/>
                <IconButton tooltip="Sort">
                    <ContentSort color={white} onClick={this.handleOpenSortingDialog}/>
                </IconButton>
                <IconButton tooltip="Filtering">
                    <ContentFilterList color={white} onClick={this.handleOpenFilteringDialog}/>
                </IconButton>
                <Chip>{this.props.employees.length}</Chip>
                <ToolbarSeparator />
                <Dialog
                    title="Sorting Option"
                    open={this.props.openDialog.sortingDialog}
                    autoScrollBodyContent={true}
                    actions={actionsSortingBtn}
                    onRequestClose={this.handleCloseSortingDialog}
                    contentStyle={{minWidth: "320px", maxWidth: "450px"}}>
                        <EmployeeSortingDialog />
                </Dialog>
                <Dialog
                    title="Filtering Option"
                    open={this.props.openDialog.filteringDialog}
                    autoScrollBodyContent={false}
                    actions={actionsFilteringBtn}
                    onRequestClose={this.handleCloseFilteringDialog}
                    contentStyle={{minWidth: "320px", maxWidth: "450px"}}>
                        <EmployeeFilteringDialog />
                </Dialog>
            </ToolbarGroup>
        )
    }
}

EmployeeSearch.propTypes={
    employees: PropTypes.array,
    openDialog: PropTypes.object,
    pageDetail: PropTypes.object,
    setFilteringProps: PropTypes.func,
    handleOpenDialogChanged: PropTypes.func,
    changePageDetailValue: PropTypes.func,
    loadEmployees: PropTypes.func
}

export default EmployeeSearch;