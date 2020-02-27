import React from 'react'

import i18nextReact from 'global/i18nextReact'
import LogoName from 'svg/LogoName'
import MUI from 'app/common/MaterialUI'
import API from 'api'

import ReactPageSwitcherType from 'global/ReactPageSwitcherType'
import BaseLayout from 'app/common/BaseLayout'

const styles = {
  gridList: {
    width: '100%'
  }
};

const TermsPage = React.createClass({
  propTypes: {
    switcher: ReactPageSwitcherType.isRequired,
    userAgent: React.PropTypes.oneOfType([React.PropTypes.string,React.PropTypes.bool]).isRequired,
    t: React.PropTypes.func.isRequired
  },
  render: function() {
    const t = this.props.t;
    return (
      <BaseLayout
        switcher={this.props.switcher}
        layoutName="termsPage"
        userAgent={this.props.userAgent}
        styleProvider={this.props.styleProvider}
        title={t('terms:appBarTitle')} >
        <MUI.Card style={{margin:40,marginBottom:120}}>
          <MUI.CardHeader
            title={t('terms:title')}
            subtitle={t('terms:subtitle')} />
          <MUI.CardText>
            <div style={{padding:12}}>
              <LogoName width={'100%'} height={96} />
            </div>
            <img src='img/impressum.png' width={'400px'}  height={'150px'} />
            <h2>{t('terms:disclaimer.title')}</h2>
              <h3>{t('terms:disclaimer.content.title')}</h3>
              <p>{t('terms:disclaimer.content.paragraph')}</p>
              <h3>{t('terms:disclaimer.betaPhase.title')}</h3>
              <p>{t('terms:disclaimer.betaPhase.paragraph')}</p>
              <h3>{t('terms:disclaimer.links.title')}</h3>
              <p>{t('terms:disclaimer.links.paragraph')}</p>
            <h2>{t('terms:rights.title')}</h2>
              <p>
                <a href={'https://github.com/matheuscodes/aaa-app'}>Advanced Archery Application Code</a><br/>
                Copyright © 2015-2019 Matheus Borges Teixeira<br/>
                GNU Affero General Public License v3.0
              </p>

              <p>
                <a href={'https://github.com/matheuscodes/aaa-languages'}>Advanced Archery Application Translations</a><br/>
                Copyright © 2019 Several Collaborators<br/>
                MIT License
              </p>

              <p>
                <a href={''}>Advanced Archery Application Server Code</a><br/>
                Copyright © 2015-2019 Matheus Borges Teixeira<br/>
                Closed Source*, all rights reserved
              </p>

              <p>
                <a href={'http://www.bb-bogenschiessen.de/download/BB-Trainingsbericht/'}>Trainingsbericht v10.2.9</a><br/>
                Copyright © 2006-2015 Holger Hüning (Trainer BSC BB-Berlin e.V.)<br/>
                All Rights Reserved
              </p>

              <p>
                <a href={'http://www.material-ui.com'}>Material UI</a><br/>
                Copyright © 2014 Call-Em-All<br/>
                MIT License
              </p>

              <p>
                <a href={'https://material.io/'}>Material Design & Material Design Icons</a><br/>
                Copyright © 2012 Google<br/>
                Apache License Version 2.0
              </p>

              <p>
                * {t('terms:rights.note1')}
              </p>

            <h2>{t('terms:data.title')}</h2>
              <p>{t('terms:data.paragraph1')}</p>
              <p>{t('terms:data.paragraph2')}</p>
              <p>{t('terms:data.paragraph3')}</p>

              <h3>{t('terms:data.tracking.title')}</h3>
                <p>{t('terms:data.tracking.paragraph')}</p>
              <h3>{t('terms:data.cookies.title')}</h3>
                <p>{t('terms:data.cookies.paragraph')}</p>

            <h4>{t('terms:disclaimer.betaPhase.termination')}</h4>

          </MUI.CardText>
        </MUI.Card>
      </BaseLayout>
    );
  }
});

export default i18nextReact.setupTranslation(['terms'], TermsPage);
