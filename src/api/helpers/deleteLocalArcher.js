module.exports = function getLocalArcher() {
  if (localStorage && localStorage.loggedToken) {
    localStorage.removeItem("loggedToken");
  }
};
