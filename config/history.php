<?php
session_start();

include "../config.php";



$query = "SELECT * FROM history where id_user=? order by date DESC";
$stmt = $conn->prepare($query);
$stmt->execute([$_SESSION["id"]]);
$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($result);

?>