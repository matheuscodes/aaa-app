module.exports = function getLocalArcher() {
  if (localStorage && localStorage.loggedToken) {
    // TODO verify the signature in the token.
    var payload = atob(localStorage.loggedToken.split('.')[1]);
    var decodedToken = JSON.parse(payload);
    var archer = JSON.parse(decodedToken.archerData);
    console.log('Expiration',(decodedToken.exp * 1000),
                             new Date().getTime(),
                             (decodedToken.exp * 1000) < new Date().getTime());
    if((decodedToken.exp * 1000) > new Date().getTime()){
      return archer;
    } else {
      return undefined;
    }
  } else {
    return undefined;
  }
};
