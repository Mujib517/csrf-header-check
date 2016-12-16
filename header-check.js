
var url = require('url');

var csrf = function () {

    var performCheck = function (req,res,next) {
        var method = req.method;
        if (method === "GET" || method == "HEAD" || method === "OPTIONS") return next();

        var origin = getBaseUrl(req.headers.origin);
        var referer = getBaseUrl(req.headers.referer);
        if (!origin && !referer) return next();

        var errMsg;
        if (origin && whitelist.indexOf(origin) < 0) errMsg = "Invalid origin header " + origin;
        else if (referer && whitelist.indexOf(referer) < 0) errMsg = "Invalid referer header " + referer;

        if (errMsg) {
            res.status = 403;
            return next(new Error(errMsg));
        }
        return next();
        
    }

    var headerCheck = function (whitelist) {
        return performCheck;
    }

    var getBaseUrl = function (urlString) {
        var parsedUrl = url.parse(urlString);
        return parsedUrl.protocol + "//" + parsedUrl.host;
    };

    return {
        headerCheck: headerCheck
    }
};

module.exports = csrf();
