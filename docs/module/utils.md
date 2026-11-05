# Utils

[Edit this on Github](https://github.com/Xtraball/SiberianCMS-Doc/edit/master/docs/module/utils.md)

In this section you'll find a description of the tools & libraries shipped with Siberian, some are useful other are almost mandatory.

**Note: utils are global functions and can be used everywhere in Siberian.**

## Translations

`p__($context, $format [, mixed $args [, mixed $... ]])`

To translate anything you must use this function 

Behind the scene we use a sprintf to format the strings, so this functions works the same

```php
echo p__("context_key", "Hello %s !", "World");
```

An array can be given instead of the sprintf arguments, its keys are then replaced in the string: `p__("context_key", "Hello :name", [":name" => "World"])`.

The context is here to prevent mixup between modules & features.

Default text is used as a key to be used in the translation system, and must be in english, however when building your module you can ship it with any translations you want, and we encourage you to do so !

## Design

Using the function `design_code()` you'll get the current theme, `flat` as of today (it is the only one).

## String manipulations

### cut

`cut($string, $length, $suffix = "...", $strip_tags = true)`

This function simply cuts any given `$string` to the desired `$length`, you can also specify a custom `$suffix` and the html tags are always stripped (the `$strip_tags` argument is ignored).

### ellipsis

`ellipsis($string, $length, $ellipsis = "...")`

This function shortens your `$string` to the desired `$length` by keeping its beginning and its end and replacing the middle with `$ellipsis` (characters can be changed).

### formatBytes

`formatBytes($bytes, $precision = 2)`

Convert `$bytes` to human readable strings, `$precision` can be adjusted.

### __js

`__js($string, $escape = '"' [, mixed $args [, mixed $... ]])`

This function is used to create safe JavaScript strings, the default character to escape is `"` but you can change it to `'`

**Note:** this function also uses the translation function `__()` behind the scene. 

For a contextual string use `p__js($context, $string, $escape = '"' [, mixed $args ...])`. `__jss($string)` and `__jsd($string)` are shortcuts forcing `'` and `"`.

### __path

`__path($path, $values, $locale)`

This function allows to build URI relative path, you can also specify the `$locale` if you need to build a specific foreign page.

Example:

```php
echo __path("/job/application/edit", array("value_id" => 12, "option_id" => 42));

# output
/job/application/edit/value_id/12/option_id/42
```

### __url

`__url($path, $values, $locale)`

This function allows to build fully qualified URI, you can also specify the `$locale` if you need to build a specific foreign page.

Example:

```php
echo __url("/job/application/edit", array("value_id" => 12, "option_id" => 42));

# output
http://www.yourdomain.com/job/application/edit/value_id/12/option_id/42
```

### data_to_utf8

The function `data_to_utf8($array)` recursively walks against the given `$array` and try to detect/fix non-utf8 strings.

---

## Image manipulation

### PNG & JPEG Optimizers

The class `Siberian_Media` provides a simple interface that will optimize/crush the given media in place.

Usage `Siberian_Media::optimize($media_path, $force = false)` that's all.

