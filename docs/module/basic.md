# Basic usage 

[Edit this on Github](https://github.com/Xtraball/SiberianCMS-Doc/edit/master/docs/module/basic.md)

## Ionic code

Everything you need to organize, style & interact with your Feature in the native apps is located in the `var` folder

Assets are merged on install & updates with the `init.php` see [register assets](#register-assets)

You must place your files in a `modules/yourmodule` folder, here `modules/job`.

```raw
ModuleName
├─ [...]
├─ resources
│  └─ var
│     └─ apps
│        └─ modules
│           └─ job
│              ├─ styles
│              │  └─ job.css
│              ├─ controllers
│              │  └─ job.js
│              ├─ services
│              │  └─ job.js
│              ├─ factory
│              │  └─ job.js
│              ├─ directives
│              │  └─ job.js
│              ├─ img
│              │  ├─ company.png
│              │  └─ job.png
│              └─ templates
│                 └─ l1
│                    └─ view.html
└─ [...]
```

### Controller example

```raw
App.config(function($stateProvider) {

    $stateProvider.state('job-view', {
        url: BASE_PATH+"/job/mobile_view/index/value_id/:value_id",
        controller: 'JobController',
        templateUrl: "modules/job/templates/l1/view.html"
    });
    
}).controller('JobController', function($rootScope[...]
```

The part `templateUrl: "modules/job/templates/l1/view.html"` concerns our template `app/local/modules/Job/resources/var/apps/modules/job/templates/l1/view.html`, we only keep the part of the path after `resources/var/apps/`. 

## Bootstrap

**Note: the `bootstrap.php` file is deprecated, see the Init section below for the new flavor. It is still loaded, but only when the module has no `init.php`: if both exist, `init.php` wins and `bootstrap.php` is not run.**

Basically it's a file named `bootstrap.php` at the root of your package, below an example:

```php
<?php
/**
 * @deprecated from Siberian 5.0, see Init.
 */
class ModuleName_Bootstrap {

    public static function init($bootstrap) {
        # Your assets, options, etc ...
    }
}
```

`ModuleName` should respect your module name case.

`$bootstrap` is a reference to the Zend Bootstrap if you need to hook it.

## Init

**The new init syntax is available from Siberian 4.12.0, this new syntax avoids conflicts with already exisiting bootstrap classes**

The file `init.php` is used to hook & register the layout files into Siberian & update assets.

It must define a `$init` closure: a file that does not define one runs nothing (and never runs the closure of another module). Exceptions thrown in it are caught and logged as a warning, they do not stop Siberian.

However the syntax & methods used inside **Init** remains the same as with the older bootstrap files.

```php
<?php

$init = function($bootstrap) {
    # Your assets, options, etc ...
};
```

`$bootstrap` is a reference to the Zend Bootstrap if you need to hook it.

### Register assets

```php
<?php
/**
 * Register the Assets path, to be copied in native apps/overview
 * The second argument is required: it is the "var/apps" folder of your module.
 */
Siberian_Assets::registerAssets("Job", "/app/local/modules/Job/resources/var/apps/");

/** Register javascripts to be loaded by the ionic apps */
Siberian_Assets::addJavascripts(array(
  "modules/job/controllers/job.js",
  "modules/job/factories/job.js",
));

/** Register stylesheets to be loaded by the ionic apps */
Siberian_Assets::addStylesheets(array(
  "modules/job/css/styles.css",
));
```
