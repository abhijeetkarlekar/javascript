/* facebook */

/**
 * fbAsyncInit is run as soon as the SDK has completed loading.
 * Any code that you want to run after the SDK is loaded,
 * should be placed within this function and after the call to FB.init.
 * @returns {undefined}
 */
window.fbAsyncInit = function() {

    /**
     * used to initialize and setup the SDK
     */
    FB.init({
        appId: '295232564018856', // Your application ID. Defaults to null.
        version: 'v2.1', // Determines which versions of the Graph API and any API dialogs or plugins are invoked. This is a required parameter.
        cookie: true, // Determines whether a cookie is created for the session or not. If enabled, it can be accessed by server-side code. Defaults to false.
        status: false, // Determines whether the current login status of the user is freshly retrieved on every page load. If this is disabled, that status will have to be manually retrieved using .getLoginStatus(). Defaults to false.
        xfbml: true, // Determines whether XFBML tags used by social plugins are parsed, and therefore whether the plugins are rendered or not. Defaults to false.
        frictionlessRequests: false, // Frictionless Requests are available to games on Facebook.com or on mobile web using the JavaScript SDK. This parameter determines whether they are enabled. Defaults to false.
        hideFlashCallback: null, // This specifies a function that is called whenever it is necessary to hide Adobe Flash objects on a page. This is used when .api() requests are made, as Flash objects will always have a higher z-index than any other DOM element. Defaults to null.
        oauth: true // callback functions should now expect a single argument that will not include a session attribute, and will include an authResponse property
    });
};

function fbCheckLoginStatus(onSuccess, onFailure) {

    FB.getLoginStatus(function(response) {

        if (response.status === 'connected') {

            // the user is logged in and has authenticated your
            // app, and response.authResponse supplies
            // the user's ID, a valid access token, a signed
            // request, and the time the access token 
            // and signed request each expire
            fbFetchUserInfo(onSuccess);
        } else if (response.status === 'not_authorized') {

            // the user is logged in to Facebook,
            // but has not authenticated your app
            console.log('the user is logged in to Facebook, but has not authenticated your app');
        } else {

            // the user isn't logged in to Facebook.
            console.log('the user isn\'t logged in to Facebook');
            onFailure();
        }
    });
}
/**
 * facebook fetch user info
 * @param {String} onSuccess
 * @returns {undefined}
 */
function fbFetchUserInfo(onSuccess) {

    FB.api('/me', function(response) {

        console.log("fbFetchUserInfo - " + JSON.stringify(response));
        onSuccess(response);
    });
}
/**
 * facebook login
 * @param {String} onSuccess
 * @param {String} onFailure
 * @returns {undefined}
 */
function fbLogin(onSuccess, onFailure) {

    FB.login(function(response) {

        if (response.authResponse) {

            console.log('Welcome!  Fetching your information.... ');
            fbFetchUserInfo(onSuccess);
            $('#fb-login').hide();
        } else {

            console.log('User cancelled login or did not fully authorize.');
            onFailure();
            $('#fb-login').show();
        }
    });
}

function fbLogout(onSuccess) {

    FB.logout(function(response) {

        // user is now logged out
        console.log("fbLogout - " + JSON.stringify(response));
        onSuccess(response);
        $('#fb-login').show();
    });
}

/**
 * load and initialize the SDK
 * @param {type} d
 * @param {type} s
 * @param {type} id
 * @returns {undefined}
 */
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

/* facebook */

/* common login cookie  */

function getLoginCookies() {


}

function setLoginCookies() {


}

function removeLoginCookies() {


}

function encryptCookie(cookieArr) {

    var sigStr = '';
    for (var key in cookieArr) {

        sigStr += cookieArr[key] + '||';
    }
//    console.log(" sigStr --------- " + sigStr);
    return encrypt(sigStr, sigStr.replace(/\|\|/g, ''));
}

function decryptCookie() {

    var sig = getCookie('sig');
//    console.log(" sig --------- " + sig);
    if (sig) {
        var cookieArr = new Array('service', 'name', 'email', 'time');
        var sigStr = '';
        for (var key in cookieArr) {

            sigStr += getCookie(cookieArr[key]);
        }
        return decrypt(sig, sigStr);
    }
    return '';
}

function encrypt(str, secStr) {

//    console.log("encrypt ------------ " + str + ' - ' + secStr);
    var enc = CryptoJS.AES.encrypt(str, secStr);
    return enc;
}

function decrypt(enc, sig) {

//    console.log("decrypt ------------" + enc + ' - ' + sig);
    var dec = CryptoJS.AES.decrypt(enc, sig).toString(CryptoJS.enc.Utf8);
//    console.log("decrypt ------------" + dec);
    return dec;
}

function verifySig(loginTime, sigStr) {

    // check encrypt cookie arr
    var cookieArr = new Array('service', 'name', 'email', 'time');
    encryptCookie(cookieArr);

//    var expiryTime = 3600000; // 1 hour
    var expiryTime = 1; // 1 hour
    var d = new Date();
    var currMillisecs = d.getTime();
    console.log(currMillisecs + " < " + (parseInt(loginTime) + parseInt(expiryTime)));
    if (currMillisecs < (parseInt(loginTime) + parseInt(expiryTime)) /*&& (encryptCookie(cookieArr) == sigStr)*/) {

        return true;
    }
    return false;
}

/* common login cookie  */

/* common login */
/**
 * check cookie based login
 * @returns {Boolean}
 */
function checkLoginStatus() {

    var dec = decryptCookie();
//    console.log(dec);
    if (dec) {
        var sigArr = dec.split("||");
        var time = sigArr[3];
        dec = sigArr.join('');
//        console.log(" dec ----- " + dec);
        if (verifySig(time, dec) === false) {

            loggedOut();
        }
        return true;
    }
    loggedOut();
}

/* common login */


/* Google plus */

/**
 * load and initialize
 * @param {type} d
 * @param {type} s
 * @param {type} id
 * @returns {undefined}
 */
(function() {
    var po = document.createElement('script');
    po.type = 'text/javascript';
    po.async = true;
    po.src = 'https://apis.google.com/js/client:platform.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(po, s);
})();
/**
 * Google plus login
 */
function gpLogin() {

    gapi.auth.signIn(
            {
                'clientid': '309188748801-f2kn629c2afqrvp89eb4ai8d3h9ogi7e.apps.googleusercontent.com',
                'cookiepolicy': 'single_host_origin',
                'callback': 'signinCallback',
                'scope': 'https://www.googleapis.com/auth/plus.login'
            }
    );
}

/**
 * Handler for the signin callback triggered after the user selects an account.
 */
function signinCallback(authResult) {

    if (authResult['status']['signed_in']) {

        // Successfully authorized
//        document.getElementById('customBtn').setAttribute('style', 'display: none');
        apiClientLoad();

    } else if (authResult['error']) {

        // There was an error.
        // Possible error codes:
        //   "access_denied" - User denied access to your app
        //   "immediate_failed" - Could not automatially log in the user
        console.log('There was an error: ' + authResult['error']);
        console.log(authResult['access_token']);
        gpLoggedInFailure(authResult['error']);
    }
}
/**
 * Sets up an API call after the Google API client loads.
 */
function apiClientLoad() {

    gapi.client.load('oauth2', 'v2', apiClientLoaded);
}
/**
 * Sets up an API call after the Google API client loads.
 */
function apiClientLoaded() {

    gapi.client.oauth2.userinfo.get().execute(handlePlusResponse);
}
/**
 * Response callback for when the API client receives a response.
 *
 * @param resp The API response object with the user email and profile information.
 */
function handlePlusResponse(response) {

    gpLoggedIn(response);
}

function gpLogout() {

    disconnectUser(gapi.auth.getToken());
    gapi.auth.signOut();
}

function disconnectUser(access_token) {
    
    var revokeUrl = 'https://accounts.google.com/o/oauth2/revoke?token=' + access_token;

    // Perform an asynchronous GET request.
    $.ajax({
        type: 'GET',
        url: revokeUrl,
        async: false,
        contentType: "application/json",
        dataType: 'jsonp',
        success: function(nullResponse) {
            // Do something now that user is disconnected
            // The response is always undefined.
        },
        error: function(e) {
            // Handle the error
            // console.log(e);
            // You could point users to manually disconnect if unsuccessful
            // https://plus.google.com/apps
        }
    });
}


/* Google plus */