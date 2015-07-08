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
				<iframe src="http://youtube.com/embed/{{ page.video_id }}?showinfo=0&autohide=1"></iframe>
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

</div>

{{content}}
