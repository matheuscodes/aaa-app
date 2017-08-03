const React = require('react');

const i18nextReact = require('global/i18nextReact');
const UserTypes = require('constants/UserTypes');
const MUI = require('app/common/MaterialUI');

const LogoName = require('svg/LogoName');

const getLocalArcher = require('api/helpers/getLocalArcher');
const deleteLocalArcher = require('api/helpers/deleteLocalArcher');

const ReactPageSwitcherType = require('global/ReactPageSwitcherType');

import { Style } from 'global/StyleProvider';

class HeaderStyle extends Style {
  get AppBar() {
    return {
      title: {
        fontSize: `20px`,
      },
      backgroundColor: MUI.colors.blue600,
    }
  }

  get Drawer() {
    return {
      width: this.styleProvider.select({
        phone: this.styleProvider.percent(90),
        tablet: this.styleProvider.percent(50),
        desktop: this.styleProvider.percent(30),
      }),
    }
  }

  get Subheader(){
    return {
      padding: this.defaultPadding,
    }
  }

  get logo() {
    return{
      height: this.styleProvider.select({
        phone: this.styleProvider.percent(15),
        tablet: this.styleProvider.percent(11.25),
        desktop: this.styleProvider.percent(6),
      }),
      width: '100%',
    }
  }
}

/**
 * Header with an undocked drawer and a logout button.
 * @author Matheus
 * @since 1.0.0
 */
const Header = React.createClass({
  propTypes: {
    switcher: ReactPageSwitcherType.isRequired,
    title: React.PropTypes.string.isRequired,
    t: React.PropTypes.func.isRequired
  },
  getInitialState: function() {
    this.style = new HeaderStyle(this.props.styleProvider);
    return {open: false};
  },
  componentDidMount: function() {
    var current = this.state;
    current.archer = getLocalArcher();
    this.setState(current);
  },
  handleToggle: function() {
    this.setState({open: !this.state.open});
  },
  handleClose: function() {
    this.setState({open: false});
  },
  openSeasonsPage: function() {
    this.props.switcher.switchTo('seasonsPage');
  },
  openReportsPage: function() {
    this.props.switcher.switchTo('reportsPage');
  },
  openAssessmentsPage: function() {
    this.props.switcher.switchTo('assessmentsPage');
  },
  openTrainingsPage: function() {
    this.props.switcher.switchTo('trainingsPage');
  },
  openHomePage: function() {
    this.props.switcher.switchTo('homePage');
  },
  logout: function() {
    deleteLocalArcher();
    this.props.switcher.switchTo('loginPage');
  },
  openTrainerReportsPage: function() {
    this.props.switcher.switchTo('trainerReportsPage');
  },
  render: function() {
    const t = this.props.t;
    const menu = (
    <MUI.Menu>
      <MUI.MenuItem
        onTouchTap={this.openHomePage}
        leftIcon={<MUI.icons.action.assessment />} >
        {t('common:menuDrawer.homePage')}
      </MUI.MenuItem>
      <MUI.MenuItem
        onTouchTap={this.openSeasonsPage}
        leftIcon={<MUI.icons.action.today />}>
        {t('common:menuDrawer.seasonsPage')}
      </MUI.MenuItem>
      <MUI.MenuItem
        onTouchTap={this.openTrainingsPage}
        leftIcon={<MUI.icons.content.create />}>
        {t('common:menuDrawer.trainingsPage')}
      </MUI.MenuItem>
      <MUI.MenuItem
        onTouchTap={this.openAssessmentsPage}
        leftIcon={<MUI.icons.action.timeline />}>
        {t('common:menuDrawer.assessmentsPage')}
      </MUI.MenuItem>
      <MUI.MenuItem
        onTouchTap={this.openReportsPage}
        leftIcon={<MUI.icons.action.history />}>
        {t('common:menuDrawer.reportsPage')}
      </MUI.MenuItem>
      <MUI.MenuItem onTouchTap={this.handleClose}
        leftIcon={<MUI.icons.action.help_outline />}>
        {t('common:menuDrawer.helpPage')}
      </MUI.MenuItem>
    </MUI.Menu>
    );

    var leftIcon = (<MUI.IconButton onTouchTap={this.handleToggle}>
      <MUI.icons.navigation.menu />
    </MUI.IconButton>);

    const trainerArea = (
      <MUI.List>
        <MUI.ListItem
          primaryText={t('common:menuDrawer.trainer.trainerAreaTitle')}
          disabled={true}
          nestedItems={[
            <MUI.ListItem key={'aaa-trainerReports'}
              onTouchTap={this.openTrainerReportsPage}
              primaryText={t('common:menuDrawer.trainer.trainerReportsPage')}
              leftIcon={<MUI.icons.action.history />} />
          ]} />
      </MUI.List>
    );

    return (
      <div>
        <MUI.AppBar
            style={this.style.AppBar}
            title={this.props.title}
            titleStyle={this.style.AppBar.title}
            showMenuIconButton={ this.state.archer ? true : false }
            iconElementLeft={ this.state.archer ? leftIcon : null } />
        <MUI.Drawer
            docked={false}
            width={this.style.Drawer.width}
            open={this.state.open}
            onRequestChange={this.handleClose} >
            <MUI.List>
              <MUI.Subheader style={this.style.Subheader} inset={true}>
                <LogoName
                  width={this.style.logo.width}
                  height={this.style.logo.height} />
              </MUI.Subheader>
              <MUI.ListItem
                primaryText={ this.state.archer ? this.state.archer.name : null }
                secondaryText={ this.state.archer ? this.state.archer.email : null }
                disabled={true}
                nestedItems={[
                  <MUI.ListItem key={'aaa-headerLogout'}
                    onTouchTap={this.logout}
                    primaryText={t('common:logout')}
                    leftIcon={<MUI.icons.action.exit_to_app />} />
                ]} />
            </MUI.List>
            <MUI.Divider />
            {menu}
            {this.state.archer && this.state.archer.type === UserTypes.TRAINER ? trainerArea : ''}
            <MUI.Divider />
        </MUI.Drawer>
      </div>
    );
  }
});

module.exports = i18nextReact.setupTranslation(['common'], Header);
