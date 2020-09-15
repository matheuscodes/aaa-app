import React from 'react'
import { withTranslation } from 'react-i18next'

import { withStyles } from '@material-ui/core/styles';

import Logo from 'svg/Logo'

const styles = {}

class LogoName extends React.Component {
  render() {
    const { t } = this.props;
    return (
      <svg style={{width:'100%'}} width={this.props.width} height={this.props.height} viewBox="0 0 470 150" >
        <g transform={'translate(-180,0)'}><Logo /></g>
    		<text y={120} x={265} style={{
            fontSize: 36,
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
}

export default withTranslation('common')(withStyles(styles)(LogoName));
