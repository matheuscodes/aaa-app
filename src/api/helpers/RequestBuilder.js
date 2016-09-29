module.exports = function(path,method,callbacks){
  var xmlhttp = new XMLHttpRequest();
  var url = 'http://localhost:8080';
  if(path !== '/login/'){
    if(localStorage && localStorage.loggedToken){
      url += 'archers/'+localStorage.loggedToken;
    }
    else{
      callbacks.failure.call(callbacks.context,xmlhttp);
      return;
    }
  }
  url += path;

  xmlhttp.open(method, url, true);
  xmlhttp.setRequestHeader("Content-type", "application/json");
  xmlhttp.setRequestHeader("Connection", "close");

  if(typeof callbacks !== 'undefined'){
    xmlhttp.onreadystatechange = function() {
	    if (xmlhttp.readyState == 4) {
	    	if(typeof callbacks[xmlhttp.status] !== 'undefined'){
          callbacks[xmlhttp.status].call(callbacks.context,xmlhttp);
        }
        else{
          if(typeof callbacks.failure !== 'undefined'){
            callbacks.failure.call(callbacks.context,xmlhttp)
          }
          else{
            console.log("[ERROR] Cannot callback after finishing request.",xmlhttp);
          }
        }
	    }
		}
  }

  return xmlhttp;
}
