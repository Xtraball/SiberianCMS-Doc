# Hooks

[Edit this on Github](https://github.com/Xtraball/SiberianCMS-Doc/edit/master/docs/module/hooks.md)

From Siberian 4.11.1 we added a hook to the Sidebar Left menu & Backoffice header menu (more will come in next updates)

**Icons are available from Siberian 4.12.10 only**

## Editor side menu

For utility reasons, and convenience, when creating your module you need a way to access its configuration page somewhere.

```php
Siberian_Module::addEditorMenu($module, $code, $title, $link, $icon = '');
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
|$icon|no|Custom css class to display icon using fontawesome or icofont|


#### Examples

**FontAwesome 4.7.0**

```php
Siberian_Module::addEditorMenu('Faq', 'faq', 'FAQ', '/faq/application/list', 'fa fa-line-chart');
```

**IcoFont**

```php
Siberian_Module::addEditorMenu('Faq', 'faq', 'FAQ', '/faq/application/list', 'icofont icofont-bird-wings');
```


&nbsp;


## Backoffice side menu

Backoffice hook works almost the same as Editor hooks.

```php
Siberian_Module::addMenu($module, $code, $title, $link, $icon = '');
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
|$icon|no|Custom css class to display icon using fontawesome or icofont|

#### Examples

**FontAwesome 4.2.0**

```php
Siberian_Module::addMenu('Faq', 'faq', 'FAQ', '/faq/backoffice/list', 'fa fa-ticket');
```

**IcoFont**

```php
Siberian_Module::addMenu('Faq', 'faq', 'FAQ', '/faq/backoffice/list', 'icofont icofont-bird-wings');
```


&nbsp;