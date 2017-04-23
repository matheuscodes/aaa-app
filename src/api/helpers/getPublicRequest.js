const requestURL = (process.env.clientRequestURL || 'none');
console.log("Using Request URL: ",requestURL)

module.exports = function(path, method, callbacks) {
  var xmlhttp = new XMLHttpRequest();
  var url = requestURL;

  url += path;

  xmlhttp.open(method, url, true);
  xmlhttp.setRequestHeader("Content-type", "application/json");

  if (typeof callbacks !== 'undefined') {
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState === 4) {
        if (typeof callbacks[xmlhttp.status] !== 'undefined') {
          callbacks[xmlhttp.status].call(callbacks.context, xmlhttp);
        } else if (typeof callbacks.failure === 'undefined') {
          console.error("Cannot callback after finishing request.", xmlhttp);
        } else {
          callbacks.failure.call(callbacks.context, xmlhttp);
        }
      }
    };
  }

  return xmlhttp;
};
