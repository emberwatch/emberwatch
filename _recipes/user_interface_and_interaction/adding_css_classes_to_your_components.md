---
title: Adding CSS classes to your components
section: Cookbook
cookbook-section: User Interface and Interaction
layout: cookbook-recipe
---
<span class="recipe-label">Recipe:</span>
## {{ page.title }}
-----
### Problem

You want to add CSS class names to your Ember Components.

### Solution

Set additional class names with the `classNames` property of subclassed components:

`app/components/awesome-input.js`
{% highlight js %}
export default Ember.Component.extend({
  classNames: ['css-framework-fancy-class']  
});
{% endhighlight %}

{% highlight html %}
{% raw %}
{{awesome-input}}
{% endraw %}
{% endhighlight %}

{% highlight html %}
{% raw %}
<div class="css-framework-fancy-class"></div>
{% endraw %}
{% endhighlight %}

### Discussion

If desired, you can apply multiple class names.

{% highlight js %}
classNames: ['bold', 'italic', 'blue']
{% endhighlight %}

<!---#### Example
<a class="jsbin-embed" href="http://jsbin.com/gihupoqeja/2/embed?live">JS Bin</a>
See [Customizing a Component's Element](../../components/customizing-a-components-element/) for further examples. -->
