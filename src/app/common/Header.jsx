var React = require('react');

var MUI = require('app/common/MaterialUI');

/**
 * Header with an undocked drawer and a logout button.
 * @prop title: header title
 * @author Matheus
 * @since 1.0.0
 */
module.exports = React.createClass({
  getInitialState: function(){
    return {open:false};
  },
  handleToggle: function(){
    this.setState({open: !this.state.open});
  },
  handleClose: function(){
    this.setState({open: false});
  },
  render: function() {
    return (
      <div>
        <MUI.AppBar
            title={this.props.title}
            iconElementRight={<MUI.IconButton><MUI.icons.action.exit_to_app /></MUI.IconButton>}
            iconElementLeft={<MUI.IconButton onTouchTap={this.handleToggle}><MUI.icons.navigation.menu /></MUI.IconButton> }
          />
        <MUI.Drawer
            docked={false}
            width={400}
            open={this.state.open}
            onRequestChange={this.handleClose} >
            <MUI.List>
              <MUI.Subheader inset={true}>Advanced Archery App</MUI.Subheader>
              <MUI.ListItem
                primaryText="John Doe"
                secondaryText="john@gmail.com"
                disabled={true}
                nestedItems={[
                  <MUI.ListItem key={'aaa-headerSettings'} primaryText="Text['Settings']" leftIcon={<MUI.icons.action.settings />} />,
                  <MUI.ListItem key={'aaa-headerLogout'} onTouchTap={this.handleClose} primaryText="Text['logout']" leftIcon={<MUI.icons.action.exit_to_app />} />
                ]} />
            </MUI.List>
            <MUI.Divider />
            <MUI.Menu>
              <MUI.MenuItem onTouchTap={this.handleClose} leftIcon={<MUI.icons.action.home />}>Text['home']</MUI.MenuItem>
              <MUI.MenuItem onTouchTap={this.handleClose} leftIcon={<MUI.icons.action.assignment_ind />}>Text['manage_profile']</MUI.MenuItem>
              <MUI.MenuItem onTouchTap={this.handleClose} leftIcon={<MUI.icons.content.create />}>Text['manage_trainings']</MUI.MenuItem>
              <MUI.MenuItem onTouchTap={this.handleClose} leftIcon={<MUI.icons.action.history />}>Text['performance_history']</MUI.MenuItem>
              <MUI.MenuItem onTouchTap={this.handleClose} leftIcon={<MUI.icons.action.help_outline />}>Text['help']</MUI.MenuItem>
            </MUI.Menu>
        </MUI.Drawer>
      </div>
    );
  }
});
