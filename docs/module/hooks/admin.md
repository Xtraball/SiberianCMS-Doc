# Editor admin hooks

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

Called when an admin is successfully registered (the `admin` is an `Admin_Model_Admin`)

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
adminId|Current admin Id
admin|The admin object
token|Session token
request|The current HTTP Request

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
request|The current HTTP Request

---

