const React = require('react');

const i18nextReact = require('global/i18nextReact');
const MUI = require('app/common/MaterialUI');

const MiniCalendar = require('svg/common/MiniCalendar');
const TrainingTypes = require('constants/ArrowTrainingTypes');

const TrainingTile = React.createClass({
  propTypes: {
    // TODO create a react type class to validate
    data: React.PropTypes.object,
    onDelete: React.PropTypes.func,
    t: React.PropTypes.func
  },
  delete: function() {
    this.props.onDelete(this.props.data.seasonId, this.props.data.id);
  },
  render: function() {
    const t = this.props.t;

    const headers = Object.keys(this.props.data.arrows).map(function(distance) {
      return (
        <MUI.TableHeaderColumn
          style={{textAlign:'center', whiteSpace:'normal', padding:'0 5 0 5'}}
          key={`trainingHeader_${distance}`} >
          {`${distance}m`}
        </MUI.TableHeaderColumn>
      );
    });

    const row = {};
    TrainingTypes.forEach(function(type) {
      row[type] = Object.keys(this.props.data.arrows)
                        .map(function(distance, index) {
        return (
          <MUI.TableRowColumn
            style={{textAlign:'center', whiteSpace:'normal', padding:'0 5 0 5'}}
            key={'aaa-trainingCell_' + index}>
            {this.props.data.arrows[distance][type] ?
              this.props.data.arrows[distance][type] : " - "}
          </MUI.TableRowColumn>
        );
      }, this);
    }, this);

    var rows = [];
    Object.keys(row).forEach(function(type) {
      rows.push(
        <MUI.TableRow key={`aaa-trainingRow_${type}`}>
          <MUI.TableRowColumn
            style={{textAlign:'center', whiteSpace:'normal', padding:'0 5 0 5'}}>
            {t(`training:arrowTrainingTypes.${type}`)}
          </MUI.TableRowColumn>
          {row[type]}
        </MUI.TableRow>
      );
    });

    return (
      <MUI.Paper style={{display: 'inline-block'}} zDepth={1}>
        <MUI.Card>
          <MUI.CardHeader
            title={t('training:tile.title', this.props.data)}
            subtitle={this.props.data.seasonName}
            avatar={
              <MiniCalendar
                width={48}
                height={48}
                day={this.props.data.date.getDate()}
                month={this.props.data.date.getMonth()} />
            }/>
          <MUI.CardText>
            <MUI.Table style={{width: '100%'}}>
              <MUI.TableHeader
                displaySelectAll={false}
                adjustForCheckbox={false} >
                <MUI.TableRow>
                  <MUI.TableHeaderColumn
                    style={{textAlign:'center', whiteSpace:'normal', padding:'0 5 0 5'}}>
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
