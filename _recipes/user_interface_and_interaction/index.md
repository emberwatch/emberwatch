---
title: User Interface and Interaction
section: Cookbook
cookbook-section: User Interface and Interaction
layout: cookbook-recipe
index: true
---
### <span class="section-label">Section:</span> {{ page.cookbook-section }}

Here are some recipes that will help you provide a better user experience.

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
