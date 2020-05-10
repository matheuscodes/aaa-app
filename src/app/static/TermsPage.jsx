import React from 'react'
import { withTranslation } from 'react-i18next'

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

import LogoName from 'svg/LogoName'

const styles = {}

class TermsPage extends React.Component {
  render() {
    const t = this.props.t;
    return (
      <div style={{'backgroundColor':'white', padding:'10pt'}}>
        <Card style={{margin:40,marginBottom:120}}>
          <CardHeader
            title={t('terms:title')}
            subheader={t('terms:subtitle')} />
          <CardContent>
            <div style={{padding:12}}>
              <LogoName width={'100%'} height={96} />
            </div>
            <img src='img/impressum.png' width={'400px'}  height={'150px'} alt="" />
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
                Advanced Archery Application Server Code<br/>
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
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default withTranslation('terms')(withStyles(styles)(TermsPage));
