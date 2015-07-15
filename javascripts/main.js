//NB: These load in the order of first to last! Get the order right or face the consequences!!!!
var enabled_modules = [
	"segment",
	"inline_videos"
];

enabled_modules.forEach(function(module){

	var script = document.createElement("script");

	script.id = "ew_" + module;
	script.setAttribute("type", "text/javascript");

	script.src = "/javascripts/" + module + ".js";

	document.body.appendChild(script);

});
