const React = require('react');

const MUI = require('app/common/MaterialUI');
const i18nextReact = require('global/i18nextReact');
const LogoName = require('svg/LogoName');

const BaseLayout = require('app/common/BaseLayout');
const LoginCard = require('app/login/LoginCard');
const PageSwitcher = require('app/common/PageSwitcher');

import { Style } from 'global/StyleProvider';

class LoginPageStyle extends Style {
  get card() {
    return {
      padding: this.styleProvider.select({
        phone: `${this.defaultPadding}`,
        tablet: `${this.defaultPadding} ${this.styleProvider.percent(15)}`,
        desktop: `${this.defaultPadding} ${this.styleProvider.percent(30)}`,
      }),
    }
  }

  get logo() {
    return {
      height: this.styleProvider.select({
        phone: this.styleProvider.percent(20),
        tablet: this.styleProvider.percent(14),
        desktop: this.styleProvider.percent(8),
      }),
      width: '100%',
      padding: '12px',
    }
  }
}

const LoginPage = React.createClass({
  propTypes: {
    switcher: React.PropTypes.instanceOf(PageSwitcher),
    userAgent: React.PropTypes.string,
    t: React.PropTypes.func
  },
  getInitialState: function() {
    this.style = new LoginPageStyle(this.props.styleProvider);
    return {};
  },
  render: function() {
    const t = this.props.t;
    return (
      <BaseLayout
        switcher={this.props.switcher}
        layoutName="loginPage"
        userAgent={this.props.userAgent}
        styleProvider={this.props.styleProvider}
        title={t('login:appBarTitle')} >
        <div style={{padding:this.style.logo.padding}}>
          <LogoName width={this.style.logo.width} height={this.style.logo.height} />
        </div>
        <div style={this.style.card}>
          <LoginCard
            switcher={this.props.switcher}
            styleProvider={this.props.styleProvider} />
        </div>
      </BaseLayout>
    );
  }
});

module.exports = i18nextReact.setupTranslation(['login'], LoginPage);
