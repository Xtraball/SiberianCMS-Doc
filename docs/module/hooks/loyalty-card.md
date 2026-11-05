# Loyalty Card Hooks

#### loyalty_card.validate

Called when one ore more points are validated

```php
<?php

use Siberian\Hook;

Hook::listen(
    'loyalty_card.validate',
    'Listening Loyalty Card point validation',
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
customerId|The customerId who validated the points
employeeName|The name of the employee password used
card|The validated card (array of the card data)
customerCardId|The customer card id
points|Number of points validated
unlockType|`password` or `qrcode`

The same payload is also sent to `loyalty_card.validate_point`.

---

#### loyalty_card.complete

Called when a card is completed

```php
<?php

use Siberian\Hook;

Hook::listen(
    'loyalty_card.complete',
    'Listening Loyalty Card card completion',
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
customerId|The customerId who validated the points
employeeName|The name of the employee password used
card|The validated card (array of the card data)
customerCardId|The customer card id
unlockType|`password` or `qrcode`

The same payload is also sent to `loyalty_card.use_coupon`.
