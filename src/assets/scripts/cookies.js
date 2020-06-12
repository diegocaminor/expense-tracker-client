// Function to Get a Cookie
const getCookie = (cookiName) => {
  var name = cookiName + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};

const token = getCookie("token");
const userName = getCookie("userName");
const id = getCookie("id");

export default {
  token,
  userName,
  id,
};
