module.exports = function(url, callbacks) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open('GET', url, true);
  xmlhttp.setRequestHeader("Connection", "close");

  if (typeof callbacks !== 'undefined') {
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState === 4) {
        if (typeof callbacks[xmlhttp.status] !== 'undefined') {
          callbacks[xmlhttp.status].call(callbacks.context, xmlhttp);
        } else if (typeof callbacks.failure === 'undefined') {
          console.error("Cannot callback after finishing downloading file.",
                        xmlhttp);
        } else {
          callbacks.failure.call(callbacks.context, xmlhttp);
        }
      }
    };
  }
  xmlhttp.send();
};
