import React from 'react';
import PropTypes from 'prop-types';
import MUI from 'app/common/MaterialUI';

import Waiting from 'app/common/Waiting';
import AssessmentTile from 'app/assessments/AssessmentTile';

export default function AssessmentsGrid(props) {
  const style = (props.style || {});
  console.log(style);
  return (
    <MUI.GridList
      cellHeight={style.cellHeight}
      cols={props.cols}
      padding={style.defaultPadding}
      style={style.gridList} >
      {
        props.assessments ?
          props.assessments.map((assessment, index) => {
            return (
              <MUI.GridTile
                key={`aaa-assessment_${assessment.id}`}
                style={MUI.styles.GridTile}
                cols={Math.floor(props.cols / style.columns)} >
                <AssessmentTile
                  style={style}
                  data={assessment}
                  allowMore={style.allowMore}
                  onDelete={props.deleteAssessment} />
              </MUI.GridTile>
            );
          }) : <MUI.GridTile cols={props.cols} ><Waiting /></MUI.GridTile>
      }
    </MUI.GridList>
  );
}

AssessmentsGrid.propTypes = {
  style: PropTypes.object,
  cols: PropTypes.number,
  assessments: PropTypes.array,
  deleteAssessment: PropTypes.func,
};
