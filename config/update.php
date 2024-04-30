<?php
session_start();
include "../config.php";
$id=$_REQUEST["id"];
$query="SELECT * from clients where id_client=? and id_user=?";
$stm=$conn->prepare($query);
$stm->execute([$id,$_SESSION["id"]]);
$result=$stm->fetch(PDO::FETCH_ASSOC);
echo json_encode($result);
?>