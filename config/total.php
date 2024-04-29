<?php
session_start();
include "../config.php";

// Define SQL queries
$query1 = "SELECT SUM(Qnt * prix) AS total FROM clients WHERE statu = 'Livré' and id_user='{$_SESSION['id']}'";
$query2 = "SELECT SUM(Qnt) AS total_l FROM clients WHERE statu = 'Livré' and id_user='{$_SESSION['id']}'";
$query3 = "SELECT SUM(Qnt) AS total_r FROM clients WHERE statu = 'retourné' and id_user='{$_SESSION['id']}'";

// Prepare and execute the first query
$stmt1 = $conn->prepare($query1);
$stmt1->execute();
$result1 = $stmt1->fetch(PDO::FETCH_ASSOC);

// Prepare and execute the second query
$stmt2 = $conn->prepare($query2);
$stmt2->execute();
$result2 = $stmt2->fetch(PDO::FETCH_ASSOC);

// Prepare and execute the third query
$stmt3 = $conn->prepare($query3);
$stmt3->execute();
$result3 = $stmt3->fetch(PDO::FETCH_ASSOC);

// Combine results into a single array
$output = array(
    "total" => $result1['total'],
    "total_l" => $result2['total_l'],
    "total_r" => $result3['total_r']
);

// Encode the array as JSON and echo
echo json_encode($output);
?>
