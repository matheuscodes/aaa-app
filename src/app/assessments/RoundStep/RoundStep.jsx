import React from 'react';
import PropTypes from 'prop-types';
import MUI from 'app/common/MaterialUI';

import NewAssessmentEnd from 'app/assessments/RoundStep/NewAssessmentEnd';
import NewAssessmentRound from 'app/assessments/RoundStep/NewAssessmentRound';
import AssessmentArrowTable from 'app/assessments/AssessmentArrowTable';
import RoundStepStyle from 'app/assessments/RoundStep/RoundStep.style';

export default function RoundStep(props) {
  const style = new RoundStepStyle(props.style.styleProvider);

  return (
      <div>
        <MUI.GridList
          cols={2}
          cellHeight={'auto'}
          style={style}>
          <MUI.GridTile style={MUI.styles.GridTile} cols={1} >
            <NewAssessmentEnd
              style={style.NewAssessmentEnd}
              roundIndex={props.index}
              addEnd={props.addEnd} />
          </MUI.GridTile>
          <MUI.GridTile style={MUI.styles.GridTile} cols={1} >
            <NewAssessmentRound
              style={style.NewAssessmentRound}
              roundIndex={props.index}
              addRound={props.addRound} />
          </MUI.GridTile>
          <MUI.GridTile style={MUI.styles.GridTile} cols={2} >
            <AssessmentArrowTable
              style={style}
              data={props.round}
              deleteEnd={props.deleteEnd} />
          </MUI.GridTile>
        </MUI.GridList>
      </div>
  );
}

RoundStep.propTypes = {
  t: PropTypes.func.isRequired,
  style: PropTypes.object,
  index: PropTypes.number,
  round: PropTypes.object,
  addRound: PropTypes.func,
  addEnd: PropTypes.func,
  deleteEnd: PropTypes.func,
};
