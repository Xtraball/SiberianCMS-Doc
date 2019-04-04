# Icon

[Edit this on Github](https://github.com/Xtraball/SiberianCMS-Doc/edit/master/docs/customization/icon.md)

** *Note: icon packages require Siberian 4.6.1 and above, otherwise they will not work* **

### What you need

* Cool icons to share an awesome pack !

**And to define two names:**

* Your icons pack name, like `MyIconPack`.

### Requirements

* Icons must be 512x512, border to border, can be full white if you want them to be colozired, or colorfull !

## Structure of a layout package

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
      "version": "4.6.1"
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
|dependencies|yes|**version*:** 4.6.1 minimum, **type:** SAE/MAE/PE minimum installation type required|

** * version must be at least 4.6.1**

### Data

This file creates & updates the entry in database and copy assets at installation time

If you need to change options in your module while providing an update you must change the values here

**Note:** you must never change `code` as this is the unique_code used to update your layout, otherwise this will create a new layout.

```php
<?php
$icons = [
    "app/local/modules/MyIconPack/resources/media/library/icon1.png",
    "app/local/modules/MyIconPack/resources/media/library/icon2.png",
    "app/local/modules/MyIconPack/resources/media/library/icon3.png",
    "app/local/modules/MyIconPack/resources/media/library/icon4.png",
];
$result = Siberian_Feature::installIcons("MyIconPack", $icons, true);

```

* Parameters for `Siberian_Feature::installIcons` 

    **1st:**    icon pack name

    **2nd:**    $icons array()

    **3rd:**    colorizable true/false


## Package

When you are done with your icon pack, it's time to zip !

zip `resources` and `package.json` and you're done !

You can also give a look at this icon pack [icon-pack-yappix](https://github.com/Xtraball/icon-pack-yappix).

```raw
MyIconPack.zip
├─ resources
└─ package.json
```
