export default function getLocalArcher() {
  if (localStorage && localStorage.loggedToken) {
    localStorage.removeItem("loggedToken");
  }
};
