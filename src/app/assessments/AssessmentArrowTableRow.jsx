import React from 'react';
import PropTypes from 'prop-types';
import {autobind} from 'core-decorators';

import MUI from 'app/common/MaterialUI';
import i18nextReact from 'global/i18nextReact';

import valueConverter from 'global/ValueConverter';

import FloatingActionButton from 'components/FloatingActionButton';

@autobind
class AssessmentArrowTableRow extends React.Component {
  deleteEnd() {
    this.props.deleteEnd(this.props.roundIndex, this.props.endIndex);
  }

  render() {
    const t = this.props.t;

    let total = 0;

    return (
      <tr>
        <td style={this.props.style.rings} >
          {
            this.props.end.map((arrow, arrowIndex) => {
              total += valueConverter.integer[arrow];
              return (
                <MUI.Avatar
                  key={arrowIndex.toString()}
                  color={valueConverter.color[arrow]}
                  backgroundColor={valueConverter.backgroundColor[arrow]}
                  size={this.props.style.arrow.width} > { arrow } </MUI.Avatar>
              );
            })
          }
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
