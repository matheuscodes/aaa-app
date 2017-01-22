const React = require('react');
const i18next = require('i18next');

const I18nextProvider = require('react-i18next').I18nextProvider;

const htmlStyle = {
  fontFamily: 'Roboto, sans-serif',
  minHeight: '100%',
  position: 'relative',
  overflowX: 'hidden'
};

/**
 * Root HTML.
 * @prop {Object} switcher controller to switch pages
 * @prop {String} userAgent configuration for checksum on browser and server
 * @prop {Object} i18n controller to translations
 * @author Matheus
 * @since 1.0.0
 */
const BaseHtml = React.createClass({
  propTypes: {
    userAgent: React.PropTypes.string,
    i18n: React.PropTypes.instanceOf(i18next.constructor)
  },
  render: function() {
    return (
        <html style={htmlStyle}>
          <head>
            <link
              href="https://fonts.googleapis.com/css?family=Roboto:400,300,500"
              rel="stylesheet" type="text/css" />
          </head>
          <body style={{margin: '0 0 48pt'}}>
            <I18nextProvider i18n={this.props.i18n}>
              <div>
                <this.props.container
                  switcher={this.props.switcher}
                  userAgent={this.props.userAgent} />
              </div>
            </I18nextProvider>
            <script async defer src="app.js" />
          </body>
        </html>
    );
  }
});

module.exports = BaseHtml;
