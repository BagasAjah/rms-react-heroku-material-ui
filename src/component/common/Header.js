import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {white} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import ActionAccountCircle from 'material-ui/svg-icons/action/account-circle';
import ActionPowerSettingsNew from 'material-ui/svg-icons/action/power-settings-new';
import ActionSettings from 'material-ui/svg-icons/action/settings';
import IconButton from 'material-ui/IconButton';

import Constants from "../styles/Constants";

/**
 * A simple example of `AppBar` with an icon on the right.
 * By default, the left icon is a navigation-menu.
 */
class Header extends Component {

  render = () => {
    return(
  <MuiThemeProvider muiTheme={getMuiTheme(Constants.themeIndigo500)}>
    <AppBar>
      <div className="app-bar-user-img">
          <IconButton iconStyle={Constants.mediumIcon} style={Constants.small}>
              <ActionAccountCircle color={white}/>
          </IconButton>
      </div>
      <div className="app-bar-user-info">
          <span>
              Bagas Dimas Permadi<br />
              <small>SE - PG</small>
          </span>
      </div>
      <IconButton tooltip="Setting">
          <ActionSettings color={white} />
      </IconButton>
      <IconButton tooltip="Logout">
          <ActionPowerSettingsNew color={white} />
      </IconButton>
    </AppBar>

  </MuiThemeProvider>
);
  }
}

export default Header;