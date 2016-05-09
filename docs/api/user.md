# Application - Create

## Description

Create a new application by providing at least a name and a user identifier.

## Request

Param|Type|Details|Default
name *|string|Application name
user_id *|int|Owner unique identifier
key|string|Application Key - Must be unique (e.g. http://www.domain.com/my-key)
font_family|string|Arial, Helvetica, Verdana, Georgia, Times new roman, Palatino
domain|string|(e.g. m.domain.com)
is_active|boolean|Render the application invisible from the editor|true
is_locked|boolean|Activate or deactivate the application|true
Param|Type|Details|Default
* Required fields