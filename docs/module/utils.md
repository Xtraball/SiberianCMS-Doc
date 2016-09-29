# Utils

In this section you'll find a description of the tools & libraries shipped with Siberian, some are usefull other are almost mandatory.

**Note: utils are global functions and can be used everywhere in Siberian.**

## Translations

To translate anything you must user this function `__($format [, mixed $args [, mixed $... ]])`

Behind the scene we use a sprintf to format the strings, so this functions works the same

```php
echo __("Hello %s !", "World");
```

Default text is used as a key to be used in the translation system, an must be in english, however when building your module you can ship it with any translations you want, and we encourage you to do so !

## Design

Using the function `design_code()` you'll get the current theme `siberian` or `flat` as now.

## String manipulations

### cut

`cut($string, $length, $suffix = "...", $strip_tags = true)`

This function simply cuts any given `$string` to the desired `$length`, you can also specify a custom `$suffix` and tell to strip the html tags.

### ellipsis

`ellipsis($string, $length, $ellipsis = "...")`

This functions cut your `$string` to the desired `$length`, `$ellipsis` characters can be changed.

### formatBytes

`formatBytes($bytes, $precision = 2)`

Convert `$bytes` to human readable strings, `$precision` can be changed

### __js

`__js($string, $escape = '"' [, mixed $args [, mixed $... ]])`

This function is used to create safe JavaScript strings, the default character to escape is `"` but you can changed it to `'`

Note also that this functions use the translation function `__()` behind the scene. 

### __path

This function allows to build URI relative path.

Example:

```php
echo __path("/job/application/edit", array("value_id" => 12, "option_id" => 42));

# output
/job/application/edit/value_id/12/option_id/42
```

### data_to_utf8

The function `data_to_utf8($array)` recursively walks against the given `$array` and try to detecte non-utf8 strings.

---

## Image manipulation

### PNG & JPEG Optimizers

The class `Siberian_Media` provides a simple interface that will optimize/crush the given meia in place.

Usage `Siberian_Media::optimize($media_path)` that's all.

