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

class Rss_Model_Feed extends Core_Model_Default {

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

All paths returned by these two functions can contains tokens which will be replaced as the following :

`%DEVICE_UID%` : the current device UID

`%CUSTOMER_ID%` : the currently logged in customer ID

## Client Side ##

Any client request needing to be cached or served from cache should use the new `$sbhttp` factory. All standard function of `$http` are replicated inside `$sbhttp`. You can use all of the shortcuts methods (i.e.: `get`, `post`...) as well as the full method `$sbhttp(options)`. 

**Only GET requests are cached.**

### $pwaRequest

When making requests with `$pwaRequest` you can provide a `cache` option :

```js
// On GET requests cache defaults to true
$pwaRequest.get("/mymodule/mobile_view/myaction", {
    urlParams: {
        valueId: valueId
    },
    cache: true // if true, will cache request if online, will serve from cache if offline
});


// POST requests always have cache set to false
$pwaRequest.post("/mymodule/mobile_view/myaction", {
    urlParams: {
        valueId: valueId
    },
    data: {
        myObject: {}
    }
});
```