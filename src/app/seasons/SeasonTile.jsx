import React from 'react'
import { withTranslation } from 'react-i18next'

import { withStyles } from '@mui/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';

import Waiting from 'app/common/Waiting'
import SeasonGraph from 'svg/SeasonGraph'

import API from 'api'

const styles = {}

class SeasonTile extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.props.data; // TODO maybe remove this?
  }

  componentDidMount() {
    var callbacks = {
      context: this,
      success: function(season) {
        this.setState(season);
      }
    };
    API.seasons.getById(this.props.seasonId, callbacks);
  }

  onDelete() {
    this.props.onDelete(this.props.seasonId);
  }

  onEdit() {
    this.props.onEdit(this.props.seasonId);
  }

  render() {
    const { t } = this.props;
    return (
      <Card>
        <CardHeader
          title={this.state.name}
          subheader={t('season:tile.subtitle', this.state)} />
        <CardContent>
          {this.state.goals ? <SeasonGraph data={this.state} events={this.state.events} /> : <Waiting />}
        </CardContent>
        <CardActions style={{textAlign: 'right'}} disableSpacing>
          <IconButton onClick={this.onEdit.bind(this)} color="primary" variant="contained" >
            <Icon>mode_edit</Icon>
          </IconButton>
          <IconButton onClick={this.onDelete.bind(this)} color="secondary" variant="contained" >
            <Icon>delete</Icon>
          </IconButton>
        </CardActions>
      </Card>
    );
  }
}

export default withTranslation('season')(withStyles(styles)(SeasonTile));
