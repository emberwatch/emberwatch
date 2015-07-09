//Toggle slides on expanded "talk" pages.
(function(){
	var slides = document.querySelector(".video_page section.slides");
	if(!slides) return; //not on page

	slides.querySelector("button").addEventListener("click", function(){
		slides.classList.toggle("open");
	});
})();