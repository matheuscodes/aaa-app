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
          //TODO remove this ""+
          //TODO add try and catch
		    	var download = JSON.parse(""+request.responseText);
		    	if(download){
            processSeason(download);
		    		callback.call(context,download);
		    	}
		    }
		}

		request.send();
	},
  save: function(season,callbacks){
    var request= requestBuilder('/seasons/','POST');
    if(typeof season.id !== 'undefined'){
      request = requestBuilder('/seasons/'+season.id,'PUT');
    }

    season.start = Moment(season.start).format('YYYY-MM-DD');
    season.end = Moment(season.end).format('YYYY-MM-DD');
    var data = JSON.stringify(season);

    request.setRequestHeader("Content-type", "application/json");

		request.onreadystatechange = function() {
	    if (request.readyState == 4) {
        if(request.status == 201 || request.status == 200){
	    		callbacks.success.call(callbacks.context);
          return;
        }
        callbacks.error.call(callbacks.context,request.responseText);
        return;
	    }
		}

		request.send(data);
	},
  delete: function(seasonId,callbacks){
    request = requestBuilder('/seasons/'+seasonId,'DELETE');
		request.onreadystatechange = function() {
	    if (request.readyState == 4) {
        if(request.status == 204){
	    		callbacks.success.call(callbacks.context);
          return;
        }
        callbacks.error.call(callbacks.context,request.responseText);
        return;
	    }
		}
		request.send();
	}
}
