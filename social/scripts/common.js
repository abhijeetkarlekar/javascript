/**
 * return object of element
 * @param {string} id
 * @returns {Object}
 */
function $(id) {

    return document.getElementById(id);
}

function getCookie(w) {
    cName = "";
    pCOOKIES = new Array();
    pCOOKIES = document.cookie.split('; ');
    for (bb = 0; bb < pCOOKIES.length; bb++) {        
        NmeVal = new Array();
        NmeVal = pCOOKIES[bb].split('=');
        if (NmeVal[0] == w) {
            cName = unescape(NmeVal[1]);
        }
    }
    return cName;
}

//function getMultipleCookie(cookieArr){
//    
//    var sigStr = '';
//    for(var cookieName in cookieArr){
//        
//        sigStr += cookieArr[cookieName]+'||';
//    }
//}

function printCookies(w) {
    cStr = "";
    pCOOKIES = new Array();
    pCOOKIES = document.cookie.split('; ');
    for (bb = 0; bb < pCOOKIES.length; bb++) {
        NmeVal = new Array();
        NmeVal = pCOOKIES[bb].split('=');
        if (NmeVal[0]) {
            cStr += NmeVal[0] + '=' + unescape(NmeVal[1]) + '; ';
        }
    }
    return cStr;
}

function setCookie(name, value, expires, path, domain, secure, httponly) {

    cookieStr = name + "=" + escape(value) + "; ";

    if (expires) {
        expires = setExpiration(expires);
        cookieStr += "expires=" + expires + "; ";
    }
    if (path) {
        cookieStr += "path=" + path + "; ";
    }
    if (domain) {
        cookieStr += "domain=" + domain + "; ";
    }
    if (secure) {
        cookieStr += "secure; ";
    }
    if (httponly) {
        cookieStr += "true; ";
    }

    document.cookie = cookieStr;
}

function setMultipleCookie(cookieArr) {

    var domain = 'js-local.in';
    for (var cookie in cookieArr) {

        setCookie(cookie, cookieArr[cookie], 0, '/', domain, false, true);
    }
}

function deleteCookies(cookieArr) {

    var domain = 'js-local.in';
    for (var cookie in cookieArr) {

        console.log("Deleting cookie - " + cookieArr[cookie] );
        setCookie(cookieArr[cookie], '', -1, '/', domain, false, true);
    }
}

function setExpiration(cookieLife) {

    var today = new Date();
    var expr = new Date(today.getTime() + cookieLife * 24 * 60 * 60 * 1000);
    return  expr.toGMTString();
}