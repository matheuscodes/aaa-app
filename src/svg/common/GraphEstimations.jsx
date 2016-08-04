var React = require('react');

module.exports = React.createClass({
  render: function() {
		var estimations = [];
		var min_result = 10;
		var max_result = 0;
		for(let i = 0; i < this.props.data.length; i++){
			if(this.props.data[i]){
				estimations.push(this.props.data[i]);
				if(this.props.data[i] > max_result) max_result = this.props.data[i];
				if(this.props.data[i] < min_result) min_result = this.props.data[i];
			}
			else{
				estimations.push(-1);
			}
		}

    var first = true;
    var path = ['M '];
    for(let i = 0; i < estimations.length;i++){
      let k = -((estimations[i]-min_result)/(max_result-min_result));
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

    var bullets = this.props.data.map(function(value,index){
      return(
        <circle className={'result-'+this.props.contentName}
                cx={index*100+50}
                cy={-((value-min_result)/(max_result-min_result))*this.props.size}
                r='10'/>
      )
    },this)

    return (
      <g>
        <path className={'estimation-'+this.props.contentName} d={path.join("")} />
        {bullets}
      </g>
    );
  }
});
