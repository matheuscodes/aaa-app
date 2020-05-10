import React from 'react';

import { withTranslation } from 'react-i18next'

import { withStyles } from '@material-ui/core/styles';

import AssessmentArrowTableRow from 'app/assessments/AssessmentArrowTableRow';

const styles = {}

class AssessmentArrowTable extends React.Component {
  render() {
    const t = this.props.t;

    return (
      <table>
        <thead>
          <tr>
            <th>
              {t('assessment:rings')}
            </th>
            <th>
              {t('assessment:total')}
            </th>
          </tr>
        </thead>
        <tbody>
          {
            this.props.data.ends.map((end, endIndex) => {
              return (<AssessmentArrowTableRow
                        key={`aaa-AssessmentEnd_${endIndex}`}
                        end={end}
                        endIndex={endIndex}
                        roundIndex={this.props.data.index}
                        deleteEnd={this.props.deleteEnd} />);
            })
          }
          {this.props.data.totalScore ? <tr>
            <th>
              {t('assessment:totalPoints')}
            </th>
            <th>{this.props.data.totalScore}</th>
          </tr> : null}
          {this.props.data.nines ? <tr>
            <th>
              {t('assessment:totalNines')}
            </th>
            <th>{this.props.data.nines}</th>
          </tr> : null}
          {this.props.data.tens ? <tr>
            <th>
              {t('assessment:totalTens')}
            </th>
            <th>{this.props.data.tens}</th>
          </tr> : null}
          {this.props.data.xs ? <tr>
            <th>
              {t('assessment:totalXs')}
            </th>
            <th>{this.props.data.xs}</th>
          </tr> : null}
        </tbody>
      </table>
    );
  }
}

export default withTranslation('assessment')(withStyles(styles)(AssessmentArrowTable));
