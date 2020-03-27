import React from 'react';
import { withTranslation } from 'react-i18next'

import { withStyles } from '@material-ui/core/styles';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';

import ArrowTrainingTypes from 'constants/ArrowTrainingTypes';

import InputStepStyle from 'app/trainings/ArrowSteps/InputStep.style';

const styles = {}

class InputStep extends React.Component {

  constructor(props){
    super(props);
    this.state = {};
  }

  render(){
    const { t } = this.props;
    return (
      <Step {...this.props}>
        <StepLabel>{t('training:newTraining.ArrowsSteps.InputStep.title')}</StepLabel>
        <StepContent>
          <Grid container spacing={2}>
            {
              Object.keys(this.props.arrowTrainingTypes)
                .filter((type) => this.props.arrowTrainingTypes[type])
                .map((type, index1) => (
                <Grid item xs={4} key={index1} >
                  <InputLabel htmlFor="newAssessmentSeason">
                    {t(`training:arrowTrainingTypes.${type}`)}:
                  </InputLabel>
                  <Grid container spacing={2}>
                    {
                      Object.keys(this.props.arrowDistances)
                        .filter((distance) => this.props.arrowDistances[distance])
                        .map((distance, index2) => (
                          <Grid item xs={4} key={index2} >
                            <TextField fullWidth
                              id={`aaa-arrowTraining_${type}_${distance}`}
                              onChange={(event, value) => {
                                this.props.setArrowCount(distance, type, event.target.value);
                              }}
                              hintText={`${distance}m`}
                              label={`${distance}m`} />
                          </Grid>
                        ))
                    }
                  </Grid>
                </Grid>
              ))
            }
          </Grid>
        </StepContent>
        <div>
          {/*<MUI.GridList
            cols={2}
            cellHeight={'auto'} >
            {
              Object.keys(this.props.arrowTrainingTypes)
                .filter((type) => this.props.arrowTrainingTypes[type])
                .map((type, index) => (
                <MUI.GridTile
                  style={MUI.styles.GridTile}
                  cols={this.style.typeColumns} >
                  <h5 style={this.style.h5}>
                    {t(`training:arrowTrainingTypes.${type}`)}:
                  </h5>
                  <MUI.GridList
                    cols={4}
                    cellHeight={'auto'} >
                    {
                      Object.keys(this.props.arrowDistances)
                        .filter((distance) => this.props.arrowDistances[distance])
                        .map((distance, index) => (
                          <MUI.GridTile
                            key={index}
                            style={MUI.styles.GridTile}
                            cols={this.style.distanceColumns} >
                            <MUI.TextField
                              style={this.style.TextField}
                              id={`aaa-arrowTraining_${type}_${distance}`}
                              type={'number'}
                              hintText={`${distance}m`}
                              floatingLabelText={`${distance}m`}
                              onChange={(event, value) => {
                                this.props.setArrowCount(distance, type, value);
                              }} />
                          </MUI.GridTile>
                        ))
                    }
                  </MUI.GridList>
                </MUI.GridTile>
              ))
            }
          </MUI.GridList>*/}
        </div>
      </Step>
    );
  }



}

export default withTranslation('training')(withStyles(styles)(InputStep));
