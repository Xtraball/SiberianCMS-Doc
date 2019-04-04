# Modules

[Edit this on Github](https://github.com/Xtraball/SiberianCMS-Doc/edit/master/docs/module.md)

Here you'll find everything needed to start developing your first module, from structure to update routine & packaging.

## What is a module ?

Modules are the core of SiberianCMS, they run frontend, backend, features & even more.

A module can be a single front page with new features or settings, or a complete feature for SiberianCMS to be used in your Mobile apps and managed in your App editor.

Here you can find a module skeleton to start with [Siberian module Skeleton, Job](https://github.com/Xtraball/siberian-module-skeleton)

Modules are installed in the `app/local/modules` folder, for more information about the inheritance see this page [module/core-inheritance](module/core-inheritance)

## Structure

### Folder structure

```raw
ModuleName
├─ Controller
│  └─ Default.php   /** If you need to override the default controller Classes */
├─ controllers
│  ├─ Backoffice
│  │  └─ ModuleNameController.php
│  └─ Mobile
│     └─ ModuleNameController.php
├─ features
│  └─ [...] // Core feature related files
├─ Form
├─ Model
├─ View
├─ resources
│  ├─ db
│  │  ├─ data
│  │  └─ schema
│  ├─ media 
│  │  └─ library
│  ├─ translations
│  │  ├─ default
│  │  │  └─ mymodule.po
│  │  ├─ en
│  │  └─ [...]
│  └─ design
└─ package.json
```

## Basics

### package.json

The `package.json` is used by the Installer to know the requirements, and routines to run during the installation/update process

```json
{
  "name": "ModuleName",
  "description": "Module description",
  "type": "module",
  "version": "1.0",
  "dependencies": {
    "system": {
      "type": "SAE",
      "version": "4.16.0"
    },
    "modules": {
      "OtherModule": "2.1.0"
    }
  }
}
```

### resources/db/schema

We use `resources/db/schema/table_name.php` to describe the table schema; below an example of a basic table.

This file(s) reflects your database at it's latest version, each time you update your module, the local schema is compared against this file and updating

*Note: the schema only add fields if they are new or missing, fields are never removed.*

```php
<?php
/**
 * Schema definition for "table_name"
 */
$schemas = (!isset($schemas)) ? [] : $schemas;
$schemas["table_name"] = [
    "mytable_id" => [
        "type" => "int(11) unsigned",
        "auto_increment" => true,
        "primary" => true,
    ],
    "admin_id" => [
        "type" => "int(11) unsigned",
        "is_null" => true,
        "foreign_key" => [
            "table" => "admin",
            "column" => "admin_id",
            "name" => "FK_MY_MODULE_ADMIN_ID_ADMIN_AMIN_ID", // Must be unique!
            "on_update" => "CASCADE",
            "on_delete" => "CASCADE",
        ],   
    ],
    "name" => [
        "type" => "varchar(50)",
        "default" => "default_value",
        "index" => true,
    ],
    "created_at" => [
        "type" => "datetime",
    ],
    "updated_at" => [
        "type" => "datetime",
    ],
];
```

#### List of available options

Key|Type|Usage, values, comment
---|----|--------------
type|String| int(11) unsigned, varchar(50), datetime, etc ...| xoxo
auto_increment|Boolean|
primary|Boolean||If multiple columns are defined as `primary` they will be part of a composite primary key
is_null|Boolean|
default|mixed|
foreign_key|Array()|See the [Foreign key options below](#foreign-key-options)
index|Array()|See the [Index options below](#index-options)


#### Foreign Key options
Key|Type|Usage, values, comment
---|----|----------------------
table|String|Referenced table
column|String|Referenced column in table
name|String|Foreign key name (ex: FK_TABLENAME_KEYNAME_REFTABLENAME_REFKEYNAME)
on_update|String|NO ACTION, SET NULL, CASCADE, RESTRICT
on_delete|String|NO ACTION, SET NULL, CASCADE, RESTRICT


#### Index options
Key|Type|Usage, values, comment
---|----|----------------------
key_name|String|Index name, use the same on multiple columns for composite indexes
index_type|String|BTREE, HASH
is_null|Boolean|
is_unique|Boolean|

### resources/db/data

This folder is used to insert default values when installing, or updating a Module.

Every php file in this folder will be executed when installing and/or updating the module, they should reflect the required data as the latest version.

**Protected names are `install.php` & `%VERSION%.php` where %VERSION% is a semver string, you must NEVER use them.**

Best practice:
    
* If your module is about to install multiple features, split them into multiple files, 
    
    * ex: `feature1.php`, `feature2.php`, etc...


### features/modulename/feature.json

This file is the key for every **In app** features

```json
{
    "name": "ModuleName",
    "code": "modulename",
    "version": "1.0.0",
    "category": "contact",
    "model": "ModuleName_Model_MainClass",
    "desktop_uri": "modulename/application/",
    "routes": [
        {
            "root": true,
            "state": "modulename-home",
            "controller": "ModuleNameHome",
            "url": "modulename/mobile_home/index/value_id/:value_id",
            "template": "l1/home.html",
            "cache": false
        },
        {
            "state": "modulename-view",
            "controller": "ModuleNameView",
            "url": "modulename/mobile_view/index/value_id/:value_id/item_id/:item_id",
            "template": "l1/view.html",
            "cache": false
        }
    ],
    "layouts": [
        1
    ],
    "icons": [
        "icons/modulename1-flat.png",
        "icons/modulename2-flat.png",
        "icons/modulename3-flat.png"
    ],
    "files": [
        "js/services/modulename.js",
        "js/factory/modulename.js",
        "js/controllers/modulename.js",
        "scss/modulename.scss"
    ],
    "compile": true,
    "use_account": true,
    "only_once": true,
    "load_on_start": false,
    "on_start_factory": null
}
```

 
#### List of options

Key|Type|Usage, values, comment
---|----|--------------
name|String|Your feature name
code|String|This code is unique to your Feature, Module
category|String|`social`, `media`, `contact`, `monetization`, `customization`, `integration`, `events`, `misc`
version|String|Not used here see **package.json** for the version
model|String|Default model class used in the editor
desktop_uri|String|Default controller class uri used in the editor
compile|Boolean|Leave **true** by default
use_account|Boolean|If the feature requires user to login set **true** 
only_once|Boolean|Whether an app may have this feature only once, or more 
load_on_start|Boolean|If the feature must be loaded right after the Application starts
on_start_factory|String|When **load_on_start** is set to **true**, Factory.onStart function will be executed, where **Factory** is the factory class name
 

## Translations

Since version 4.16.5, siberian uses **.po** files, which are Gettext source files.

First create a new file named `mymodule.po` then place this file in the `translations/default` folder

If you want to ship your module with translations, place files in directories named with the locale code, example: english will be in `translations/en/mymodule.po`

Below as an example the `contact.po` file.

*Be sure to not use existing filename which are located in `SIBERIANCMS_ROOT/languages/base` otherwise your translations won't work.*

```raw
msgid ""
msgstr ""
"Project-Id-Version: \n"
"Report-Msgid-Bugs-To: \n"
"Last-Translator: \n"
"Language-Team: \n"
"MIME-Version: 1.0\n"
"Content-Type: text/plain; charset=UTF-8\n"
"Content-Transfer-Encoding: 8bit\n"
"POT-Creation-Date: 2019-03-28T15:24:21+01:00\n"
"PO-Revision-Date: 2019-03-28T15:24:21+01:00\n"
"Language: \n"

msgctxt "contact"
msgid "Cover image"
msgstr "Illustration"

msgctxt "contact"
msgid "Name"
msgstr "Nom"

#, mobile
msgctxt "contact"
msgid "Facebook"
msgstr "Facebook"

#, mobile
msgctxt "contact"
msgid "Twitter"
msgstr "Twitter"

#, mobile
msgctxt "contact"
msgid "Website"
msgstr "Site web"

msgctxt "contact"
msgid "String to translate"
msgstr "Phrase à traduire"

msgctxt "contact"
msgid "Hello, I'm %s"
msgstr "Bonjour je suis %s"
```


#### List of options

Key|Type|Usage, values, comment
---|----|--------------
#, mobile|String|Add this line if the string is translated inside the Mobile app
msgctxt|String|This is you context key, generally it's the module code
msgid|String|The original string, used as a key
msgstr|String|In **default** folder, **msgstr = msgid**, in translation files, msgstr is the translated sentence


#### How to translate

Inside editor & backoffice

```php
<?php

// Simple translation
echo p__("context_key", "String to translate");

// Will render [en]"String to translate" , [fr]"Phrase à traduire", as per the .po file below

// sprintf translation
$userName = "John";
echo p__("context_key", "Hello, I'm %s", $userName);

// Will render [en]"Hello, I'm John", [fr]"Bonjour je suis John", as per the .po file below

```


---


Inside mobile apps, note key & context are swapped compared to the php function

```js
// From the controllers, include $translate factory
$translate.instant("Hello, I'm %s", "context_key");
```

```html
// From any template
<div class="item">
    {{ "Hello, I'm %s" | translate:"context_key" }}
</div>
```


## Design

Everything you need to organize, style & interact with your Feature is located in the `design` folder

```raw
ModuleName
├─ [...]
├─ resources
│  └─ design
│     ├─ desktop
│     │  └─ flat
│     │     ├─ css
│     │     │  └─ modulename.css
│     │     ├─ js
│     │     │  └─ modulename.js
│     │     ├─ images
│     │     │  └─ customization
│     │     │     └─ layout
│     │     │        └─ modulename
│     │     │           ├─ layout-1.png
│     │     │           └─ layout-2.png
│     │     ├─ layout
│     │     │  └─ modulename.xml
│     │     └─ template
│     │        ├─ company
│     │        │  └─ [...]
│     │        └─ modulename
│     │           ├─ index.phtml
│     │           └─ application
│     │              ├─ edit.css
│     │              ├─ edit.js
│     │              └─ edit.phtml
│     └─ email
│        ├─ layout
│        └─ template
└─ [...]
```

### modulename.xml example

This is the minimum required information in the default `layout.xml`, the file should be named as the module itself, lower-cased so `job.xml` in our case.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<layout>
    <modulename_application_modulename_edit>
        <views>
            <content class="application_view_customization_features_edit_tabbareditor" 
                     template="application/customization/features/edit/tabbar_editor.phtml" />
            <content_editor class="core_view_default" 
                            template="job/application/edit.phtml" />
        </views>
    </modulename_application_modulename_edit>
</layout>
```

The section `content` is the default for the feature editor tab, you should not need to change it.

The section `content_editor` should point to the feature editor template

here: the short path `modulename/application/edit.phtml` referring to `ModuleName/resources/design/template/modulename/application/edit.phtml` 

* Use only the short path.

## Cache

While developing a module you will have to manually rebuild what we call **design cache**

You can do so with the Siberian **cli** by running **./cli cache:design sae** (replace sae with your edition, sae|mae|pe)

*Note: when installing and/or updating a module with the regular zip package, the cache is automatically cleared for the users.*


## Background images

### Editor side

In the file **edit.phtml** which handles the Editor UI for your module, you must add a background section like below.

```html
<div class="background-images-import">
    <?php echo $this->importBackground($option_value); ?>
</div>

<script type="text/javascript">
$(document).ready(function () {
    // Bind form, only if the current form is not binded from a parent (this could bind it twice)
    bindForms('.background-images-import');
});
</script>
```

This is as easy as the code below, as everything is linked to the feature, and cropped/saved automatically for you.

### Application / Ionic

Then to be sure your background images inside your Application pages, you must ensure all **views & lists** your <ion-view> and <ion-modal-view> uses the new directive **sb-page-background**

```html
<ion-view sb-page-background>
    <ion-content>
        {{ "My Awesome Content!" |translate:"module_name" }}
    </ion-content>
</ion-view>
```

As the old directive **sb-background-image** is deprecated/empty it will not affect anymore your features.

## Package

When you are done with your module, it's time to pack !

zip everything at the root of your module and you're done !

```raw
ModuleName.zip
├─ Controller
├─ controllers
│  └─[...]
├─ features
├─ Model
├─ View
├─ resources
│  └─[...]
└─ package.json
```

## Disable a Module

While in production modules can't be uninstalled, but can be disabled in **Backoffice > Settings > Advanced > Modules**