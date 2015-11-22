---
title: Specifying data driven areas of templates that do not need to update
section: Cookbook
cookbook-section: User Interface and Interaction
layout: cookbook-recipe
---
<span class="recipe-label">Recipe:</span>
## {{ page.title }}
-----
### Problem
You have a section of a template that is based on a data but you don't need the template to update

### Solution
Use the {% raw %}`{{unbound}}`{% endraw %} Handlebars helper.

{% highlight html %}
{% raw %}
{{unbound firstName}}
{{lastName}}
{% endraw %}
{% endhighlight %}

### Discussion
By default all uses of Handlebars helpers in Ember.js will use data bound values that will automatically update
the section of the template where a property changes after initial rendering.  Ember.Handlebars does this by
applying the {% raw %}`{{bind}}`{% endraw %} helper automatically for you.

For example, the two following uses of Handlebars are identical in an Ember.js application:

{% highlight html %}
{% raw %}
{{lastName}}
{{bind lastName}}
{% endraw %}
{% endhighlight %}


If you know that a property accessed in Handlebars will not change for the duration of the application's
life, you can specify that the property is not bound by applying the {% raw %}`{{unbound}}`{% endraw %} helper. A property
that is not bound will avoid adding unnecessary observers on a property.

<!---#### Example
<a class="jsbin-embed" href="http://jsbin.com/sazomoceza/15/edit?output">JS Bin</a>-->
