var enabled_modules = [
	"inline_videos"
];

enabled_modules.forEach(function(module){
	
	var script = document.createElement("script");
	
	script.id = "ew_" + module;
	script.setAttribute("type", "text/javascript");

	script.src = "/javascripts/" + module + ".js";

	document.body.appendChild(script);

});