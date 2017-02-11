const React = require('react');

const MUI = require('app/common/MaterialUI');
const i18nextReact = require('global/i18nextReact');

const BaseLayout = require('app/common/BaseLayout');
const LoginCard = require('app/login/LoginCard');
const PageSwitcher = require('app/common/PageSwitcher');

const LoginPage = React.createClass({
  propTypes: {
    switcher: React.PropTypes.instanceOf(PageSwitcher),
    userAgent: React.PropTypes.string,
    t: React.PropTypes.func
  },
  getInitialState: function() {
    return {};
  },
  render: function() {
    const t = this.props.t;
    return (
      <BaseLayout
        switcher={this.props.switcher}
        layoutName="loginPage"
        userAgent={this.props.userAgent}
        title={t('login:appBarTitle')} >
        <MUI.GridList
          cellHeight={'auto'}
          cols={4} padding={10}
          style={{witdth: '100%'}} >
          <MUI.GridTile style={MUI.styles.GridTile} cols={1} >
            {' '}
          </MUI.GridTile>
          <MUI.GridTile style={MUI.styles.GridTile} cols={2} >
            <LoginCard switcher={this.props.switcher} />
          </MUI.GridTile>
        </MUI.GridList>
      </BaseLayout>
    );
  }
});

module.exports = i18nextReact.setupTranslation(['login'], LoginPage);
