const React = require('react');

const i18nextReact = require('global/i18nextReact');
const MUI = require('app/common/MaterialUI');

const BaseLayout = require('app/common/BaseLayout');
const TotalArrowsCard = require('app/homescreen/cards/TotalArrowsCard');
const EventsCard = require('app/homescreen/cards/EventsCard');
const YearOverviewCard = require('app/homescreen/cards/YearOverviewCard');
const ValueDistributionCard = require('app/homescreen/cards/ValueDistributionCard');
const EndDistributionCard = require('app/homescreen/cards/EndDistributionCard');
const SeasonsCard = require('app/homescreen/cards/SeasonsCard');

const HomePage = React.createClass({
  render: function() {
    const t = this.props.t;
    return (
      <BaseLayout
        switcher={this.props.switcher}
        userAgent={this.props.userAgent}
        layoutName="homePage"
        languages={this.props.languages}
        title={t('home:appBarTitle')} >
        <MUI.GridList cellHeight={'auto'} cols={12} padding={10} >
          <MUI.GridTile style={MUI.styles.GridTile} cols={2} >
            <TotalArrowsCard switcher={this.props.switcher} />
          </MUI.GridTile>
          <MUI.GridTile style={MUI.styles.GridTile} cols={4} >
            <ValueDistributionCard switcher={this.props.switcher} />
          </MUI.GridTile>
          <MUI.GridTile style={MUI.styles.GridTile} cols={3} >
            <YearOverviewCard switcher={this.props.switcher} />
          </MUI.GridTile>
          <MUI.GridTile style={MUI.styles.GridTile} cols={3} >
            <EventsCard switcher={this.props.switcher} />
          </MUI.GridTile>
          <MUI.GridTile style={MUI.styles.GridTile} cols={4} >
            <EndDistributionCard switcher={this.props.switcher} />
          </MUI.GridTile>
          <MUI.GridTile style={MUI.styles.GridTile} cols={8} >
            <SeasonsCard switcher={this.props.switcher} />
          </MUI.GridTile>
        </MUI.GridList>
      </BaseLayout>
    );
  }
});

module.exports = i18nextReact.setupTranslation(['home'], HomePage);
