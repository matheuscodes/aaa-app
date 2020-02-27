import React from 'react'

import i18nextReact from 'global/i18nextReact'

import Logo from 'svg/Logo'

const LogoName = React.createClass({
  render: function() {
    const t = this.props.t;
    return (
      <svg width={this.props.width} height={this.props.height} viewBox="0 0 100 100" >
        <g transform={'translate(-140,0)'}><Logo /></g>
    		<text y={83} x={49} style={{
            fontSize: 24,
            textAnchor: 'middle',
            fontFamily: 'Arial',
            fontWeight: 'bold',
            fill: '#996666'
          }}>
    			{t('common:appTitle')}
    		</text>
      </svg>
    );
  }
});

export default i18nextReact.setupTranslation(['common'], LogoName);
