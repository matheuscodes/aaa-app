var requestBuilder = require('api/helpers/requestBuilder');

module.exports = {
  getYearOverview: function(callbacks) {
    const to = new Date();
    const from = new Date(to.getTime()-1000*60*60*24*365);
    from.setDate(1);

    var successCall = function(request) {
      var response = JSON.parse(request.responseText);
      var processed = {from,to};
      response.forEach(function (each){
        processed[[each.year,each.month].join('-')] = each;
      });
      callbacks.success.call(callbacks.context, processed);
    };

    var newCallbacks = {
      context: callbacks.context,
      200: successCall,
      failure: callbacks.error
    };


    var url = [
      '/reports/overview/monthly?',
      '&from=', from.toISOString(),
      '&to=', to.toISOString()
    ].join('');
    var request = requestBuilder(url, 'GET', newCallbacks);
    request.send();
  },
  getLastWeeksOverview: function(callbacks) {
    const to = new Date();
    const from = new Date(to.getTime()-1000*60*60*24*14);
    from.setDate(1);

    var successCall = function(request) {
      var response = JSON.parse(request.responseText);
      var max = 0
      response.forEach(function (each){
        each.date = new Date(each.date);
        if(each.totalCount > max) max = each.totalCount;
      });
      response.sort(function(a,b){
        return a - b;
      })
      callbacks.success.call(callbacks.context, {days:response,max,from,to});
    };

    var newCallbacks = {
      context: callbacks.context,
      200: successCall,
      failure: callbacks.error
    };


    var url = [
      '/reports/overview/daily?',
      '&from=', from.toISOString(),
      '&to=', to.toISOString()
    ].join('');
    var request = requestBuilder(url, 'GET', newCallbacks);
    request.send();
  },
  getRingsOverview: function(callbacks) {
    var successCall = function(request) {
      var response = JSON.parse(request.responseText);
      var maxes = {month:0,quarter:0,half:0};
      var max = 0;
      response.forEach(function(value){
        maxes.month += value.month;
        maxes.quarter += value.quarter;
        maxes.half += value.half;
      });
      response.forEach(function(value){
        value.month = value.month/maxes.month;
        value.quarter = value.quarter/maxes.quarter;
        value.half  = value.half/maxes.half;
        if(value.month > max) max = value.month;
        if(value.quarter > max) max = value.quarter;
        if(value.half > max) max = value.half;
      });
      callbacks.success.call(callbacks.context, {distribution:response,maxes,max});
    };

    var newCallbacks = {
      context: callbacks.context,
      200: successCall,
      failure: callbacks.error
    };

    var request = requestBuilder('/reports/overview/rings', 'GET', newCallbacks);
    request.send();
  },
  getAssessmentsOverview: function(callbacks) {
    var successCall = function(request) {
      var response = JSON.parse(request.responseText);
      callbacks.success.call(callbacks.context, response);
    };

    var newCallbacks = {
      context: callbacks.context,
      200: successCall,
      failure: callbacks.error
    };

    var request = requestBuilder('/reports/overview/assessments', 'GET', newCallbacks);
    request.send();
  }
}
