import React from 'react'
import withRouter from 'global/withRouter'
import { withTranslation } from 'react-i18next'

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import RoutePaths from 'global/RoutePaths'
import languages from 'constants/Languages'

import LanguageIcon from 'svg/icon/Languages'

/**
 * Footer with language selection.
 * @author Matheus
 * @since 1.0.0
 */
var languageNodes = languages.map(function(language) {
  return (
    <MenuItem color="secondary" value={language.code} key={language.code}>{language.name}</MenuItem>
  );
});

class Footer extends React.Component {

  constructor(props){
    super(props)
    this.state = {language:this.props.i18n.language}
  }
  changeLanguage(event){
    this.props.i18n.changeLanguage(event.target.value);
    this.setState({language: event.target.value});
  }
  openTerms(){
    this.props.history.push(RoutePaths.terms)
  }
  openAbout(){
    this.props.history.push(RoutePaths.about);
  }
  render() {
    const { t } = this.props;
    return (
      <footer style={{padding:'10pt'}}>
        <Grid container>
          <Grid size={{ xs: 12, sm: 6 }}>
            <ButtonGroup color="primary" variant="text">
              <Button onClick={this.openAbout.bind(this)}>{t('common:footlinks.about')}</Button>
              <Button onClick={this.openTerms.bind(this)}>{t('common:footlinks.impressum')}</Button>
            </ButtonGroup>
          </Grid>
          <Grid style={{ textAlign: 'right' }} size={{ xs: 12, sm: 6 }}>
            <LanguageIcon style={{
              width: '24pt',
              height: '24pt',
              margin: '3pt 6pt 0 3pt',
              fill: '#FFF',
            }} />
            <FormControl color="primary"
              sx={{
                "& .MuiSelect-icon": { fill: "rgba(255, 255, 255, 0.69)" },
                "& .MuiInput-underline::before": { borderBottom: "1px solid rgba(255,255,255, 0.42)" },
                "&:hover .MuiInput-underline::before": { borderBottom: "1px solid white" },
              }}>
              <Select
                style={{
                    color: 'white',
                    marginRight: '10pt',
                }}
                labelId="footer-language-select-label"
                id="footer-language-select"
                value={this.state.language}
                onChange={this.changeLanguage.bind(this)}>
                {languageNodes}
              </Select>
            </FormControl>
          </Grid>
          <Grid style={{ textAlign: 'center', color:'grey' }} size={12}>
              Matheus Borges Teixeira &copy; 2026 - Version 2.6.0
          </Grid>
        </Grid>
      </footer>
    );
  }
}

export default withTranslation('common')(withRouter(Footer));
