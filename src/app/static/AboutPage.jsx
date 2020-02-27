import React from 'react'

import i18nextReact from 'global/i18nextReact'
import MUI from 'app/common/MaterialUI'
import API from 'api'

import ReactPageSwitcherType from 'global/ReactPageSwitcherType'
import LogoName from 'svg/LogoName'
import BaseLayout from 'app/common/BaseLayout'

import AboutHome from 'app/static/about/AboutHome'
import AboutSeasons from 'app/static/about/AboutSeasons'
import AboutTrainings from 'app/static/about/AboutTrainings'
import AboutAssessments from 'app/static/about/AboutAssessments'
import AboutReports from 'app/static/about/AboutReports'

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
        styleProvider={this.props.styleProvider}
        title={t('about:appBarTitle')} >
        <MUI.Card style={{margin:40,marginBottom:120}}>
          <MUI.CardHeader
            title={t('about:title')}
            subtitle={t('about:subtitle')} />
          <MUI.CardText>
            <div style={{padding:12}}>
              <LogoName width={'100%'} height={96} />
            </div>
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

export default i18nextReact.setupTranslation(['common','about'], AboutPage);
