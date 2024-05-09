<?php
session_start();
include "../config.php";

$jsonData = file_get_contents("php://input");

// Decode the JSON data into a PHP associative array
$data = json_decode($jsonData, true);
// Fetch client data to be deleted
$querySelect = "SELECT * FROM clients WHERE id_client = ? AND id_user = ?";
$stmSelect = $conn->prepare($querySelect);
$stmSelect->execute([$data[0], $_SESSION["id"]]);
$clientData = $stmSelect->fetch(PDO::FETCH_ASSOC);

if ($clientData) {
    // Insert client data into history table
    $queryInsert = "INSERT INTO history (id_client, id_user, nom_client, tel_client, adres_client, Qnt, statu, prix, seller, date) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    $stmInsert = $conn->prepare($queryInsert);
    $stmInsert->execute([
        $clientData['id_client'],
        $_SESSION["id"],
        $clientData['nom_client'],
        $clientData['tel_client'],
        $clientData['adres_client'],
        $clientData['Qnt'],
        $clientData['statu'],
        $clientData['prix'],
        $clientData['seller'],
        $clientData['date']
    ]);}


    $query="DELETE from clients where id_client=? and id_user=?";
    $stm=$conn->prepare($query);
    $stm->execute([$data[0],$_SESSION["id"]]);



?>