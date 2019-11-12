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
    searchResultTemplate: '<div class="waypoint"><i class="wp-icon"></i><div unselectable="on"><h3>{Name}</h3><h4>{Map}</h4></div><div class="waypoint-info"><h2 class="waypoint-code">{Code}</h2><button href="#" class="button button-small copy-button">Copy</button></div><svg class="waypoint-bg" preserveAspectRatio="none" width="800" height="99" viewBox="0 0 800 99" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M797.637 39.6946C792.527 36.844 789.607 33.5863 789.607 29.9213C789.607 28.5639 788.147 28.2924 785.592 28.2924C779.752 28.2924 773.913 17.1549 768.073 16.8834C766.978 16.3404 765.518 16.4762 764.058 16.6119C761.868 16.7477 760.408 16.3404 759.313 15.6617C758.948 15.3903 758.948 15.2545 758.583 14.983C758.583 14.5758 758.218 13.8971 758.948 13.6256C760.773 12.2682 758.948 11.5895 756.393 10.9108C752.743 9.96064 748.728 9.28193 745.078 8.19601C743.983 7.92453 742.523 7.65305 741.063 7.78879C735.223 8.60323 729.748 16.8427 723.908 17.6571C720.988 17.3856 718.433 17.1142 715.513 16.8427C713.323 16.5712 711.133 16.7069 708.943 16.4355C705.293 15.8925 701.278 15.3495 697.263 14.8066C696.898 14.6708 696.169 14.6708 695.804 14.5351C694.344 13.5849 692.154 13.7206 689.964 13.5849C688.139 13.4492 687.044 13.1777 686.314 12.6347C684.124 12.2275 683.029 11.956 684.854 10.5986C687.044 9.10547 688.139 10.7819 683.394 9.42446C682.299 9.15298 683.029 8.8815 683.029 8.47428C683.759 7.38835 686.679 6.57391 684.489 5.21651V5.08076C685.949 3.72336 684.124 3.58762 681.934 3.8591C677.919 4.5378 673.174 4.5378 669.159 4.94502C664.414 5.35225 660.034 4.40206 655.654 4.26632C653.464 4.26632 651.274 3.8591 649.449 3.31614C642.514 1.00855 634.849 1.68725 627.184 2.63744C624.994 2.90892 620.249 2.90892 620.249 4.94502C619.884 4.94502 619.884 4.94502 619.519 4.94502C617.694 4.80928 616.234 5.48799 614.044 4.94502C611.489 4.26632 608.934 4.5378 607.109 5.48799C604.92 5.21651 603.095 5.21651 600.905 5.21651C593.97 5.21651 586.67 5.35225 579.735 5.21651C573.53 4.94502 567.325 5.2165 561.485 4.94502C557.835 4.80928 553.82 5.08076 550.17 4.40206C549.075 4.26632 547.98 4.26632 546.52 4.5378C542.505 5.08076 538.125 5.48799 534.11 5.08076C529.73 4.67354 526.08 5.35225 523.161 6.43817C522.066 6.57391 521.336 7.11687 520.241 7.11687C516.956 6.16669 513.671 6.30243 510.021 6.70965C509.656 6.70965 509.656 6.70965 509.291 6.70965C508.196 6.84539 507.466 6.98113 506.371 6.98113C498.341 7.52409 489.946 7.11687 481.916 7.65983C481.186 7.38835 480.091 7.38835 478.996 7.38835C472.426 7.65983 465.491 7.65983 458.921 6.98113C457.461 6.84539 455.636 6.70965 454.176 6.16669C450.891 4.94502 447.241 4.40206 443.226 3.99484C436.657 3.31614 430.087 3.58762 423.517 3.45188C419.502 3.04466 415.487 3.04466 411.107 3.45188C409.282 3.31614 407.092 3.31614 405.267 3.1804C389.572 2.23022 374.242 3.31614 358.547 2.5017C355.992 2.23022 353.437 2.90892 350.883 2.63744C344.313 2.09447 337.743 1.82299 331.173 2.23022C323.873 2.63744 316.208 2.36596 309.273 1.82299C306.353 1.68725 302.703 1.55151 299.783 0.872811C295.403 1.55151 291.388 0.329849 287.373 0.60133C280.438 1.00855 273.503 0.46559 266.934 0.60133C264.379 0.60133 261.824 0.329849 259.269 0.46559C255.254 0.46559 251.604 -0.484593 247.589 0.329849C245.399 0.0583684 243.939 1.28003 241.749 0.60133C239.559 0.60133 236.639 0.46559 233.719 0.737071C229.704 1.14429 225.689 1.68725 221.309 2.09448C218.754 2.36596 216.199 2.36596 214.009 2.77318C207.804 3.72336 201.599 3.8591 195.394 4.26632C189.919 3.8591 184.08 3.58762 178.605 3.31614C172.4 3.04466 166.56 3.99484 160.355 3.58762C153.42 3.1804 146.485 3.45188 139.185 3.45188C136.265 3.45188 132.98 3.04466 129.695 3.72336C125.315 4.67354 120.57 5.35225 115.825 5.75947C114.73 5.75947 113.635 5.89521 112.54 5.89521C111.81 5.89521 111.08 6.03095 110.35 6.03095C104.875 6.16669 99.4005 6.84539 93.9256 6.70965C91.3706 6.70965 88.8156 7.38835 86.2607 6.84539C78.5957 5.35225 71.6608 6.16669 64.7259 7.65983C63.9959 9.28872 61.0759 9.96742 57.791 10.6461C57.061 10.6461 56.331 10.9176 55.601 11.0533C50.4911 11.4606 45.3811 11.732 40.2712 12.1393C32.6063 12.6822 27.8613 15.94 20.9264 17.4331C20.1964 17.5689 19.8314 17.8404 19.8314 18.1118C19.4664 18.9263 18.3714 19.4693 16.9115 20.0122C15.8165 20.5552 15.0865 21.0981 14.7215 21.9126C13.6265 24.0844 14.7215 26.392 10.7065 28.2924C10.3415 28.5639 10.3415 28.8353 10.7065 29.2426C12.1665 30.8715 12.1665 32.5003 9.97655 34.1292C9.24656 34.6722 8.88156 35.4866 9.97655 35.8938C12.5315 37.2512 10.3415 38.2014 8.88156 39.1516C7.42158 40.3733 5.2316 41.4592 6.69159 42.9523C9.61155 46.3459 8.51657 49.3321 3.40663 52.1827C0.486661 53.8116 -1.33832 55.4405 1.21665 57.4766C1.58165 57.8838 1.94664 58.4268 1.94664 58.834C2.31164 62.6347 2.31164 66.2997 2.67663 70.1004C1.94664 72.1365 0.48666 74.1726 4.86661 75.8015C5.5966 76.073 5.9616 76.4802 5.5966 76.8875C4.50161 78.1091 7.05658 79.195 6.69159 80.4167C6.69159 80.8239 7.78657 81.5026 9.61155 81.5026C11.8015 81.3669 12.5315 81.6384 11.0715 82.4528C9.97655 83.1315 10.3415 83.6745 11.4365 84.3532C12.5315 85.1676 14.3565 85.9821 12.8965 87.2037C11.4365 88.2897 12.5315 89.2398 15.4515 89.6471C23.1164 90.5972 30.7813 91.1402 38.8112 90.8687C39.9062 90.8687 41.0012 90.733 41.7312 91.1402C43.1912 91.9547 45.3811 91.8189 47.2061 91.8189C51.5861 91.8189 55.601 92.4976 59.981 92.3619C63.9959 92.3619 68.3759 92.6334 72.3908 93.0406C73.8508 93.1763 74.5808 93.7193 76.4058 93.7193C80.7857 93.7193 84.8007 93.3121 89.5456 94.1265C92.4656 94.6695 96.8455 94.398 100.13 94.6695C105.97 95.0767 112.175 95.2124 118.015 96.0269C121.3 96.4341 124.22 97.6557 128.235 96.977C130.425 96.7056 132.98 96.8413 135.535 96.977C138.82 97.1128 142.105 97.2485 145.39 97.52C153.42 98.063 162.18 97.52 170.21 98.7417C170.94 98.8774 172.035 98.8774 173.13 98.7417C175.32 98.4702 177.145 98.6059 178.97 98.6059C182.62 98.7417 185.904 99.4204 189.554 98.6059C193.569 97.6558 198.314 97.3843 202.694 96.7056C210.724 95.4839 218.024 96.0269 224.594 98.4702C228.244 99.1489 231.894 98.7417 235.544 98.4702C238.829 98.4702 242.114 98.6059 245.034 98.3344C245.399 98.3344 245.764 98.3344 246.494 98.1987C246.859 98.1987 247.224 98.1987 247.954 98.1987C259.634 98.3344 270.948 97.52 282.628 97.52C289.928 97.3843 297.593 97.1128 304.893 96.0269C308.178 96.0269 311.463 96.1626 314.383 95.4839C316.573 95.3482 318.763 95.7554 320.588 95.2124C324.238 95.0767 327.888 95.4839 331.538 94.9409C331.903 94.9409 332.633 94.9409 332.998 94.9409C339.933 94.9409 346.503 94.9409 353.438 94.9409C355.262 94.9409 357.087 95.2124 358.912 94.6695C373.877 94.6695 389.207 94.6695 404.172 94.6695C415.122 94.6695 426.072 94.6695 437.387 94.6695C443.956 94.6695 450.891 94.8052 457.461 94.6695C470.236 94.398 482.646 94.9409 495.421 95.2124C504.911 95.4839 514.036 95.4839 523.526 95.2124C537.76 94.8052 551.63 93.855 565.865 93.9908C566.96 93.9908 568.42 94.1265 569.15 93.7193C571.705 93.5835 574.26 94.398 576.815 93.7193C582.29 93.855 587.765 93.9908 593.24 93.9908C601.635 93.9908 609.664 94.1265 618.059 93.9908C622.074 93.9908 625.724 94.2622 629.739 93.7193H630.104H630.469C633.024 93.7193 635.579 93.9908 637.769 93.4478C650.544 93.1763 663.319 92.9048 675.729 92.4976C679.379 92.3619 683.394 92.0904 686.679 91.4117C692.884 90.19 699.088 88.8326 704.928 87.3395C707.848 87.2037 710.403 86.525 712.958 85.9821C716.608 85.9821 720.258 85.3034 723.908 85.0319C731.208 84.3532 738.508 87.387 745.443 86.3011C752.013 85.8938 758.583 85.3509 765.153 84.9436C768.803 84.6722 772.453 84.8079 776.103 84.6722C777.928 84.5364 779.753 84.5364 779.753 83.3148C779.753 80.6 783.037 75.1228 787.417 73.6297C789.242 73.0867 790.337 72.408 790.337 71.4578C790.702 69.9647 791.797 68.6073 794.352 67.7928C797.637 66.5712 800.557 65.7567 796.907 63.4492C795.447 62.3632 795.082 61.2773 791.432 60.8701C787.782 60.4629 785.592 58.0195 788.147 57.3408C790.337 56.7979 792.162 55.8477 794.352 55.4405C798.732 54.7618 799.827 53.4044 799.462 51.6397C799.097 49.3321 799.097 47.0246 799.827 44.717C800.192 42.9523 800.192 41.1877 797.637 39.6946ZM342.488 94.9409C342.488 94.8052 342.853 94.8052 342.853 94.6695C342.853 94.8052 342.853 94.8052 342.853 94.9409C342.853 94.9409 342.853 94.9409 342.488 94.9409ZM615.869 7.25261C616.234 7.11687 616.599 7.11687 616.599 7.25261C616.599 7.25261 616.234 7.25261 615.869 7.25261ZM683.759 14.3993C683.759 14.5351 684.124 14.6708 684.124 14.8066C683.759 14.6708 683.759 14.5351 683.759 14.3993Z"/></svg></div>'
  });

  window.search = sjs;

  // FOCUS
  searchInput.focus();


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

    document.querySelector('.no-results span').addEventListener('click', clearSearchInput);
  });
});
