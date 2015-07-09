---
layout: default
---
<div class="video_page">
	<section class="details">
		<h1>{{page.title}}</h1>
		<h2>
			{% for person_id in page.author_ids %}
				{% include people.html %}
			{% endfor %}
		</h2>
	</section>
	<section class="video">
		{% if page.video_provider == "youtube" %}
			<div class="video_container">
				<iframe src="http://youtube.com/embed/{{ page.video_id }}?showinfo=0&autohide=1" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
			</div>
		{% endif %}
		{% if page.video_provider == "vimeo" %}
			<div class="video_container">
				<iframe src="https://player.vimeo.com/video/{{ page.video_id }}" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
			</div>
		{% endif %}
	</section>

	{% if page.slides_format == "pdf" %}
		<section class="slides">
			<button ontouchstart>Toggle slides</button>
			
			<div class="slides_container pdf">
				<object data="{{ page.slides_url }}#view=FitH" type="application/pdf"></object>
			</div>
		</section>
	{% endif %}

	{% if page.slides_format == "speakerdeck" %}
		<section class="slides">
			<button ontouchstart>Toggle slides</button>
			
			<div class="slides_container speakerdeck">
				<script async class="speakerdeck-embed" data-id="{{ page.slides_id }}" data-ratio="1.33333333333333" src="//speakerdeck.com/assets/embed.js"></script>
			</div>
		</section>
	{% endif %}

	{% if page.slides_format == "slideshare" %}
		<section class="slides">
			<button ontouchstart>Toggle slides</button>
			
			<div class="slides_container slideshare">
				<iframe src="//www.slideshare.net/slideshow/embed_code/key/{{ page.slides_id }}" webkitallowfullscreen mozallowfullscreen allowfullscreen> </iframe>
			</div>
		</section>
	{% endif %}

</div>

{{content}}