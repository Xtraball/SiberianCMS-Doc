# Job

---

The Job module exposes two API controllers, `company` and `place`. Both manage **administrator accounts** (the same accounts as the [User](user.md) API): they do not list, create or edit job offers, companies or places as records. Treat them as account endpoints for the Job module.

The URL pattern is `http://www.domain.com/job/api_company/ACTION` and `http://www.domain.com/job/api_place/ACTION`.

#### Authentication

Every call needs the regular API authentication: HTTP Basic or Bearer token (custom `Api-Auth-Bearer` header), see [API](../api.md). Without it the server answers:

```json
{
    "error": true,
    "message": "Authentication failed. Please, check the username and/or the password"
}
```

These controllers declare no secured actions, so no additional ACL permission is checked: any authenticated API user can call them.

All actions read POST data. A call without POST data (or, for `autologin`, without `email` and `token`) gets:

```json
{
    "error": true,
    "message": "The request contains no data, or data this action does not accept."
}
```

---

## Company

### Exist

Check whether an administrator email already exists.

```php
<?php

$endpoint = "http://www.domain.com/job/api_company/exist"
```

#### Example

```json
{
    "email": "email@domain.com"
}
```

Param|Type|Details
-----|----|-------
email *|string|Administrator email

**\* Required fields**

#### Success - Example

```json
{
    "success": 1,
    "exists": true
}
```

#### Error - Example

```json
{
    "error": 1,
    "message": "The email is required"
}
```

Param|Type|Details
-----|----|-------
success/error|int|Indicate whether there was an error during the process
exists|boolean|Whether an account with this email exists
message|string|In case of error, a message from the server

---

### Authenticate

Check an email/password combination and return the login token.

```php
<?php

$endpoint = "http://www.domain.com/job/api_company/authenticate"
```

#### Example

```json
{
    "email": "email@domain.com",
    "password": "mypassword"
}
```

Param|Type|Details
-----|----|-------
email *|string|Administrator email
password *|string|Administrator password

**\* Required fields**

#### Success - Example

```json
{
    "success": 1,
    "token": "aFef235fygd3dz3kLo98hKHfdxFguGf7"
}
```

#### Error - Example

```json
{
    "error": 1,
    "message": "Authentication failed."
}
```

Possible error messages: `The email is required`, `The password is required`, `The user doesn't exist.`, `Authentication failed.`

Param|Type|Details
-----|----|-------
success/error|int|Indicate whether there was an error during the process
token|string|Login token of the account, to use with [Autologin](#autologin)
message|string|In case of error, a message from the server

---

### Create

Create an administrator account.

```php
<?php

$endpoint = "http://www.domain.com/job/api_company/create"
```

#### Example

```json
{
    "email": "email@domain.com",
    "password": "mypassword",
    "firstname": "Firstname",
    "lastname": "Lastname"
}
```

Param|Type|Details
-----|----|-------
email *|string|Administrator email, must not be used yet
password *|string|Password, saved as given (the complexity rules of the User API are not applied here)
firstname|string|First name
lastname|string|Last name

**\* Required fields**

Any other field sent in the body is also assigned to the account before it is saved.

#### Success - Example

```json
{
    "success": 1,
    "user_id": 12,
    "token": "aFef235fygd3dz3kLo98hKHfdxFguGf7"
}
```

#### Error - Example

```json
{
    "error": 1,
    "message": "This email address is already used"
}
```

Possible error messages: `Unable to update a user from here.` (when `user_id` is sent), `The email is required`, `This email address is already used`, `The password is required`.

Param|Type|Details
-----|----|-------
success/error|int|Indicate whether there was an error during the process
user_id|int|Unique identifier of the new account
token|string|Login token of the account
message|string|In case of error, a message from the server

---

### Update

Update an administrator account.

```php
<?php

$endpoint = "http://www.domain.com/job/api_company/update"
```

#### Example

```json
{
    "user_id": 12,
    "email": "new.email@domain.com",
    "firstname": "New firstname"
}
```

Param|Type|Details
-----|----|-------
user_id|int|Identifier of the account to update. If it is missing or empty, a new account is created from the given data instead of an update
email|string|New email, must not belong to another account
password|string|New password
firstname|string|First name
lastname|string|Last name

Any other field sent in the body is also assigned to the account before it is saved. An `id` field is ignored.

#### Success - Example

```json
{
    "success": 1,
    "user_id": 12,
    "token": "aFef235fygd3dz3kLo98hKHfdxFguGf7"
}
```

#### Error - Example

```json
{
    "error": 1,
    "message": "This admin does not exist"
}
```

Possible error messages: `This admin does not exist`, `This email address is already used`.

Param|Type|Details
-----|----|-------
success/error|int|Indicate whether there was an error during the process
user_id|int|Account unique identifier
token|string|Login token of the account
message|string|In case of error, a message from the server

---

### Forgot Password

Generate a new password for the account and send it by email.

```php
<?php

$endpoint = "http://www.domain.com/job/api_company/forgotpassword"
```

#### Example

```json
{
    "email": "email@domain.com"
}
```

Param|Type|Details
-----|----|-------
email *|string|Administrator email

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
    "message": "This email address does not exist"
}
```

Possible error messages: `Please enter your email address`, `This email address does not exist`.

---

### Is Logged In

Tell whether the current session is logged in as an administrator.

```php
<?php

$endpoint = "http://www.domain.com/job/api_company/isloggedin"
```

Any non-empty POST body is accepted, no parameter is read.

#### Success - Example

```json
{
    "is_logged_in": false
}
```

---

### Autologin

Log an administrator into the editor with the token from [Authenticate](#authenticate), [Create](#create) or [Update](#update). On success the server redirects to `admin/application/list`.

`https://yourdomain.com/job/api_company/autologin?email=USER_EMAIL&token=USER_TOKEN`

Param|Type|Details
-----|----|-------
email *|string|Administrator email
token *|string|Login token of the account

**\* Required fields**

Unlike the User API autologin, this call is not exempt from API authentication: the Basic or Bearer credentials are required. On a wrong email or token no error body is produced by the action; the generic "no data" error shown above is returned.

---

## Place

The `place` controller has the actions `create`, `update`, `forgotpassword`, `isloggedin` and `autologin`, at `http://www.domain.com/job/api_place/ACTION`. They behave exactly like the Company actions of the same name (same parameters, responses and error messages). It has no `exist` and no `authenticate` action.

The Place `create` action is not documented here, use Company [Create](#create) to create an account.
