import React from 'react'
import { withTranslation } from 'react-i18next'

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';

const styles = {}

class TrainerTile extends React.Component {
  constructor(props) {
    super(props)
  }

  onSelect() {
    this.props.onSelect(this.props.data);
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
              this.props.data.licenses.map(i => <li>{`${i.title} - ${i.issuer} (${t(`common:countries.${i.country}`)})`}</li>)
              : ""}
          </ul>
          <h3>{t('trainer:tile.styles')}</h3>
          <ul>
            {this.props.data.styles ?
              this.props.data.styles.map(i => <li>{t(`trainer:styles.${i}`)}</li>)
              : ""}
          </ul>
          <h3>{t('trainer:tile.classes')}</h3>
          <ul>
            {this.props.data.classes ?
              this.props.data.classes.map(i => <li>{t(`trainer:classes.${i}`)}</li>)
              : ""}
          </ul>
        </CardContent>
        <CardActions>
          <IconButton onClick={this.onSelect.bind(this)} color="primary" variant="contained" >
            <Icon>send</Icon>
          </IconButton>
        </CardActions>
      </Card>
    );
  }
}

export default withTranslation('trainer')(withStyles(styles)(TrainerTile));
