import React, { Component, PropTypes } from 'react';
import update from 'react-addons-update';
import moment from 'moment';
import TextField from 'material-ui/TextField';

import ActionAdd from 'material-ui/svg-icons/content/add-circle';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ContentUpdate from 'material-ui/svg-icons/content/create';
import ListIcon from 'material-ui/svg-icons/toggle/radio-button-checked';

import {indigo900} from 'material-ui/styles/colors';

class EmployeeHistoryDetail extends Component {
    constructor(props) {
        super(props);
        this.handleJobDescChanged=this.handleJobDescChanged.bind(this);
        this.handleDeleteClick=this.handleDeleteClick.bind(this);
        this.addNewJobDesc=this.addNewJobDesc.bind(this);
        this.deleteClick=this.deleteClick.bind(this);
    }

    updateClick=(jobDescIndex) => {
        this.props.handleStateChanged('selectedIndex', this.props.index);
        this.props.handleStateChanged('selectedJobDescIndex', jobDescIndex);
    }

    deleteJobDescClick=(jobDescIndex) => {
        this.handleDeleteClick(this.props.index, jobDescIndex);
    }

    deleteClick=() => {
        this.handleDeleteClick(this.props.index, null);
    }

    handleDeleteClick=(index, jobDescIndex) => {
        var updatedEmployee=[];
        if (jobDescIndex != null){
            updatedEmployee=update(this.props.currentEmployee, {
                'history': {
                    [index]: {
                        "jobDescList": {
                            $splice: [[jobDescIndex,1]]
                        }
                    }
                }
            });
        } else {
            updatedEmployee=update(this.props.currentEmployee, {
                'history': {
                    $splice: [[index,1]]
                }
            });
        }
        this.props.setSavedEmployee(updatedEmployee, this.props.pageMode);
        this.props.handleStateChanged('selectedIndex', null);
        this.props.handleStateChanged('selectedJobDescIndex', null);
    }

    handleJobDescChanged=(jobDescValue, jobDescIndex) => {
        var updatedEmployee=update(this.props.currentEmployee, {
            'history': {
                [this.props.index]: {
                    "jobDescList": {
                        [jobDescIndex]: {
                            "jebDescName": {$set: jobDescValue}
                        }
                    }
                }
            }
        });
        this.props.setSavedEmployee(updatedEmployee, this.props.pageMode);
    }

    addNewJobDesc=(index) => {
        var updatedEmployee=update(this.props.currentEmployee, {
            'history': {
                [this.props.index]: {
                    "jobDescList": {
                        $push: [{"jebDescName" : ''}]
                    }
                }
            }
        });
        this.props.setSavedEmployee(updatedEmployee, this.props.pageMode);
        this.props.handleStateChanged('selectedJobDescIndex', null);
    }

    render(){
        var history=this.props.history;
        var jobDesc=history.jobDescList;
        var historyStartMonth=moment(history.historyStartDate).format("MMMM").toString();
        var historyStartYear=moment(history.historyStartDate).format("YYYY").toString();
        var historyEndMonth=moment(history.historyEndDate).format("MMMM").toString();
        var historyEndYear=moment(history.historyEndDate).format("YYYY").toString();
        var jobDescObj=jobDesc.map((jobDesc, jobDescIndex) => {
            return <div key={jobDescIndex} style={{width:'100%',clear:"both", paddingTop:10}}>
                <div style={{float: "left",paddingRight: 20}}><ListIcon/></div>
                {(this.props.index===this.props.selectedIndex && jobDescIndex===this.props.selectedJobDescIndex) ?
                    <TextField
                        id={"history-jobDesc-" + this.props.index + "-" + jobDescIndex}
                        style={{float: "left",paddingRight: 20}}
                        value={jobDesc.jebDescName}
                        underlineShow={true}
                        onChange={(e, jobDescValue) => this.handleJobDescChanged(jobDescValue, jobDescIndex)}/> :
                    <div style={{width:256, height:48, float: "left",paddingRight: 20}}>{jobDesc.jebDescName}</div>
                }
                {(!this.props.viewMode) ?
                    (<span>
                        <ContentUpdate
                            style={{float: "left",paddingRight: 5}}
                            ref={jobDescIndex}
                            onClick={this.updateClick.bind(this,jobDescIndex)}/>
                        <ActionDelete
                            style={{float: "left"}}
                            ref={jobDescIndex}
                            onClick={this.deleteJobDescClick.bind(this,jobDescIndex)}/>
                    </span>) : ''
                }
            </div>

        });
        return(
            <div className="detail-content">
                <div className="detail-content-left">
                    {(!this.props.viewMode) ? <ActionDelete style={{float: "left"}} onClick={this.deleteClick}/> : ''}
                    <div style={{color: indigo900}}>
                        <span style={{marginLeft:30}}>{historyStartMonth}</span>
                        <span style={{marginRight:30, float: "right"}}>{historyEndMonth}</span>
                    </div>
                    <div style={{fontSize:'150%', color: indigo900}}><b>
                        <span style={{marginLeft:30}}>{historyStartYear}</span>
                        <span style={{marginLeft:75}}> - </span>
                        <span style={{marginRight:40, float: "right"}}>{historyEndYear}</span></b>
                    </div>
                    <div className="detail-content-border-right" /><br/>
                    <div className='detail-content-pull-right' style={{color: indigo900}}>
                        <div style={{fontSize:'120%', color: indigo900}}><b>{history.company}</b></div>
                        <br /><br />
                        <div>{history.position}</div>
                    </div>
                </div>
                <div className="detail-content-divider-vertical"/>
                <div className="detail-content-right">
                    <div style={{width:'100%'}}>
                        <div style={{float:"left", paddingRight:20, paddingBottom:10, fontSize:'110%'}}>Job Description</div>
                        <div style={{float:"left"}}>
                            {(!this.props.viewMode) ? <ActionAdd onClick={this.addNewJobDesc}/> : ''}
                        </div>
                    </div>
                    <div>
                        {jobDescObj}
                    </div>
                </div>
            </div>
        )
    }
}

EmployeeHistoryDetail.propTypes={
    index: PropTypes.number.isRequired,
    history: PropTypes.object,
    currentEmployee: PropTypes.object,
    pageMode: PropTypes.oneOf(['EDIT', 'NEW']),
    viewMode: PropTypes.bool,
    selectedIndex: PropTypes.number,
    selectedJobDescIndex: PropTypes.number,
    setSavedEmployee: PropTypes.func,
    handleStateChanged: PropTypes.func
}

export default EmployeeHistoryDetail;