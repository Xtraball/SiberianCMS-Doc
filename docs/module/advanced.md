# Advanced usage 

[Improve this doc](https://github.com/Xtraball/SiberianCMS-Doc/blob/master/docs/module/advanced.md)

## Ionic code

Everything you need to organize, style & interact with your Feature in the native apps is located in the `var` folder

Files are merged at install/update `var/apps/browser` for the Overview & HTML5 App.

For the native apps, files are merged only when downloading source code, or generating the APK:

* The `CSS` & `JS` files are automatically appended to the index.html

* The `templates`  & `images` are copied into the source code, so path's are relative to it [example](#controller-example)

```raw
ModuleName
├─ [...]
├─ resources
│  └─ var
│     └─ apps
│        ├─ css
│        │  └─ job.css
│        ├─ js
│        │  ├─ job.js
│        │  ├─ controllers
│        │  │  └─ job.js
│        │  ├─ services
│        │  │  └─ job.js
│        │  ├─ factory
│        │  │  └─ [...]
│        │  └─ directives
│        │     └─ [...]
│        ├─ img
│        │  ├─ company.png
│        │  └─ job.png
│        └─ templates
│           └─ job
│              └─ l1
│                 └─ view.html
└─ [...]
```

### Controller example

```raw
App.config(function($stateProvider) {

    $stateProvider.state('job-view', {
        url: BASE_PATH+"/job/mobile_view/index/value_id/:value_id",
        controller: 'JobController',
        templateUrl: "templates/job/l1/view.html"
    });
    
}).controller('BookingController', function($rootScope[...]

```

The part `templateUrl: "templates/job/l1/view.html"` concerns our template `app/local/modules/Job/resources/var/apps/templates/job/l1/view.html`, we only keep the relative part of the path. 

## Bootstrap

If your module require some advanced configuration & tweaks, you may consider using the module bootstrapper.

Basically it's a file named `bootstrap.php` at the root of your package, below an example:

**Note: as the bootstrap file is run at every request, please consider making it as light as possible and error free**

```raw
<?php

class ModuleName_Bootstrap {

    public static function init($bootstrap) {
        # Do whatever you need
        # 1. copy a custom library
        # 2. link some files
        # 3. etc ...
    }
}
```

`ModuleName` should respect your module name case.

`$bootstrap` is a reference to the Zend Bootstrap if you need to hook it.