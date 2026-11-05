# Testing a module

Siberian has a small regression suite that runs against the real core classes of a trunk checkout, with no stubs. You can add tests for your module to it. This page only describes what the suite does today.

## What the suite is (and is not)

 - A plain PHP runner, `tests/php-upgrade/run.php`, with no PHPUnit and no database.
 - `tests/php-upgrade/bootstrap.php` loads only the bundled Zend, the committed composer vendor tree and a few Siberian helpers. It does **not** start the application, read `config.php` or connect to a database.
 - Code that needs the full application (controllers, models that query the database) cannot be loaded as is. Put the rule in a small pure class and test that, and add source-level checks (read the file and assert that the wiring is there). Anything beyond that is an integration test on a running instance, and no harness for it ships with the repository.

## Setup

1. Get a checkout of the Siberian `trunk` branch.
2. Put your module in `siberian/app/local/modules/<Name>` (see [Modules](../module)).
3. Add your test file in `tests/php-upgrade/regression/`.

## Running

From the repository root:

```sh
php tests/php-upgrade/run.php
php tests/php-upgrade/run.php --fail-fast
php tests/php-upgrade/run.php MyModule
```

The optional argument is a filter: only tests whose id (`<FileName> :: <test name>`) contains it, case-insensitive, are run. The output ends with the PHP version, the passed and failed counts and the number of deprecations. The exit code is 1 when a test failed.

Warnings and errors raised inside a test fail it. Deprecations are counted but do not fail.

## Writing a test

A test file is named `<Name>Test.php`, in `tests/php-upgrade/regression/`, and returns an array of `'test name' => callable`. A test passes when the callable returns, and fails when it throws.

```php
<?php

// Load the class under test: the suite has no application autoloader for modules
$module = dirname(__DIR__, 3) . '/siberian/app/local/modules/MyModule';
if (!class_exists('MyModule_Model_Helper', false)) {
    require_once $module . '/Model/Helper.php';
}

return [
    'helper trims the title' => function () {
        t_equal('Hello', MyModule_Model_Helper::title('  Hello '), 'title');
    },
    'module ships its init file' => function () use ($module) {
        t_true(is_file($module . '/init.php'), 'init.php');
    },
];
```

Helpers from `bootstrap.php`:

helper|details
---|---
`t_equal($expected, $actual, $label = '')`|strict (`!==`) comparison, throws with both values when they differ
`t_true($actual, $label = '')`|casts to bool, then the same as `t_equal(true, ...)`
`t_server()`|starts a local `php -S` server on `fixtures/router.php` and returns its base URL, for tests that need HTTP

Load what you test with `require_once`, as the existing tests do (for example `Issue524ReinstallTest.php` loads a helper class of the Installer module). Only classes that do not need the database or the application registry can be loaded this way.

Name a regression test after the issue it covers, and make sure it fails without the fix.

## PHP versions and lint

 - The core supports PHP `>=8.2 <8.6`. Run your tests on every supported version.
 - `tests/php-upgrade/Dockerfile.ci` builds a `php:<version>-cli` image with the extensions needed (gd, pdo_mysql, mysqli, intl, bcmath, zip). `tests/php-upgrade/ci.sh <version>` builds it and runs the whole gate in Docker, for example `tests/php-upgrade/ci.sh 8.5`.
 - The gate (`fast-fail.sh`) runs `php -l` on first-party code, so a parse or fatal error fails it, and then the regression suite. Run `php -l` on your own files too.
 - Before a pull request, check your branch with `tests/php-upgrade/check-pr.sh [base-ref]`: it fails on CRLF line endings and on new `__()` / `p__()` texts missing from a `.po` catalog, and warns when source changed without a test.
