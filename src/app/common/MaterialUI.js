'use strict';
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
  BottomNavigation: require('material-ui/BottomNavigation').default,
  BottomNavigationItem: require('material-ui/BottomNavigation').BottomNavigationItem,
  Drawer: require('material-ui/Drawer').default,
  DatePicker: require('material-ui/DatePicker').default,
  Divider: require('material-ui/Divider').default,
  Dialog: require('material-ui/Dialog').default,
  DropDownMenu: require('material-ui/DropDownMenu').default,
  Card: require('material-ui/Card').Card,
  CardMedia: require('material-ui/Card').CardMedia,
  CardTitle: require('material-ui/Card').CardTitle,
  CardActions: require('material-ui/Card').CardActions,
  CardText: require('material-ui/Card').CardText,
  CardHeader: require('material-ui/Card').CardHeader,
  Checkbox: require('material-ui/Checkbox').default,
  CircularProgress: require('material-ui/CircularProgress').default,
  FlatButton: require('material-ui/FlatButton').default,
  FloatingActionButton: require('material-ui/FloatingActionButton').default,
  GridList: require('material-ui/GridList').GridList,
  GridTile: require('material-ui/GridList').GridTile,
  IconMenu: require('material-ui/IconMenu').default,
  IconButton: require('material-ui/IconButton').default,
  Menu: require('material-ui/Menu').default,
  MenuItem: require('material-ui/MenuItem').default,
  Paper: require('material-ui/Paper').default,
  RaisedButton: require('material-ui/RaisedButton').default,
  SelectField: require('material-ui/SelectField').default,
  Snackbar: require('material-ui/Snackbar').default,
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
};

MUI.icons = {
  action: {
    print: require('material-ui/svg-icons/action/print').default,
    home: require('material-ui/svg-icons/action/home').default,
    assessment: require('material-ui/svg-icons/action/assessment').default,
    assignment_ind: require('material-ui/svg-icons/action/assignment-ind').default,
    history: require('material-ui/svg-icons/action/history').default,
    help_outline: require('material-ui/svg-icons/action/help-outline').default,
    exit_to_app: require('material-ui/svg-icons/action/exit-to-app').default,
    settings: require('material-ui/svg-icons/action/settings').default,
    backup: require('material-ui/svg-icons/action/backup').default,
    timeline: require('material-ui/svg-icons/action/timeline').default,
    today: require('material-ui/svg-icons/action/today').default,
    delete: require('material-ui/svg-icons/action/delete').default,
    done: require('material-ui/svg-icons/action/done').default,
    code: require('material-ui/svg-icons/action/code').default
  },
  content: {
    create: require('material-ui/svg-icons/content/create').default,
    add_box: require('material-ui/svg-icons/content/add-box').default,
    add_circle: require('material-ui/svg-icons/content/add-circle').default,
    remove_circle: require('material-ui/svg-icons/content/remove-circle').default
  },
  navigation: {
    menu: require('material-ui/svg-icons/navigation/menu').default,
    cancel: require('material-ui/svg-icons/navigation/cancel').default,
    chevron_left: require('material-ui/svg-icons/navigation/chevron-left').default,
    chevron_right: require('material-ui/svg-icons/navigation/chevron-right').default
  },
  maps: {
    directions_walk: require('material-ui/svg-icons/maps/directions-walk').default
  },
  editor: {
    mode_edit: require('material-ui/svg-icons/editor/mode-edit').default
  }
};

MUI.colors = require('material-ui/styles/colors');

MUI.palette = require('material-ui/styles/baseThemes/lightBaseTheme').default.palette;
MUI.palette.accent3Color = MUI.colors.grey600;
MUI.palette.darkAccent1Color = MUI.colors.grey500;
MUI.palette.darkAccent2Color = MUI.colors.grey700;
MUI.palette.darkAccent3Color = MUI.colors.grey900;
MUI.palette.primary1Color = MUI.colors.yellow700;
MUI.palette.primary2Color = MUI.colors.yellow800;
MUI.palette.accent1Color = MUI.colors.red600;
MUI.palette.pickerHeaderColor = MUI.colors.yellow600;

//TODO remove this
MUI.styles = {
   GridTile:{
     height:'unset',
     padding: '5pt',
   }
}

module.exports = MUI;
