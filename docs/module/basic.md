# Basic usage 

[Improve this doc](https://github.com/Xtraball/SiberianCMS-Doc/blob/master/docs/module/basic.md)

## Ionic code

Everything you need to organize, style & interact with your Feature in the native apps is located in the `var` folder

Assets are merged on install & updates with the `bootstrap.php` see [register assets](#register-assets)

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

The part `templateUrl: "templates/job/l1/view.html"` concerns our template `app/local/modules/Job/resources/var/apps/templates/job/l1/view.html`, we only keep the relative part of the path. 

## Bootstrap

Basically it's a file named `bootstrap.php` at the root of your package, below an example:

**Note: Consider making this file as light as possible and error free**

```php
<?php

class ModuleName_Bootstrap {

    public static function init($bootstrap) {

    }
}
```

`ModuleName` should respect your module name case.

`$bootstrap` is a reference to the Zend Bootstrap if you need to hook it.

### Register assets

```php

/** Register the Assets path, to be copied in native apps/overview */
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
