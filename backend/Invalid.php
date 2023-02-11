<?php

include_once 'Product.php';

class Invalid extends Product
{
    protected function validateValue()
    {
        return "Validity of value couldn't be confirmed due to the product type being invalid!";
    }
}
?>