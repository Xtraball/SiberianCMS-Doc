# App Hooks

[Edit this on Github](https://github.com/Xtraball/SiberianCMS-Doc/edit/master/docs/module/hooks/app.md)

Available from 4.16.0

#### app.init.read

This trigger gets called when the app init payload is done, you can alter it when needed.

Notes:
 - App init is the first call made on app start, it's very important to keep it fast!
 - Altering this payload can completely break the Application start!

```php
<?php

use Siberian\Hook;

/**
 * Payload
 */
$data = [
    "cssBlock" => $cssBlock,
    "loadBlock" => $loadBlock,
    "featureBlock" => $featureBlock,
    "translationBlock" => $translationBlock,
    "manifestBlock" => $manifestBlock,
];

/**
 * Listener (generally in your init.php)
 */
Hook::listen(
    'app.init.read',
    'Listening app init ready',
    function ($payload) {
        // Your stuff here!
        
        // Must return payload here
        return $payload; 
    },
    0
);
```

**Hook payload details**

key|details
---|---
cssBlock|App specific pre-compiled CSS 
loadBlock|all the application settings
featureBlock|all the app features
translationBlock|array key/values with all the available translations for this app
manifestBlock|webapp json manifest values, icon, name, start url
---

#### mobile.controller.init

Called when the mobile app controller is ready, and have Application, Session & Request elements!

```php
<?php

use Siberian\Hook;

Hook::listen(
    'mobile.controller.init',
    'Listening Mobile controller ready',
    function ($payload) {
        // Your stuff
        
        // No need to the return the payload, it's only a context
    },
    0
);
```

**Hook payload details**

key|details
---|---
application|The application object
request|Current request object
session|The current session, to access user, etc ...

---
