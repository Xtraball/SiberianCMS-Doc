# Modules

Here you'll find everything needed to start developing your first module, from structure to update routine & packaging.

## What is a module ?

Modules are the core of SiberianCMS, they run frontend, backend, features & even more.

A module can be a single front page with new features or settings, or a complete feature for SiberianCMS to be used in your Mobile apps and managed in your App editor.

## Structure

### Folder structure of a Module

``` 
ModuleName
├─ Controller
│  └─ Default.php   /** If you need to override the default controller Classes */
├─ controllers
│  ├─ Backoffice
│  │  └─ ModuleName.php
│  └─ Mobile
│     └─ ModuleName.php
├─ Model
├─ View
├─ resources
│  ├─ db
│  │  ├─ data
│  │  └─ schema
│  ├─ media 
│  │  └─ library
│  ├─ translations
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
  "version": "1.0",
  "dependencies": {
    "system": {
      "type": "SAE", /** Required Siberian Edition (SAE/MAE/PE) */
      "version": "4.1.0" /** Required Siberian version */
    },
    "modules": {
      "OtherModule": "4.1.0"
    }
  }
}
```

### db/schema

We use `db/schema/table_name.php` to describe the table schema; below an example of a basic table.

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

### db/data

This folder is used to insert default values when installing, or updating a Module.

The default file is `db/data/install.php` which get called only when installing the module, other files are named with the version
`db/data/4.1.0.php`, `db/data/4.1.0.1.php`, `db/data/4.1.0.2.php`, `db/data/4.2.0.php`, etc ...


## Translations

First create a new file named `default.csv` then place this file in the `translations` folder

Below as an example the `contact.csv` file.

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

## Advanced usage