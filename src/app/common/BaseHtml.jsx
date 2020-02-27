import React from 'react'
import i18next from 'i18next'

import { I18nextProvider } from 'react-i18next';

import ReactPageSwitcherType from 'global/ReactPageSwitcherType'

const htmlStyle = {
  fontFamily: 'Roboto, sans-serif',
  overflowX: 'hidden',
  margin: 0,
};

const bodyStyle = {
  margin: 0,
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
    switcher: ReactPageSwitcherType.isRequired,
    title: React.PropTypes.string.isRequired,
    userAgent: React.PropTypes.oneOfType([React.PropTypes.string,React.PropTypes.bool]),
    i18n: React.PropTypes.instanceOf(i18next.constructor)
  },
  render: function() {
    return (
        <html style={htmlStyle}>
          <head>
            <link
              href="https://fonts.googleapis.com/css?family=Roboto:400,300,500"
              rel="stylesheet" type="text/css" />
            <link rel="icon"
              type="image/png"
              href="favicon.png" />
            <meta name="viewport"
              content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1, user-scalable=0" />
            <title>{this.props.title}</title>
          </head>
          <body style={bodyStyle}>
            <I18nextProvider i18n={this.props.i18n}>
              <div>
                <this.props.container
                  styleProvider={this.props.styleProvider}
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

export default BaseHtml;
