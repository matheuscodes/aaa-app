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
  Avatar: require('material-ui/Avatar').default,
  Drawer: require('material-ui/Drawer').default,
  DatePicker: require('material-ui/DatePicker').default,
  Divider: require('material-ui/Divider').default,
  DropDownMenu: require('material-ui/DropDownMenu').default,
  Card: require('material-ui/Card').Card,
  CardActions: require('material-ui/Card').CardActions,
  CardText: require('material-ui/Card').CardText,
  CardHeader: require('material-ui/Card').CardHeader,
  FloatingActionButton: require('material-ui/FloatingActionButton').default,
  GridList: require('material-ui/GridList').GridList,
  GridTile: require('material-ui/GridList').GridTile,
  IconMenu: require('material-ui/IconMenu').default,
  IconButton: require('material-ui/IconButton').default,
  Menu: require('material-ui/Menu').default,
  MenuItem: require('material-ui/MenuItem').default,
  Paper: require('material-ui/Paper').default,
  Subheader: require('material-ui/Subheader').default,
  Table: require('material-ui/Table').Table,
  TableRow: require('material-ui/Table').TableRow,
  TableRowColumn: require('material-ui/Table').TableRowColumn,
  TableBody: require('material-ui/Table').TableBody,
  TableFooter: require('material-ui/Table').TableFooter,
  TableHeader: require('material-ui/Table').TableHeader,
  TableHeaderColumn: require('material-ui/Table').TableHeaderColumn,
  TextField: require('material-ui/TextField').default,
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
    settings: require('material-ui/svg-icons/action/settings').default,
    backup: require('material-ui/svg-icons/action/backup').default,
    delete: require('material-ui/svg-icons/action/delete').default,
    done: require('material-ui/svg-icons/action/done').default,
    code: require('material-ui/svg-icons/action/code').default
  },
  content:{
    create: require('material-ui/svg-icons/content/create').default,
    add_box: require('material-ui/svg-icons/content/add-box').default,
    add_circle: require('material-ui/svg-icons/content/add-circle').default,
    remove_circle: require('material-ui/svg-icons/content/remove-circle').default
  },
  navigation:{
    menu: require('material-ui/svg-icons/navigation/menu').default
  }
}

MUI.colors = require('material-ui/styles/colors');

MUI.palette = require('material-ui/styles/baseThemes/lightBaseTheme').default.palette;
MUI.palette.accent3Color = MUI.colors.grey600;
MUI.palette.darkAccent1Color = MUI.colors.grey500;
MUI.palette.darkAccent2Color = MUI.colors.grey700;
MUI.palette.darkAccent3Color = MUI.colors.grey900;
module.exports = MUI
