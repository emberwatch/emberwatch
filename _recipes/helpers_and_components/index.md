---
title: Helpers and components
section: Cookbook
cookbook-section: Helpers and Components
layout: cookbook-recipe
index: true
---
### <span class="section-label">Section:</span> {{ page.cookbook-section }}

Here are some recipes to help you encapsulate your code into Components and build Helpers.

<ol>
{% for section in site.data.cookbook-sections %}
  {% if page.cookbook-section == section.name %}
    {% for recipe_id in section.recipe_ids %}
      {% for recipe in site.data.cookbook-recipes %}
        {% if recipe_id == recipe.id %}
          <li><a href="{{ recipe.recipe-file }}.html">{{ recipe.name }}</a></li>
        {% endif %}
      {% endfor %}
    {% endfor %}
  {% endif %}
{% endfor %}
</ol>
