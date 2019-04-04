# Application

[Edit this on Github](https://github.com/Xtraball/SiberianCMS-Doc/edit/master/docs/api/application.md)

---

## Create

#### Description

Create a new application by providing at least a name and a user identifier.

```php
<?php

$endpoint = "http://www.domain.com/application/api/create"
```

#### Example

```json
{
    "name": "My App",
    "key": "my-app",
    "font_family": "Helvetica"
}
```

### Request

Param|Type|Details|Default
-----|----|-------|-------
name *|string|Application name
user_id *|int|Owner unique identifier
key|string|Application Key - Must be unique (e.g. http://www.domain.com/my-key)
font_family|string|Arial, Helvetica, Verdana, Georgia, Times new roman, Palatino
domain|string|(e.g. m.domain.com)
is_active|boolean|Render the application invisible from the editor|true
is_locked|boolean|Activate or deactivate the application|true

**\* Required fields**

#### Success - Example

```json
{
    "success": 1,
    "app_id": 1,
    "app_url": "http://www.domain.com/my-app"
}
```

#### Error - Example

```json
{
    "error": 1,
    "message": "The key is already used by another application."
}
```

### Response

Param|Type|Details|Default
-----|----|-------|-------
success/error|int|Indicate whether there was an error during the process|1
app_id|int|Application unique identifier - Used to update the app or to link a user to an app|
app_url|string|URL of the application

---

## Update

#### Description

Update an existing user.

```php
<?php

$endpoint = "http://www.domain.com/application/api/update"
```

#### Example

```json
{
    "name": "My Stunning App",
    "key": "my-stunning-app",
    "font_family": "Arial"
}
```

### Request

Param|Type|Details|Default
-----|----|-------|-------
app_id *|int|Unique identifier|
name|string|Application name|
key|string|Application key - Must be unique (e.g. http://www.domain.com/my-key)|
font_family|string|Arial, Helvetica, Verdana, Georgia, Times new roman, Palatino|
domain|string|(e.g. m.domain.com)|
is_active|boolean|Render the application invisible from the editor|true
is_locked|boolean|Activate or deactivate the application|true

**\* Required fields**

#### Success - Example


```json
{
    "success": 1,
    "app_id": 1,
    "app_url": "http://www.domain.com/my-stunning-app"
}
```



#### Error - Example

```json
{
    "error": 1,
    "message": "The key is already used by another application."
}
```

### Response

Param|Type|Details|Default
-----|----|-------|-------
success/error|int|Indicate whether there was an error during the process|1
app_id|int|Application unique identifier - Used to update the app or to link a user to an app|
app_url|string|URL of the application

---

## Grant user

#### Description

Allows an existing user to manage an application.

```php
<?php

$endpoint = "http://www.domain.com/application/api_admin/add"
```

#### Example

```json
{
    "app_id": "1",
    "user_id": "1"
}
```

### Request

Param|Type|Details
-----|----|-------
app_id *|int|Unique identifier
admin_id *|int|User identifier

**\* Required fields**

#### Success - Example

```json
{
    "success": 1
}
```

#### Error - Example

```json
{
    "error": 1,
    "message": "This user can already manage this application."
}
```

### Response

Param|Type|Details|Default
-----|----|-------|-------
success/error|int|Indicate whether there was an error during the process|1

---

## Revoke user

#### Description

Denies an existing user to manage an application.

```php
<?php

$endpoint = "http://www.domain.com/application/api_admin/remove"
```

##### Example

```json
{
    "app_id": "1",
    "user_id": "1"
}
```

### Request

Param|Type|Details
-----|----|-------
app_id *|int|Unique identifier
admin_id *|int|User identifier

**\* Required fields**

#### Success - Example

```json
{
    "success": 1
}
```

#### Error - Example

```json
{
    "error": 1,
    "message": "This user can't manage this application."
}
```

### Response

Param|Type|Details|Default
-----|----|-------|-------
success/error|int|Indicate whether there was an error during the process|1