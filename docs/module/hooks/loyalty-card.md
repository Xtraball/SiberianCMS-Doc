# Loyalty Card Hooks

[Edit this on Github](https://github.com/Xtraball/SiberianCMS-Doc/edit/master/docs/module/hooks/loyalty-card.md)

Available from 4.14.6

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
customerId|The customerId who validated the points
card|The validated card
points|Number of points validated
unlockType|`password` or `qrcode`

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
customerId|The customerId who validated the points
card|The validated card
unlockType|`password` or `qrcode`
