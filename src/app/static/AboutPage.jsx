const React = require('react');

const i18nextReact = require('global/i18nextReact');
const MUI = require('app/common/MaterialUI');
const API = require('api');

const ReactPageSwitcherType = require('global/ReactPageSwitcherType');
const BaseLayout = require('app/common/BaseLayout');

const AboutHome = require('app/static/about/AboutHome');
const AboutSeasons = require('app/static/about/AboutSeasons');
const AboutTrainings = require('app/static/about/AboutTrainings');
const AboutAssessments = require('app/static/about/AboutAssessments');
const AboutReports = require('app/static/about/AboutReports');

const AboutPage = React.createClass({
  propTypes: {
    switcher: ReactPageSwitcherType.isRequired,
    userAgent: React.PropTypes.oneOfType([React.PropTypes.string,React.PropTypes.bool]).isRequired,
    t: React.PropTypes.func.isRequired
  },
  getInitialState: function(){
    return {selectedIndex: 0}
  },
  select: function(index){
    this.setState({selectedIndex: index})
  },
  render: function() {
    const t = this.props.t;
    let opened;
    switch(this.state.selectedIndex){
      case 0: opened = <AboutHome />;
        break;
      case 1: opened = <AboutSeasons />;
        break;
      case 2: opened = <AboutTrainings />;
        break;
      case 3: opened = <AboutAssessments />;
        break;
      case 4: opened = <AboutReports />;
        break;
    }

    return (
      <BaseLayout
        switcher={this.props.switcher}
        layoutName="aboutPage"
        userAgent={this.props.userAgent}
        title={t('about:appBarTitle')} >
        <MUI.Card style={{margin:40,marginBottom:120}}>
          <MUI.CardHeader
            title={t('about:title')}
            subtitle={t('about:subtitle')} />
          <MUI.CardText>
            <MUI.BottomNavigation selectedIndex={this.state.selectedIndex}>
              <MUI.BottomNavigationItem
                  label={t('common:menuDrawer.homePage')}
                  icon={<MUI.icons.action.assessment />}
                  onTouchTap={() => this.select(0)} />
              <MUI.BottomNavigationItem
                  label={t('common:menuDrawer.seasonsPage')}
                  icon={<MUI.icons.action.today />}
                  onTouchTap={() => this.select(1)} />
              <MUI.BottomNavigationItem
                  label={t('common:menuDrawer.trainingsPage')}
                  icon={<MUI.icons.content.create />}
                  onTouchTap={() => this.select(2)} />
              <MUI.BottomNavigationItem
                  label={t('common:menuDrawer.assessmentsPage')}
                  icon={<MUI.icons.action.timeline />}
                  onTouchTap={() => this.select(3)} />
              <MUI.BottomNavigationItem
                  label={t('common:menuDrawer.reportsPage')}
                  icon={<MUI.icons.action.history />}
                  onTouchTap={() => this.select(4)} />
            </MUI.BottomNavigation>
            {opened}
          </MUI.CardText>
        </MUI.Card>
      </BaseLayout>
    );
  }
});

module.exports = i18nextReact.setupTranslation(['common','about'], AboutPage);
