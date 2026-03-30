import React from 'react'
import { withTranslation } from 'react-i18next'

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
              { this.props.data.status === 'NEW' ?
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => this.props.onReject(this.props.data)}
                  endIcon={<Icon>thumb_down</Icon>} >
                  {t("trainer:request.reject")}
                </Button> :
                <Typography>{t(`trainer:tile.status.${this.props.data.status}`)}</Typography>
              }
            </Grid>

            <Grid item xs={4} >
              { this.props.data.status === 'NEW' ?
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => this.props.onApprove(this.props.data)}
                  endIcon={<Icon>thumb_up</Icon>} >
                  {t("trainer:request.approve")}
                </Button> :
                <Typography>{`${this.props.data.updatedAt}`.substring(0,10)}</Typography>
              }
            </Grid>

          </Grid>
        </CardActions>
      </Card>
    );
  }
}

export default withTranslation('trainer')(withStyles(styles)(TrainerRequestTile));
