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
        $sql="SELECT COUNT(*) FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = '$dbname'";
        $statement = $conn->query($sql);
        if (!$statement->fetch_row()[0]) {
            $db = "CREATE DATABASE $dbname";
            if ($conn->query($db) === TRUE) {
                echo "Database created successfully";
                $conn -> select_db("products_server");
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
                    return $conn;
                  } else {
                    echo "Error creating table: " . $conn->error;
                  }
              } else {
                echo "Error creating database: " . $conn->error;
              }
            }
        $conn-> select_db($dbname);
        $db=  "CREATE TABLE [IF NOT EXISTS]`products` (
            `sku` varchar(255) COLLATE utf8_bin NOT NULL PRIMARY KEY,
            `name` varchar(255) COLLATE utf8_bin NOT NULL,
            `price` float NOT NULL,
            `type` varchar(255) COLLATE utf8_bin NOT NULL,
            `value` varchar(255) COLLATE utf8_bin NOT NULL,
            `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
            `updated_at` timestamp)";
            $conn->query($db);
            return $conn;
    } 
}
?>