<?php
session_start();
include "../config.php";
$query="SELECT seller_nom from sellers where id_user=?";
$stm=$conn->prepare($query);
$stm->execute([$_SESSION['id']]);
$result = $stm->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($result);


?>