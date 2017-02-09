# Modules

[Improve this doc](https://github.com/Xtraball/SiberianCMS-Doc/blob/master/docs/module.md)

Here you'll find everything needed to start developing your first module, from structure to update routine & packaging.

## What is a module ?

Modules are the core of SiberianCMS, they run frontend, backend, features & even more.

A module can be a single front page with new features or settings, or a complete feature for SiberianCMS to be used in your Mobile apps and managed in your App editor.

Here you can find a module skeleton to start with [Siberian module Skeleton, Job](https://github.com/Xtraball/siberian-module-skeleton)

Modules are installed in the `app/local/modules` folder, for more information about the inheritance see this page [module/core-inheritance](module/core-inheritance)

## Structure

### Folder structure of a Module

```raw
ModuleName
├─ Controller
│  └─ Default.php   /** If you need to override the default controller Classes */
├─ controllers
│  ├─ Backoffice
│  │  └─ ModuleName.php
│  └─ Mobile
│     └─ ModuleName.php
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
│  │  │  └─ mymodule.csv
│  │  ├─ en
│  │  └─ [...]
│  ├─ design
│  └─ var           /** Everything related to native apps. */
└─ package.json
```

## Basics

### Structure of package.json

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
      "version": "4.1.0"
    },
    "modules": {
      "OtherModule": "4.1.0"
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
 * Schema definition for 'table_name'
 */
$schemas = (!isset($schemas)) ? array() : $schemas;
$schemas['table_name'] = array(
    'mytable_id' => array(
        'type' => 'int(11) unsigned',
        'auto_increment' => true,
        'primary' => true,
    ),
    'admin_id' => array(
        'type' => 'int(11) unsigned',
        'is_null' => true,
        'foreign_key' => array(
            'table' => 'admin',
            'column' => 'admin_id',
            'name' => 'FK_MY_MODULE_ADMIN_ID_ADMIN_AMIN_ID',
            'on_update' => 'CASCADE',
            'on_delete' => 'CASCADE',
        ),
    ),
    'name' => array(
        'type' => 'varchar(50)',
        'default' => 'default_value',
        'index' => true,
    ),
    'created_at' => array(
        'type' => 'datetime',
    ),
    'updated_at' => array(
        'type' => 'datetime',
    ),
);
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

**Protected names are `install.php` & `%VERSION%.php` where %VERSION% is a semver string, you must never use them.**

Best practice:
    
* If your module is about to install multiple features, split them into multiple files, 
    
    * ex: `feature1.php`, `feature2.php`, etc...

Here is an example file `job.php`

```php
<?php
# Job module, data.
$name = "Job";
$category = "social";

# Icons, the first icon is set as default for the Feature, 
# then all the icons are inserted in a library
$icons = array(
    "/app/local/modules/Job/resources/media/library/job1.png",
    "/app/local/modules/Job/resources/media/library/job2.png",
);

$result = Siberian_Feature::installIcons($name, $icons);

# Install the Feature
$data = array(
    "library_id"                    => $result["library_id"],
    "icon_id"                       => $result["icon_id"],
    "code"                          => "job",
    "name"                          => $name,                   
    "model"                         => "Job_Model_Company",
    "desktop_uri"                   => "job/application_job/",
    "mobile_uri"                    => "job/mobile_list/",
    "mobile_view_uri"               => "job/mobile_view/",
    "mobile_view_uri_parameter"     => "company_id",
    "only_once"                     => 0,
    "is_ajax"                       => 1,           
    "position"                      => 1000,
    "social_sharing_is_available"   => 1
);

$option = Siberian_Feature::install($category, $data, array("code"));

# Multiple layouts
#
# If your feature have multiple layouts, use the following section, otherwise skip it
# Layouts
$layout_data = array(1, 2);
$slug = "job";

Siberian_Feature::installLayouts($option->getId(), $slug, $layout_data);
# !Multiple layouts

# This section duplicates the icons for the Flat design, you can have different icons, 
# or use the same, however since 4.2 you must write this section
# Icons
$icons = array(
    "/app/local/modules/Job/resources/media/library/job1.png",
    "/app/local/modules/Job/resources/media/library/job2.png",
);

$result = Siberian_Feature::installIcons("{$name}-flat", $icons);
```
 
#### List of options

Key|Type|Usage, values, comment
---|----|--------------
$name|String|Your feature name
$category|String|`social`, `media`, `contact`, `monetization`, `customization`, `integration`, `events`, `misc`
 
#### List of options for $data

Key|Type|Usage, values, comment
---|----|--------------
code|String|This code is unique to your Feature, Module
name|String|Your feature name
model|String|Default model class used in the editor
desktop_uri|String|Default controller class uri used in the editor
mobile_uri|String|
mobile_view_uri|String|
mobile_view_uri_parameter|String|
only_once|Boolean| Whether an app may have this feature only once, or more 
is_ajax|Boolean|
position|Integer|The position in the feature list, leave empty for automatic
social_sharing_is_available|Boolean| nable the social sharing on your feature (experimental)
 

## Translations

First create a new file named `mymodule.csv` then place this file in the `translations/default` folder

If you want to ship your module with translations, place files in directories named with the locale code, example: english will be in `translations/en/mymodule.csv`

Below as an example the `contact.csv` file.

*Be sure to not use existing filename which are located in `SIBERIANCMS_ROOT/languages/default` otherwise your translations won't work.*

```csv
"An error occurred while saving your contact informations."
"An error occurred while sending your request. Please try again later."
"And his phone number:"
"Are you sure you want to remove the picture?"
"City"
"Contact information"
"Here is his email:"
"Here is his message:"
"Please enter properly the following fields: <br />"
"Twitter"
"Website"
"You have received a message from a contact:"
"Your email"
"Your message has been sent"
"Your request"
"Zip code"
```

Here is an example of what a translated file should like

```csv
[...]
"City";"Ville"
"Contact information";"Informations de contact"
"Here is his email:";"Voici son e-mail"
"Here is his message:";"Voici son message"
[...]
```

## Design

Everything you need to organize, style & interact with your Feature is located in the `design` folder

```raw
ModuleName
├─ [...]
├─ resources
│  └─ design
│     ├─ desktop
│     │  ├─ siberian
│     │  │  ├─ css
│     │  │  │  └─ job.css
│     │  │  ├─ js
│     │  │  │  └─ job.js
│     │  │  ├─ images
│     │  │  │  └─ customization
│     │  │  │     └─ layout
│     │  │  │        └─ job
│     │  │  │           ├─ layout-1.png
│     │  │  │           └─ layout-2.png
│     │  │  ├─ layout
│     │  │  │  ├─ job.xml
│     │  │  │  └─ company.xml
│     │  │  └─ template
│     │  │     ├─ company
│     │  │     │  └─ [...]
│     │  │     └─ job
│     │  │        ├─ index.phtml
│     │  │        └─ application
│     │  │           ├─ edit.css
│     │  │           ├─ edit.js
│     │  │           └─ edit.phtml
│     │  └─ flat
│     │     └─ [...] # Same as siberian, flat is the code for the Flat design from 4.2.0
│     └─ email
│        ├─ layout
│        └─ template
└─ [...]
```

### layout/job.xml example

This is the minimum required information in the default `layout.xml`, the file should be named as the module itself, lower-cased so `job.xml` in our case.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<layout>
    <job_application_job_edit>
        <views>
            <content class="application_view_customization_features_edit_tabbareditor" template="application/customization/features/edit/tabbar_editor.phtml" />
            <content_editor class="core_view_default" template="job/application/edit.phtml" />
        </views>
    </job_application_job_edit>
</layout>
```

The section `content` is the default for the feature editor tab, you should not need to change it.

The section `content_editor` should point to the feature editor template

here: the short path `job/application/edit.phtml` referring to `ModuleName/resources/design/template/job/application/edit.phtml` 

* Use only the short path.

## Cache

Module inheritance is cached, so each time you add or remove a file in your module, you must delete the file `var/cache/design.cache`

*Note: when installing and/or updating a module with the regular zip package, the cache is automatically cleared for the users.*


## Package

When you are done with your module, it's time to pack !

zip everything at the root of your module and you're done !

```raw
ModuleName.zip
├─ Controller
├─ controllers
│  └─[...]
├─ Model
├─ View
├─ resources
│  └─[...]
└─ package.json
```

## Uninstall a Module

Each module must come with it's own un-installer, which is a single file named `uninstall.php` at the root of the package.

Everything installed by the files located in `resources/db/data` & every table created in `resources/db/schema`

```php
<?php
# Job module un-installer.

$name = "Job";

# Clean-up library icons
Siberian_Feature::removeIcons($name);
Siberian_Feature::removeIcons("{$name}-flat");

# Clean-up Layouts
$layout_data = array(1, 2);
$slug = "job";

Siberian_Feature::removeLayouts($option->getId(), $slug, $layout_data);

# Clean-up Option(s)/Feature(s)
$code = "job";
Siberian_Feature::uninstallFeature($code);

# Clean-up DB be really carefull with this.
$tables = array(
    "job_company",
    "job_place",
);
Siberian_Feature::dropTables($tables);

# Clean-up module
Siberian_Feature::uninstallModule($name);
```
