(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const fetch = require("node-fetch");

function fetchEntries() {
    const url = "https://spreadsheets.google.com/feeds/list/17_1B-7knKNEe76EKSwrPaucg9wx36L8HowSiLQz_Pxc/od6/public/values?alt=json";

    fetch(url)
        .then(response => response.json())
        .then(json => compileData(json));
}


const compileData = data => {
    {
        var list = document.getElementsByClassName("lboard_main_list")[0];

        var rows = '';

        var index = 0;

        data.feed.entry.forEach(entry => {
            index += 1;
            rows += `
                    <div class="lboard_main_item">
                        <p class="position">${index}</p>
                        <div class="name">
                            <img src="img/Ellipse${Math.floor(Math.random() * 5)}.png" alt="picture">
                            <p>${entry.gsx$fullname.$t}</p>
                        </div>
                        <p class="slack-username">${entry.gsx$username.$t}</p>
                        <p class="point">${entry.gsx$totalpoints.$t}</p>
                        <div class="share">
                            <a href="#"><img src="img/Vector.png" alt=""></a>
                        </div>
                    </div>`
        });

        list.insertAdjacentHTML('beforeend', rows);

        // formating the top three

        document.getElementsByClassName('position')[0].className += " pos1";

        document.getElementsByClassName('position')[1].className += " pos2";

        document.getElementsByClassName('position')[2].className += " pos3";

    }
};
fetchEntries();
},{"node-fetch":2}],2:[function(require,module,exports){
(function (global){
"use strict";

// ref: https://github.com/tc39/proposal-global
var getGlobal = function () {
	// the only reliable means to get the global object is
	// `Function('return this')()`
	// However, this causes CSP violations in Chrome apps.
	if (typeof self !== 'undefined') { return self; }
	if (typeof window !== 'undefined') { return window; }
	if (typeof global !== 'undefined') { return global; }
	throw new Error('unable to locate global object');
}

var global = getGlobal();

module.exports = exports = global.fetch;

// Needed for TypeScript and Webpack.
exports.default = global.fetch.bind(global);

exports.Headers = global.Headers;
exports.Request = global.Request;
exports.Response = global.Response;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1]);
