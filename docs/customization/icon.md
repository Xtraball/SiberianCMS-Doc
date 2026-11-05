# Icon

** *Note: icon packages require Siberian 5.1.0 and above, otherwise they will not work* **

### What you need

* Cool icons to share an awesome pack !

**And to define two names:**

* Your icons pack name, like `MyIconPack`.

### Requirements

* Icons must be 512x512, border to border, can be full white if you want them to be colorized, or colorfull !

## Structure of an icon pack

Icons are installed in the `app/local/modules` folder

&nbsp;

Below is the complete and minimal required structure for an icon pack

```raw
MyIconPack.zip
├─ resources
│  ├─ db
│  │  └─ data
│  │     └─ my_icon_pack.php
│  └─ media
│     └─ library
│        ├─ icon1.png
│        ├─ icon2.png
│        ├─ icon3.png
│        ├─ icon4.png
│        └─ [...]
├─ package.json
└─ [...]
```

### package.json

The `package.json` is used by the Installer to know the requirements, and routines to run during the installation/update process of your icon pack

```json
{
  "name": "MyIconPack",
  "description": "MyIconPack description",
  "type": "icons",
  "version": "1.0",
  "dependencies": {
    "system": {
      "type": "SAE",
      "version": "5.1.0"
    }
  }
}
```

|Field|Required&nbsp;?|Description|
|-----|---------------|-----------|
|name|yes|Package name, avoid spaces and numbers|
|description|yes|Package description|
|type|yes|must be `icons`|
|version|yes|Your icon pack version, for updates|
|dependencies|yes|**version*:** 5.1.0 minimum, **type:** SAE/MAE/PE minimum installation type required|

** * version must be at least 5.1.0**

### Data

This file creates & updates the entry in database and copy assets at installation time

If you need to change options in your module while providing an update you must change the values here

**Note:** the icon pack is identified by its name (1st parameter of `installIcons`), and an icon by its path, installing again the same name and path updates instead of duplicating.

```php
<?php
$icons = [
    "app/local/modules/MyIconPack/resources/media/library/icon1.png",
    "app/local/modules/MyIconPack/resources/media/library/icon2.png",
    "app/local/modules/MyIconPack/resources/media/library/icon3.png",
    "app/local/modules/MyIconPack/resources/media/library/icon4.png",
];
$result = \Siberian_Feature::installIcons("MyIconPack", $icons, true);

```

* Parameters for `Siberian_Feature::installIcons` 

    **1st:**    icon pack name

    **2nd:**    $icons array()

    **3rd:**    colorizable true/false

    Each entry of `$icons` can also be an array `["path" => "...", "colorize" => true/false]` to override the 3rd parameter for one icon.

    It returns an array with `icon_id` (the first icon of the pack) and `library_id`, `icon_id` is used in the [Template](template) features.


## Package

When you are done with your icon pack, it's time to zip !

zip `resources` and `package.json` and you're done !

You can also give a look at this icon pack [icon-pack-yappix](https://github.com/Xtraball/icon-pack-yappix).

```raw
MyIconPack.zip
├─ resources
└─ package.json
```
