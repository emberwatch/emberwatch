---
title: Installing and Updating Ember
section: Cookbook
cookbook-section: Ember CLI
layout: cookbook-recipe
---
<span class="recipe-label">Recipe:</span>
## {{ page.title }}
-----
### Problem

There are instructions available for installing node, npm, bower, ember-cli, phantomjs, etc.
available as well as for updating ember-cli, ember, and other app dependencies, but they're
all in prose. There aren't any simple scripts to do this.

### Solution

Below are some scripts extracted from [bf4/frontend PR#2](https://github.com/bf4/frontend/pull/2/files).

#### Usage

Each file in `bin` should be made executable, e.g. `chmod +x bin/app`.

Each script has comments explaining usage. They are intended to be read and modified as needed.

{% highlight bash %}
# Add aliases for useful common commands
source .aliases

# Install nvm, node, npm, ember-cli, bower, phantomjs, and watchman.
# is written for a Mac OSX with homebrew but should be easy enough to modify the `install` function.
# Note that `nvm` requires modifying your `.bash_profile` as in the file comments
bin/app setup # optionally specify node version e.g.  NODE_VERSION=0.12.4 bin/app setup


# Update ember-cli, ember, and application.
bin/app update # optionally specify ember version, e.g. EMBER_VERSION=1.13.10 bin/app update
# Optionally update only Ember CLI
bin/app update cli
# Optionally update only Ember
bin/app update app
# Optionally run post-update tasks.  (There are only examples in this template.)
bin/app update post_app
{% endhighlight %}

#### The scripts

`.aliases`

{% highlight bash %}
#!/usr/bin/env bash
# https://twitter.com/rwjblue/status/536637409547808768
# When running into issues with npm/bower it's a good idea to clear out
# the cache. This is because pulled packages are still cached on the local
# system but don't exist upstream.
alias nombom='npm cache clear && bower cache clean && rm -rf node_modules bower_components && npm
install && bower install'
# https://github.com/BlakeWilliams/dotfiles/blob/668acd6e8ebbd8844422ffbd63b6ad823330a27a/.zsh/aliases.zsh#L10-L13
alias killphantom="pkill -9 -f phantomjs"
{% endhighlight %}

`bin/app`

{% highlight bash %}
#!/usr/bin/env bash
# from https://github.com/basecamp/sub/blob/acd440b/libexec/sub
set -e

resolve_link() {
  $(type -p greadlink readlink | head -1) "$1"
}

abs_dirname() {
  local cwd="$(pwd)"
  local path="$1"

  while [ -n "$path" ]; do
    cd "${path%/*}"
    local name="${path##*/}"
    path="$(resolve_link "$name" || true)"
  done

  pwd
  cd "$cwd"
}

libexec_path="$(abs_dirname "$0")"
export _APP_ROOT="$(abs_dirname "$libexec_path")"
export PATH="${libexec_path}:$PATH"
source "${_APP_ROOT}/.aliases"

command="$1"
case "$command" in
"" | "-h" | "--help" )
  exec app-help
  ;;
* )
  command_path="$(command -v "app-$command" || true)"
  if [ ! -x "$command_path" ]; then
    echo "app: no such command \`$command'" >&2
    exit 1
  fi

  shift
  exec "$command_path" "$@"
  ;;
esac
{% endhighlight %}

`bin/app-setup`

{% highlight bash %}
#!/usr/bin/env bash
# http://www.ember-cli.com/user-guide/
# Install nvm and node https://github.com/creationix/nvm
set -e

install() {
 brew install "$@" || echo "$!"
}
configure_nvm() {
  # BEGIN add to ~/.bash_profile
  nvm_sh=$(brew --prefix nvm)/nvm.sh
  if [ -f $nvm_sh ]; then
    export NVM_DIR=~/.nvm
    source $nvm_sh
  fi
  # END add to ~/.bash_profile
}
mkdir -p ~/.nvm
install nvm || echo "$!"
configure_nvm
export NODE_VERSION=${NODE_VERSION:-0.12.4}
nvm install $NODE_VERSION || echo "$!"
nvm use $NODE_VERSION --default

nvm --version  # 0.24.1
npm --version  # 2.10.1
node --version # v0.12.4

# Once you’ve installed Node, you’ll need to install the Ember CLI globally with:
npm install -g ember-cli
ember  --version # 0.2.7

# You’ll need to install Bower, a package manager that keeps your front-end dependencies (including JQuery, Ember, and QUnit) up to date. This is as easy as running:
npm install -g bower
bower --version # 1.4.7

# If you want to use PhantomJS to run your integration tests, it needs to be installed globally.
npm install -g phantomjs
phantomjs --version # 1.9.8

# If you want less-error-prone file change watching
install watchman
watchman --version # 3.1.0
{% endhighlight %}

`bin/app-update`

{% highlight bash %}
#!/usr/bin/env bash

set -e

export EMBER_VERSION="${EMBER_VERSION:-1.13.8}"

# https://github.com/ember-cli/ember-cli/releases
# http://www.jordanhawker.com/posts/128580938346
# Assumes ember version is the same as ember-cli, which may not hold true.

# Update ember-cli
update_cli() {
  npm uninstall -g ember-cli                  # Remove old global ember-cli
  npm cache clean                             # Clear NPM cache
  bower cache clean                           # Clear Bower cache
  npm install -g "ember-cli@${EMBER_VERSION}" # Install new global ember-cli
}

# Update project
update_app() {
  rm -rf node_modules bower_components dist tmp        # Delete temporary development folders.
  npm install   --save-dev "ember-cli@${EMBER_VERSION}"  # Update project's package.json to use latest version.
  npm install                                          # Reinstall NPM dependencies.
  bower install                                        # Reinstall bower dependencies.
  ember init                                           # This runs the new project blueprint on your projects directory.
            # Please follow the prompts, and review all changes
            # (tip: you can see a diff by pressing d).
            # The most common source of upgrade pain is missing changes in this step.
}

# Post install
post_update_app() {
  echo 'no post update tasks'
  # e.g.
  # npm uninstall --save ember-data
  # bower install --save ember-qunit
  # npm install --save-dev ember-cli-qunit
  # ember install mitchlloyd/ember-islands
  # ember install ember-cli-mirage
  # npm install
  # bower install
}

case "$@" in

  cli) update_cli ;;
  app) update_app ;;
  post_app) post_update_app ;;
  *)
    update_cli
    update_app
    post_update_app
  ;;

esac
{% endhighlight %}

`bin/app-help`

{% highlight bash %}
#!/usr/bin/env bash
echo $_APP_ROOT
{% endhighlight %}


### Discussion

These scripts require some amount of maintenance to be used over the long term,
but that cost should be lower than running them manually.

The given `bin/app-help` task is empty, and should be customized.

The `bin/app` task is just sugar. It may be removed so that users call e.g. `bin/app-update` directly.

The scripts assume OS X Homebrew, but should allow customization.

The scripts include comments explanining choices the author made.  Feel free to change as desired.

Enjoy!
