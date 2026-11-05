# Backoffice

[Edit this on Github](https://github.com/Xtraball/SiberianCMS-Doc/edit/master/docs/api/backoffice.md)

---

## Manifest

### Description

Rebuilds the application manifest.

```php
<?php

$endpoint = "http://www.domain.com/backoffice/api_options/manifest"
```

### Response

Param|Type|Details|Default
-----|----|-------|-------
success/error|int|Indicate whether there was an error during the process|1
message|string|Confirmation message|

---

## Clear tmp

### Description

Clear var/tmp cache.

```php
<?php

$endpoint = "http://www.domain.com/backoffice/api_options/cleartmp"
```

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
message|string|Confirmation message|

---

## Clear cache

### Description

Clear var/cache files.

```php
<?php

$endpoint = "http://www.domain.com/backoffice/api_options/clearcache"
```

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
message|string|Confirmation message|

---

## Clear logs

### Description

Clear var/logs files.

```php
<?php

$endpoint = "http://www.domain.com/backoffice/api_options/clearlogs"
```

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
message|string|Confirmation message|

---