import React from 'react'
import PropTypes from 'prop-types';
import { withRouter } from 'react-router'
import { withTranslation } from 'react-i18next'

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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

const styles = {
  root: {
    "& .MuiSelect-icon": {
      fill: "rgba(255, 255, 255, 0.69)"
    },
    "& .MuiInput-underline::before": {
      borderBottom: "1px solid rgba(255,255,255, 0.42)"
    },
    "&:hover .MuiInput-underline::before": {
      borderBottom: "1px solid white"
    },
  },
};

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
    const { t, classes } = this.props;
    return (
      <footer style={{padding:'10pt'}}>
        <Grid container>
          <Grid item xs={12} sm={6}>
            <ButtonGroup color="primary" variant="text">
              <Button onClick={this.openAbout.bind(this)}>{t('common:footlinks.about')}</Button>
              <Button onClick={this.openTerms.bind(this)}>{t('common:footlinks.impressum')}</Button>
            </ButtonGroup>
          </Grid>
          <Grid item xs={12} sm={6} style={{ textAlign: 'right' }}>
            <LanguageIcon style={{
              width: '24pt',
              height: '24pt',
              margin: '3pt 6pt 0 3pt',
              fill: '#FFF',
            }} />
            <FormControl color="primary"
              classes={classes}>
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
          <Grid item xs={12} style={{ textAlign: 'center', color:'grey' }}>
              Matheus Borges Teixeira &copy; 2020 - Version 2.5.0
          </Grid>
        </Grid>
      </footer>
    );
  }
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withTranslation('common')(withRouter(withStyles(styles)(Footer)));
