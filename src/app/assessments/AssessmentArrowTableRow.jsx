import React from 'react';
import PropTypes from 'prop-types';
import {autobind} from 'core-decorators';

import MUI from 'app/common/MaterialUI';
import i18nextReact from 'global/i18nextReact';

import valueConverter from 'global/ValueConverter';

import FloatingActionButton from 'components/FloatingActionButton';
import ArrowRingRow from 'app/assessments/ArrowRingRow';

@autobind
class AssessmentArrowTableRow extends React.Component {
  deleteEnd() {
    this.props.deleteEnd(this.props.roundIndex, this.props.endIndex);
  }

  render() {
    const t = this.props.t;

    let total = 0;
    this.props.end.forEach(arrow => total += valueConverter.integer[arrow]);

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
              style={this.props.style.deleteButton} >
              <MUI.icons.navigation.cancel
                style={this.props.style.deleteButton.icon} />
            </FloatingActionButton> : null }
        </td>
      </tr>
    );
  }
};

module.exports = i18nextReact.setupTranslation(['assessment'],
                                               AssessmentArrowTableRow);
