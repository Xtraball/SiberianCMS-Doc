# Utilities

[Edit this on Github](https://github.com/Xtraball/SiberianCMS-Doc/edit/master/docs/stack/utilities.md)

**Note: The documentation below will apply only after the Siberian 4.12.0 release.**

### isNotAvailableOffline

The function below is used to prevent functions or features to work when Application is offline.

This will return `true` or `false`, and when returning true, it also opens an alert.

```js
$rootScope.isNotAvailableOffline(with_alert)
```

&nbsp;

#### options

|Key|Type|Default|Usage|
|---|---|---|---|
|with_alert|Boolean|true|Opens an alert by default|

&nbsp;

### isNotAvailableInOverview

The function below is used to prevent some functions to work inside the Application overview, when editing.

This will return `true` or `false`, and when returning true, it also opens an alert.

```js
$rootScope.isNotAvailableInOverview(with_alert)
```

&nbsp;

#### options

|Key|Type|Default|Usage|
|---|---|---|---|
|with_alert|Boolean|true|Opens an alert by default|

&nbsp;

### isNativeApp

This variable is used to differentiate native Apps Android & iOS from Browser App or Progressive Web App.

```js
$rootScope.isNativeApp
```