var requestBuilder = require('api/helpers/requestBuilder');

module.exports = {
  getList: function(context,callback){
		var request = requestBuilder('/equipment/','GET');

		request.onreadystatechange = function() {
		    if (request.readyState == 4 && request.status == 200) {
		    	var download = JSON.parse(""+request.responseText);
		    	if(download){
		    		callback.call(context,download);
		    	}
		    }
		}

		request.send();
	},
  getById: function(id,context,callback){
		var request = requestBuilder('/equipment/'+id,'GET');

		request.onreadystatechange = function() {
		    if (request.readyState == 4 && request.status == 200) {
		    	var download = JSON.parse(""+request.responseText);
		    	if(download){
		    		callback.call(context,download);
		    	}
		    }
		}

		request.send();
	}
}
