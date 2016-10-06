'use strict';
var React = require('react');
var MUI = require('app/common/MaterialUI');

module.exports = React.createClass({
  getInitialState: function() {
    return {tasks: []};
  },
  componentWillMount: function() {
    this.setState({
      tasks: [
        {status: "open", id: 1, description: "Do this"},
        {status: "done", id: 2, description: "Do that"},
        {status: "pending", id: 3, description: "Don't"}
      ]
    });
  },
  render: function() {
    var tasks = this.state.tasks.map(function(task) {
      return (
        <MUI.ListItem
          key={'aaa_task_' + task.id}
          primaryText={"task['description']"}
          leftIcon={task.status == 'done' ? <MUI.icons.action.done /> : <MUI.icons.action.code />} />
      );
    }, this);

    return (
      <MUI.Card>
        <MUI.CardHeader
          title="Text['home_tasks']"
          subtitle="Text['home_tasks subtitle']" />
        <MUI.CardText>
          <MUI.List>
            {tasks}
          </MUI.List>
        </MUI.CardText>
      </MUI.Card>
    );
  }
});
