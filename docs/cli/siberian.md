# Siberian CLI Documentation

[Edit this on Github](https://github.com/Xtraball/SiberianCMS-Doc/edit/master/docs/cli/siberian.md)

## Introduction

Siberian ships with a CLI to help debugging & troubleshooting. Run it from the `siberian` folder with `./cli` (or `php cli`).

## CLI available methods

|Method|Min. version|Params|Description|
|------|------------|------|-----------|
|export:schemas|4.13.10|-|Exports the current schema tables (only schemas) to `var/schema/CURRENT_VERSION/TABLE.php` this is useful to prepare db files for your custom modules|
|export:database|4.13.10|-|Exports the current mysql database|
|version|4.13.10|`version`|Updates `lib/Siberian/Version.php` with the given version|
|user:create|4.13.10|-|This action will ask for an e-mail and a password to create a new backoffice user|
|user:update-password|4.13.10|-|This action will ask for an e-mail and a password, usefull to change a lost backoffice password|
|dev / development|4.13.10|-|Fast switch in development mode|
|prod / production|4.13.10|-|Fast switch in production mode|
|cache:design|4.14.0|`sae`, `mae`, `pe`|Rebuilds SAE/MAE/PE cache for design files|
|cache:clear|4.14.4|-|Clear `var/cache`, `var/log` & `var/tmp`|
|license:set|4.14.13|`license`|Set the product license from cli|
|i18n:extract|4.15.0|`[module] [context]`|Extracts all missing translations|
|app:manifest|4.14.6|`--skip-cache`|Rebuilds the app manifest|
|app:keystore:restore|4.14.13|`appId`|Extracts a keystore from the database|
|info / infos|-|-|Prints generic information about the current installation|
|password|-|`[length]`, `--no-uppercase`, `--no-numeric`, `--no-special`|Generates a strong password (24 characters by default)|
|https|-|`on`, `off`|Switch the soft HTTP to HTTPS redirection on or off|
|test:http2|-|-|Tests whether HTTP/2 is available in php-curl for the cli and cron|
|module:version:get|-|-|Lists the installed modules and their versions|
|module:version:set|-|`module`, `version`|Sets the version of an installed module|
|module:quarantine|-|`list`, `recheck [Module]`, `release Module`, `scan`|Lists, rechecks, releases or scans the modules of `app/local/modules` put in quarantine|
|build:queue:flush|-|-|Flushes the source and APK build queues and removes the locks|
|security:scan|-|`filePath`|Scans the given file with ClamAV (if configured in the Backoffice)|
|subscription:check-payments|-|-|Manually runs the payment verification for expired subscriptions (PE, normally run by the cron)|
|subscription:sync|-|-|Manually caches the payment statuses|
|google:test-api-key|-|`apiKey`|Tests a Google Maps API key|
|waf:status / waf:enable / waf:disable|-|-|Gets, enables or disables the Web Application Firewall|
|waf:extension:list|-|-|Lists the extensions allowed by the Web Application Firewall|
|waf:extension:allow / waf:extension:disallow|-|`extension`|Allows or disallows an extension in the Web Application Firewall|
|help|4.14.0|-|Display the command help manual|

### Examples

```bash
prompt $ ./cli export-schemas

prompt $ ./cli export-database
Filename for the export: dump.sql
Export done.

prompt $ ./cli version 4.13.7

prompt $ ./cli user:create
Input new backoffice user e-mail: demo@demo.com
Input new backoffice user password: ********
Your new user is now created.

prompt $ ./cli user:update-password
Input backoffice user e-mail to change: demo@demo.com
Your new password (min 9 characters, 1 uppercase letter, 1 lowercase, 1 number & 1 special character): ********
Password successfully changed.

prompt $ ./cli dev


prompt $ ./cli prod

prompt $ ./cli cache:design <sae|mae|pe>

prompt $ ./cli cache:clear

prompt $ ./cli app:manifest

prompt $ ./cli help
```