---
title: Watching the browser for resize
section: Cookbook
cookbook-section: Event Handling and Data Binding
layout: cookbook-recipe
---
<span class="recipe-label">Recipe:</span>

### {{ page.title }}
-----

#### Problem
You want to have logic in your application that responds to browser resizing that matches your CSS media queries.

#### Solution
Use a service to watch for the resize event and set variables that can be accessed throughout your application.

`app/services/resolution.js`
{% highlight js %}
export default Ember.Service.extend({
    desktopBreakpoint: 960,
    tabletBreakpoint: 600,
    isDesktop: false,
    isTablet: false,
    isMobile: true,
    init: function(){
        var self = this;
        self.environmentCheck(); //Call to set environment variables at application start
        Ember.$(window).resize(function(){
            Ember.run.debounce(self, self.environmentCheck, 1000);
        });
    },
    environmentCheck: function(){
        var self = this;
        var desktopSize = self.get('desktopBreakpoint');
        var tabletSize = self.get('tabletBreakpoint');
        if (window.matchMedia("(min-width: "+desktopSize+"px").matches) {
            self.set('isDesktop', true);
            self.set('isTablet', false);
            self.set('isMobile', false);
        }
        else if (window.matchMedia("(min-width: "+tabletSize+"px) and (max-width: "+desktopSize+"px)").matches) {
            self.set('isDesktop', false);
            self.set('isTablet', true);
            self.set('isMobile', false);
        }
        else {
            self.set('isDesktop', false);
            self.set('isTablet', false);
            self.set('isMobile', true);
        }
    }
});
{% endhighlight %}


`app/initializers/resolution-service.js`
{% highlight js %}
import Resolution from '../services/resolution'
export function initialize(container, application) {
    application.register('resolution:main', Resolution, { singleton: true });
    application.inject('component', 'Resolution', 'service:resolution');
    application.inject('controller', 'Resolution', 'service:resolution');
}
export default {
    name: 'resolution-service',
    initialize: initialize
};
{% endhighlight %}

Now you can access `Resolution` from inside your templates, controllers, and components

From within a template:
{% highlight html %}
{% raw %}
{{#if Resolution.isDesktop}} ... {{/if}}
{% endraw %}
{% endhighlight %}

From within a controller or component
{% highlight js %}
if (this.Resolution.isDesktop){ ... }
{% endhighlight %}

#### Discussion
Ember.js can inject [services](http://guides.emberjs.com/v2.0.0/services/) where needed. In this example we are injecting `Resolution` to our components and controllers. This will allow us to have logic based on resolution (ex. rendering a graph only on desktop). We are using [matchmedia](http://caniuse.com/#feat=matchmedia) which supports everything upwards of IE 9. This approach will follow your CSS media queries where something like `$(window).width` will not. By debouncing the resize event this will increase performance by only calling `environmentCheck` once after one second from the last resize event. If you absolutely need to support IE you can check out [Modernizr's mq()](http://modernizr.com/docs/#mq).

If you need to have logic for `mobile and tablet` or `tablet and desktop` you could easily add a [computed property](http://guides.emberjs.com/v2.0.0/object-model/computed-properties/) based on `isMobile`, `isTablet`, and `isDesktop`
