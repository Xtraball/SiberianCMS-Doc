# Push

[Edit this on Github](https://github.com/Xtraball/SiberianCMS-Doc/edit/master/docs/api/push.md)

---

## List

### Description

Fetch all the applications available for sending Push notifications.

```php
<?php

$endpoint = "http://www.domain.com/push/api_global/list"
```

### Request

Param|Type|Details|Default
-----|----|-------|-------
all|int|Set all to 1 to fetch all aplications|1
admin_id|int|If admin_id is set, applications will be filtered for this Admin|

### Response

```json
{
    "success": true,
    "applications": [
        {
            "app_id": "1",
            "name": "JohnTheApp",
            "key": "57c7f8764a65a",
            "bundle_id": "dev.siberiancms.www.app57c7f8764a65a",
            "package_name": "dev.siberiancms.www.app57c7f8764a65a",
            "admin_id": "1"
        },
        {
            "app_id": "5",
            "name": "NoOffline",
            "key": "57da629f6ce8f",
            "bundle_id": "dev.siberiancms.www.app57da629f6ce8f",
            "package_name": "dev.siberiancms.www.app57da629f6ce8f",
            "admin_id": "1"
        }
    ]
}
```

Param|Type|Details|Default
-----|----|-------|-------
success/error|int|Indicate whether there was an error during the process|1
applications|array|The complete list of available applications|

---

## Send

### Description

Sends a global push notification.

```php
<?php

$endpoint = "http://www.domain.com/push/api_global/send"
```

### Request

Param|Version|Type|Details|Default
-----|----|-------|-------
title *|4.13+|string|Push title|
message *|4.13+|string|Push message|
checked|4.13+|array|array of the applications to send push to|
send_to_all|4.13+|int|Set to 1 to send to all applications|
devices|4.13+|string|`all`, `android`, `ios`|all
open_url|4.13+|int|If set to 1 url will be opened in app|
url|4.13+|string|Along with `open_url` set to 1, the url to open|
cover|4.14+|string|base64 encoded image to display as a cover, must be png or jpg|

**\* Required fields**

#### Success - Example

```json
{
    "success": 1
}
```

### Response

Param|Type|Details|Default
-----|----|-------|-------
success/error|int|Indicate whether there was an error during the process|1

---
