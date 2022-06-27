class Cookie {
    constructor(cookie) {
        this.cookie = cookie;
    }

    parseCookie(cookie) {
        var cookieObj = {};
        var cookieAry = document.cookie.split('; ');
        //console.log(cookieAry);
        var cookie;

        for (var i = 0, l = cookieAry.length; i < l; ++i) {
            //cookie = jQuery.trim(cookieAry[i]);
            cookie=cookieAry[i];
            cookie = cookie.split('=');
            //console.log(cookie);
            cookieObj[cookie[0]] = cookie[1];
        }

        return cookieObj;
    }

    getCookieByName(name) {
        var value = this.parseCookie(this.cookie)[name];
        console.log()
        if (value) {
            value = decodeURIComponent(value);
        }
        //console.log("value"+value);
        return value;
    }
}
export default Cookie;