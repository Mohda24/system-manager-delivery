<?php
session_start();
include "../config.php";

// Read the raw POST data
$jsonData = file_get_contents("php://input");

// Decode the JSON data into a PHP associative array
$data = json_decode($jsonData, true);

if(isset($data["name"]) && isset($data["tel"]) && isset($data["adresse"]) && isset($data["qnt"]) && isset($data["statu"]) && isset($data["prix"]) && isset($data["seller"])) {
    // Prepare and execute the SQL query using prepared statements
    $query = "INSERT INTO clients (id_user, nom_client, tel_client, adres_client, Qnt,statu, prix,seller) VALUES (:id_user, :nom_client, :tel_client, :adres_client, :Qnt, :statu, :prix, :seller)";
    $stmt = $conn->prepare($query);
    
    // Execute the query with the provided values
    $stmt->execute([
        ':id_user' => $_SESSION["id"],
        ':nom_client' => $data["name"],
        ':tel_client' => $data["tel"],
        ':adres_client' => $data["adresse"],
        ':Qnt' => $data["qnt"],
        ':statu' => $data["statu"],
        ':prix' => $data["prix"],
        ':seller' => $data["seller"]
    ]);
    
    if ($stmt->rowCount() > 0) {
        echo "Data inserted successfully";
    } else {
        echo "Error inserting data";
    }
} else {
    echo "Incomplete data provided";
}
?>
