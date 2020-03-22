import React from 'react'
import { withTranslation } from 'react-i18next'

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';

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
