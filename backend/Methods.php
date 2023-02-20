<?php
include "Actions.php";

class Methods
{
    public function requestMethod()
    {
        //get api request methods
        $action = new Actions();
        $method = $_SERVER["REQUEST_METHOD"];
        if ($method === "GET") {
            $action->getRecords();
        }
        if ($method === "POST") {
            $action->setordeleteRecord();
        }
        if ($method === "DELETE") {
            $action->deleteRecord();
        }
    }
}

?>
