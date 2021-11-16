# Editor admin hooks

[Edit this on Github](https://github.com/Xtraball/SiberianCMS-Doc/edit/master/docs/module/hooks/admin.md)

Available from 4.20.26

#### admin.register

This action is called on the very start of a registration request

```php
<?php

use Siberian\Hook;

Hook::listen(
    'admin.register',
    'Listening admin register',
    static function ($payload) {
        // Your stuff!
    },
    0
);
```

**Hook payload details**

key|details
---|---
origin|The origin of the request `web` or `api`
request|The current HTTP Request

---

#### admin.register.success

Called when an admin is successfully registered

```php
<?php

use Siberian\Hook;

Hook::listen(
    'admin.register.success',
    'Listening admin registration success',
    static function ($payload) {
        // Your stuff!
    },
    0
);
```

**Hook payload details**

key|details
---|---
origin|The origin of the request `web` or `api`
adminId|Current customer Id
admin|The customer object
token|Session token

---

#### admin.register.error

When a user fails to register

```php
<?php

use Siberian\Hook;

Hook::listen(
    'admin.register.error',
    'Listening admin registration error',
    static function ($payload) {
        // Your stuff!
    },
    0
);
```

**Hook payload details**

key|details
---|---
origin|The origin of the request `web` or `api`
message|The error message

---

