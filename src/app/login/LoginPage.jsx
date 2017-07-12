import React from 'react';
import { autobind } from 'core-decorators';

import MUI from 'app/common/MaterialUI';

import MessageablePage from 'components/MessageablePage';
import { setupTranslation } from 'global/i18nextReact';
import pageSwitcherType from 'global/ReactPageSwitcherType';
import PageSwitcher from 'app/common/PageSwitcher';
import BaseLayout from 'app/common/BaseLayout';
import LoginCard from 'app/login/LoginCard';
import LoginPageStyle from 'app/login/LoginPage.style';
import LogoName from 'svg/LogoName';

@autobind
class LoginPage extends MessageablePage {
  static propTypes: {
    switcher: pageSwitcherType,
    userAgent: React.PropTypes.string,
    t: React.PropTypes.func
  }

  constructor(props) {
    super(props);
    this.style = new LoginPageStyle(this.props.styleProvider);
    this.state = {};
  }

  render() {
    const t = this.props.t;
    return (
      <BaseLayout
        switcher={this.props.switcher}
        userAgent={this.props.userAgent}
        styleProvider={this.props.styleProvider}
        messageSubscriber={this}
        layoutName="loginPage"
        title={t('login:appBarTitle')} >
        <div style={{padding:this.style.logo.padding}}>
          <LogoName
            width={this.style.logo.width}
            height={this.style.logo.height} />
        </div>
        <div style={this.style.card}>
          <LoginCard
            switcher={this.props.switcher}
            messenger={this}
            styleProvider={this.props.styleProvider} />
        </div>
      </BaseLayout>
    );
  }
}

module.exports = setupTranslation(['login'], LoginPage);
