# Editor & Backoffice

[Edit this on Github](https://github.com/Xtraball/SiberianCMS-Doc/edit/master/docs/module/hooks/menus.md)

From Siberian 4.11.1 we added a hook to the Sidebar Left menu & Backoffice header menu (more will come in next updates)

**Icons are available from Siberian 4.12.10 only**

## Editor side menu

For utility reasons, and convenience, when creating your module you need a way to access its configuration page somewhere.

```php
Siberian_Module::addEditorMenu($module, $code, $title, $link, $icon = '');
```

The previous code will result in something like this.

![hooks-sidebar-menu](../../img/hooks/sidebar-menu.png)

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

![hooks-backoffice-menu](../../img/hooks/backoffice-menu.png)

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

## Backoffice - Advanced

**Available from 4.14.6**

#### backoffice.menu.ready

When the backoffice menu hierarchy is built, this action is triggered, you can then alter the tree as you want.

This method is more complex than simply adding your menu, but it's way more powerful too.

You callback function **must** return the given payload whether it's altered or not!

```php
\Siberian\Hook::listen(
    'backoffice.menu.ready',
    'Listening Backoffice menu',
    function ($payload) {
        // Your stuff!
        
        return $payload;
    },
    0
);
```

**Hook payload details**

```php

// Extract of the tree payload!
$backofficeTree = [
    'dashboard' => [
        'hasChilds' => false,
        'isVisible' => true,
        'label' => __('Dashboard'),
        'url' => $this->getUrl('backoffice'),
        'icon' => 'fa fa-tachometer',
    ],
    'invoices' => [
        'hasChilds' => false,
        'isVisible' => $this->isPe(),
        'label' => __('Invoices'),
        'url' => $this->getUrl("sales/backoffice_invoice_list"),
        'icon' => 'fa fa-ticket',
    ],
    'manage' => [
        'hasChilds' => true,
        'isVisible' => true,
        'label' => __('Manage'),
        'icon' => 'fa fa-users',
        'childs' => [
            'users' => [
                'hasChilds' => true,
                'isVisible' => true,
                'label' => __('Users'),
                'icon' => 'fa fa-users',
                'childs' => [
                    'users' => [
                        'hasChilds' => false,
                        'isVisible' => true,
                        'label' => __('Users'),
                        'url' => $this->getUrl("admin/backoffice_list"),
                        'icon' => 'fa fa-users',
                    ],
                ],
            ],        
    [...]     
    ],
];
```

#### Payload details

key|details
---|---
hasChilds|tells if the node is a parent or not
isVisible|true, false or a condition to display the menu
label|the translated title `__('Text to translate')`
icon|same a previous with either `FontAwesome` or `IcoFont`
url|the url to access the feature/module
childs|if `hasChilds` is `true` then you must provide a childs array

---

**Available from 4.15.0**

#### editor.header.menu.ready

When the editor menu hierarchy is built, this action is triggered, you can then alter the tree as you want.

This method is more complex than simply adding your menu, but it's way more powerful too.

You callback function **must** return the given payload whether it's altered or not!

```php
\Siberian\Hook::listen(
    'editor.header.menu.ready',
    'Listening Editor header menu',
    function ($payload) {
        // Your stuff!
        
        return $payload;
    },
    0
);
```

**Hook payload details**

```php

// Extract of the tree payload!
$editorTree = [
    'dashboard' => [
        'hasChilds' => false,
        'isVisible' => true,
        'label' => __('Dashboard'),
        'id' => 'sb-tour-dashboard',
        'is_current' => 'app_list' === $current,
        'url' => $this->getUrl('/'),
        'icon' => 'fa fa-tachometer',
    ],
    [...]
    'profile' => [
        'hasChilds' => true,
        'isVisible' => true,
        'label' => __('Profile'),
        'id' => 'sb-tour-profile',
        'icon' => 'fa fa-user',
        'childs' => [
            'my_account' => [
                'hasChilds' => false,
                'isVisible' => true,
                'label' => __('Account Settings'),
                'url' => $this->getUrl('admin/account/edit'),
                'is_current' => 'my_account' === $current,
            ],
            'access_management' => [
                'hasChilds' => false,
                'isVisible' => !$request->isWhiteLabelEditor() && $this->_canAccess('admin_access_management'),
                'label' => __('Access Management'),
                'url' => $this->getUrl('admin/access_management/list'),
                'is_current' => 'access_management' === $current,
            ],
            [...]
            'profile_divider' => [
                'isVisible' => true,
                'divider' => true,
                'is_current' => false,
            ],
            'logout' => [
                'hasChilds' => false,
                'isVisible' => true,
                'label' => __('Log-out'),
                'url' => $this->getUrl('admin/account/logout'),
                'is_current' => false,
            ],
        ],
    ],
    [...]
];
```

#### Payload details

key|details
---|---
hasChilds|tells if the node is a parent or not
isVisible|true, false or a condition to display the menu
label|the translated title `__('Text to translate')`
icon|same a previous with either `FontAwesome` or `IcoFont`
is_current|highlight or not the current active menu
divider|special item divider, not a menu
id|the node id
url|the url to access the feature/module
childs|if `hasChilds` is `true` then you must provide a childs array

---