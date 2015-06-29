//Ember Watch Inline Videos
//@author Nabil Freeman (github.com/nabilfreeman)

//this module, when included, adds support for inline video playback to EmberWatch.
//it is compatible with all browsers with the exclusion of IE8 and below, for which it gracefully degrades.
(function(){

	//nodelist doesn't have a forEach function by default. Patching prototypes is risky because of conflicts etc, but here I think the usefulness outweighs best practices.
	//NodeList.length etc all exist so we can use the forEach function no problem.
	if(!Array.prototype.forEach) return;
	NodeList.prototype.forEach = Array.prototype.forEach;

	//little helper function 
	var generateVideo = function(video_id){
		var video_container = document.createElement("div");
		video_container.className = "video_container";

		var iframe = document.createElement("iframe");
		iframe.src = "https://www.youtube.com/embed/" + video_id + "?autoplay=1";
		iframe.setAttribute("allowfullscreen", "");

		video_container.appendChild(iframe);

		return video_container;
	}

	//function to delete an element from the DOM
	var removeElement = function(element){
		//remove from page.
		element.parentNode.removeChild(element);
		
		//just being tidy...
		delete element;
	}

	//this runs on any page, on any list of items that Jekyll has populated. Note how we grab all the list items on the page.
	var list_items = document.querySelectorAll("section ul li");

	//this loop runs after page load, and adds a "play icon" to any videos in the talks list.
	list_items.forEach(function(item){
		var video_link = item.querySelector(".video-link");

		//in the Jekyll template, we assign a video-link class whenever there is a video to watch (configured in the YML file).
		//here we are essentially checking if the list item has this link or not.
		if(video_link !== null){
			var url = video_link.getAttribute("href");

			//this only supports YouTube videos right now.

			//regex tests. if we expand functionality to cover more than Youtube we might want to approach this in a smarter way.
			//i got these regex strings from Reddit Enhancement Suite ;) They might be a good bet for getting other ones too...
			var regex = /^https?:\/\/(?:www\.|m\.)?youtube\.com\/watch\?.*v=([\w\-]+)/i;
			var alt_regex = /^https?:\/\/(?:www\.)?youtu\.be\/([\w\-]+)/i;

			var result = regex.exec(url);
			if (!result) result = alt_regex.exec(url);

			if(result !== null && result.length >= 2){
				var video_id = result[1];

				//our if statement succeeded which means that the module has successfully extracted what we think is a video id fromt the url.
				//let's make a play button!
				var play_button = document.createElement("button");

				//we style in the CSS.
				play_button.className = "video_play_button";
				//...and a fix for iOS fast clicking.
				play_button.setAttribute("ontouchstart", "");

				//this is the listener that triggers the inline embed.
				play_button.addEventListener("click", function(){
					//let's check to see if a video embed is already open...
					var existing_embed = item.querySelector(".metadata .video_container");

					//if there is no embed for this list item, let's generate one and add it.
					//but if there already is something there, we gotta remove it to prevent 1) duplicated videos and 2) a toggle effect when pressing the play button
					if(existing_embed === null){

						//behaviour for autoplay:
						//because we want to stop one video when a user opens another one, we run this loop to check for any other open videos.
						//if we find one, we remove it.
						//the reason this code looks so similar to the top level loop is because it's exactly the same!
						list_items.forEach(function(item){
							var other_embed = item.querySelector(".metadata .video_container");
							if(other_embed !== null){
								removeElement(other_embed);
							}
						});

						//this code is what we use to generate a video.
						var video_container = generateVideo(video_id);
						item.querySelector(".metadata").appendChild(video_container);
					} else {
						removeElement(existing_embed);
					}
				});

				//finally we add the play icon to the far left of the respective header.
				var header = item.querySelector("h5");
				//this is basically what jQuery prepend does:
				header.insertBefore(play_button, header.firstChild);
			}
		}
	});
})();