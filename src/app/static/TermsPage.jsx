const React = require('react');

const i18nextReact = require('global/i18nextReact');
const MUI = require('app/common/MaterialUI');
const API = require('api');

const ReactPageSwitcherType = require('global/ReactPageSwitcherType');
const BaseLayout = require('app/common/BaseLayout');

const styles = {
  gridList: {
    width: '100%'
  }
};

const TrainingsPage = React.createClass({
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
        title={t('terms:appBarTitle')} >
        <MUI.Card style={{margin:40,marginBottom:120}}>
          <MUI.CardHeader
            title={t('terms:title')}
            subtitle={t('terms:subtitle')} />
          <MUI.CardText>
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
                Copyright © 2015-2017 Matheus Borges Teixeira<br/>
                GNU Affero General Public License v3.0
              </p>

              <p>
                <a href={'https://github.com/matheuscodes/aaa-languages'}>Advanced Archery Application Translations</a><br/>
                Copyright © 2017 Several Collaborators<br/>
                MIT License
              </p>

              <p>
                <a href={''}>Advanced Archery Application Server Code</a><br/>
                Copyright © 2015-2017 Matheus Borges Teixeira<br/>
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

module.exports = i18nextReact.setupTranslation(['terms'], TrainingsPage);