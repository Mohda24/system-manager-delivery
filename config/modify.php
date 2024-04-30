<?php
session_start();
include "../config.php";

$jsonData = file_get_contents("php://input");

// Decode the JSON data into a PHP associative array
$data = json_decode($jsonData, true);

$query = "UPDATE `clients` SET  `nom_client`=?, `tel_client`=?, `adres_client`=?, `Qnt`=?, `statu`=?, `prix`=?, `seller`=? WHERE id_client=? and id_user=?";
$stm = $conn->prepare($query);
$result=$stm->execute([ $data["nom_client"], $data["tel_client"], $data["adres_client"], $data["Qnt"], $data["statu"], $data["prix"], $data["seller"], $data["id"], $_SESSION["id"]]);
if($result){
    http_response_code(200);
}

?>
