import React from 'react'
import { withRouter } from 'react-router'
import { withTranslation } from 'react-i18next'

import { withStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';

import LogoName from 'svg/LogoName'

import deleteLocalArcher from 'api/helpers/deleteLocalArcher'
import getLocalRoles from 'api/helpers/getLocalRoles'

import RoutePaths from 'global/RoutePaths'

const styles = {}

/**
 * Header with an undocked drawer and a logout button.
 * @author Matheus
 * @since 1.0.0
 */
class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {open: false, expandProfile: false, expandTrainer: false};
  }

  handleToggle() {
    this.setState({open: !this.state.open, expandProfile: false, expandTrainer: false});
  }

  handleClose() {
    this.setState({open: false, expandProfile: false, expandTrainer: false});
  }

  openSeasonsPage() {
    this.props.history.push(RoutePaths.seasons);
    this.handleClose();
  }

  openReportsPage() {
    this.props.history.push(RoutePaths.reports);
    this.handleClose();
  }

  openAssessmentsPage() {
    this.props.history.push(RoutePaths.assessments);
    this.handleClose();
  }

  openTrainingsPage() {
    this.props.history.push(RoutePaths.trainings);
    this.handleClose();
  }

  openHomePage() {
    this.props.history.push(RoutePaths.home);
    this.handleClose();
  }

  logout() {
    deleteLocalArcher();
    this.handleClose();
    this.props.history.push(RoutePaths.login);
  }

  settings() {
    this.props.history.push(RoutePaths.settings);
    this.handleClose();
  }

  trainer(page) {
    this.props.history.push(RoutePaths.trainer[page]);
    this.handleClose();
  }

  expandProfile() {
    const state = this.state;
    state.expandProfile = !state.expandProfile;
    this.setState(state);
  }

  expandTrainer() {
    const state = this.state;
    state.expandTrainer = !state.expandTrainer;
    this.setState(state);
  }

  render() {
    const { t } = this.props;

    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            { this.props.archer && (
              <IconButton edge="start" color="inherit" onClick={this.handleToggle.bind(this)}>
                <Icon>menu</Icon>
              </IconButton>
            )}
            <Typography variant="h6">
              {this.props.title}
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
            anchor={'left'}
            docked={false}
            open={this.state.open}
            onClose={this.handleClose.bind(this)} >
            <List
              component="nav"
              subheader={
                <ListSubheader inset={true}>
                  <LogoName height={"64pt"} />
                </ListSubheader>
              }>
              <ListItem button onClick={this.expandProfile.bind(this)}>
                <ListItemText
                  primary={ this.props.archer ? this.props.archer.name : null }
                  secondary={ this.props.archer ? this.props.archer.email : null } />
                {this.state.expandProfile ? <Icon>expand_less</Icon> : <Icon>expand_more</Icon>}
              </ListItem>
              <Collapse in={this.state.expandProfile} timeout="auto" unmountOnExit>
                <List>
                  <ListItem button onClick={this.settings.bind(this)}>
                    <ListItemIcon>
                      <Icon>settings</Icon>
                    </ListItemIcon>
                    <ListItemText primary={t('common:menuDrawer.settings')} />
                  </ListItem>
                  <ListItem button onClick={this.logout.bind(this)}>
                    <ListItemIcon>
                      <Icon>exit_to_app</Icon>
                    </ListItemIcon>
                    <ListItemText primary={t('common:logout')} />
                  </ListItem>
                </List>
              </Collapse>
            </List>
            <Divider />
            <List component="nav" >
              <ListItem button onClick={this.openHomePage.bind(this)}>
                <ListItemIcon>
                  <Icon>assessment</Icon>
                </ListItemIcon>
                <ListItemText primary={t('common:menuDrawer.homePage')} />
              </ListItem>
              <ListItem button onClick={this.openSeasonsPage.bind(this)}>
                <ListItemIcon>
                  <Icon>today</Icon>
                </ListItemIcon>
                <ListItemText primary={t('common:menuDrawer.seasonsPage')} />
              </ListItem>
              <ListItem button onClick={this.openTrainingsPage.bind(this)}>
                <ListItemIcon>
                  <Icon>create</Icon>
                </ListItemIcon>
                <ListItemText primary={t('common:menuDrawer.trainingsPage')} />
              </ListItem>
              <ListItem button onClick={this.openAssessmentsPage.bind(this)}>
                <ListItemIcon>
                  <Icon>timeline</Icon>
                </ListItemIcon>
                <ListItemText primary={t('common:menuDrawer.assessmentsPage')} />
              </ListItem>
              <ListItem button onClick={this.openReportsPage.bind(this)}>
                <ListItemIcon>
                  <Icon>history</Icon>
                </ListItemIcon>
                <ListItemText primary={t('common:menuDrawer.reportsPage')} />
              </ListItem>
            </List>

            <ListItem button onClick={this.expandTrainer.bind(this)}>
              <ListItemIcon>
                <Icon>sports</Icon>
              </ListItemIcon>
              <ListItemText primary={t('common:menuDrawer.trainer.trainerAreaTitle')} />
              {this.state.expandTrainer ? <Icon>expand_less</Icon> : <Icon>expand_more</Icon>}
            </ListItem>
            <Collapse in={this.state.expandTrainer} timeout="auto" unmountOnExit>
              <List>
                <ListItem button onClick={this.trainer.bind(this,'requests')}>
                  <ListItemIcon>
                    <Icon>playlist_add</Icon>
                  </ListItemIcon>
                  <ListItemText primary={t('common:menuDrawer.trainer.trainerRequestsPage')} />
                </ListItem>
                <ListItem button onClick={this.trainer.bind(this,'archers')}>
                  <ListItemIcon>
                    <Icon>assignment_ind</Icon>
                  </ListItemIcon>
                  <ListItemText primary={t('common:menuDrawer.trainer.trainerPupilsPage')} />
                </ListItem>
                <ListItem button onClick={this.trainer.bind(this,'reports')}>
                  <ListItemIcon>
                    <Icon>history</Icon>
                  </ListItemIcon>
                  <ListItemText primary={t('common:menuDrawer.trainer.trainerReportsPage')} />
                </ListItem>
              </List>
            </Collapse>


        </Drawer>
      </div>
    );
  }
};

export default withTranslation('common')(withRouter(withStyles(styles)(Header)));
