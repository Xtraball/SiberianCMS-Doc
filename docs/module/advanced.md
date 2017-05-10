# Advanced usage 

[Edit this on Github](https://github.com/Xtraball/SiberianCMS-Doc/edit/master/docs/module/advanced.md)

## Ionic code

Everything you need to organize, style & interact with your Feature in the native apps is located in the `var` folder

Files are merged at install/update `var/apps/browser` for the Overview & HTML5 App.

For the native apps, files are merged only when downloading source code, or generating the APK:

* The `CSS` & `JS` files are automatically appended to the index.html

* The `templates`  & `images` are copied into the source code, so path's are relative to it [example](#controller-example)

```raw
ModuleName
├─ [...]
├─ resources
│  └─ var
│     └─ apps
│        └─ modules
│           └─ job
│              ├─ styles
│              │  └─ job.css
│              ├─ controllers
│              │  └─ job.js
│              ├─ services
│              │  └─ job.js
│              ├─ factory
│              │  └─ job.js
│              ├─ directives
│              │  └─ job.js
│              ├─ img
│              │  ├─ company.png
│              │  └─ job.png
│              └─ templates
│                 └─ l1
│                    └─ view.html
└─ [...]
```