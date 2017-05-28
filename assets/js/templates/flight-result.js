define([], function() { 
return function anonymous(locals, escape, include, rethrow
/**/) {
escape = escape || function (markup) {
  return markup == undefined
    ? ''
    : String(markup)
        .replace(_MATCH_HTML, encode_char);
};
var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
;
  var __output = [], __append = __output.push.bind(__output);
  with (locals || {}) {
    ; __append("<li class=\"flight-result ")
    ;  if (locals.returns) { 
    ; __append(" flight-round-trip ")
    ; } else{ 
    ; __append(" flight-one-way ")
    ;  } 
    ; __append("\">\r\n    <div class=\"flight-result-detail\">\r\n        <h2 class=\"price\">")
    ; __append(escape(data.price))
    ; __append("</h2>\r\n        <p class=\"flight-id\">")
    ; __append(escape(data.flightid))
    ; __append("</p>\r\n        <div class=\"src-dest\">\r\n            <span class=\"result-src\">")
    ; __append(escape(data.src))
    ; __append("</span> >\r\n            <span class=\"result-dest\">")
    ; __append(escape(data.dest))
    ; __append("</span>\r\n        </div>\r\n        <div class=\"depart\">\r\n            <label> DEPART: </label>\r\n            <span class=\"departTime\">")
    ; __append(escape(data.departTime))
    ; __append("</span>\r\n        </div>\r\n        <div class=\"arrival\">\r\n            <label> ARRIVAL: </label>\r\n            <span class=\"arrivalTime\">")
    ; __append(escape(data.arriveTime))
    ; __append("</span>\r\n        </div>\r\n    </div>\r\n\r\n    ")
    ;  if (locals.returns) { 
    ; __append("\r\n        <div class=\"flight-result-detail flight-return\">\r\n            <h2 class=\"price\">")
    ; __append(escape(returns.price))
    ; __append("</h2>\r\n            <p class=\"flight-id\">")
    ; __append(escape(returns.flightid))
    ; __append("</p>\r\n            <div class=\"src-dest\">\r\n                <span class=\"result-src\">")
    ; __append(escape(returns.src))
    ; __append("</span> >\r\n                <span class=\"result-dest\">")
    ; __append(escape(returns.dest))
    ; __append("</span>\r\n            </div>\r\n            <div class=\"depart\">\r\n                <label> DEPART: </label>\r\n                <span class=\"departTime\">")
    ; __append(escape(returns.departTime))
    ; __append("</span>\r\n            </div>\r\n            <div class=\"arrival\">\r\n                <label> ARRIVAL: </label>\r\n                <span class=\"arrivalTime\">")
    ; __append(escape(returns.arriveTime))
    ; __append("</span>\r\n            </div>\r\n        </div>\r\n    ")
    ;  } 
    ; __append("\r\n\r\n    <div class=\"flight-result-detail flight-image\">\r\n        <img src=\"/images/")
    ; __append(escape(data.image))
    ; __append("\">\r\n        <button class=\"flight-book o-btn\">Book this Flight</button>\r\n    </div>\r\n</li>")
  }
  return __output.join("");

}
});