var requestBuilder = require('api/helpers/requestBuilder');
var Moment = require('moment');

var processSeason = function(season){
  season.start = new Date(season.start);
  season.end = new Date(season.end);
}

module.exports = {
  getList: function(context,callback){
		var request = requestBuilder('/seasons/','GET');

		request.onreadystatechange = function() {
		    if (request.readyState == 4 && request.status == 200) {
		    	var download = JSON.parse(""+request.responseText);
		    	if(download){
            download.forEach(function(value){
              processSeason(value)
            });
		    		callback.call(context,download);
		    	}
		    }
		}

		request.send();
	},
  getById: function(id,context,callback){
		var request = requestBuilder('/seasons/'+id,'GET');

		request.onreadystatechange = function() {
		    if (request.readyState == 4 && request.status == 200) {
		    	var download = JSON.parse(""+request.responseText);
		    	if(download){
            processSeason(download);
		    		callback.call(context,download);
		    	}
		    }
		}

		request.send();
	},
  save: function(season,context,callback){
    var request= requestBuilder('/seasons/','POST');
    if(typeof season.id !== 'undefined'){
      request = requestBuilder('/seasons/'+season.id,'PUT');
    }

    season.start = Moment(season.start).format('YYYY-MM-DD');
    season.end = Moment(season.end).format('YYYY-MM-DD');
    console.log(season);
    var data = JSON.stringify(season);

    request.setRequestHeader("Content-type", "application/json");

		request.onreadystatechange = function() {
		    if (request.readyState == 4 && request.status == 201) {
		    	var download = JSON.parse(""+request.responseText);
		    	if(download){
            processSeason(download);
		    		callback.call(context,download);
		    	}
		    }
		}

		request.send(data);
	}
}
