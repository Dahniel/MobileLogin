dojo.provide("mlogin.widget.LoginButton");
dojo.require("mlogin.LoginSystem");

dojo.declare("mlogin.widget.LoginButton", mxui.widget._Button, {
    caption : "Sign in",

	startup : function() {
		logger.debug(this.id + ".startup");
        mlogin.register(this, "button");
	},

    onClick : function() {
        mlogin.login(this);
    },
	
	uninitialize : function() {
		logger.debug(this.id + ".uninitialize");
        mlogin.unregister(this);
	}
});