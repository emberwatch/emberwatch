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

	{% if page.slides_url %}
		<section class="slides">
			<button ontouchstart>Toggle slides</button>

			<div class="slides_container">
				<a class="embedly-card" href="{{ page.slides_url }}"></a>
				<script async src="//cdn.embedly.com/widgets/platform.js" charset="UTF-8"></script>
			</div>
		</section>
	{% endif %}

</div>

{{content}}
