/* facebook */
$('fb-login').onclick = function() {

    fbCheckLoginStatus(
            pageReload, // on connection success
            login // on connection failure
            );
}

/**
 * facebook login
 */
function login() {

    fbLogin(
            loggedIn, // on connection success
            loggedInFailure // on connection failure
            );
}

/**
 * login success
 */
function loggedIn(response) {

    // {"id":"10205486580914512","email":"abhijeet.net@gmail.com","first_name":"Abhijeet","gender":"male",
    // "last_name":"Karlekar","link":"https://www.facebook.com/app_scoped_user_id/10205486580914512/",
    // "locale":"en_US","name":"Abhijeet Karlekar","timezone":5.5,"updated_time":"2014-11-20T07:51:12+0000","verified":true}
    console.log("loggedIn - " + JSON.stringify(response));
    var name = response.name;
    var email = response.email;
    var first_name = response.first_name;
    var last_name = response.last_name;
    var id = response.id;

    console.log(name + ' - ' + email + ' - ' + first_name + ' - ' + last_name + ' - ' + id);

    var cookieArr = new Array();
    cookieArr['service'] = 'fb';
    cookieArr['name'] = name;
    cookieArr['email'] = email;
    cookieArr['time'] = Date.now();

//    var domain = 'js-local.in';
//    setCookie('service', 'fb', 0, '/', domain, true, true);
//    setCookie('name', name, 0, '/', domain, true, true);
//    setCookie('email', email, 0, '/', domain, true, true);
//    setCookie('time', Date, 0, '/', domain, true, true);
//    setCookie('id', id, 0, '/', domain, true, true);
//    setCookie('sig', sig, 0, '/', domain, true, true);

    cookieArr['sig'] = encryptCookie(cookieArr);
    cookieArr['id'] = id;
    setMultipleCookie(cookieArr);
}

/**
 * login failure
 */
function loggedInFailure(response) {


}

function pageReload() {

    location.reload();
}

$('fb-logout').onclick = function() {

    fbCheckLoginStatus(
            logout, // on connection success
            loggedOutFailure // on connection failure
            );
}

function logout() {

    fbLogout(
            loggedOut // on success
            );
}

function loggedOut(response) {

    console.log(JSON.stringify(response) + " -- Logged Out successfully.");
    var cookieArr = new Array('service', 'name', 'email', 'time', 'sig', 'id');
    deleteCookies(cookieArr);
}

function loggedOutFailure(response) {

    console.log(JSON.stringify(response) + " -- Logged Out failure.");
}
/* facebook */
/* Google plus */
$('gp-login').onclick = function() {

    gpCheckLoginStatus(
            pageReload, // on connection success
            gplogin // on connection failure
            );
}

/**
 * Google plus login
 */
function gplogin() {

//    fbLogin(
//            loggedIn, // on connection success
//            loggedInFailure // on connection failure
//            );
}

/* Google plus */