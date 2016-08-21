module.exports = function(path,method){
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open(method, 'http://localhost:8080/archers/1'+path, true);
  xmlhttp.setRequestHeader("Content-type", "application/x-json");
  xmlhttp.setRequestHeader("Connection", "close");
  return xmlhttp;
}
