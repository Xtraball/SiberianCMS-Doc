# Customer Hooks

#### mobile.login

This action is called on the very start of a login request (account or facebook)

```php
<?php

use Siberian\Hook;

Hook::listen(
    'mobile.login',
    'Listening Mobile login',
    function ($payload) {
        // Your stuff!
    },
    0
);
```

**Hook payload details**

key|details
---|---
appId|The application id
request|The current HTTP Request
type|account or facebook

---

#### mobile.login.success

Called when a user is successfully logged-in (account or facebook)

```php
<?php

use Siberian\Hook;

Hook::listen(
    'mobile.login.success',
    'Listening Mobile login success',
    function ($payload) {
        // Your stuff!
    },
    0
);
```

**Hook payload details**

key|details
---|---
appId|The application id
customerId|Current customer Id
customer|The customer object
token|Session token
type|account or facebook
request|The current HTTP Request

---

#### mobile.logout

This action is called on the very start of a logout request (account or facebook)

```php
<?php

use Siberian\Hook;

Hook::listen(
    'mobile.logout',
    'Listening Mobile logout',
    function ($payload) {
        // Your stuff!
    },
    0
);
```

**Hook payload details**

key|details
---|---
appId|The application id
customerId|Current customer Id
request|The current HTTP Request

---

#### mobile.logout.success

Called when the logout is successful

```php
<?php

use Siberian\Hook;

Hook::listen(
    'mobile.logout.success',
    'Listening Mobile logout',
    function ($payload) {
        // Your stuff!
    },
    0
);
```

**Hook payload details**

key|details
---|---
appId|The application id
customerId|Current customer Id
request|The current HTTP Request

---

#### mobile.login.error

When a user fails to login

```php
<?php

use Siberian\Hook;

Hook::listen(
    'mobile.login.error',
    'Listening Mobile login error',
    function ($payload) {
        // Your stuff!
    },
    0
);
```

**Hook payload details**

key|details
---|---
appId|The application id
message|The error message
type|account or facebook
request|The current HTTP Request

---

#### mobile.register

Calls at the very start of a registration

```php
<?php

use Siberian\Hook;

Hook::listen(
    'mobile.register',
    'Listening Mobile registration',
    function ($payload) {
        // Your stuff!
    },
    0
);
```

**Hook payload details**

key|details
---|---
appId|The application id
request|The current HTTP Request

---

#### mobile.register.success

Called when a user is successfully registered

```php
<?php

use Siberian\Hook;

Hook::listen(
    'mobile.register.success',
    'Listening Mobile register success',
    function ($payload) {
        // Your stuff!
    },
    0
);
```

**Hook payload details**

key|details
---|---
appId|The application id
customerId|Current customer Id
customer|The customer object
token|Session token
request|The current HTTP Request

---

#### mobile.register.error

When a user fails to register

```php
<?php

use Siberian\Hook;

Hook::listen(
    'mobile.register.error',
    'Listening Mobile register error',
    function ($payload) {
        // Your stuff!
    },
    0
);
```

**Hook payload details**

key|details
---|---
appId|The application id
message|The error message
type|account
request|The current HTTP Request

---

#### Other customer hooks

These are triggered the same way (`Hook::listen('name', 'Listener name', $callback, 0)`), the payload keys are listed in the table. Every payload has `appId`.

Hook|Payload
----|-------
`mobile.forgotpassword`|`request`, `type`
`mobile.forgotpassword.success`|`customerId`, `customer`, `newPassword`, `token`, `type`
`mobile.forgotpassword.error`|`message`, `type`, `request`
`mobile.customer.changePassword.success`|`customerId`, `customer`, `newPassword`, `token`, `type`
`mobile.delete`|`request`, `type`
`mobile.delete.success`|`customerId`, `customer` (array), `token`, `type`, `request`
`mobile.delete.error`|`message`, `type`, `request`
