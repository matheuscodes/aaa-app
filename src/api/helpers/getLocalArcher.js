module.exports = function getLocalArcher() {
  if (localStorage && localStorage.loggedToken) {
    // TODO verify the signature in the token.
    var payload = atob(localStorage.loggedToken.split('.')[1]);
    var decodedToken = JSON.parse(payload);
    var archer = JSON.parse(decodedToken.archerData);
    return archer;
  } else {
    return undefined;
  }
};
