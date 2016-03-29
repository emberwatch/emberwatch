---
title: Setting multiple properties at once
section: Cookbook
cookbook-section: Working with Objects
layout: cookbook-recipe
---
<span class="recipe-label">Recipe:</span>

### {{ page.title }}
-----

#### Problem
You want to set multiple properties on an object with a single method call.

#### Solution
Use the `setProperties` method of `Ember.Object`.

```js
person.setProperties({
  name: 'Gavin',
  age: 36
})
```

<!---#### Example
<a class="jsbin-embed" href="http://jsbin.com/wukapotoyi/3/edit?live">JS Bin</a>-->
