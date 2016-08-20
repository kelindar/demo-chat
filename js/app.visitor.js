/*
 * @getPersistentVisitorId: Generates a unique visitor ID that is persisted between visits.
 *
 * We assume we're in an iframe, so for Safari users we use localStorage,
 * and for everyone we use local domain cookies.
 */
var getPersistentVisitorId = (function() {
  //var method = 'localStorage';
  var method = typeof localStorage === 'undefined' ? 'cookie' : 'localStorage';
  console.log(method)
  var persistor = {
    localStorage: {
      set: function(id) { localStorage.setItem("visitor", id); },
      get: function() { return localStorage.getItem("visitor"); }
    },
    cookie: {
      set: function(id) { setCookie("visitor", id, 7 ) },
      get: function() { return getCookie("visitor"); }
    }
  }[method];
  
  return function() {
    var id = persistor.get();
    if(!id) {
      id = guid();
      persistor.set(id);
    }
    return id;
  };

  function guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    };
    return s4() + s4() + s4() + s4() + s4() + s4() + s4() + s4();
  }

  // Basically checks for Safari, which we know doesn't allow third-party
  // cookies. If we were thorough, we should perform an actual check of
  // generating and fetching a 3rd party cookie. But since, to my knowledge,
  // Safari is the only browser that disables these per default, this check
  // suffices for now.
  function allowsThirdPartyCookies() {
    var re = /Version\/\d+\.\d+(\.\d+)?.*Safari/;
    return !re.test(navigator.userAgent);
  }

  function setCookie(cname, cvalue, exdays) {
      var d = new Date();
      d.setTime(d.getTime() + (exdays*24*60*60*1000));
      var expires = "expires="+ d.toUTCString();
      document.cookie = cname + "=" + cvalue + "; " + expires;
  }


  function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
}

}());


var requestId = 0;
function getRequestId(){
    return ++requestId;
}