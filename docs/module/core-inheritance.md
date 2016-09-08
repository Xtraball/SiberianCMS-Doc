# Core inheritance & customization

[Improve this doc](https://github.com/Xtraball/SiberianCMS-Doc/blob/master/docs/module/core-inheritance.md)

In SiberianCMS we have designed an inheritance system to allow for custom modification & improvements.

## How it works ?

In the SAE Edition, you'll find two modules subtree in app, `sae` & `local` the local folder override sae, any file named the same as in sae will take precedency on it.

### Cache

The core inheritance is cached, so each time you add or remove a file in local, you must delete the file `var/cache/design.cache`

*Note: when installing and/or updating a module with the regular zip package, the cache is automatically cleared for the users.*

### Example

if you need to customize a template:

```txt
/app/sae/design/desktop/siberian/template/loyaltycard/application/edit.phtml
```

simply duplicate the file in local:

```txt
/app/local/design/desktop/siberian/template/loyaltycard/application/edit.phtml
```

Then apply your modification to this new file.

---

*Note: SiberianCMS regular update will not alter the local folder, so you can track your customizations safely.*