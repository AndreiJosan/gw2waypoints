---
---
document.addEventListener("DOMContentLoaded", function() {
  "use strict";

  const searchInput = document.querySelector('#search-input');
  var waypointCode = document.querySelector('.waypoint-code');

  // SEARCH

  /*!
  * Simple-Jekyll-Search v1.4.1 (https://github.com/christian-fei/Simple-Jekyll-Search)
  * Copyright 2015-2017, Christian Fei
  * Licensed under MIT (https://github.com/christian-fei/Simple-Jekyll-Search/blob/master/LICENSE.md)
  */
  !function t(e,r,n){function i(o,a){if(!r[o]){if(!e[o]){var c="function"==typeof require&&require;if(!a&&c)return c(o,!0);if(u)return u(o,!0);var s=new Error("Cannot find module '"+o+"'");throw s.code="MODULE_NOT_FOUND",s}var f=r[o]={exports:{}};e[o][0].call(f.exports,function(t){var r=e[o][1][t];return i(r||t)},f,f.exports,t,e,r,n)}return r[o].exports}for(var u="function"==typeof require&&require,o=0;o<n.length;o++)i(n[o]);return i}({1:[function(t,e,r){"use strict";e.exports=function(t,e){var r=e.length,n=t.length;if(n>r)return!1;if(n===r)return t===e;t:for(var i=0,u=0;i<n;i++){for(var o=t.charCodeAt(i);u<r;)if(e.charCodeAt(u++)===o)continue t;return!1}return!0}},{}],2:[function(t,e,r){"use strict";function n(t,e){return function(){if(4===t.readyState&&200===t.status)try{e(null,JSON.parse(t.responseText))}catch(r){e(r,null)}}}function i(){return window.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP")}e.exports={load:function(t,e){var r=i();r.open("GET",t,!0),r.onreadystatechange=n(r,e),r.send()}}},{}],3:[function(t,e,r){"use strict";e.exports=function n(t){if(!function(t){return!!t&&"undefined"!=typeof t.required&&t.required instanceof Array}(t))throw new Error("-- OptionsValidator: required options missing");if(!(this instanceof n))return new n(t);var e=t.required;this.getRequiredOptions=function(){return e},this.validate=function(t){var r=[];return e.forEach(function(e){"undefined"==typeof t[e]&&r.push(e)}),r}}},{}],4:[function(t,e,r){"use strict";function n(t){return!!t&&"[object Object]"===Object.prototype.toString.call(t)}function i(t){return!!t&&"[object Array]"===Object.prototype.toString.call(t)}function u(t){return p.push(t),p}function o(t){for(var e=[],r=0;r<t.length;r++)n(t[r])&&e.push(u(t[r]));return e}function a(t,e,r,n){for(var i=[],u=0;u<t.length&&i.length<n.limit;u++){var o=c(t[u],e,r,n);o&&i.push(o)}return i}function c(t,e,r,n){for(var i in t)if(!s(t[i],n.exclude)&&r.matches(t[i],e))return t}function s(t,e){var r=!1;e=e||[];for(var n=0;n<e.length;n++){var i=e[n];!r&&new RegExp(t).test(i)&&(r=!0)}return r}e.exports={put:function(t){return n(t)?u(t):i(t)?o(t):undefined},clear:function(){return p.length=0,p},get:function(){return p},search:function(t){return t?a(p,t,h.searchStrategy,h):[]},setOptions:function(t){(h=t||{}).fuzzy=t.fuzzy||!1,h.limit=t.limit||10,h.searchStrategy=t.fuzzy?f:l}};var f=t("./SearchStrategies/FuzzySearchStrategy"),l=t("./SearchStrategies/LiteralSearchStrategy"),p=[],h={};h.fuzzy=!1,h.limit=10,h.searchStrategy=h.fuzzy?f:l},{"./SearchStrategies/FuzzySearchStrategy":5,"./SearchStrategies/LiteralSearchStrategy":6}],5:[function(t,e,r){"use strict";var n=t("fuzzysearch");e.exports=new function(){this.matches=function(t,e){return n(e,t)}}},{fuzzysearch:1}],6:[function(t,e,r){"use strict";e.exports=new function(){this.matches=function(t,e){return"string"==typeof t&&(t=t.trim()).toLowerCase().indexOf(e.toLowerCase())>=0}}},{}],7:[function(t,e,r){"use strict";e.exports={compile:function(t){return n.template.replace(n.pattern,function(e,r){var i=n.middleware(r,t[r],n.template);return void 0!==i?i:t[r]||e})},setOptions:function(t){n.pattern=t.pattern||n.pattern,n.template=t.template||n.template,"function"==typeof t.middleware&&(n.middleware=t.middleware)}};var n={};n.pattern=/\{(.*?)\}/g,n.template="",n.middleware=function(){}},{}],8:[function(t,e,r){!function(e,r){"use strict";function n(t){m.put(t),a()}function i(t){S.load(t,function(e,r){e&&p("failed to get JSON ("+t+")"),n(r)})}function u(){h.resultsContainer.innerHTML=""}function o(t){h.resultsContainer.innerHTML+=t}function a(){h.searchInput.addEventListener("keyup",function(t){l(t.which)&&(u(),c(t.target.value))})}function c(t){f(t)&&s(m.search(t))}function s(t){var e=t.length;if(0===e)return o(h.noResultsText);for(var r=0;r<e;r++)o(y.compile(t[r]))}function f(t){return t&&t.length>0}function l(t){return-1===[13,16,20,37,38,39,40,91].indexOf(t)}function p(t){throw new Error("SimpleJekyllSearch --- "+t)}var h={searchInput:null,resultsContainer:null,json:[],searchResultTemplate:'',templateMiddleware:function(){},noResultsText:"<div class='no-results'><i class='boss-icon'></i>No waypoints found<span>[ESC] key to clear</span></div>",limit:10,fuzzy:!1,exclude:[]},d=["searchInput","resultsContainer","json"],y=t("./Templater"),m=t("./Repository"),S=t("./JSONLoader"),g=t("./OptionsValidator")({required:d}),v=t("./utils");e.SimpleJekyllSearch=function(t){return g.validate(t).length>0&&p("You must specify the following required options: "+d),h=v.merge(h,t),y.setOptions({template:h.searchResultTemplate,middleware:h.templateMiddleware}),m.setOptions({fuzzy:h.fuzzy,limit:h.limit}),v.isJSON(h.json)?n(h.json):i(h.json),{search:c}},e.SimpleJekyllSearch.init=e.SimpleJekyllSearch,"function"==typeof e.SimpleJekyllSearchInit&&e.SimpleJekyllSearchInit.call(this,e.SimpleJekyllSearch)}(window,document)},{"./JSONLoader":2,"./OptionsValidator":3,"./Repository":4,"./Templater":7,"./utils":9}],9:[function(t,e,r){"use strict";e.exports={merge:function(t,e){var r={};for(var n in t)r[n]=t[n],"undefined"!=typeof e[n]&&(r[n]=e[n]);return r},isJSON:function(t){try{return!!(t instanceof Object&&JSON.parse(JSON.stringify(t)))}catch(e){return!1}}}},{}]},{},[8]);
  
  var sjs = SimpleJekyllSearch({
    searchInput: document.getElementById('search-input'),
    resultsContainer: document.getElementById('results-container'),
    json: '/waywp.json',
    searchResultTemplate: '{% include search-result.html %}'
  });

  window.search = sjs;

  // FOCUS
  searchInput.focus();
  searchInput.addEventListener('click', function() {
    searchInput.select();
  });


  // SEARCH CLEAR
  var clearButton = document.querySelector('.clear-icon');
  searchInput.addEventListener("input", showClearButton);
  clearButton.addEventListener("click", clearSearchInput);

  function showClearButton() {
    if (searchInput.value.length >= 1) {
      clearButton.style.display = 'block';
      document.body.style.overflow = "hidden";
    }
    else {
      clearButton.style.display = 'none';
      document.body.style.overflow = "auto";
    }
  };

  function clearSearchInput() {
    searchInput.value = '';
    clearButton.style.display = 'none';
    document.body.style.overflow = "auto";
    searchInput.dispatchEvent(new Event('keyup'));
    searchInput.focus();
  }

  document.addEventListener('keydown', function(event) {
    const key = event.key;
    if (key === "Escape") {
      clearSearchInput();
    }

    if (key === "Enter") {
      searchInput.focus();
    }
  });

  // COPY TO CLIPBOARD
  searchInput.addEventListener('change', function() {
    const codes = document.querySelectorAll('.waypoint');

    codes.forEach(code => {
      code.addEventListener('click', () => {
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(code.querySelector('.waypoint-code'));
        selection.removeAllRanges();
        selection.addRange(range);

        try {
          document.execCommand('copy');
          selection.removeAllRanges();

          const original = code.querySelector('.waypoint-code').textContent;
          code.querySelector('.waypoint-code').textContent = '✓ Copied!';
          code.classList.add('success');

          setTimeout(() => {
            code.querySelector('.waypoint-code').textContent = original;
            code.classList.remove('success');
          }, 1200);
        } catch(e) {
          const errorMsg = document.querySelector('.error-msg');
          errorMsg.classList.add('show');

          setTimeout(() => {
            errorMsg.classList.remove('show');
          }, 1200);
        }
      });
    });

    if (document.querySelector('.no-results span')) {
      document.querySelector('.no-results span').addEventListener('click', clearSearchInput)
    }
  });
});
