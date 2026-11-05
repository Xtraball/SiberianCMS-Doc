# Preview

---

## Login

### Description

List the applications of an administrator account, with the data the preview app needs to open each one. The call checks an email and a password, then returns the active applications that belong to the account.

The request must first pass the regular API authentication (HTTP Basic or Bearer token, see [API](../api.md)). The email and password in the body are the credentials of the administrator whose applications are listed, not the API credentials.

```php
<?php

$endpoint = "http://www.domain.com/application/api_webservice_preview/login"
```

The controller forwards the call to the preview web service of the Application module, which answers.

#### Example

```json
{
    "email": "email@domain.com",
    "password": "mypassword",
    "version": "ionic"
}
```

### Request

The body is read from the POST data. When the request is not a POST, the raw body is decoded as JSON, and CORS headers are added to the response (`Access-Control-Allow-Origin: *`).

Param|Type|Details|Default
-----|----|-------|-------
email *|string|Administrator email|
password *|string|Administrator password|
version|string|Any non-empty value lists the applications that use the "ionic" design. When empty or missing, the applications that use the "angular" design are listed|

**\* Required fields**

#### Success - Example

```json
{
    "applications": [
        {
            "id": 1,
            "icon": "http://www.domain.com/images/application/1/icon/abc.png",
            "startup_image": "/images/application/1/startup/abc.png",
            "startup_image_retina": "/images/application/1/startup/abc-retina.png",
            "name": "My App",
            "scheme": "http",
            "domain": "www.domain.com",
            "path": "",
            "key": "my-app",
            "url": "http://www.domain.com/my-app"
        }
    ]
}
```

Applications that are not active are skipped. When the account has no matching application, `applications` is an empty array.

#### Error - Example

```json
{
    "error": "Authentication failed. Please check your email and/or your password"
}
```

### Response

Param|Type|Details
-----|----|-------
applications|array|Active applications of the account
applications[].id|int|Application unique identifier
applications[].icon|string|Icon URL (base URL of the request + icon path), empty when the application has no icon
applications[].startup_image|string|Startup image URL
applications[].startup_image_retina|string|Retina startup image URL
applications[].name|string|Application name
applications[].scheme|string|Scheme of the application URL (http or https)
applications[].domain|string|Host of the application URL
applications[].path|string|Path of the application URL, without the key and without the leading slash
applications[].key|string|Application key when it appears in the URL path, empty otherwise
applications[].url|string|Full application URL
error|string|On any failure, a single generic message: a missing email or password, an unknown email, a wrong password, or any exception during the process all give the same text

If the API authentication itself fails, the response is the generic API error instead:

```json
{
    "error": true,
    "message": "Authentication failed. Please, check the username and/or the password"
}
```
