var React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
      <header id='aaa_header' className='mdl-layout__header is-casting-shadow'>
        <div className='mdl-layout__header-row'>
          {this.props.headerIcon ? <this.props.headerIcon.primary globalStyle={{fill:"#FFFFFF"}} width="32pt" height="32pt"/>: null}
          <span id='aaa_header_title' className='mdl-layout-title' style={{display:'inline'}}>{this.props.title}</span>
          {this.props.headerIcon ? <this.props.headerIcon.secondary globalStyle={{fill:"#FFFFFF"}} width="32pt" height="32pt"/>: null}
          <div className='mdl-layout-spacer'></div>
          <button id='aaa_header_logout' className='mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-color-text--accent-contrast'>
            <i className='material-icons'>exit_to_app</i>
          </button>
          <div className='mdl-tooltip' htmlFor='aaa_header_logout'>Text['logout']</div>
        </div>
      </header>
    );
  }
});
