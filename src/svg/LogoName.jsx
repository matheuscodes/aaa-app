const React = require('react');

const i18nextReact = require('global/i18nextReact');

const Logo = require('svg/Logo');

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

module.exports = i18nextReact.setupTranslation(['common'], LogoName);
