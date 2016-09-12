'use strict'
var Moment = require('moment');

var requestBuilder = require('api/helpers/requestBuilder');
var valueConverter = require('useful/ValueConverter');

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

var processRequest = function(assessment){
  var data = {}
  data.date =  assessment.date.toISOString();
  //FIXME separate assessment from state, this is all unnecessary.
  data.target = assessment.target;
  data.distance = assessment.distance;
  data.seasonId = assessment.seasonId;
  data.eventId = assessment.eventId ? assessment.eventId : null;
  data.temperature = assessment.temperature ? assessment.temperature : null;
  data.weather = assessment.weather ? assessment.weather : null;
  data.windSpeed = assessment.windSpeed ? assessment.windSpeed : null;
  data.windDirection = assessment.windDirection ? assessment.windDirection : null;
  data.shootDirection = assessment.shootDirection ? assessment.shootDirection : null;
  data.arrows = [];
  assessment.rounds.forEach(function(round,roundIndex){
    round.ends.forEach(function(end,endIndex){
      end.forEach(function(value){
        var arrow = {};
        arrow.value = valueConverter.integer[value];
        arrow.x = (value == 'X' ? true : false);
        arrow.round = roundIndex+1;
        arrow.end = endIndex+1;
        data.arrows.push(arrow);
      });
    })
  });


  return JSON.stringify(data);
}

module.exports = {
  getList: function(callbacks){
    var successCall = function(request){
      var response = processResponseList(request.responseText);
      callbacks.success.call(callbacks.context,response);
    }

    var newCallbacks = {
      context: callbacks.context,
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
      context: callbacks.context, //TODO maybe change this to callbacks.context
      '200': successCall,
      failure: callbacks.error
    }

		var request = requestBuilder('/assessments/targets/','GET',newCallbacks);
		request.send();
	},
  getById: function(assessmentId,callbacks){
    var successCall = function(request){
      var response = processResponse(request.responseText);
      callbacks.success.call(callbacks.context,response);
    }

    var newCallbacks = {
      context: callbacks.context,
      '200': successCall,
      failure: callbacks.error
    }

		var request = requestBuilder('/assessments/'+assessmentId+'/','GET',newCallbacks);
		request.send();
	},
  reportById: function(assessmentId,callbacks){
    var successCall = function(request){
      var response = processResponse(request.responseText);
      callbacks.success.call(callbacks.context,response);
    }

    var newCallbacks = {
      context: callbacks.context,
      '200': successCall,
      failure: callbacks.error
    }

		var request = requestBuilder('/assessments/'+assessmentId+'/report/','GET',newCallbacks);
		request.send();
	},
  save: function(assessment,callbacks){
    var newCallbacks = {
      context: callbacks.context,
      '201': callbacks.success,
      '200': callbacks.success,
      failure: callbacks.error
    }

    var request;
    if(typeof assessment.id !== 'undefined'){
      request = requestBuilder('/assessments/'+assessment.id+'/','PUT',newCallbacks);
    }
    else{
      request = requestBuilder('/assessments/','POST',newCallbacks);
    }

    var data = processRequest(assessment);

		request.send(data);
	},
  delete: function(assessmentId,callbacks){
    var newCallbacks = {
      context: callbacks.context,
      '200': callbacks.success,
      failure: callbacks.error
    }

    var request = requestBuilder('/assessments/'+assessmentId+'/','DELETE',newCallbacks);

		request.send();
	}

}
