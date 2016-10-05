'use strict';

var React = require('react');
var I18nextProvider = require('react-i18next').I18nextProvider;

const htmlStyle = {
  fontFamily: 'Roboto, sans-serif',
  minHeight: '100%',
  position: 'relative'
};

/**
 * Base layout for page rendering.
 * @prop switcher: controller to switch pages
 * @prop userAgent: configuration for checksum on browser and server
 * @prop languages: list of language objects for the footer
 * @prop i18n: controller to translations
 * @author Matheus
 * @since 1.0.0
 */
var BaseHtml = React.createClass({
  propTypes: {
    switcher: React.PropTypes.object,
    userAgent: React.PropTypes.string,
    languages: React.PropTypes.array,
    i18n: React.PropTypes.object
  },
  render: function() {
    return (
        <html style={htmlStyle}>
          <head>
            <link
              href="https://fonts.googleapis.com/css?family=Roboto:400,300,500"
              rel="stylesheet" type="text/css" />
            <link rel="stylesheet"	href="css/app.css" />
          </head>
          <body style={{margin: '0 0 48pt'}}>
            <I18nextProvider i18n={this.props.i18n}>
              <div>
                <this.props.container
                  userAgent={this.props.userAgent}
                  switcher={this.props.switcher}
                  languages={this.props.languages} />
              </div>
            </I18nextProvider>
            <script async defer src="app.js" />
          </body>
        </html>
    );
  }
});

module.exports = BaseHtml;
