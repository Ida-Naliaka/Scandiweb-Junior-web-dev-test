<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
include_once 'Invalid.php';
include_once 'Book.php';
include_once 'DVD.php';
include_once 'Furniture.php';
include_once 'DbConnect.php';

$objDb = new DbConnect;
$conn = $objDb->connect();
$method = $_SERVER['REQUEST_METHOD'];
switch($method) {
    case "GET":
        $sql="SELECT * FROM `products` ORDER BY sku";
        $statement = $conn->query($sql);
        $products= $statement->fetch_all(MYSQLI_ASSOC);
        echo json_encode($products);
        break;
    case "POST":
        $newproduct = new Invalid([]);
        $errors = [];
        $product = json_decode( file_get_contents('php://input'), true );
        if (count($product)>1) {
            $cname = $product['type'];
            if (class_exists($cname)) {
                $newproduct = new $cname($product);
                $errors = $newproduct->validateData();
                if(!$errors){
                    strpos($newproduct->name, "'") && $newname= str_replace("'","\'", $newproduct->name);
                    $prodname= $newname ?? $newproduct->name;
                    $sql = "INSERT INTO `products` (`sku`, `name`, `price`, `type`, `value`)
                    VALUES ('$newproduct->sku', '$prodname', $newproduct->price, '$newproduct->type', '$newproduct->value')";
                    $statement = $conn->query($sql);
                    $statement ? ($response = ['status' => 1, 'message' => 'Record created successfully.']) : $response = ['status' => 0, 'message' => 'Failed to create record.'];
                    echo json_encode($response);
                } else {
                    echo json_encode($errors);
                };
            } else {
                $newproduct = new Invalid($product);
                echo "class doesnt exist";
            }
        } else { 
              $deletesku = $product['sku'];
            $hasnumber=ctype_digit($deletesku);
            $hasletter=preg_match("/[a-z]/i", $deletesku);
            if ( $hasnumber && $hasletter ) {
            $sql="DELETE FROM `products` WHERE sku LIKE '%$deletesku%'";
            $statement = $conn->query($sql);
            $statement ? ( $response = ['status' => 1, 'message' => 'Record deleted successfully.']) : ($response = ['status' => 0, 'message' => 'Failed to delete record.']);
            echo json_encode($response);
            } else {
                $sql="DELETE FROM `products` WHERE sku='$deletesku'";
            $statement = $conn->query($sql);
            $statement ? ( $response = ['status' => 1, 'message' => 'Record deleted successfully.']) : ($response = ['status' => 0, 'message' => 'Failed to delete record.']);
            echo json_encode($response);
            }
        }
        break;
}

?>