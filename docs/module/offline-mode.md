# Offline Mode #

**Offline mode solely concerns mobile features modules.** If your feature doesn't require real time interaction with a server and can work without network access, the following guide will help you through the process of making your feature accessible in offline mode.

## Server side ##

To begin with offline mode, you must tell Siberian if your module fully support offline mode or if the user experience will be downgraded. Partial support examples are : full content available but no interaction (comments or likes) in offline mode, venues informations but no map view capability in offline mode, and such.


Offline support must be declared inside the main model of your feature. This is the model set on the `model` attribute when you call `Siberian_Feature::install`.

Example :

**mymodule/resources/db/data/mymodule.php**

```php
Siberian_Feature::install("general", array(
    // ...
    "model" => "MyModule_Model_MyModule",
    // ...
), array('code'));

```

In this example our main model is `MyModule_Model_MyModule`. We need to override some functions inside the model to define the offline mode support range and what should be downloaded on client side at runtime.


**mymodule/Model/MyModule.php**

```php
class Rss_Model_Feed extends Core_Model_Default {

     // ...

     /**
     *
     * return "full", "partial" or "none" to set the 
     * level of offline support for this feature
     *
     * @return string full,none,partial
     */
    public function availableOffline() {
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
    public function getFeaturePaths($option_value) {
        return array();
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
    public function getAssetsPaths($option_value) {
        return array();
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

### Provider settings ###

Any `$httpProvider` settings and customisation should still be done on `$httpProvider`.

`$sbhttpProvider` provides some settings to control cache, and logging : 

-----

`$sbhttpProvider.alwaysCache` *default: false*

If set to true, all requests will be cached unless specified otherwise. You can override this setting by specifying a `cache` option per request in the same way `$http` permits it.

-----

`$sbhttpProvider.neverCache` *default: false*

If set to false, all requests will **NOT** be cached unless specified otherwise. You can override this setting by specifying a `cache` option per request in the same way `$http` permits it.
* If `alwaysCache` is set to `true`, `alwaysCache` has priority

-----

### `$sbhttp` cache option ###

When making requests with `$sbhttp` you can provide a `cache` option :

```js

$sbhttp({
    method: "GET",
    url: "http://mydomain.com/app_key/mymodule/mobile_view/myaction",
    cache: true // if true, will cache request if online, will serve from cache if offline
});

// or 
$sbhttp.get("http://mydomain.com/app_key/mymodule/mobile_view/myaction", { cache: true });

```

Usage is cheesecake : if `cache` option is *truthy*, all data fetched from server will be cached for this URL, if the application cannot access the internet or the server (no response at all), all data will be served from cache. If `cache` is *falsy* all data will always be fetched from the remote server, and no cache will be used at all.

In most cases you will use the `cache` option as following : all GET request specified in the `getFeaturePaths` PHP function should be called with `{ cache: true }` if you want to have results from cache when offline or when the server is down.

Some rare variations could be : 

`{ cache: !$rootScope.isOverview }` : if you want to prevent any cached data to be served from the Siberian editor overview
`{ cache: $rootScope.isOffline }` : if you want cached data to be served *ONLY* when app has been confirmed to be offline (server down, or internet access down)

#### A note on assets ####

Most of the time, you'll have nothing to do for assets to load in offline mode. All URLs returned from `getAssetsPaths` server side functions are automatically cached by the application and served from cache when the app is offline.

However, if you need to cache an asset on the client side manually, you can use the function `cacheURL(url)` in the `$sbhttp` factory. 
`$sbhttp.cacheURL(url)` returns a promise resolved when assets has been successfully cached, and rejected if any error occured. (i.e. 4xx or 5xx HTTP code)
