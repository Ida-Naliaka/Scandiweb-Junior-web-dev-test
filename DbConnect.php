<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include_once 'Invalid.php';
include_once 'Book.php';
include_once 'DVD.php';
include_once 'Furniture.php';
include_once 'env.php';
class DbConnect {
         public function connect() {
        $server = "localhost";
        $dbname= getenv("dbname");
        $username = getenv("user");
        $pass = getenv("pass");
        $conn = new mysqli($server, $username, $pass);
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        } 
        // Creating a database named newDB
        $statement = $conn->query("SELECT COUNT(*) FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = 'products_server';");
        if (!$statement->fetch_row()[0]) {
            $db = "CREATE DATABASE products_server";
            if ($conn->query($db) === TRUE) {
                echo "Database created successfully";
                $result = $conn->query("SELECT DATABASE()");
                $row = $result->fetch_row();
                echo("Default database is %s.\n". $row[0]);
                $conn -> select_db("products_server");
                $result = $conn->query("SELECT DATABASE()");
                $row = $result->fetch_row();
                echo("Default database is %s.\n". $row[0]);
                $table= "CREATE TABLE `products` (
                    `sku` varchar(255) COLLATE utf8_bin NOT NULL PRIMARY KEY,
                    `name` varchar(255) COLLATE utf8_bin NOT NULL,
                    `price` float NOT NULL,
                    `type` varchar(255) COLLATE utf8_bin NOT NULL,
                    `value` varchar(255) COLLATE utf8_bin NOT NULL,
                    `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
                    `updated_at` timestamp)";
                if ($conn->query($table) === TRUE) {
                    echo "Table products created successfully";
                    $sql= "INSERT INTO `products` (`sku`, `name`, `price`, `type`, `value`) VALUES
                    ('10001', 'War and Peace', 20, 'Book', 'Weight: 2 KG'),
                    ('10002', 'Acme DISC', 1, 'DVD', 'Size: 700 MB'),
                    ('10003', 'Chair', 40, 'Furniture', 'Dimensions: 24x45x15 CM')";
                    if ($conn->query($sql) === TRUE) {
                        echo "New record created successfully";
                      } else {
                        echo "Error: " . $sql . "<br>" . $conn->error;
                      } 
                  } else {
                    echo "Error creating table: " . $conn->error;
                  }
              } else {
                echo "Error creating database: " . $conn->error;
              }
          // $conn->close();
        }
        $conn-> select_db("products_server");
    }
    
    public function processes() {
        $server = "localhost";
        $dbname= getenv ("dbname");
        $username = getenv("user");
        $pass = getenv("pass");
        $conn = new mysqli($server, $username, $pass, $dbname);
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        } 
    $method = $_SERVER['REQUEST_METHOD'];
        switch($method) {
            case "GET":
                $sql="SELECT * FROM products_server.products";
                $statement = $conn->query($sql);
                $products= $statement->fetch_all(MYSQLI_ASSOC);
                echo json_encode($products);

        break;
    case "POST":
        $newproduct = new Invalid([]);
        $errors = [];
        $product = json_decode( file_get_contents('php://input'), true );
        if ($product) {
             echo $product['type'];
            echo "product has been decoded!";
            echo '<pre>'; print_r($product); echo '</pre>';
        } 
       
        $cname = $product['type'];
        echo $cname;
        if (class_exists($cname)) {
            $newproduct = new $cname($product);
             
        } else {
            $newproduct = new Invalid($product);
            echo "class doesnt exist";
        }
        $errors = $newproduct->validateData();
        if(!$errors){
            if(strpos($newproduct->name, "'")) {
               $newname= str_replace("'","\'", $newproduct->name);
            }
            $prodname= $newname ?? $newproduct->name;
            //$created_at = date('Y-m-d H:i:s');
            $sql = "INSERT INTO `products` (`sku`, `name`, `price`, `type`, `value`)
            VALUES ('$newproduct->sku', '$prodname', $newproduct->price, '$newproduct->type', '$newproduct->value')";
            $statement = $conn->query($sql);

        if($statement) {
            $response = ['status' => 1, 'message' => 'Record created successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to create record.'];
        }
        echo json_encode($response);
    }
    echo json_encode($errors);
        break;

    case "PUT":
        $product = json_decode( file_get_contents('php://input') );
        $updated_at = date('Y-m-d');
        $sql = "UPDATE products SET name= $product->name, price =$product->price, type =$product->type, value =:$product->value, updated_at = $updated_at WHERE sku = $product->sku";
        $statement = $conn->query($sql);
        if($statement) {
            $response = ['status' => 1, 'message' => 'Record updated successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to update record.'];
        }
        echo json_encode($response);
        break;

    case "DELETE":
            $deletesku= htmlspecialchars($_GET["sku"]);
            $sql="DELETE FROM products WHERE sku=".$deletesku;
            $statement = $conn->query($sql);

        if($statement) {
            $response = ['status' => 1, 'message' => 'Record deleted successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to delete record.'];
        }
        echo json_encode($response);
        break;
    };
}
 public function getProduct($sku)
    {
        $server = "localhost";
        $dbname="products_server";
        $username = "root";
        $pass = "Successfulby2020$";
        $conn = new mysqli($server, $username, $pass, $dbname);
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        } 
        $sql='SELECT * FROM products WHERE sku ='.$sku ;
        $statement = $conn->query($sql);
        $products= $statement->fetch_all(MYSQLI_ASSOC);
        return $products;
    }
}
?>