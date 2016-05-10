# SiberianCMS API Documentation

## Introduction

Welcome to the SiberianCMS REST API documentation.

This doc contains reference materials to help you implementing the API into your system.

SiberianCMS API provides you with the ability to manage your users, as well as your applications.

## At a glance

* The API is implemented with REST and is secured by an HTTP Basic Authentication.

* The requests are made over HTTP POST and the responses are delivered in JSON.

* For each request, you need to post all of your data together with your credentials previously created from your SiberianCMS's back-office.

## APIs

Here is the list of the available APIs:

### Application

* [Create an application](../api/application#create)

* [Update an existing application](api/application#update)

* [Grant access to an application.](api/application#grant-user)

* [Revoke access to an application.](api/application#revoke-user)

### User

* [Create a user](api/user)

* [Update an existing user](api/user)

* [Check whether a user exists](api/user)

* [Authenticate a user](api/user)

* [Send a new password to a user](api/user)