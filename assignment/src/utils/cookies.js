export function setCookie(cname, cvalue, hours) {
  let date = new Date();
  date.setTime(date.getTime() + hours * 60 * 60 * 1000); //conversion in milliseconds
  let expires = "expires=" + date.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export function checkCookie() {
  let tokenValue = getCookie("token");
  if (tokenValue !== "") {
    return tokenValue;
  } else {
    return null;
  }
}

export function deleteCookie(cname) {
  document.cookie = cname + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}
