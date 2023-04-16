# Push notifications

[Edit this on Github](https://github.com/Xtraball/SiberianCMS-Doc/edit/master/docs/module/push.md)

Push notifications can be sent through various code

## Scheduler

```php
<?php
    $values = [
        'app_id' => $this->getApplication()->getId(), // The application ID, required
        'value_id' => $this->getId(), // The value ID, optional
        'title' => "Message title", // Required
        'body' => "Message body", // Required
        'send_after' => null, // "Feb 13 2023 00:00:00 +01:00" date format for delayed push, null for immediate push
        'delayed_option' => null, // "timezone" or null, timezone will try to send at the same time in the customer timezone
        'delivery_time_of_day' => null, // "08:23" for 8:23 AM 
        'is_for_module' => false, // If true, the message is linked to a module, push will not be listed in the admin
        'is_test' => false, // If true, the message is a test push, it will not be listed in the admin
        'is_individual' => false, // If true, the message is individual, it works with player_ids, if false it will be sent to all customers
        'open_feature' => false, // If true, the message will open a feature, it works with feature_id
        'feature_id' => null, // The feature ID, required if open_feature is true
        'player_ids' => [] || null, // The player IDs, required if is_individual is true
    ];

    $scheduler = new Scheduler($application);
    $scheduler->buildMessageFromValues($values);
    $scheduler->send();
```

### Send to a single customer

With the Individual push module, you can send a push to a single customer, this is done by using the `player_ids` parameter.

```php
<?php
    $values = [
        'app_id' => $this->getApplication()->getId(), // The application ID, required
        'value_id' => $this->getId(), // The value ID, optional
        'title' => "Message title", // Required
        'body' => "Message body", // Required
        'send_after' => null,
        'delayed_option' => null,
        'delivery_time_of_day' => null,
        'is_for_module' => true, // If true, the message is linked to a module, push will not be listed in the admin
        'is_test' => false, // If true, the message is a test push, it will not be listed in the admin
        'open_feature' => false, // If true, the message will open a feature, it works with feature_id
        'feature_id' => null, // The feature ID, required if open_feature is true
    ];

    $scheduler = new Scheduler($application);
    $scheduler->buildMessageFromValues($values);
    $scheduler->sendToCustomer($customerId); // This part will automatically sets the player_id and is_individual to true
``