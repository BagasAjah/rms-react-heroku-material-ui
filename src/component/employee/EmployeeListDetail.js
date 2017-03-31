import React, {Component, PropTypes} from 'react';

import Avatar from 'material-ui/Avatar';
import {ListItem} from 'material-ui/List';
import {indigo400} from 'material-ui/styles/colors';
import Paper from 'material-ui/Paper';

import ToogleRadioButtonChecked from 'material-ui/svg-icons/toggle/radio-button-checked';

import moment from 'moment'

class EmployeeListDetail extends Component {

    componentDidMount = () => {
        this.actionClick = this.actionClick.bind(this);
    }

    actionClick = () => {
        this.props.setCurrentEmployee(this.props.employee.employeeGuid)
    }

    render = () => {
        var employee = this.props.employee;
        var avatar = employee.base64Image;
        if (employee) {
            var avatarLetter = employee.firstName ? employee.firstName.charAt(0) : "?";
        }
        var hireDateStr = moment(this.props.employee.hireDate).format("DD MMM YYYY").toString();
        return(
            <Paper key={this.props.index} className="employee-list-container" zDepth={1}>
                <ListItem
                    primaryText={
                        <span>
                            <b>{employee.firstName} {employee.lastName}</b>
                            <span className="paper-pull-right">{hireDateStr}</span>
                        </span>
                    }
                    secondaryText={
                        <p>
                            {employee.grade}, {employee.division} <br />
                            {employee.office}, {employee.phone}
                        </p>
                    }
                    rightIcon={
                        <ToogleRadioButtonChecked className="toggle-radio-button-position" color={indigo400}/>

                    }
                    secondaryTextLines={2}
                    leftAvatar={
                        avatar != null ? <Avatar src={avatar}/>
                            : <Avatar>
                                {avatarLetter}
                            </Avatar>
                    }
                    onClick={this.actionClick}/>
            </Paper>
        )
    }
}

EmployeeListDetail.propTypes = {
    index: PropTypes.number.isRequired,
    employee: PropTypes.object,
    setCurrentEmployee: PropTypes.func
}

export default EmployeeListDetail;