const React = require('react');

const i18nextReact = require('global/i18nextReact');
const MUI = require('app/common/MaterialUI');

const PageSwitcher = require('app/common/PageSwitcher');

/**
 * Header with an undocked drawer and a logout button.
 * @author Matheus
 * @since 1.0.0
 */
const Header = React.createClass({
  propTypes: {
    switcher: React.PropTypes.instanceOf(PageSwitcher),
    title: React.PropTypes.string,
    t: React.PropTypes.func
  },
  getInitialState: function() {
    return {open: false};
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
  render: function() {
    const t = this.props.t;
    const menu = (
    <MUI.Menu>
      <MUI.MenuItem
        onTouchTap={this.openHomePage}
        leftIcon={<MUI.icons.action.home />} >
        {t('common:menuDrawer.homePage')}
      </MUI.MenuItem>
      <MUI.MenuItem
        onTouchTap={this.openSeasonsPage}
        leftIcon={<MUI.icons.content.create />}>
        {t('common:menuDrawer.seasonsPage')}
      </MUI.MenuItem>
      <MUI.MenuItem
        onTouchTap={this.openTrainingsPage}
        leftIcon={<MUI.icons.content.create />}>
        {t('common:menuDrawer.trainingsPage')}
      </MUI.MenuItem>
      <MUI.MenuItem
        onTouchTap={this.openAssessmentsPage}
        leftIcon={<MUI.icons.content.create />}>
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

    return (
      <div>
        <MUI.AppBar
            title={this.props.title}
            iconElementRight={
              <MUI.IconButton>
                <MUI.icons.action.exit_to_app />
              </MUI.IconButton>
            }
            iconElementLeft={
              <MUI.IconButton onTouchTap={this.handleToggle}>
                <MUI.icons.navigation.menu />
              </MUI.IconButton>
            } />
        <MUI.Drawer
            docked={false}
            width={400}
            open={this.state.open}
            onRequestChange={this.handleClose} >
            <MUI.List>
              <MUI.Subheader inset={true}>
                {t('common:appTitle')}
              </MUI.Subheader>
              <MUI.ListItem
                primaryText="John Doe"
                secondaryText="john@gmail.com"
                disabled={true}
                nestedItems={[
                  <MUI.ListItem
                    key={'aaa-headerSettings'}
                    primaryText={t('common:menuDrawer.settings')}
                    leftIcon={<MUI.icons.action.settings />} />,
                  <MUI.ListItem key={'aaa-headerLogout'}
                    onTouchTap={this.handleClose}
                    primaryText={t('common:logout')}
                    leftIcon={<MUI.icons.action.exit_to_app />} />
                ]} />
            </MUI.List>
            <MUI.Divider />
            {menu}
        </MUI.Drawer>
      </div>
    );
  }
});

module.exports = i18nextReact.setupTranslation(['common'], Header);
