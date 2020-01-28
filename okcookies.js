"use strict";

class OkCookies {
    constructor(okCookiesSettings=new Map([[]])) {
        let currentScript = document.currentScript;

        let cookieName = okCookiesSettings.get("cookieName") || (function() {
            try {
                return currentScript.attributes.cookieName.nodeValue;
            }
            catch (TypeError) {
                return window.location.hostname + "-okcookies";
            }
        })();

        let customOkCookiesMessage = okCookiesSettings.get("customOkCookiesMessage") || (function() {
            try {
                return currentScript.attributes.customOkCookiesMessage.nodeValue;
            }
            catch (TypeError) {
                return `
            <p>This site uses cookies to enhance your browsing experience. By
                using this site you agree to the use of cookies and you acknowledge that you have
                read and understood our terms and conditions and, privacy policy.
                <button onclick="closeAndAccept()">Close and Accept</button>
            </p>`;
            }
        })();

        let customStyle = okCookiesSettings.get("customStyle") || (function() {
            if (okCookiesSettings.has("customStyle") === false) {
                try {
                    return Boolean(currentScript.attributes.customStyle.nodeValue);
                }
                catch (TypeError) {
                    return false;
                }
            }
        })();

        this.css = `
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: #e6e6e6;
    opacity: 0.85;
    text-align: center;
    `;

        this.setCookie = function() {
            let date = new Date();
            date.setTime(date.getTime() + (365 * 24 * 60 * 60 * 1000));
            let expires = "expires=" + date.toGMTString();
            let cookieValue = "true";
            document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
        }

        let getCookie = function () {
            let name = cookieName + "=true";
            let decodedCookie = decodeURIComponent(document.cookie);
            let splittedCookies = decodedCookie.split(';');
            if (splittedCookies.includes(name) || splittedCookies.includes(" " + name)) {
                return true;
            }
            else {
                return false;
            }
        }

        this.checkCookie = function () {
            if (!getCookie()) {
                // show okcookies code
                let getBody = document.getElementsByTagName('body')[0];
                let appendString = `<div id="okcookies">` + customOkCookiesMessage + `</div>`;
                getBody.innerHTML += appendString;
                if (customStyle === false) {
                    let okcookiesDiv = document.getElementById("okcookies");
                    okcookiesDiv.setAttribute("style", this.css);
                }
            }
        };
    }
}
;

let okCookies;

try {
    okCookiesSettings;
    okCookies = new OkCookies(okCookiesSettings);
} catch (ReferenceError) {
    okCookies = new OkCookies();
}

function closeAndAccept () {
    let gdprDiv = document.getElementById("okcookies");
    gdprDiv.style.display = "none";
    okCookies.setCookie();
}

okCookies.checkCookie();
