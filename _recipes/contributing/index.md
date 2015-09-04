---
title: Contributing
section: Cookbook
cookbook-section: Contributing
layout: cookbook-recipe
index: true
---
### <span class="section-label">Section:</span> {{ page.cookbook-section }}

The Ember Cookbook provides answers and solutions to common Ember questions and problems. Anyone is welcome to
[contribute](understanding_the_cookbook_format.html).

If you are new to Ember, we recommend that you spend some time reading the guides and tutorials before coming
to the Cookbook. Cookbook recipes assume that you have a basic understanding of Ember's concepts.

If you have experience with Ember and would like to contribute to the Cookbook, the discussion section of each
recipe is a great place to start.

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
