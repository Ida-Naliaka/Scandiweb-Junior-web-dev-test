<?php
include_once "env.php";
class DbConnect
{
    public function connect()
    {
        $server = "localhost";
        $dbname = getenv("dbname");
        $username = getenv("user");
        $pass = getenv("pass");
        $conn = new mysqli($server, $username, $pass);
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }
        // Creating a new database
        $sql = "SELECT COUNT(*) FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = '$dbname'";
        $statement = $conn->query($sql);
        if (!$statement->fetch_row()[0]) {
            $db = "CREATE DATABASE $dbname";
            if ($conn->query($db) === true) {
                echo "Database created successfully";
                $conn->select_db("products_server");
                $table = "CREATE TABLE `products` (
                    `sku` varchar(255) COLLATE utf8_bin NOT NULL PRIMARY KEY,
                    `name` varchar(255) COLLATE utf8_bin NOT NULL,
                    `price` float NOT NULL,
                    `type` varchar(255) COLLATE utf8_bin NOT NULL,
                    `value` varchar(255) COLLATE utf8_bin NOT NULL,
                    `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
                    `updated_at` timestamp)";
                if ($conn->query($table) === true) {
                    echo "Table products created successfully";
                    return $conn;
                } else {
                    echo "Error creating table: " . $conn->error;
                }
            } else {
                echo "Error creating database: " . $conn->error;
            }
        }
        //if db exists
        $conn->select_db($dbname);
        return $conn;
    }
}
?>
