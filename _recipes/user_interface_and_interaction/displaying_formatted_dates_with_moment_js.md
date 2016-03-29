---
title: Displaying formatted dates with momentjs
section: Cookbook
cookbook-section: User Interface and Interaction
layout: cookbook-recipe
---
<span class="recipe-label">Recipe:</span>

### {{ page.title }}
-----

#### Problem

Display JavaScript Date objects in human readable format.

#### Solution

There are two ways of formatting the value:

1. Create a Handlebars helper {% raw %}`{{format-date}}`{% endraw %} and use it in your template
2. Create a computed property `formattedDate` that will return a transformed date

We will use [Moment.js](http://momentjs.com) for formatting dates.

Let's look at a simple example. You're working on a website for your
client, and one of the requirements is to have the current date on the index page in human readable format. This is a perfect place to use a
Handlebars helper that "pretty prints" the current date:

`app/helpers/current-date.js`
{% highlight js %}
export default Ember.Handlebars.makeBoundHelper(function() {
  return moment().format('LL');
});
{% endhighlight %}

Your template will look like:

{% highlight html %}
Today's date: {{current-date}}  // Today's date: August 30 2013
{% endhighlight %}

You can even enhance your code and pass in the date format to the helper:

`app/routes/application.js`
{% highlight js %}
Ember.Handlebars.registerBoundHelper('currentDate', function(format) {
  return moment().format(format);
});
export default Ember.Route.extend({
});
{% endhighlight %}

Now you would need to pass an additional parameter to the helper:

{% highlight html %}
{% raw %}
Today's date: {{current-date 'LL'}}  // Today's date: August 30 2013
{% endraw %}
{% endhighlight %}

Let's look at another example. Say you need
to create a simple control that allows you to type in a date and
a date format. The date will be formatted accordingly.

Define `formattedDate` computed property that depends on
`date` and `format`. Computed property in this example does
the same thing as Handlebars helpers defined above.

`app/controllers/application.js`
{% highlight js %}
export default Ember.Controller.extend({
  format: "YYYYMMDD",
  date: null,
  formattedDate: Ember.computed('date', 'format', function() {
    var date = this.get('date'),
        format = this.get('format');
    return moment(date).format(format);
  })
});
{% endhighlight %}

`/app/templates/application.hbs`
{% highlight html %}
{% raw %}
{{input value=date}}
{{input value=format}}
<div>{{formattedDate}}</div>
{% endraw %}
{% endhighlight %}

#### Discussion

Both helper and computed property can format your date value.
Which one do I use and when?

Handlebars helpers are shorthand for cases where you want to format
a value specifically for presentation. That value may be used
across different models and controllers.

You can use {% raw %}`{{current-date}}`{% endraw %} across your application to format dates
without making any changes to controllers.

Computed property in the example above does the same thing as the
Handlebars helper with one big difference:
`formattedDate` can be consumed later without applying
date format on the date property again.

<!---#### Example
<a class="jsbin-embed" href="http://jsbin.com/nipujoneqe/1/embed?live">JS Bin</a>-->
