import React from 'react'
import { withTranslation } from 'react-i18next'

import API from 'api'

import NewSeasonForm from 'app/seasons/NewSeasonForm'
import Waiting from 'app/common/Waiting'

import { withStyles } from '@material-ui/core/styles';
import FloatingActionButton from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';

import Season from 'model/Season';

const styles = {}

class NewSeasonCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState() {
    return {equipment: []};
  }
  componentDidMount() {
    this.updateContent();
  }
  componentDidUpdate(prevProps) {
    if(this.props.seasonId !== prevProps.seasonId){
      this.updateContent();
    }
  }
  updateContent() {
    if (typeof this.props.seasonId === 'undefined') {
      API.equipment.getList(this, function(list) {
        this.setState({equipment: list, season: new Season()});
      });
    } else {
      var callbacks = {
        context: this,
        success: function(season) {
          API.equipment.getList(this, function(list) {
            this.setState({equipment: list, season: season});
          });
        }
      };
      API.seasons.getById(this.props.seasonId, callbacks);
      this.state.season = null;
      this.setState(this.state);
    }
  }
  submitSeason() {
    const t = this.props.t;
    var callbacks = {
      context: this,
      success: function(response) {
        this.showMessage(t('season:messages.newSaved'), "SUCCESS");
        this.handleClose(true);
      },
      warning: function() {
        this.showMessage(t('season:messages.newSaved'), "WARNING");
      },
      error: function() {
        this.showMessage(t('season:messages.newError'), "ERROR");
      }
    };
    console.log('save', this.state.season)
    API.seasons.save(this.state.season, callbacks);
  }
  handleClose(refresh) {
    const initial = this.getInitialState();
    this.setState(initial);
    this.props.onRequestClose(refresh);
  }
  showMessage(message, type) {
    if(typeof this.props.messenger !== 'undefined'){
      this.props.messenger.showMessage(message, type);
    }
  }
  render() {
    const { t } = this.props;
    return (
      <Dialog open={this.props.open} onClose={this.handleClose.bind(this)} fullScreen>
        <DialogTitle id="form-dialog-title">
          {t('season:newSeason.title')}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t('season:newSeason.subtitle')}
          </DialogContentText>
          {this.state.season ?
            <NewSeasonForm
              messenger={this.props.messenger}
              equipment={this.state.equipment}
              season={this.state.season} /> : <Waiting />}
        </DialogContent>
        <DialogActions>
          <FloatingActionButton
            size="small" color="secondary"
            onClick={this.handleClose.bind(this)}>
            <Icon>cancel</Icon>
          </FloatingActionButton>
          <FloatingActionButton
            onClick={this.submitSeason.bind(this)} >
            <Icon>backup</Icon>
          </FloatingActionButton>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withTranslation('season')(withStyles(styles)(NewSeasonCard));
