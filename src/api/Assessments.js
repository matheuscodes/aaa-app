var requestBuilder = require('api/helpers/requestBuilder');
var Moment = require('moment');

var processResponse = function(response){
  var data = JSON.parse(response.toString());
  data.date = new Date(data.date);
  return data;
}

var processResponseList = function(response){
  var data = JSON.parse(response.toString());
  for(var i = 0; i < data.length; i++){
    data[i].date = new Date(data[i].date);
  }
  return data;
}

var processRequest = function(data){
  data.date =  Moment(data.date).format('YYYY-MM-DD');
  return JSON.stringify(data);
}

module.exports = {
  getList: function(callbacks){
    var successCall = function(request){
      var response = processResponseList(request.responseText);
      callbacks.success.call(callbacks.context,response);
    }

    var newCallbacks = {
      context: this, //TODO maybe change this to callbacks.context
      '200': successCall,
      failure: callbacks.error
    }

		var request = requestBuilder('/assessments/','GET',newCallbacks);
		request.send();
	},
  getTargets: function(callbacks){
    var successCall = function(request){
      var response = JSON.parse(request.responseText.toString());
      callbacks.success.call(callbacks.context,response);
    }

    var newCallbacks = {
      context: this, //TODO maybe change this to callbacks.context
      '200': successCall,
      failure: callbacks.error
    }

		var request = requestBuilder('/assessments/targets/','GET',newCallbacks);
		request.send();
	},
  getById: function(id,callbacks){
    var successCall = function(request){
      var response = processResponse(request.responseText);
      callbacks.success.call(callbacks.context,response);
    }

    var newCallbacks = {
      context: this,
      '200': successCall,
      failure: callbacks.error
    }

		var request = requestBuilder('/assessments/'+id+'/','GET',newCallbacks);
		request.send();
	},
  reportById: function(id,callbacks){
    var successCall = function(request){
      var response = processResponse(request.responseText);
      callbacks.success.call(callbacks.context,response);
    }

    var newCallbacks = {
      context: this,
      '200': successCall,
      failure: callbacks.error
    }

		var request = requestBuilder('/assessments/'+id+'/report/','GET',newCallbacks);
		request.send();
	}
}
