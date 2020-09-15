import React from 'react'
import { withTranslation } from 'react-i18next'

import API from 'api'

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
// Accordion is ExpansionPanel, renamed on MUI 4.11
import Accordion from '@material-ui/core/ExpansionPanel';
import AccordionSummary from '@material-ui/core/ExpansionPanelSummary';
import AccordionDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = {}

class TrainerRequestTile extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.getInitialState();
  }

  getInitialState() {
    return {changed: false, archer: this.props.data};
  }

  changePrivateNotes(event) {
    this.state.changed = true;
    this.state.archer.privateNotes = event.target.value;
    this.setState(this.state)
  }

  save() {
    const t = this.props.t;
    var callbacks = {
      context: this,
      success: function(list) {
        this.state.changed = false;
        this.setState(this.state);
      },
      failure: function() {
        this.showMessage(t('trainer:archers.saveError'), "ERROR");
      }
    };
    API.trainers.putTrainerArcher(this.state.archer, callbacks);
  }

  showMessage(message, type) {
    if(typeof this.props.messenger !== 'undefined'){
      this.props.messenger.showMessage(message, type);
    }
  }

  render() {
    const { t } = this.props;
    return (
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          id={`aaa-archer-${this.props.data.archerId}`} >
          <Typography>{this.props.data.name}</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Card style={{width:"100%"}}>
          <CardHeader
            title={t("trainer:archer.tile.notes.title")}
            subheader={t("trainer:archer.tile.notes.subtitle")} />
          <CardContent>
            <TextField
              fullWidth
              id="private-notes"
              label={t("trainer:archer.tile.notes.private-label")}
              onChange={this.changePrivateNotes.bind(this)}
              value={this.state.archer.privateNotes}
              multiline
              rows={6}
              variant="outlined" />
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              color="secondary"
              onClick={this.save.bind(this)}
              endIcon={<Icon>send</Icon>}
              disabled={!this.state.changed} >
              {t("trainer:archer.tile.notes.save")}
            </Button>
          </CardActions>
        </Card>
        </AccordionDetails>
      </Accordion>
    );
  }
}

export default withTranslation('trainer')(withStyles(styles)(TrainerRequestTile));
