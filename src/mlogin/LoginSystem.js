dojo.provide("mlogin.LoginSystem");


(function() {
    var map = {};

    var translate = function(code) {
        if (!window.i18n) {
            mx.server.get({
                url      : "ui/js/login_i18n.js",
                handleAs : "javascript",
                sync     : true
            });
        }

        var locale = i18n.defaultLocale,
            map    = i18n.login[locale];

        return map["http" + code] || map["httpdefault"];
    };

    mlogin.login = function(control) {
        logger.debug("mlogin.login");

        var conf = map[control.mxform.hash];

        if (!conf.username || !conf.password) {
            mx.ui.error("No username or password field found");
            return;
        }

        /* */
            
        dojo.xhrPost({
            url         : mx.baseUrl,
            handleAs    : "json",
            contentType : "application/json",
            postData    : dojo.toJson({
                action  : "login",
                params  : {
                    username : conf.username.get("value"),
                    password : conf.password.get("value")
                }
            }),
            headers     : {
                "X-Csrf-Token" : mx.session.getCSRFToken()
            },
            handle      : function(response, ioArgs) {
                var code = ioArgs.xhr.status;

                if (code == 200) {
                    // avoid password haxoring
                    if (conf.password) {
                       conf.password.set("value", "");
                    }

                    mx.login();
                } else {
                    mx.ui.error(translate(code));
                }
            }
        });
    };

    mlogin.register = function(control, type) {
        logger.debug("mlogin.register");

        var hash = control.mxform.hash,
            conf = map[hash] || (map[hash] = {});

        conf[type] = control;
    };
    
    mlogin.unregister = function(control) {
        var hash = control.mxform.hash;
        delete map[hash];
    };
}());
