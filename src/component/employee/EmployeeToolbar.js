import React, {Component} from 'react';
import {Toolbar} from 'material-ui/Toolbar';

import LinearProgress from 'material-ui/LinearProgress';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import {pink500} from 'material-ui/styles/colors';

import EmployeeTab from "../containers/employee/EmployeeTab"
import EmployeeSearch from "../containers/employee/EmployeeSearch"
import Constants from "../styles/Constants"

class EmployeeToolbar extends Component {

  render = () => {
    return(
        <MuiThemeProvider muiTheme={getMuiTheme(Constants.themeIndigo400)}>
          <div>
            <Toolbar style={Constants.toolBarColor}>
                <EmployeeSearch />
                <EmployeeTab />
            </Toolbar>
            {this.props.fetchingEmployee ? <LinearProgress mode="indeterminate" color={pink500}/> : ''}
          </div>
        </MuiThemeProvider>
    );
  }
}
export default EmployeeToolbar;