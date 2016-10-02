'use strict'

var React = require('react');

var MUI = require('app/common/MaterialUI');

/**
 * Base layout for page rendering.
 * @prop userAgent: configuration for checksum on browser and server renderToString
 * @prop title: header title
 * @author Matheus
 * @since 1.0.0
 */
module.exports = React.createClass({
  render: function() {
    return (
        <html style={{fontFamily:'Roboto, sans-serif',minHeight:'100%',position: 'relative'}}>
          <head>
            <link href='https://fonts.googleapis.com/css?family=Roboto:400,300,500' rel='stylesheet' type='text/css' />
            <link rel="stylesheet"	href="css/app.css" />
          </head>
          <body style={{margin: '0 0 48pt'}}>
            <div>
                <this.props.container userAgent={this.props.userAgent} switcher={this.props.switcher} languages={this.props.languages} />
            </div>
            <script async defer src="app.js" />
          </body>
        </html>
    );
  }
});
