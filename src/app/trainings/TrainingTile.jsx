import React from 'react'
import { withTranslation } from 'react-i18next'

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import MiniCalendar from 'svg/common/MiniCalendar'
import TrainingTypes from 'constants/ArrowTrainingTypes'

const styles = {}

class TrainingTile extends React.Component{
  delete() {
    this.props.onDelete(this.props.data.seasonId, this.props.data.id);
  }

  render() {
    const t = this.props.t;

    const headers = Object.keys(this.props.data.arrows).map(function(distance) {
      return (
        <TableCell style={{fontWeight:"bold"}} align="center" key={`trainingHeader_${distance}`} >
          {`${distance}m`}
        </TableCell>
      );
    });

    const row = {};
    const rowHasAny = {};
    TrainingTypes.forEach(function(type) {
      row[type] = Object.keys(this.props.data.arrows)
                        .map(function(distance, index) {
        rowHasAny[type] = rowHasAny[type] || this.props.data.arrows[distance][type];
        return (
          <TableCell align="center" key={'aaa-trainingCell_' + index}>
            {this.props.data.arrows[distance][type] ?
              this.props.data.arrows[distance][type] : " - "}
          </TableCell>
        );
      }, this);
    }, this);

    var rows = [];
    Object.keys(row).forEach(function(type) {
      if(rowHasAny[type]) {
        rows.push(
          <TableRow key={`aaa-trainingRow_${type}`}>
            <TableCell align="center">
              {t(`training:arrowTrainingTypes.${type}`)}
            </TableCell>
            {row[type]}
          </TableRow>
        );
      }
    });

    return (
      <Card>
        {this.props.onDelete ? <CardHeader
            avatar={
              <MiniCalendar
                width={48}
                height={48}
                day={this.props.data.date.getDate()}
                month={this.props.data.date.getMonth()} />
            }
            title={t('training:tile.title', this.props.data)}
            subheader={this.props.data.seasonName} /> : ''}
        <CardContent>
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell style={{fontWeight:"bold"}} align="center" >
                    {t('training:tile.headers.distance')}
                  </TableCell>
                  {headers}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
        {this.props.onDelete ? <CardActions disableSpacing>
          <IconButton onClick={this.delete.bind(this)} color="secondary" variant="contained" >
            <Icon>delete</Icon>
          </IconButton>
        </CardActions> : ''}
      </Card>
    );
  }
}

export default withTranslation('training')(withStyles(styles)(TrainingTile));
