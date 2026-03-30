import React from 'react'
import { withTranslation } from 'react-i18next'

import API from 'api'

import { withStyles } from '@mui/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import Icon from '@mui/material/Icon';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
// Accordion is ExpansionPanel, renamed on MUI 4.11
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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
