# System Hooks

Hooks fired by the core when push messages are built, an SSL certificate changes or a cache is cleared. Register listeners in your `init.php`, and always return the payload (see [Hooks](../hooks)).

#### push.message.ios.parsed

Fired once the iOS (APNs) push message is built, right before the recipients are collected and the message is sent. You can alter the message (for example add custom data).

```php
<?php

use Siberian\Hook;

/**
 * Payload
 */
$data = [
    "message" => $message,
    "application" => $application,
];

/**
 * Listener (generally in your init.php)
 */
Hook::listen(
    'push.message.ios.parsed',
    'My module ios push',
    function ($payload) {
        $message = $payload['message'];
        // Alter the message here

        // Must return the payload, the core reads $payload['message'] afterwards
        return $payload;
    },
    0
);
```

**Hook payload details**

key|details
---|---
message|the `Apns2Message` about to be sent (the `aps` object is already filled)
application|the `Application_Model_Application` the push is sent for

---

#### push.message.android.parsed

Fired once the Android (OneSignal) notification is built, with its sound, priority and targets (or location filter) set. You can alter the notification.

```php
<?php

use Siberian\Hook;

/**
 * Payload
 */
$data = [
    "notification" => $notification,
    "application" => $application,
];

/**
 * Listener (generally in your init.php)
 */
Hook::listen(
    'push.message.android.parsed',
    'My module android push',
    function ($payload) {
        $notification = $payload['notification'];
        // Alter the notification here

        // Must return the payload, the core reads $payload['notification'] afterwards
        return $payload;
    },
    0
);
```

**Hook payload details**

key|details
---|---
notification|the `\onesignal\client\model\Notification` about to be sent
application|the application the push is sent for

Notes:
 - If a listener does not return the payload, the next listeners and the core get `null` and the push may fail, always return it.

---

#### ssl.certificate.update

Fired after an SSL certificate was saved from the back-office SSL settings (including when a Let's Encrypt certificate was generated successfully). Use it for example to reload a web server or copy the files.

```php
<?php

use Siberian\Hook;

/**
 * Payload
 */
$data = [
    "certificate" => $certificate,
];

/**
 * Listener (generally in your init.php)
 */
Hook::listen(
    'ssl.certificate.update',
    'My module ssl update',
    function ($payload) {
        $certificate = $payload['certificate'];
        // React to the new certificate here

        return $payload;
    },
    0
);
```

**Hook payload details**

key|details
---|---
certificate|the `System_Model_SslCertificates` record that was saved

---

#### cache.clear.*

Fired after the core cleared a folder of `var/`. There is one hook per target, the hooks are triggered without payload (listeners receive `null`).

hook|fired after clearing
---|---
cache.clear.cache|`var/cache`
cache.clear.cache_images|`var/cache_images`
cache.clear.log|`var/log` (the `android_pwd` files are kept)
cache.clear.locks|the `*.lock` files of `var/tmp` (all of them, or only the named ones)
cache.clear.tmp|`var/tmp`

```php
<?php

use Siberian\Hook;

/**
 * Listener (generally in your init.php)
 */
Hook::listen(
    'cache.clear.cache',
    'My module cache clear',
    function ($payload) {
        // Rebuild your own cache here

        return $payload;
    },
    0
);
```

Note: the core itself listens to `cache.clear.cache` to trigger the cron run.
