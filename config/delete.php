<?php
session_start();
include "../config.php";

$jsonData = file_get_contents("php://input");

// Decode the JSON data into a PHP associative array
$data = json_decode($jsonData, true);

    $query="DELETE from clients where id_client=? and id_user=?";
    $stm=$conn->prepare($query);
    $stm->execute([$data[0],$_SESSION["id"]]);



?>