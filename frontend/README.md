# My Junior Developer Test for Scandiweb.

A web app that uses Reactjs for the frontend and PHP backend with Mysql database.
It contains two pages:

1. Product list page
2. Adding a product page

## Requirements the list items:

• SKU (unique for each product)
• Name
• Price in $
• One of the product-specific attributes and its value
◦ Size (in MB) for DVD-disc
◦ Weight (in Kg) for Book
◦ Dimensions (HxWxL) for Furniture

### Required UI elements:

• “ADD” button, which would lead to the “Product Add” page
• “MASS DELETE” action, implemented as checkboxes next to each product
(should have a class: .delete-checkbox) and a button “MASS DELETE” triggering
delete action for the selected products.
• There should be no pagination for the listing, all items should be on the same
page
• Do not show any notification messages or alert windows loading the list or after
submitting ADD new product dialogue

## Requirements for the product-add page

This page should open once button "ADD" is pressed, and should be accessible by:
<your_website>/add-product
The page should display a form with id: #product_form, with the
following fields:
• SKU (id: #sku)
• Name (id: #name)
• Price (id: #price)
• Product type switcher (id: #productType) with following options:
◦ DVD (can be value or text)
◦ Book (can be value or text)
◦ Furniture (can be value or text)
• Product type-specific attribute
◦ Size input field (in MB) for DVD-disc should have an ID: #size
◦ Weight input field (in Kg) for Book should have an ID: #weight
◦ Each from Dimensions input fields (HxWxL) for Furniture should have an
appropriate ID:
▪ Height - #height
▪ Width - #width
▪ Length - #length

### Add product page requirements:

• The form should be dynamically changed when the type is switched
• Special attributes should have a description, related to their type, e.g.: “Please,
provide dimensions” / “Please, provide weight” / “Please, provide size” when
related product type is selected
• All fields are mandatory for submission, missing values should trigger
notification “Please, submit required data”
• Implement input field value validation, invalid data must trigger notification
“Please, provide the data of indicated type”
• Notification messages should appear on the same page without reloading
• The page must have a “Save” button to save the product. Once saved, return to
the “Product List” page with the new product added.
• The page must have a “Cancel” button to cancel adding the product action.
Once canceled, returned to the “Product List” page with no new products added.
• No additional dialogues like “Are you sure you want to Save / Cancel?”
• SKU should be unique for each product and it shouldn’t be possible to save
products if already any product with the same SKU exists.
