'use strict'

var React = require('react');

var MUI = require('app/common/MaterialUI');

var Header = require('app/common/Header.jsx');
var Footer = require('app/common/Footer.jsx');

/**
 * Base layout for page rendering.
 * @prop userAgent: configuration for checksum on browser and server renderToString
 * @prop title: header title
 * @author Matheus
 * @since 1.0.0
 */
module.exports = React.createClass({
  render: function() {
    var muiTheme = MUI.getTheme({
      userAgent: this.props.userAgent
    });
    return (
        <html style={{fontFamily:'Roboto, sans-serif',minHeight:'100%',position: 'relative'}}>
          <head>
            <link href='https://fonts.googleapis.com/css?family=Roboto:400,300,500' rel='stylesheet' type='text/css' />
            <link rel="stylesheet"	href="css/app.css" />
          </head>
          <body className={'aaa-baseLayout-'+this.props.layoutName} style={{margin: '0 0 48pt'}}>
            <MUI.ThemeProvider muiTheme={muiTheme}>
              <div>
                <Header title={this.props.title} />
                  <div style={{width:'100%'}}>
                  {this.props.children}
                </div>
                <Footer />
              </div>
            </MUI.ThemeProvider>
            <script async defer src="app.js" />
          </body>
        </html>
    );
  }
});
