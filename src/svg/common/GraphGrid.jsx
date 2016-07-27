var React = require('react');

module.exports = React.createClass({
  render: function() {
    var iterator = [];
    for(let i = 0; i < this.props.columns; i++){
      iterator.push(" ");
    }
    var verticals = iterator.map(function(value,index){
      return (
        <path className='grid' d={'m '+100*index+',0 0,'+(-this.props.height)} />
      )
    },this);
    var horizontals = iterator.map(function(value,index){
      return (
        <path className='grid' d={'m 0,'+(-index*this.props.height/10)+' '+(this.props.columns*100)+',0 '} />
      )
    },this);
    return (
      <g>
        {verticals}
        {horizontals}
      </g>
    );
  }
});
