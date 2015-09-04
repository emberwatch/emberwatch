---
title: Event handling and data binding
section: Cookbook
cookbook-section: Event Handling and Data Binding
layout: cookbook-recipe
index: true
---
### <span class="section-label">Section:</span> {{ page.cookbook-section }}

Here are some recipes for managing events and dealing with bindings.

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
