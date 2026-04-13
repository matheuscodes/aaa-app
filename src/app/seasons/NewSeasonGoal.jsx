import React from 'react'
import { withTranslation } from 'react-i18next'

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';


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
      <Grid size={this.props.xs}>
        <Grid container spacing={2}>
          <Grid size={12}>
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
          <Grid size={12}>
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

export default withTranslation('season')(NewSeasonCardGoal);
