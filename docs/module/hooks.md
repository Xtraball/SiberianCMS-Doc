# Hooks


Listeners are registered with `Hook::listen($action, $name, $callback, $priority)` (usually in your `init.php`) and run by ascending priority. Each callback receives the payload returned by the previous one, so **always return the payload**: a callback that returns nothing hands `null` to the next listeners. An exception or error thrown in a listener is logged and the payload is restored as it was before that listener.

### Navigation Hooks

* [Editor](./menus#editor-side-menu)

* [Backoffice](./menus#backoffice-side-menu)

### Editor admin

* [Admin](./admin#register)

### Customer App

* [App](./app#appinitready)

* [Login](./customer#mobile-login)

* [Register](./customer#mobile-register)

* Also in [Customer](./customer): logout, forgot password, change password and account deletion

### Modules

* [Loyalty Card](./loyalty-card)
