export default function getLocalRoles() {
  if (localStorage && localStorage.loggedToken) {
    // TODO verify the signature in the token.
    var payload = atob(localStorage.loggedToken.split('.')[1]);
    var decodedToken = JSON.parse(payload);
    if((decodedToken.exp * 1000) > new Date().getTime()){
      return decodedToken.roles;
    } else {
      return [];
    }
  } else {
    return [];
  }
};
