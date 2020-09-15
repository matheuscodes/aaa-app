import React from 'react'

export default React.PropTypes.shape({
    getPageUrlPath: React.PropTypes.func.isRequired,
    renderPage: React.PropTypes.func.isRequired,
    switchTo: React.PropTypes.func.isRequired,
    popSwitch: React.PropTypes.func.isRequired,
    loadClient: React.PropTypes.func.isRequired,
    serverString: React.PropTypes.func.isRequired,
    i18n: React.PropTypes.object.isRequired
  });
