import React from 'react';
import PropTypes from 'prop-types';
import {autobind} from 'core-decorators';

import MessageablePage from 'components/MessageablePage';
import i18nextReact from 'global/i18nextReact';
import pageSwitcherType from 'global/ReactPageSwitcherType';
import BaseLayout from 'app/common/BaseLayout';
import LoginCard from 'app/login/LoginCard';
import LoginPageStyle from 'app/login/LoginPage.style';
import LogoName from 'svg/LogoName';

@autobind
class LoginPage extends MessageablePage {
  static get propTypes() {
    return {
      switcher: pageSwitcherType,
      userAgent: PropTypes.string,
      t: PropTypes.func,
    };
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
        <div style={{padding: this.style.logo.padding}}>
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

export default i18nextReact.setupTranslation(['login'], LoginPage);
