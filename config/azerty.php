<?php
session_start();
include "../config.php";
$query="SELECT date from history";
$stm=$conn->prepare($query);
$stm->execute();
$res=$stm->fetch(PDO::FETCH_ASSOC);
print_r($res);

?>