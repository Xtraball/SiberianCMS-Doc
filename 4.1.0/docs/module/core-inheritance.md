# Core inheritance & customization

In SiberianCMS we have designed an inheritance system to allow for custom modification & improvements.

## How it works ?

In the SAE Edition, you'll find two modules subtree in app, `sae` & `local` the local folder override sae, any file named the same as in sae will take precedency on it.

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

*Note: SiberianCMS regular update will never touch to the local folder, so you can track your customizations safely.*