import React from 'react';
import PropTypes from 'prop-types';
import {autobind} from 'core-decorators';

import i18nextReact from 'global/i18nextReact';

import AssessmentArrowTableStyle from 'app/assessments/AssessmentArrowTable.style';
import AssessmentArrowTableRow from 'app/assessments/AssessmentArrowTableRow';

@autobind
class AssessmentArrowTable extends React.Component {
  constructor(props) {
    super(props);
    this.style = new AssessmentArrowTableStyle(props.style.styleProvider);
  }

  render() {
    const t = this.props.t;

    return (
      <table style={this.style.table}>
        <thead>
          <tr>
            <th style={this.style.ringsHeader}>
              {t('assessment:rings')}
            </th>
            <th style={this.style.totalHeader}>
              {t('assessment:total')}
            </th>
          </tr>
        </thead>
        <tbody>
          {
            this.props.data.ends.map((end, endIndex) => {
              return (<AssessmentArrowTableRow
                        key={`aaa-AssessmentEnd_${endIndex}`}
                        style={this.style}
                        end={end}
                        endIndex={endIndex}
                        roundIndex={this.props.data.index}
                        deleteEnd={this.props.deleteEnd} />);
            })
          }
          {this.props.data.totalScore ? <tr>
            <th style={this.style.bottomSummary}>
              {t('assessment:totalPoints')}
            </th>
            <th>{this.props.data.totalScore}</th>
          </tr> : null}
          {this.props.data.nines ? <tr>
            <th style={this.style.bottomSummary}>
              {t('assessment:totalNines')}
            </th>
            <th>{this.props.data.nines}</th>
          </tr> : null}
          {this.props.data.tens ? <tr>
            <th style={this.style.bottomSummary}>
              {t('assessment:totalTens')}
            </th>
            <th>{this.props.data.tens}</th>
          </tr> : null}
          {this.props.data.xs ? <tr>
            <th style={this.style.bottomSummary}>
              {t('assessment:totalXs')}
            </th>
            <th>{this.props.data.xs}</th>
          </tr> : null}
        </tbody>
      </table>
    );
  }
};

AssessmentArrowTable.propTypes = {
  style: PropTypes.object,
  data: PropTypes.object,
  deleteEnd: PropTypes.func,
  t: PropTypes.func,
};

module.exports = i18nextReact.setupTranslation(['assessment'],
                                               AssessmentArrowTable);
