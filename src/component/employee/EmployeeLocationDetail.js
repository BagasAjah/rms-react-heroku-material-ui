import React, {Component,PropTypes} from 'react';
import moment from 'moment';
import update from 'react-addons-update';

import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';

import ActionDelete from 'material-ui/svg-icons/action/delete';
import ContentUpdate from 'material-ui/svg-icons/content/create';

import {indigo900} from 'material-ui/styles/colors';

class EmployeeLocationDetail extends Component {
    constructor(props) {
        super(props);
        this.handleDataChange = this.handleDataChange.bind(this);
        this.handleOfficeLocationChange = this.handleOfficeLocationChange.bind(this);
        this.handleOfficeAddressChange = this.handleOfficeAddressChange.bind(this);
    }

    handleOfficeLocationChange(e, index, value, locationIndex){
        this.handleDataChange(locationIndex, value, 'officeLocation');
    }

    handleOfficeAddressChange(e, value, index){
        this.handleDataChange(index, value, 'officeAddress');
    }

    handleDataChange = (index, value, type) => {
        var updatedEmployee = update(this.props.currentEmployee, {
            'location': {
                [index]: {
                    [type]: {$set: value}
                }
            }
        });
        this.props.setSavedEmployee(updatedEmployee, this.props.pageMode);
    }

    updateClick = (index) => {
        this.props.handleStateChanged('selectedIndex', index);
    }

    deleteClick = (index) => {
        var updatedEmployee = update(this.props.currentEmployee, {'location': {$splice: [[index,1]]}});
        this.props.setSavedEmployee(updatedEmployee, this.props.pageMode);
    }

    render() {
        if (this.props.lookUpData.location.length >0 ) {
            var lookupLocationMenuItem = this.props.lookUpData.location.map(lookupLocation =>
                <MenuItem key={lookupLocation.lookupCode} value={lookupLocation.lookupCode} primaryText={lookupLocation.lookupValue} />
            );
        }
        var officeStartMonth = moment(this.props.location.officeStartDate).format("MMMM").toString();
        var officeStartYear = moment(this.props.location.officeStartDate).format("YYYY").toString();
        var officeEndMonth = moment(this.props.location.officeEndDate).format("MMMM").toString();
        var officeEndYear = moment(this.props.location.officeEndDate).format("YYYY").toString();
        if (this.props.location.officeEndDate == null){
            officeEndMonth = '';
            officeEndYear = 'PRESENT';
        }
        return (
            <div className="detail-content">
                <div className="detail-content-divider-vertical"/>
                <div className="detail-content-left">
                    <div style={{color: indigo900}}>
                        <span style={{marginLeft:30}}>{officeStartMonth}</span>
                        <span style={{marginRight:30, float: "right"}}>{officeEndMonth}</span>
                    </div>
                    <div style={{fontSize:'150%', color: indigo900}}>
                        <span style={{marginLeft:30}}>{officeStartYear}</span>
                        <span style={{marginLeft:75}}> - </span>
                        <span style={{marginRight:40, float: "right"}}>{officeEndYear}</span>
                    </div>
                </div>
                <div className="detail-content-right">
                    <SelectField
                        id={"location-id-"+this.props.index}
                        maxHeight={200}
                        value={this.props.location.officeLocation}
                        onChange={(e, i, value) => this.handleOfficeLocationChange(e, i, value, this.props.index)}
                        disabled={this.props.index===this.props.selectedIndex?false:true}
                        underlineShow={false}>
                        {lookupLocationMenuItem}
                    </SelectField>
                    {(!this.props.viewMode) ?
                        (<span>
                            <ContentUpdate onClick={this.updateClick.bind(this,this.props.index)}/>
                            <ActionDelete onClick={this.deleteClick.bind(this,this.props.index)}/>
                        </span>) : ''
                    }<br />
                    <TextField
                        floatingLabelText="Address"
                        value={this.props.location.officeAddress}
                        onChange={(e, value) => this.handleOfficeAddressChange(e, value, this.props.index)}
                        multiLine={true}
                        rows={2}
                        rowsMax={2}
                        disabled={this.props.index===this.props.selectedIndex?false:true}
                        underlineShow={false}/><br />
                </div><br /><br />

            </div>
        )
    }
}
EmployeeLocationDetail.propTypes = {
    index: PropTypes.number.isRequired,
    location: PropTypes.object,
    lookUpData : PropTypes.object,
    currentEmployee: PropTypes.object,
    pageMode: PropTypes.oneOf(['EDIT', 'NEW']),
    viewMode: PropTypes.bool,
    selectedIndex: PropTypes.number,
    setSavedEmployee: PropTypes.func,
    handleStateChanged: PropTypes.func
}
export default EmployeeLocationDetail;
