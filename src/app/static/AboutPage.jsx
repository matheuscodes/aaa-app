import React from 'react'
import { withRouter } from 'react-router'
import { withTranslation } from 'react-i18next'

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Icon from '@material-ui/core/Icon';

import LogoName from 'svg/LogoName'

import AboutHome from 'app/static/about/AboutHome'
import AboutSeasons from 'app/static/about/AboutSeasons'
import AboutTrainings from 'app/static/about/AboutTrainings'
import AboutAssessments from 'app/static/about/AboutAssessments'
import AboutReports from 'app/static/about/AboutReports'

const styles = {}

class AboutPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {selectedIndex: 0}
  }
  select(index){
    this.setState({selectedIndex: index})
  }
  render() {
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
      <div style={{'backgroundColor':'white', padding:'10pt'}}>
        <Card style={{margin:40,marginBottom:120}}>
          <CardHeader
            title={t('about:title')}
            subheader={t('about:subtitle')} />
          <CardContent>
            <div style={{padding:12}}>
              <LogoName width={'100%'} height={96} />
            </div>
            <BottomNavigation
              value={this.state.selectedIndex}
              onChange={(event, newValue) => {
                this.select(newValue);
              }}
              showLabels >
              <BottomNavigationAction label={t('common:menuDrawer.homePage')} icon={<Icon>assessment</Icon>} />
              <BottomNavigationAction label={t('common:menuDrawer.seasonsPage')} icon={<Icon>today</Icon>} />
              <BottomNavigationAction label={t('common:menuDrawer.trainingsPage')} icon={<Icon>create</Icon>} />
              <BottomNavigationAction label={t('common:menuDrawer.assessmentsPage')} icon={<Icon>timeline</Icon>} />
              <BottomNavigationAction label={t('common:menuDrawer.reportsPage')} icon={<Icon>history</Icon>} />
            </BottomNavigation>
            {opened}
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default withTranslation('common','about')(withStyles(styles)(AboutPage));
