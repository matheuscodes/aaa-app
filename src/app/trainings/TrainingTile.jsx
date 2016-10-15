const React = require('react');

const i18nextReact = require('global/i18nextReact');
const MUI = require('app/common/MaterialUI');

const MiniCalendar = require('svg/common/MiniCalendar.jsx');
const TrainingTypes = require('constants/TrainingTypes.json');

const TrainingTile = React.createClass({
  propTypes: {
    // TODO create class to validate
    data: React.PropTypes.object,
    onDelete: React.PropTypes.func,
    t: React.PropTypes.func
  },
  delete: function() {
    this.props.onDelete(this.props.data.id);
  },
  render: function() {
    const t = this.props.t;

    var headers = TrainingTypes.map(function(type) {
      return (
        <MUI.TableHeaderColumn
          key={['trainingHeader_', type].join('')}>
          {t(['training:trainingTypes.', type].join(''))}
        </MUI.TableHeaderColumn>
      );
    });

    var row = {};
    Object.keys(this.props.data.arrows).forEach(function(distance) {
      row[distance] = TrainingTypes.map(function(type, index) {
        return (
          <MUI.TableRowColumn key={'aaa-trainingCell_' + index}>
            {this.props.data.arrows[distance][type] ?
              this.props.data.arrows[distance][type] : " - "}
          </MUI.TableRowColumn>
        );
      }, this);
    }, this);

    var rows = [];
    Object.keys(row).forEach(function(distance) {
      rows.push(
        <MUI.TableRow key={['aaa-trainingRow_', distance].join('')}>
          <MUI.TableRowColumn>{distance}</MUI.TableRowColumn>
          {row[distance]}
        </MUI.TableRow>
      );
    });
    var subtitle = '';
    subtitle = this.props.data.time ?
                t('training:tile.subtitleTime', this.props.data) :
                t('training:tile.subtitle', this.props.data);

    return (
      <MUI.Paper style={{display: 'inline-block'}} zDepth={1}>
        <MUI.Card>
          <MUI.CardHeader
            title={t('training:tile.title', this.props.data)}
            subtitle={subtitle}
            avatar={
              <MiniCalendar
                width="32pt"
                height="32pt"
                day={this.props.data.date.getDate()}
                month={this.props.data.date.getMonth()} />
            }/>
          <MUI.CardText>
            <MUI.Table style={{width: '100%'}}>
              <MUI.TableHeader
                displaySelectAll={false}
                adjustForCheckbox={false} >
                <MUI.TableRow>
                  <MUI.TableHeaderColumn>
                    {t('training:tile.headers.distance')}
                  </MUI.TableHeaderColumn>
                  {headers}
                </MUI.TableRow>
              </MUI.TableHeader>
              <MUI.TableBody displayRowCheckbox={false} >
                {rows}
              </MUI.TableBody>
            </MUI.Table>
          </MUI.CardText>
          <MUI.CardActions style={{textAlign: 'right'}}>
            <MUI.FloatingActionButton
              mini={true}
              onTouchTap={this.delete}
              secondary={true}
              style={{margin: '5pt'}}>
              <MUI.icons.action.delete />
            </MUI.FloatingActionButton>
          </MUI.CardActions>
        </MUI.Card>
      </MUI.Paper>
    );
  }
});

module.exports = i18nextReact.setupTranslation(['training'], TrainingTile);
