<?php

include_once 'Product.php';

class DVD extends Product
{
    protected function validateValue()
    {
        if (!$this->data['size']) {
            return "Size was not provided!";
        }

        if (is_numeric($this->data['size']) && floatval($this->data['size'] >= 0)) {
            $this->value = 'Size: ' . $this->data['size'] . ' MB';
            return "";
        }

        return "Invalid DVD size!";
    }
};