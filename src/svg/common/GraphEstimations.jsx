'use strict'
var React = require('react');

module.exports = React.createClass({
  render: function() {
		var estimations = [];
		var min_result = this.props.min ? this.props.min : 10;
		var max_result = this.props.max ? this.props.max : 0;
		for(var i = 0; i < this.props.data.length; i++){
			if(typeof this.props.data[i] !== 'undefined' && this.props.data[i] > 0){
				estimations.push(this.props.data[i]);
				if(this.props.data[i] > max_result) max_result = this.props.data[i];
				if(this.props.data[i] < min_result) min_result = this.props.data[i];
			}
			else{
        if(this.props.estimate && i > 1){
          //TODO test this... probably not working.
          var estimate = (estimations[i-1]+estimations[i-2])/2;
          estimations.push(estimate);
          if(estimate > max_result) max_result = estimate;
          if(estimate < min_result) min_result = estimate;
        }
        else{
          estimations.push(-1);
        }
			}
		}

    var first = true;
    var path = ['M '];
    for(var i = 0; i < estimations.length;i++){
      if(estimations[i] >= 0){
        var k = -((estimations[i]-min_result)/(max_result-min_result));
        if(k <= 0){
          if(first){
            path.push((50+i*100)+" "+(k*this.props.size)+" C "+ (i*100+100) +","+(k*this.props.size)+" ");
            first = false;
          }
          else {
            path.push((50+i*100-50)+","+(k*this.props.size)+" "+(i*100+50)+" "+(k*this.props.size)+" S ");
          }
        }
      }
    }
    if(path.length > 0){
      path[path.length-1] = path[path.length-1].replace(' S ','');
    }

    var bullets = this.props.data.map(function(value,index){
      if(value > 0){
        return(
          <circle key={'aaa-graphEstimationsBullet_'+index}
                  className={'result' + (this.props.contentName ? '-'+this.props.contentName: '')}
                  cx={index*100+50}
                  cy={-((value-min_result)/(max_result-min_result))*this.props.size}
                  r='10'/>
        )
      }
    },this)

    return (
      <g>
        <path className={'estimation' + (this.props.contentName ? '-'+this.props.contentName: '')} d={path.join("")} />
        {bullets}
      </g>
    );
  }
});
