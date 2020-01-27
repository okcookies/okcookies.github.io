let currentScript = document.currentScript;

let cookieName = null;
try {
    cookieName = currentScript.attributes.cookieName.nodeValue;
} catch(TypeError) {
    cookieName = window.location.hostname + "-okcookies";
}

let message = null;
try {
    message = currentScript.attributes.message.nodeValue;
} catch(TypeError) {
    message = `
    <p>This site uses cookies to enhance your browsing experience. By
        using this site you agree to the use of cookies and you acknowledge that you have
        read and understood our terms and conditions and, privacy policy.</a>
        <button onclick="closeAndAccept()">
            Close and Accept
        </button>
    </p>`;
}

let style = null;
try {
    style = Boolean(currentScript.attributes.style.nodeValue);
} catch(TypeError) {
    style = false;
}

const css = `
position: fixed;
left: 0;
bottom: 0;
width: 100%;
background-color: #e6e6e6;
opacity: 0.85;
text-align: center;
`

checkCookie();

function closeAndAccept() {
    let gdprDiv = document.getElementById("okcookies");
    gdprDiv.style.display = "none";
    setCookie();
}

function setCookie() {
    let date = new Date();
    date.setTime(date.getTime() + (365*24*60*60*1000));
    let expires = "expires=" + date.toGMTString();
    cookieValue = "true";
    document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
}

function getCookie() {
    let name = cookieName + "=true";
    let decodedCookie = decodeURIComponent(document.cookie);
    let splittedCookies = decodedCookie.split(';');
    if (splittedCookies.includes(name) || splittedCookies.includes(" " + name)) {
        return true;
    } else {
        return false;
    }
}

function checkCookie() {
    if (!getCookie()) {
        // show okcookies code
        let getBody = document.getElementsByTagName('body')[0];
        let appendString = `<div id="okcookies">` + message + `</div>`;
        getBody.innerHTML += appendString;
        if (style === false) {
            let okcookiesDiv = document.getElementById("okcookies");
            okcookiesDiv.setAttribute("style", css);
        }
    }
}
