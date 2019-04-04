# User

[Edit this on Github](https://github.com/Xtraball/SiberianCMS-Doc/edit/master/docs/api/user.md)

---

## Create

### Description

Create a new user by providing at least an email address.

```php
<?php

$endpoint = "http://www.domain.com/admin/api_account/create"
```

#### Example

```json
{
    "role_id": 2,
    "email": "email@domain.com",
    "password": "mypassword",
    "firstname": "Firstname",
    "lastname": "Lastname"
}
```


### Request

Param|Type|Details|Default
-----|----|-------|-------
role_id|int|ACL role identifier set to the user|1
email *|string|User email|
password|string|User password - At least 6 characters|
firstname|string|User firstname|
lastname|string|User lastname

**\* Required fields**

#### Success - Example

```json
{
    "success": 1,
    "user_id": 1,
    "token": "aFef235fygd3dz3kLo98hKHfdxFguGf753f654ee",
    "redirect_url": "http://www.domain.com/admin/api_account/authenticate?email=email@domain.com&token=aFef235fygd3dz3kLo98hKHfdxFguGf753f654ee"
}
```

Check [#Autologin](#autologin) section to use the token.

---

#### Error - Example

```json
{
    "error": 1,
    "message": "This email address is already used"
}
```

### Response

Param|Type|Details|Default
-----|----|-------|-------
success/error|int|Indicate whether there was an error during the process|1
user_id|int|User unique identifier|
token|string|Use to log-in to this user account
redirect_url|string|**Available from 4.15.11** Pre-built autologin URL

---

## Update

### Description

Update an existing user.

```php
<?php

$endpoint = "http://www.domain.com/admin/api_account/update"
```

#### Example

```json
{
    "user_id": 1,
    "email": "new.email@domain.com",
    "firstname": "New firstname",
    "lastname": "New lastname"
}
```

### Request

Param|Type|Details|Default
-----|----|-------|-------
user_id *|int|Unique identifier received when creating a new user|
role_id|int|ACL role identifier set to the user|1
email|string|User email|
password|string|User password - At least 6 characters|
firstname|string|User firstname|
lastname|string|User lastname

**\* Required fields**

#### Success - Example

```json
{
    "success": 1,
    "user_id": 1
}
```

#### Error - Example

```json
{
    "error": 1,
    "message": "This email address is already used"
}
```

### Response

Param|Type|Details|Default
-----|----|-------|-------
success/error|int|Indicate whether there was an error during the process|1
user_id|int|User unique identifier|

---

## Exists

### Description

Check whether a user exists.

```php
<?php

$endpoint = "http://www.domain.com/admin/api_account/exist"
```

#### Example

```json
{
    "email": "email@domain.com"
}
```

### Request

Param|Type|Details
-----|----|-------
email *|string|User email to test whether it already exists

**\* Required fields**

#### Success - Example

```json
{
    "success": 1,
    "exists": "true",
}
```

#### Error - Example

```json
{
    "error": 1,
    "message": "The email is required"
}
```

### Response

Param|Type|Details|Default
-----|----|-------|-------
success/error|int|Indicate whether there was an error during the process|1
exists|boolean|Indicate whether the given email already exist

---

## Authentication

### Description

Check whether the email/password combination is correct.

Check [#Autologin](#autologin) section to use the token or use the **redirect_url**.

```php
<?php

$endpoint = "http://www.domain.com/admin/api_account/authenticate"
```

#### Example

```json
{
    "email": "email@domain.com",
    "password": "mypassword"
}
```

### Request

Param|Type|Details
-----|----|-------
email *|string|User email
password *|string|User password

**\* Required fields**

#### Success - Example

```json
{
    "success": 1,
    "token": "aFef235fygd3dz3kLo98hKHfdxFguGf753f654ee",
    "redirect_url": "http://www.domain.com/admin/api_account/authenticate?email=email@domain.com&token=aFef235fygd3dz3kLo98hKHfdxFguGf753f654ee"
}
```



#### Error - Example

```json
{
    "error": 1,
    "message": "Authentication failed."
}
```

### Response

Param|Type|Details|Default
-----|----|-------|-------
success/error|int|Indicate whether there was an error during the process|1
token|string|Use to log-in to this user account
redirect_url|string|**Available from 4.15.11** Pre-built autologin URL

---

## Forgot Password

### Description

Reset the password of a given email address and send it by email.

```php
<?php

$endpoint = "http://www.domain.com/admin/api_account/forgotpassword"
```

#### Example

```json
{
    "email": "email@domain.com"
}
```

### Request

Param|Type|Details
-----|----|-------
email *|string|User email

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
    "message": "This email address does not exist."
}
```

### Response

Param|Type|Details|Default
-----|----|-------|-------
success/error|int|Indicate whether there was an error during the process|1
message|string|In case of error, a message is sent back by the server to provide more information|1


## Autologin

After a new user is **created** or **authenticated** via the API, you can redirect him to the auto-login page.

`https://yourdomain.com/admin/api_account/autologin?email=USER_EMAIL&token=USER_TOKEN`

### Request

Param|Type|Details
-----|----|-------
email *|string|User email
token *|string|An existing token from a previous **create** or **authenticate** API call

**\* Required fields**