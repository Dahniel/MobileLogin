dojo.provide("mlogin.widget.UsernameInput");
dojo.require("mlogin.LoginSystem");


dojo.declare("mlogin.widget.UsernameInput", mxui.widget._WidgetBase, {

    buildRendering : function() {
		logger.debug(this.id + ".buildRendering");

        this.domNode = mxui.dom.create("input", {
            "class": "form-control",
            id: "username",
            name: "username",
            type: "text",
            autocorrect: "off",
            autocapitalize: "none",
            placeholder: "username"
        });
    },

	startup : function() {
		logger.debug(this.id + ".startup");
        mlogin.register(this, "username");
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
