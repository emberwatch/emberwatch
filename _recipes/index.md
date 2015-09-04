---
title: Introduction
section: Cookbook
layout: cookbook-recipe
index: true
---
# Welcome to the Ember.js Cookbook!
The Cookbook provides answers and solutions
to common Ember questions and problems. Anyone is welcome to [contribute](./contributing/).

Here are all of the available recipes:

{% for section in site.data.cookbook-sections %}
#### {{ section.name }}
<ol>
{% for recipe in site.data.cookbook-recipes %}
{% if recipe.section_id == section.id %}
<li><a href="/recipes/{{ section.section-path }}/{{ recipe.recipe-file }}.html">{{ recipe.name }}</a></li>
{% endif %}
{% endfor %}
</ol>
{% endfor %}

If you would like to see more recipes, take a look at the [Suggesting A Recipe](./contributing/suggesting_a_recipe.html) section.
