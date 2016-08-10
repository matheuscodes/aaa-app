'use strict'
/**
 * Material UI wrapper
 * This helps reduce the sizes of imports and centralizes configuration
 * TODO: Switch to "import <> from <>" once Node.js implements it.
 * @author Matheus
 * @since 1.0.0
 */

var MUI = {
  ThemeProvider: require('material-ui/styles/MuiThemeProvider').default,
  getTheme: require('material-ui/styles/getMuiTheme').default,
  AppBar: require('material-ui/AppBar').default,
  Drawer: require('material-ui/Drawer').default,
  Divider: require('material-ui/Divider').default,
  DropDownMenu: require('material-ui/DropDownMenu').default,
  IconMenu: require('material-ui/IconMenu').default,
  IconButton: require('material-ui/IconButton').default,
  Menu: require('material-ui/Menu').default,
  MenuItem: require('material-ui/MenuItem').default,
  Subheader: require('material-ui/Subheader').default,
  List: require('material-ui/List').default,
  ListItem: require('material-ui/List/ListItem').default
}

MUI.icons = {
  action:{
    home: require('material-ui/svg-icons/action/home').default,
    assignment_ind: require('material-ui/svg-icons/action/assignment-ind').default,
    history: require('material-ui/svg-icons/action/history').default,
    help_outline: require('material-ui/svg-icons/action/help-outline').default,
    exit_to_app: require('material-ui/svg-icons/action/exit-to-app').default,
    settings: require('material-ui/svg-icons/action/settings').default
  },
  content:{
    create: require('material-ui/svg-icons/content/create').default
  },
  navigation:{
    menu: require('material-ui/svg-icons/navigation/menu').default
  }
}

MUI.palette = require('material-ui/styles/baseThemes/lightBaseTheme').default.palette;
MUI.palette.accent3Color = require('material-ui/styles/colors').grey600;
MUI.palette.darkAccent1Color = require('material-ui/styles/colors').grey500;
MUI.palette.darkAccent2Color = require('material-ui/styles/colors').grey700;
MUI.palette.darkAccent3Color = require('material-ui/styles/colors').grey900;
module.exports = MUI
