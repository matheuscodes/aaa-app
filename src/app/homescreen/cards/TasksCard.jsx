var React = require('react');


module.exports = React.createClass({
  getInitialState: function() {
    return {tasks:[]};
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
        <tr id={'aaa_task_'+task['id']} key={'aaa_task_'+task['id']} >
          <td>
            <i className='material-icons'>{task['status'] == 'done' ? "done" : "code"}</i>
          </td>
          <td>{task['description']}</td>
        </tr>
      );
    },this);

    return (
      <div id='aaa_home_tasks' className='mdl-cell--2-col mdl-cell mdl-shadow--2dp'>
        <h6>Text['home_tasks']</h6>
        <table>
          <tbody>
            {tasks}
          </tbody>
        </table>
      </div>
    );
  }
});
