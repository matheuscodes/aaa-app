'use strict';
import React from 'react'

export default class extends React.Component {
  render() {
    // TODO FIX THIS HACK AND CALCULATE CORRECTLY
    var transforms = [];
    switch (this.props.direction) {
      case 'NW': transforms.push('matrix(0.70710678,0.70710678,-0.70710678,0.70710678,278.53309,258.34379)');
      case 'W': transforms.push('matrix(0.70710678,0.70710678,-0.70710678,0.70710678,278.53309,258.34379)');
      case 'SW': transforms.push('matrix(0.70710678,0.70710678,-0.70710678,0.70710678,278.53309,258.34379)');
      case 'S': transforms.push('matrix(0.70710678,0.70710678,-0.70710678,0.70710678,278.53309,258.34379)');
      case 'SE': transforms.push('matrix(0.70710678,0.70710678,-0.70710678,0.70710678,278.53309,258.34379)');
      case 'E': transforms.push('matrix(0.70710678,0.70710678,-0.70710678,0.70710678,278.53309,258.34379)');
      case 'NE': transforms.push('matrix(0.70710678,0.70710678,-0.70710678,0.70710678,278.53309,258.34379)');
      case 'N':
      default:
        break;
    }
    return (
      <svg
        style={this.props.style}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 325.875 325.875"
        height={this.props.height ? this.props.height : 325.875}
        width={this.props.width ? this.props.width : (this.props.height ? this.props.height : 325.875)}
        version="1.1">
        <g id="layer1" style={{display: 'inline'}} transform="translate(5.9375,9.125)"/>
        <g id="layer2" transform="translate(5.9375,9.125)">
          <g id="g4062" transform="matrix(1.0889375,0,0,1.0889375,-4.79666,-10.405182)">
            <g transform="matrix(1.1700518,0,0,1.1700518,-22.871738,-4.4501006)" style={{fill: '#80b3cd', fillOpacity: 1, display: 'inline'}} id="g4002">
              <path style={{fill: '#a7a7a7', fillOpacity: 1, stroke: 'none'}} id="path3955" d="m 235.1695,183.68645 c 0,43.35201 -35.14375,78.49576 -78.49576,78.49576 -43.35202,0 -78.495769,-35.14375 -78.495769,-78.49576 0,-43.35202 35.143749,-78.49577 78.495769,-78.49577 43.35201,0 78.49576,35.14375 78.49576,78.49577 z" transform="matrix(0.92712551,0,0,0.92712551,4.74379,-15.851232)"/>
              <path style={{fill: '#a7a7a7', fillOpacity: 1, stroke: '#a7a7a7', strokeWidth: 3, strokeOpacity: 1}} id="path8" d="M 50.762079,154.60866 115.561,188.498 148.76208,252.60866 182.623,188.446 246.76208,154.60866 182.623,122.385 148.76208,56.608662 115.562,122.385 z" />
            </g>
            <g style={{
              fontSize: '46.80207062000000207px',
              fontStyle: 'normal',
              fontVariant: 'normal',
              fontWeight: 'normal',
              fontStretch: 'normal',
              lineHeight: '125%',
              letterSpacing: '0px',
              wordSpacing: '0px',
              fill: '#80b3cd',
              fillOpacity: 1,
              stroke: 'none',
              display: 'inline',
              fontFamily: 'DejaVu Sans'}} id="text4053">
              <path d="m 130.80701,4.3029004 8.70226,0 21.17976,39.9600086 0,-39.9600086 6.27075,0 0,47.7664466 -8.70226,0 -21.17976,-39.960008 0,39.960008 -6.27075,0 0,-47.7664466" style={{fontSize: '65.52289580999999430px', fill: '#a7a7a7', fillOpacity: 1}} id="path4095"/>
            </g>
            <g transform="matrix(0.75695138,0,0,0.75695138,281.82377,-175.82837)" id="g3899-3-7">
              <g transform={transforms.join(' ')} id="g4025">
                <path style={{fill: '#ffffff', fillOpacity: 1, stroke: '#000000', strokeWidth: 6, strokeOpacity: 1}} id="path4-5-1-2-9" d="m -280.22699,580.77608 108.38,-113.54 106.909996,112.07 -106.909996,-229.3 z"/>
                <path style={{fill: '#000000', fillOpacity: 1}} id="path6-6-5-8-5" d="m -171.84699,349.82228 0,117.41 106.359996,111.33 z"/>
              </g>
            </g>
          </g>
        </g>
      </svg>
    );
  }
}
