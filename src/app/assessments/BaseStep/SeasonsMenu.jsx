import React from 'react';
import PropTypes from 'prop-types';
import MUI from 'app/common/MaterialUI';

export default function SeasonsMenu(props){
  return (
    <MUI.SelectField
      style={{width: '100%'}}
      id={'aaa-newAssessmentSeason'}
      value={props.seasonId}
      onChange={props.changeSeason}
      floatingLabelText={
        props.t('assessment:newAssessment.seasonSelectField.label')
      } >
      {
        props.seasons.map(function(season, index) {
          return (
            <MUI.MenuItem
              key={'aaa-newAssessmentSeason_' + index}
              value={season.id}
              primaryText={season.name} />
          );
        })
      }
    </MUI.SelectField>
  );
}

SeasonsMenu.propTypes = {
  t: PropTypes.func.isRequired,
  seasons: PropTypes.object.isRequired,
  style: PropTypes.object,
}
