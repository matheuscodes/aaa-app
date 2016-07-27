var React = require('react');

module.exports = React.createClass({
  render: function() {
    var unit = (this.props.max - this.props.min) / 10;
    var max = this.props.max;
    var min = this.props.min;

    if(unit <= 0) return (<g id='left' transform='translate(0,0)'></g>)

    var iterator = [];
    for(let i = 0; i < Math.floor((max-min)/unit); i++){
      iterator.push(" ");
    }

    var labels = iterator.map(function(value,index){
      return(
        <text className='left' x='-10' y={-index*(this.props.size/10)}>
          {Math.floor(index*unit)}
  				{this.props.suffix ? this.props.suffix : null}
  			</text>
      )
    },this)

    if(this.props.multiplier) {
			unit *= this.props.multiplier;
			max *= this.props.multiplier;
		}

    return (
      <g id='left' transform='translate(0,0)'>
        {labels}
        <text transform='translate(-70,0) rotate(-90)' className='title' x='0' y='0'>Text[title]</text>
      </g>
    );
  }
});
