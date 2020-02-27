import React from 'react';
import PropTypes from 'prop-types';
import {autobind} from 'core-decorators';

import MUI from 'app/common/MaterialUI';
import i18nextReact from 'global/i18nextReact';

import valueConverter from 'global/ValueConverter';

import ArrowRingRow from 'app/assessments/ArrowRingRow';

@autobind
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
            <MUI.FloatingActionButton
              onTouchTap={this.deleteEnd}
              secondary={true}
              style={this.props.style.deleteButton}
              iconStyle={this.props.style.deleteButton.iconStyle} >
              <MUI.icons.navigation.cancel
                style={this.props.style.deleteButton.icon} />
            </MUI.FloatingActionButton> : null }
        </td>
      </tr>
    );
  }
};

AssessmentArrowTableRow.propTypes = {
  style: PropTypes.object,
  end: PropTypes.array,
  deleteEnd: PropTypes.func,
  roundIndex: PropTypes.number,
  endIndex: PropTypes.number,
};

export default i18nextReact.setupTranslation(['assessment'],
                                               AssessmentArrowTableRow);
