import React from 'react'
import { withTranslation } from 'react-i18next'

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import Icon from '@mui/material/Icon';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';


class TrainerTile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      trainerId: props.data.id,
      message: "",
    }
  }

  onSelect() {
    this.props.onSelect(this.state);
  }

  changeMessage(event) {
    let current = this.state;
    current.message = event.target.value;
  }

  render() {
    const { t } = this.props;
    return (
      <Card>
        <CardHeader
          title={this.props.data.fullName}
          subheader={t('trainer:tile.subtitle', this.props.data)} />
        <CardContent>
          <h3>{t('trainer:tile.licenses')}</h3>
          <ul>
            {this.props.data.licenses ?
              this.props.data.licenses.map((i, idx) => <li key={idx}>{`${i.title} - ${i.issuer} (${t(`common:countries.${i.country}`)})`}</li>)
              : ""}
          </ul>
          <h3>{t('trainer:tile.styles')}</h3>
          <ul>
            {this.props.data.styles ?
              this.props.data.styles.map((i, idx) => <li key={idx}>{t(`trainer:styles.${i}`)}</li>)
              : ""}
          </ul>
          <h3>{t('trainer:tile.classes')}</h3>
          <ul>
            {this.props.data.classes ?
              this.props.data.classes.map((i, idx) => <li key={idx}>{t(`trainer:classes.${i}`)}</li>)
              : ""}
          </ul>
        </CardContent>
        <CardActions>
          <Grid container spacing={2}>
            <Grid size={8}>
              <TextField
                style={{width:'100%'}}
                id={`aaa-trainer-message-${this.props.data.id}`}
                onChange={this.changeMessage.bind(this)}
                label={t('trainer:tile.message')} />
            </Grid>
            <Grid size={4}>
              <Button
                variant="contained"
                color="primary"
                onClick={this.onSelect.bind(this)}
                endIcon={<Icon>send</Icon>} >
                {t("trainer:tile.request")}
              </Button>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    );
  }
}

export default withTranslation('trainer')(TrainerTile);
