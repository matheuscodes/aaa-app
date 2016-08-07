var React = require('react');

module.exports = React.createClass({
  render: function() {
    let rimStyle ={
      fill:'none',
      fillRule:'evenodd',
      stroke:'#4b4b4b',
      strokeWidth:8,
      strokeLinecap:'round',
      strokeLinejoin:'miter',
      strokeMiterlimit:4,
      strokeDasharray:'none',
      strokeOpacity:1
    }
    return (
      <svg  version='1.1'
            viewBox='-15 -15 130 130'
            preserveAspectRatio='xMidYMid meet'
            height={this.props.height ? this.props.height : null}
            width={this.props.width ? this.props.width : null} >
        <g>
          <rect
            style={{
                fill:'#ffffff',
                fillRule:'evenodd',
                stroke:'#000000',
                strokeWidth:3,
                strokeLinecap:'butt',
                strokeLinejoin:'miter',
                strokeMiterlimit:4,
                strokeDasharray:'none',
                strokeOpacity:1
              }}
            width='100'
            height='100'
            x='0'
            y='0'
            rx='20'
            ry='20' />
          <path
             style={{
                 fill:'#900000',
                 fillRule:'evenodd',
                 stroke:'#000000',
                 strokeWidth:3,
                 strokeLinecap:'butt',
                 strokeLinejoin:'miter',
                 strokeMiterlimit:4,
                 strokeDasharray:'none',
                 strokeOpacity:1
               }}
             d='m 20,0 c -11.08,0 -20,8.92 -20,20 l 0,29.74531 100,0 0,-29.74531 c 0,-11.08 -8.92,-20 -20,-20 l -60,0 z' />
          <path
             style={rimStyle}
             d='m 20,-10 0,20' />
          <path
             style={rimStyle}
             d='m 50,-10 0,20' />
          <path
             style={rimStyle}
             d='m 80,-10 0,20' />
          <text style={{
                fontStyle:'normal',
                fontWeight:'bold',
                fontVariant:'normal',
                fontSize:24,
                fontStretch:'normal',
                fontFamily:'sans-serif',
                textAlign:'center',
                letterSpacing:5,
                wordSpacing:'0',
                textAnchor:'middle',
                fill:'#FFFFFF',
                fillOpacity:1,
                stroke:'none',
                strokeWidth:'1px',
                strokeLinecap:'butt',
                strokeLinejoin:'miter',
                strokeOpacity:1
              }}
              x='50' y='40.4'>
          {this.props.month}
          </text>
          <text style={{
                 fontStyle:'normal',
                 fontWeight:'bold',
                 fontVariant:'normal',
                 fontSize:48,
                 fontStretch:'normal',
                 fontFamily:'sans-serif',
                 textAlign:'center',
                 letterSpacing:'0',
                 wordSpacing:'0',
                 textAnchor:'middle',
                 fill:'#000000',
                 fillOpacity:1,
                 stroke:'none',
                 strokeWidth:'1px',
                 strokeLinecap:'butt',
                 strokeLinejoin:'miter',
                 strokeOpacity:1
               }}
               x='50' y='90.4'>
           {this.props.day}
          </text>
        </g>
      </svg>
    );
  }
});
