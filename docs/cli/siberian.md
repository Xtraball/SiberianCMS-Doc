# Siberian CLI Documentation

[Edit this on Github](https://github.com/Xtraball/SiberianCMS-Doc/edit/master/cli/siberian.md)

## Introduction

Siberian ships with a CLI to help debugging & troubleshooting.

## CLI available methods

|Method|Min. version|Params|Description|
|------|------------|------|-----------|
|export-db|4.13.9|-|Exports the current schema tables (only schemas) to `var/schema/CURRENT_VERSION/TABLE.php` this is useful to prepare db files for your custom modules|
|version|4.13.9|version|Updates `lib/Siberian/Version.php` with the given version|
|user:password|4.13.9|-|This action will ask for an e-mail and a password, usefull to change a lost backoffice password|
|dev / development|4.13.9|-|Fast switch in development mode|
|prod / production|4.13.9|-|Fast switch in production mode|

### Examples

```raw
prompt $ ./cli export-db

prompt $ ./cli version 4.13.7

prompt $ ./cli user:password

prompt $ ./cli user:password
Input backoffice user e-mail to change: demo@demo.com
Your new password (min 8 characters): ********
Password successfully changed.

prompt $ ./cli dev

prompt $ ./cli prod

```