---
title: Contributing
layout: default
---
# Contributing to EmberWatch

EmberWatch is a community-driven resource. Anyone is welcome to contribute.
Our goal is towards a definitive community-driven, curated collection of Ember.js resources.

## Visit our repo

To begin with, visit our GitHub repository at [EmberWatch Github Repo](https://github.com/emberwatch/emberwatch) where you can create __Issues__ and __Pull Requests__.

## Ways to contribute

### Suggesting content
  - If you don't think creating a `Pull Request (PR)` is workable now, you can share some links to resources that you think would benefit the Ember.js community by creating issues.

### Raising issues

Feedback is a valuable thing for helping us know some aspects of the site that is not working as expected.

### Addressing issues

If you find issues that you want to address yourself, you can go ahead and create a `Pull Request (PR)` and submit them so can we work on having it address the issue.

### Creating PRs directly

Though creating an issue first would give us an opportunity to talk about the issue and have a means to validate that our solution in our PR would smoothly integrate into our site, It is not a requirement. You can create and submit PRs right away.

[EmberWatch Github Repo](https://github.com/emberwatch/emberwatch) contains emberwatch.com as a [Jekyll](http://jekyllrb.com) site.

#### Install Jekyll

See the official [Jekyll Installation Documentation](http://jekyllrb.com/docs/installation/) for instructions.

#### Fork the EmberWatch repo

Please refer to [GitHub Forking a Repo](https://help.github.com/articles/fork-a-repo/) for some information on how to fork a repo.

#### Clone your forked EmberWatch repo

For the sake of an example, let's just say your github username is `juancruz`. You can clone your forked EmberWatch repo locally using the commands below.

```bash
$ git clone git@github.com:juancruz/emberwatch.git
$ cd emberwatch
```

#### Run EmberWatch locally

You can now run Jekyll to run the server.

```bash
$ jekyll serve
```

You can browse the local site at `localhost:4000` in your web browser.

#### Do the necessary update for the PR

At this point you are now ready to update the files necessary for your PR. For every change in the files, Jekyll will automatically regenerate the pages which you can see on `localhost:4000`.

##### Data files

The pages are populated by YAML in the `_data` folder. People and Events are normalized and referenced by id.

You can place your **Cookbook Recipes** in `_recipes` inside the appropriate section.

The Cookbook data files are found in `_data/cookbook-recipes.yml` and `_data/cookbook-sections.yml`.
