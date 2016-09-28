# Siberian Forms

In Siberian we have implemented our own Forms & Elements to control design and javascript events

Here is listed all these elements, how to use them from the  `View`, to the `Controller`

## Form example

Below is the code for a form using every single elements available, then each one being described

```php
<?php
/**
 * Class Form_Test
 */
class Form_Test extends Siberian_Form_Abstract {

    public function init() {
        parent::init();

        $db = Zend_Db_Table::getDefaultAdapter();

        $this
            ->setAction(__path("/form/test"))
            ->setAttrib("id", "form-test")
            ->addNav("form-test-nav")
        ;

        /** Bind as a create form */
        self::addClass("create", $this);

        /** Hidden */
        $this->addSimpleHidden("element_hidden");

        /** Image upload with crop */
        $this->addSimpleImage(
            "element_image", 
            __("Image"), 
            __("Import an image"), 
            array("width" => 300, "height" => 300)
        );

        /** Input text */
        $this->addSimpleText("element_text", __("Text"));

        /** Textarea */
        $this->addSimpleTextarea("element_textarea", __("Textarea"));

        $full = $this->addSimpleTextarea("element_textarea_100", __("Textarea 100%"));
        $full->setNewDesignLarge();

        /** Textara with CKEditor */
        $richtext = $this->addSimpleTextarea(
            "element_textarea_richtext", 
            __("Textarea Richtext")
        );
        $richtext->setRichtext();


        $this->addSimpleSelect(
            "element_select", 
            __("Select"), 
            array("Option #1", "Option #2", "Option #3", "Option #4")
        );

        $this->addSimpleMultiSelect(
            "element_multiselect", 
            __("Multi Select"), 
            array("Option #1", "Option #2", "Option #3", "Option #4")
        );

        $this->addSimpleCheckbox("element_checbox", __("Checkbox"));

        $this->addSimpleMultiCheckbox(
            "element_multichecbox", 
            __("Multi Checkbox"), 
            array("Option #1", "Option #2", "Option #3", "Option #4")
        );

        $this->addSimpleRadio(
            "element_radio",
            __("Radio"), 
            array("Option #1", "Option #2", "Option #3", "Option #4")
        );

        $this->addNav("submit-repeat", "OK", false);

    }
}
```

### Form action

The action to were the form submit its data is defined by `->setAction()`

```php
$this->setAction(__path("/form/test"))
```
        
### Form default nav `->addNav([...])` (required)

This will add on top of your a default navigation, with a back arrow & a submit button

```php
$this->addNav("form-test-nav")
```

#### parameters

```php
$this->addNav($name, $save_text = "OK", $display_back_button = true)
```

|Parameter|Type|Description|
|---|---|---|
|$name|`String`|A unique name to identify your nav ControlGroup|
|$save_text|`String`|The text used for the submit button|
|$display_back_button|`Boolean`|Wether to display or not the back button, used to repeat submit on long forms without back button|

### Form binders

Form events like `submit` or `change` are binded with css classes like below:

#### create

Binds a form to submit data `onSubmit` event, add the css class `create`

```php
self::addClass("create", $this);
```

This form reloads the feature on success, of append the form errors otherwise.

#### toggle

Binds a form to submit data `onSubmit` event for single toggling forms, add the css class `toggle` see [#toggle-forms](module/forms#toggle-forms)

```php
self::addClass("toggle", $this);
```

#### onchange

Binds a form to submit data `onChange` event for every single item in the form, add the css class `onchange` see [#toggle-forms](module/forms#onchange-forms)

```php
self::addClass("onchange", $this);
```


#### delete

Binds a form to submit data `onSubmit` event for single row forms, add the css class `delete` see [#toggle-forms](module/forms#delete-row)

```php
self::addClass("delete", $this);
```

This binder is used form small delete forms, to trigger various events

* Submit the delete form
* Check if the row was deleted, then remove the corresponding row dynamically from the table

## Elements

### Top navigation & submit

#### code

```php
$this->addNav("form-test-nav")
```

![01-top-nav](/img/forms/01-top-nav.png)

### Image upload with crop

#### code

```php
/** Image upload with crop */
$this->addSimpleImage(
    "element_image", 
    __("Image"), 
    __("Import an image"), 
    array("width" => 300, "height" => 300)
);
```

![02-image-upload](/img/forms/02-image-upload.png)

**Crop modal**

![02-image-crop](/img/forms/02-image-crop.png)

### Input text

#### code

```php
/** Input text */
$this->addSimpleText("element_text", __("Text"));
```

![03-text](/img/forms/03-text.png)

### Input password

#### code

```php
/** Input text */
$this->addSimpleText("element_text", __("Text"));
```

![04-password](/img/forms/04-password.png)

### Textarea

#### code

```php
/** Textarea */
$this->addSimpleTextarea("element_textarea", __("Textarea"));
```

![05-textarea](/img/forms/05-textarea.png)

### Textarea 100%

#### code

```php
$textarea_100 = $this->addSimpleTextarea("element_textarea_100", __("Textarea 100%"));
$textarea_100->setNewDesignLarge();
```

![06-textarea-100](/img/forms/06-textarea-100.png)

### Richtext (CKEditor)

#### code

```php
/** Textara with CKEditor */
$richtext = $this->addSimpleTextarea("element_textarea_richtext", __("Textarea Richtext"));
$richtext->setRichtext();
```

![07-richtext](/img/forms/07-richtext.png)

### Select

#### code

```php
$this->addSimpleSelect(
    "element_select", 
    __("Select"), 
    array("Option #1", "Option #2", "Option #3", "Option #4")
);
```

![08-select](/img/forms/08-select.png)

### MultiSelect

#### code

```php
$this->addSimpleMultiSelect(
    "element_multiselect", 
    __("Multi Select"), 
    array("Option #1", "Option #2", "Option #3", "Option #4")
);
```

![09-multiselect](/img/forms/09-multiselect.png)

### Checkbox

#### code

```php
$this->addSimpleCheckbox("element_checbox", __("Checkbox"));
```

![10-checkbox](/img/forms/10-checkbox.png)

### MultiCheckbox

#### code

```php
$this->addSimpleMultiCheckbox(
    "element_multichecbox", 
    __("Multi Checkbox"), 
    array("Option #1", "Option #2", "Option #3", "Option #4")
);
```

![11-multicheckbox](/img/forms/11-multicheckbox.png)

### Radio button

#### code

```php
$this->addSimpleRadio(
    "element_radio", 
    __("Radio"), 
    array("Option #1", "Option #2", "Option #3", "Option #4"));
```

![12-radio](/img/forms/12-radio.png)

### Submit repeat (for long forms)

#### code

```php
$this->addNav("submit-repeat", "OK", false);
```

![13-repeat-submit](/img/forms/13-repeat-submit.png)