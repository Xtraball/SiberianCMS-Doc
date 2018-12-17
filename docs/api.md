# SiberianCMS API Documentation

[Edit this on Github](https://github.com/Xtraball/SiberianCMS-Doc/edit/master/docs/api.md)

## Introduction

Welcome to the SiberianCMS REST API documentation.

This doc contains reference materials to help you implementing the API into your system.

SiberianCMS API provides you with the ability to manage your users, as well as your applications.

You can find our PHP Library:
    
* [Siberian API php](https://github.com/Xtraball/siberiancms-api-php).

## At a glance

* The API is implemented with REST and is secured by an HTTP Basic Authentication or a Bearer Token.

* The requests are made over HTTP POST and the responses are delivered in JSON.

* For each request, you need to post all of your data together with your credentials previously created from your SiberianCMS's back-office.

## Create your API User

* Open your Siberian Backoffice, then go in *Manage > Users > API* 

* Create your user & select the API Accesses to grant him.

* For the HTTP Basic Auth, simply uses your username & password.

* For the Bearer Token, get the generated Token and send it to the API withe the header below

```raw
// user this custom header, we do not use the regular Authorization HTTP header due to some restrictions.

Api-Auth-Bearer: Bearer YOURTOKEN

If your token is: 965327d7caa3d748bb70630b8f1ec64b7f0882ec
so your header will be

Api-Auth-Bearer: Bearer 965327d7caa3d748bb70630b8f1ec64b7f0882ec

```

## Basic usage

#### Init the API with Basic Auth or Bearer token

```php

// Init with Basic Auth username/password
\Siberian\Api::init($domain, $username, $password);

// OR

// Init with Bearer token
\Siberian\Api::initWithBearer($domain, $bearerToken);
```

#### Create a new user

```
$response = \Siberian\User::create($email, $password, $firstname, $lastname, $role_id);
if($response->isSuccess()) {
    $user_id = $response->getResponse("user_id");
    $token  = $response->getResponse("token");
} else {
    echo $response->getErrorMessage();
}
```

#### Create an application

```
$response = \Siberian\Application::create($name, $user_id);
if($response->isSuccess()) {
    $app_id = $response->getResponse("app_id");
    $app_url  = $response->getResponse("app_url");
} else {
    echo $response->getErrorMessage();
}
```

Other actions are documented here [API Documentation](http://developer.siberiancms.com/api/)


#### Run test (on you development instance)

Basic Auth

```
./run-test.sh siberianurl basic username password
```

Bearer token

```
./run-test.sh siberianurl bearer token
```

## APIs

Here is the list of the available APIs:

### Application

* [Create an application](api/application#create)

* [Update an existing application](api/application#update)

* [Grant access to an application.](api/application#grant-user)

* [Revoke access to an application.](api/application#revoke-user)

### User

* [Create a user](api/user#create)

* [Update an existing user](api/user#update)

* [Check whether a user exists](api/user#exists)

* [Authenticate a user](api/user#authentication)

* [Send a new password to a user](api/user#forgot-password)

### Backoffice

* [Rebuild manifest](api/backoffice#manifest)

* [Clear tmp](api/backoffice#clear-tmp)

* [Clear cache](api/backoffice#clear-cache)

* [Clear logs](api/backoffice#clear-logs)

### Push notifications

* [List available applications](api/push#list)

* [Send global push notification](api/push#send)
