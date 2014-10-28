dojo.provide("mlogin.widget.PasswordInput");
dojo.require("mlogin.LoginSystem");


dojo.declare("mlogin.widget.PasswordInput", mobile.widget._Widget, {

    buildRendering : function() {
		logger.debug(this.id + ".buildRendering");

        this.domNode = mxui.dom.create("input", {
            "class": "form-control",
            id: "password",
            name: "password",
            type: "password",
            autocorrect: "off",
            autocapitalize: "none",
            placeholder: "password"
        });
    },

	startup : function() {
		logger.debug(this.id + ".startup");
        mlogin.register(this, "password");
	},

    _getValueAttr : function() {
        return this.domNode.value;
    },
    
    _setValueAttr : function(value) {
        this.domNode.value = value;
    },
	
	uninitialize : function() {
		logger.debug(this.id + ".uninitialize");
        mlogin.unregister(this);
	}
});
