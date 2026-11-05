# For AI agents

This page is for coding agents and automation that read these docs to build or change a Siberian module, layout, template or integration. Humans are welcome too.

## Start here

1. Read [Getting started](documentation.md) for what Siberian is and how it is built.
2. Read [Modules](module.md) and [Basic usage](module/basic.md): structure, `package.json`, schema, `feature.json`, translations, packaging.
3. Open the **reference module** below and copy its shape instead of inventing one.
4. Check every signature you use against the Siberian code on `trunk`. **When the code and these docs disagree, the code wins**: fix the docs and open an issue.

Machine readable entry points:

| What | Where |
|------|-------|
| Index of every page, one line each | [llms.txt](/llms.txt) |
| All pages in one plain text file | [llms-full.txt](/llms-full.txt) |
| Raw Markdown of any page | `https://raw.githubusercontent.com/Xtraball/SiberianCMS-Doc/master/docs/<page>.md` |
| Siberian source | [github.com/Xtraball/Siberian](https://github.com/Xtraball/Siberian), branch `trunk` |

## Reference modules

Start from the first one, then read the others when you need more.

| Module | Use it for | Layout |
|--------|-----------|--------|
| **[module-skeleton](https://github.com/Xtraball/module-skeleton)**: start here | The smallest complete feature: one table, one editor form that saves, one mobile page that loads it, a `tools/pack.sh` that builds the zip. Copy it and rename it | Current: `init.php`, `features/<code>/feature.json` |
| **Job**, in the core: `siberian/app/sae/modules/Job` on `trunk` | A full-sized feature that is always in sync with the core: several tables, forms, lists, an API, several mobile screens, `.po` translations | Current |
| **[siberian-module-skeleton](https://github.com/Xtraball/siberian-module-skeleton)** | The Job module as a standalone package, with email templates and an uninstall script | Older: `bootstrap.php`, assets registered from `resources/var/apps`, `.csv` translations. It still installs, but do not copy its layout |

For anything new, use the layout of `module-skeleton` and the Job module in the core, and the [Modules](module.md) page.

## Where each part of a feature lives

Paths are relative to the module folder, in `module-skeleton` (the file names are the same in Job, with more files).

| You are building | Read the docs | Look at |
|------------------|---------------|---------|
| Database tables and default data | [Modules: schema and data](module.md) | `resources/db/schema/module_skeleton.php`, `resources/db/data/` |
| Models | [Modules](module.md) | `Model/Skeleton.php`, `Model/Db/Table/Skeleton.php` |
| **Editor** page (the desktop screen where an app owner sets the feature up) | [Forms](module/forms.md), [Modules: layout files](module.md) | `controllers/ApplicationController.php`, `Form/Skeleton.php`, `resources/design/desktop/flat/layout/*.xml` and `.../template/.../edit.phtml` |
| **Mobile** app screens | [Modules: feature.json](module.md), [Ionic tools](stack/ionic-tools.md), [Utilities](stack/utilities.md), [Offline mode](module/offline-mode.md) | `features/module_skeleton/feature.json`, `js/controllers/`, `js/factory/`, `assets/templates/l1/` |
| JSON the app loads | [Modules](module.md) | `controllers/Mobile/ListController.php` |
| Public API (for other systems) | [API](api.md) | `controllers/Api/` in the Job module |
| **Backoffice** screens and menus | [Menus](module/hooks/menus.md), [Admin hooks](module/hooks/admin.md) | `siberian/app/sae/modules/Backoffice` in the core |
| Reacting to events | [Hooks](module/hooks.md) | `init.php` |
| Push notifications | [Push](module/push.md) | |
| Customer account fields | [My account](module/account.md) | |
| Texts and translations | [Translations in Modules](module.md) | `resources/translations/default/*.po` in the Job module |
| Icons | [Icons](customization/icon.md) | `features/<code>/icons/` |

The flow of `module-skeleton`, end to end: the editor form (`Form/Skeleton.php`) posts to `ApplicationController::saveAction`, which saves a row; the app route in `feature.json` opens the Angular controller, whose factory calls `ListController::loadContentAction` through `$pwaRequest`; the template shows the result.

## Rules that save you a rejected change

- **Texts go in a `.po` catalog**, through `p__('<context>', '...')` in PHP. When PHP prints a text inside a JavaScript string, use `p__js` instead (see [Utils](module/utils.md)). Never add a new `.csv` file.
- **New behaviour is an option, off by default.** Do not change what existing installations do.
- **Schema and data files must be idempotent.** They run again on update. An installed module is only updated when the `package.json` version is higher than the installed one, so bump it when you change a schema.
- **LF line endings only.**
- **The app JavaScript runs on Android and iOS.** Do not rely on a behaviour of only one platform. The minimum is Android 8 and iOS 15.
- **After adding, renaming or deleting a design file**, rebuild the design cache with `php cli cache:design` (see [CLI](cli/siberian.md)), otherwise the file is never served.
- **Do not edit files on a customer or production server.** Work in your module, package it, install it.
- **Test against a real Siberian checkout** of `trunk`, not stubs. A feature is not done until it installs, shows in the editor and works in the app preview.

## Package and install

1. Build the zip with `./tools/pack.sh` (in `module-skeleton`), or zip the **contents** of the module folder yourself so that `package.json` is at the root of the zip. A "Download ZIP" from GitHub puts everything in a sub folder and will not install.
2. Upload the zip in the backoffice module installer (`Installer_Backoffice_ModuleController::uploadAction` in the core), or in a development tree copy the folder into `siberian/app/local/modules/<Name>`.
3. In `package.json`, set `dependencies.system.version` to the oldest Siberian your module supports (the docs assume 5.1.0 and later).

## When something is missing or wrong

Open an issue on [github.com/Xtraball/Siberian/issues](https://github.com/Xtraball/Siberian/issues) with your Siberian version, what you did, what you expected and what happened.
