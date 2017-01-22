var React = require('react');

var MUI = require('app/common/MaterialUI');

var Header = require('app/common/Header');
var Footer = require('app/common/Footer');
var PageSwitcher = require('app/common/PageSwitcher');

/**
 * Base layout for page rendering.
 * @prop {Object} switcher controller to switch pages
 * @prop {String} userAgent configuration for checksum on browser and server
 * @prop {String} title header title
 * @prop {String} layoutName name used in the class
 * @prop {Object} children nodes inside the react component
 * @author Matheus
 * @since 1.0.0
 */
module.exports = React.createClass({
  propTypes: {
    switcher: React.PropTypes.instanceOf(PageSwitcher),
    userAgent: React.PropTypes.string,
    layoutName: React.PropTypes.string,
    title: React.PropTypes.string,
    children: React.PropTypes.oneOfType([
      React.PropTypes.node,
      React.PropTypes.arrayOf(React.PropTypes.node)
    ])
  },
  render: function() {
    var muiTheme = MUI.getTheme({
      userAgent: this.props.userAgent
    });
    return (
      <MUI.ThemeProvider muiTheme={muiTheme}>
        <div id="aaa-baseLayout" className={this.props.layoutName}>
          <Header switcher={this.props.switcher} title={this.props.title} />
            <div style={{width: '100%'}}>
              {this.props.children}
            </div>
          <Footer />
        </div>
      </MUI.ThemeProvider>
    );
  }
});
