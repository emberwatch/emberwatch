---
title: Ember Data
section: Cookbook
cookbook-section: Ember Data
layout: cookbook-recipe
index: true
---
### <span class="section-label">Section:</span> {{ page.cookbook-section }}

Ember Data recipes:

<ol>
{% for section in site.data.cookbook-sections %}
  {% if page.cookbook-section == section.name %}
    {% for recipe_id in section.recipe_ids %}
      {% for recipe in site.data.cookbook-recipes %}
        {% if recipe_id == recipe.id %}
          <li><a href="/recipes/{{section.section-path}}/{{ recipe.recipe-file }}.html">{{ recipe.name }}</a></li>
        {% endif %}
      {% endfor %}
    {% endfor %}
  {% endif %}
{% endfor %}
</ol>
