# Hooks

From Siberian 4.11.1 we added a hook to the Sidebar Left menu & Backoffice header menu (more will come in next updates)

[Improve this doc](https://github.com/Xtraball/SiberianCMS-Doc/blob/master/docs/module/hooks.md)

## Editor side menu

For utility reasons, and convenience, when creating your module you need a way to access it configuration page somewhere.

```php
Siberian_Module::addEditorMenu($module, $code, $title, $link);
```

The previous code will result in something like this.

![hooks-sidebar-menu](../img/hooks/sidebar-menu.png)

#### Options

|Field|Required&nbsp;?|Description|
|-----|---------------|-----------|
|$module|yes|Module name|
|$code|yes|Unique code to identify the link, used for highlights|
|$title|yes|Your link text|
|$link|yes|Path to your feature `/mymodule/mycontroller/myaction`|

&nbsp;


## Backoffice side menu

Backoffice hook works almot the same as Editor hooks.

```php
Siberian_Module::addMenu($module, $code, $title, $link);
```

The previous code will result in something like this.

![hooks-backoffice-menu](../img/hooks/backoffice-menu.png)

#### Options

|Field|Required&nbsp;?|Description|
|-----|---------------|-----------|
|$module|yes|Module name|
|$code|yes|Unique code to identify the link, used for highlights|
|$title|yes|Your link text|
|$link|yes|Path to your feature `/mymodule/mycontroller/myaction`|

&nbsp;

