import React from 'react'

import MUI from 'app/common/MaterialUI'

import ReactPageSwitcherType from 'global/ReactPageSwitcherType'
import Header from 'app/common/Header'
import Footer from 'app/common/Footer'
import Notice from 'app/common/Notice'

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
export default React.createClass({
  propTypes: {
    switcher: ReactPageSwitcherType.isRequired,
    userAgent: React.PropTypes.oneOfType([React.PropTypes.string,React.PropTypes.bool]),
    layoutName: React.PropTypes.string,
    title: React.PropTypes.string,
    children: React.PropTypes.oneOfType([
      React.PropTypes.node,
      React.PropTypes.arrayOf(React.PropTypes.node)
    ])
  },
  getInitialState: function() {
    return {message:{open:false}}
  },
  sendMessage: function(message){
    console.log(message)
    this.setState({message});
  },
  eraseMessage: function(){
    const current = this.state;
    current.message.open = false;
    this.setState(current);
  },
  componentWillReceiveProps: function(nextProps){
    if(typeof nextProps.messageSubscriber !== 'undefined'){
      nextProps.messageSubscriber.subscribe(this);
    }
  },
  componentDidMount(){
    if(!this.props.styleProvider.loaded){
      this.props.styleProvider.loadScreenSizes();
      this.setState(this.state);
    }
  },
  render: function() {
    var muiTheme = MUI.getTheme({
      userAgent: this.props.userAgent
    });
    return (
      <MUI.ThemeProvider muiTheme={muiTheme}>
        <div id="aaa-baseLayout" className={this.props.layoutName}>
          <Header
            switcher={this.props.switcher}
            styleProvider={this.props.styleProvider}
            title={this.props.title} />
            <div style={{width: '100%'}}>
              {this.props.children}
            </div>
          <Footer
            switcher={this.props.switcher}
            styleProvider={this.props.styleProvider} />
          <Notice message={this.state.message} onClose={this.eraseMessage} />
        </div>
      </MUI.ThemeProvider>
    );
  }
});
