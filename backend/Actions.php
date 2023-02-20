<?php

include_once "Database/DbConnect.php";
include_once "HelperFunctions/response.php";
include_once "ProductGroups/Furniture.php";
include_once "ProductGroups/DVD.php";
include_once "ProductGroups/Book.php";
include_once "ProductGroups/Invalid.php";
include_once "Operations.php";

class Actions extends Operations
{
    //get products from db
    public function getRecords()
    {
        return response($this->getAll("sku"));
    }
    //add products to db or delete depending on post body
    public function setordeleteRecord()
    {
        $product = json_decode(file_get_contents("php://input"), true);
        if (count($product) > 1) {
            $cname = $product["type"];
            if (class_exists($cname)) {
                $newproduct = new $cname($product);
                $errors = $newproduct->validateData();
                if (!$errors) {
                    return response(
                        $this->save($newproduct, [
                            "sku",
                            "name",
                            "price",
                            "type",
                            "value",
                        ])
                    );
                } else {
                    return response($errors);
                }
            } else {
                $newproduct = new Invalid($product);
            }
        } else {
            $deletesku = $product["sku"];
            return response($this->erase("sku", $deletesku));
        }
    }
    public function deleteRecord()
    {
        //delete using delete method and url query
        //not used due to hosting site limitations
        $deletesku = $_GET["sku"];
        return response($this->erase("sku", $deletesku));
    }
}
?>
