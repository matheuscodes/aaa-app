var React = require('react');

module.exports = React.createClass({
  render: function() {
    var unit = (this.props.max - this.props.min) / 10;
    var max = this.props.max;
    var min = parseFloat(this.props.min);

    if(unit <= 0) return (<g id={this.props.type} transform='translate(0,0)'></g>)

    var iterator = [];
    for(var i = 0; i <= Math.floor((max-min)/unit); i++){
      iterator.push(" ");
    }

    var labels = iterator.map(function(value,index){
      return(
        <text className={this.props.type} x={this.props.offset ? this.props.offset + 10 : -10 } y={-index*(this.props.size/10)}>
          {(min + index*unit).toPrecision(3)}
  				{this.props.suffix ? this.props.suffix : null}
  			</text>
      )
    },this);

    var translation = this.props.type == 'right' ? parseInt(this.props.offset) + 100 : -90;
    return (
      <g id={this.props.type} transform='translate(0,0)'>
        {labels}
        <text transform={'translate('+ translation +',0) rotate(-90)'} className='title' x='0' y='0'>Text[{this.props.title}]</text>
      </g>
    );
  }
});
