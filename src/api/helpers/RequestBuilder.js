exports.module = function(endpoint,method){
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("POST", url, true);
  xmlhttp.setRequestHeader("Content-type", "application/x-json");
  xmlhttp.setRequestHeader("Connection", "close");

}
