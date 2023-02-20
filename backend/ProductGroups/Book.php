<?php

include_once "Product.php";

class Book extends Product
{
    //Book weight value validation and formatting
    protected function validateValue()
    {
        if (!$this->data["weight"]) {
            return "Weight was not provided!";
        }

        if (
            is_numeric($this->data["weight"]) &&
            floatval($this->data["weight"] >= 0)
        ) {
            $this->value = "Weight: " . $this->data["weight"] . " KG";
            return "";
        }

        return "Invalid Weight!";
    }
}
