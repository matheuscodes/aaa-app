import React from 'react'
import { withTranslation } from 'react-i18next'

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

const styles = {}

class NewSeasonCardGoal extends React.Component {
  changeWeekPlan(event) {
    this.props.changeWeekPlan(this.props.goalIndex, event.target.value);
  }
  changeWeekShare(event) {
    this.props.changeWeekShare(this.props.goalIndex, event.target.value);
  }
  render() {
    const t = this.props.t;

    return (
      <Grid item xs={this.props.xs} >
        <Grid container spacing={2}>
          <Grid item xs={12} >
            <TextField fullWidth
              id={['aaa-newSeasonArrowCount_', this.props.goalIndex].join('')}
              defaultValue={this.props.goal.arrowCount}
              onChange={this.changeWeekPlan.bind(this)}
              hintText={
                t('season:newSeason.arrowCountTextField.hint', this.props.goal)
              }
              label={
                t('season:newSeason.arrowCountTextField.label', this.props.goal)
              } />
          </Grid>
          <Grid item xs={12} >
            <TextField fullWidth
              id={['aaa-newSeasonTargetShare_', this.props.goalIndex].join('')}
              defaultValue={this.props.goal.targetShare}
              onChange={this.changeWeekShare.bind(this)}
              hintText={
                t('season:newSeason.targetShareTextField.hint', this.props.goal)
              }
              label={
                t('season:newSeason.targetShareTextField.label', this.props.goal)
              } />
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default withTranslation('season')(withStyles(styles)(NewSeasonCardGoal));
