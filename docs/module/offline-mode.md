# Offline Mode #

[Edit this on Github](https://github.com/Xtraball/SiberianCMS-Doc/edit/master/docs/module/offline-mode.md)

**Offline mode solely concerns mobile features modules.** If your feature doesn't require real time interaction with a server and can work without network access, the following guide will help you through the process of making your feature accessible in offline mode.

## Server side ##

To begin with offline mode, you must tell Siberian if your module fully support offline mode or if the user experience will be downgraded. Partial support examples are : full content available but no interaction (comments or likes) in offline mode, venues information but no map view capability in offline mode, and such.


Offline support must be declared inside the main model of your feature. This is the model set on the `model` attribute when you call `Siberian_Feature::install`.

Example :

**mymodule/resources/db/data/mymodule.php**

```php
<?php

use Siberian\Feature;

Feature::install("general", [
    // ...
    "model" => "MyModule_Model_MyModule",
    // ...
], ["code"]);

```

In this example our main model is `MyModule_Model_MyModule`. We need to override some functions inside the model to define the offline mode support range and what should be downloaded on client side at runtime.


**mymodule/Model/MyModule.php**

```php
<?php

class MyModule_Model_MyModule extends Core_Model_Default {

     // ...

     /**
     *
     * return "full", "partial" or "none" to set the 
     * level of offline support for this feature
     *
     * @return string full,none,partial
     */
    public function availableOffline() 
    {
        return "full";
    }

     /**
     *
     * return a array of URL that will be called by XHR on client side,
     * and should be cached for offline mode support.
     * 
     * URLs can be absolute, or relative.
     *
     * Relative URL will use siberian main domain root URL as base URL.
     * 
     * e.g. :
     * "/app_key/mymodule/mobile_view/findall"
     * will become
     * "https://mysiberian.com/app_key/my/module/mobile_view/findall"
     *
     * @return string[]
     */
    public function getFeaturePaths($option_value) 
    {
        return [];
    }

     /**
     *
     * return a array of URL that will be used as assets on client
     * side (src attributes in HTML tags, and such), and should be
     * cached for offline mode support.
     * 
     * URLs can be absolute, or relative.
     *
     * Relative URL will use siberian main domain root URL as base URL.
     * 
     * e.g. :
     * "/images/myimage.jpg"
     * will become
     * "https://mysiberian.com/images/myimage.jpg"
     *
     * @return string[]
     */
    public function getAssetsPaths($option_value) 
    {
        return [];
    }

     // ...

}
```

Paths are only collected for features whose model returns `true` from `isCacheable()` (the `$_is_cacheable` property of `Core_Model_Default`, `false` by default), so set `protected $_is_cacheable = true;` in your model. Relative paths are prefixed with the application base URL. The default `availableOffline()` returns "full" if the model is cacheable, "none" otherwise.

All paths returned by these two functions can contains tokens which will be replaced as the following :

`%DEVICE_UID%` : the current device UID

`%CUSTOMER_ID%` : the currently logged in customer ID

Note: in trunk, only the Topic module uses the `%DEVICE_UID%` token and no server-side replacement was found in the repository, so check that the token is replaced for your case before relying on these.


## Client Side ##

Client requests needing to be cached or served from cache should use the `$pwaRequest` provider (see below). `$sbhttp` still exists but only as a backward compatibility layer for pre 5.0 modules, do not use it in new code.

**Only GET requests are cached by `$sbhttp`.**

### $pwaRequest

When making requests with `$pwaRequest` you can provide a `cache` option :

```js
// On GET requests cache defaults to true (false in the app editor overview)
$pwaRequest.get("/mymodule/mobile_view/myaction", {
    urlParams: {
        valueId: valueId
    },
    cache: true // if true, will cache request if online, will serve from cache if offline
});


// POST requests are not meant to be served from cache, set cache: false explicitly
$pwaRequest.post("/mymodule/mobile_view/myaction", {
    urlParams: {
        valueId: valueId
    },
    cache: false,
    data: {
        myObject: {}
    }
});
```