//Make a simple echo Server
var path = require("path"),
config = require("./../config/config"),
compiler = require("./../compilers/compiler"),
webserver = require("./../networking/webserver"),
provider = require("./../networking/provider"),
authServer = require("./AuthServer");
FileServer = require("./FileServer");

var provider_data = provider.getProvider(config.server.provider);//Get the provider

//Make the webserver
var server = webserver({
	'port': config.server.port,
	'root': path.resolve("./../server"),
	'dynExtension': 'jsclient',
	'specialFile': function(){return provider_data[1];}
});

var provider = authServer(new provider_data[0](server, config.server.port), 
	function(socket, cred, userData){
		var fs = new FileServer(socket, {'root': userData['FSFolder']});
	}
);


