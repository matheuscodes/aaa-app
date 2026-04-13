import React from 'react';
import { withTranslation } from 'react-i18next'

import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';


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
                <Grid key={index1} size={4}>
                  <InputLabel htmlFor="newAssessmentSeason">
                    {t(`training:arrowTrainingTypes.${type}`)}:
                  </InputLabel>
                  <Grid container spacing={2}>
                    {
                      Object.keys(this.props.arrowDistances)
                        .filter((distance) => this.props.arrowDistances[distance])
                        .map((distance, index2) => (
                          <Grid key={index2} size={4}>
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

export default withTranslation('training')(InputStep);
