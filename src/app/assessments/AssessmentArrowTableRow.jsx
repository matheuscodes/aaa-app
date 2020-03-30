import React from 'react';

import { withTranslation } from 'react-i18next'

import { withStyles } from '@material-ui/core/styles';
import FloatingActionButton from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';

import valueConverter from 'global/ValueConverter';

import ArrowRingRow from 'app/assessments/ArrowRingRow';

const styles = {}
class AssessmentArrowTableRow extends React.Component {
  deleteEnd() {
    this.props.deleteEnd(this.props.roundIndex, this.props.endIndex);
  }

  render() {
    let total = 0;
    this.props.end.forEach((arrow) => total += valueConverter.integer[arrow]);

    return (
      <tr>
        <td>
          <ArrowRingRow
            style={this.props.style.rings}
            arrows={this.props.end}
            arrowSize={this.props.style.arrow.width} />
        </td>
        <td>
          <div style={this.props.style.total} >{ total }</div>
          { this.props.deleteEnd ?
            <FloatingActionButton
              onTouchTap={this.deleteEnd}
              secondary={true}
              style={this.props.style.deleteButton}
              iconStyle={this.props.style.deleteButton.iconStyle} >
              <Icon>cancel</Icon>
            </FloatingActionButton> : null }
        </td>
      </tr>
    );
  }
};

export default withTranslation('assessment')(withStyles(styles)(AssessmentArrowTableRow));
