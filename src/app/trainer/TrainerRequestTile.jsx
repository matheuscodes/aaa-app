import React from 'react'
import { withTranslation } from 'react-i18next'

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

const styles = {}

class TrainerRequestTile extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { t } = this.props;
    return (
      <Card>
        <CardHeader
          title={this.props.data.archer.name}
          subheader={`${this.props.data.receivedAt}`.substring(0,10)} />
        <CardContent>
          {this.props.data.message}
        </CardContent>
        <CardActions>
          <Grid container spacing={2}>
            <Grid item xs={4} />
            <Grid item xs={4} >
              <Button
                variant="contained"
                color="secondary"
                onClick={() => this.props.onReject(this.props.data)}
                endIcon={<Icon>thumb_down</Icon>} >
                {t("trainer:request.reject")}
              </Button>
            </Grid>
            <Grid item xs={4} >
              <Button
                variant="contained"
                color="primary"
                onClick={() => this.props.onApprove(this.props.data)}
                endIcon={<Icon>thumb_up</Icon>} >
                {t("trainer:request.approve")}
              </Button>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    );
  }
}

export default withTranslation('trainer')(withStyles(styles)(TrainerRequestTile));
