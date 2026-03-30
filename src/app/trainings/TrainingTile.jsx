import React from 'react'
import { withTranslation } from 'react-i18next'

import { withStyles } from '@mui/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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
