<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include_once 'DbConnect.php';
$objDb = new DbConnect;
$conn = $objDb->connect();
$objDb-> processes();

?>