<?php
session_start();
include "../config.php";
if($_SERVER['REQUEST_METHOD'] === 'POST'){
    $jsonData = file_get_contents("php://input");
// Decode the JSON data into a PHP associative array
    $data = json_decode($jsonData, true);
    $query = "INSERT INTO sellers (id_user, seller_nom, seller_tell, seller_adres, tarif,type_colis) VALUES (:id_user, :seller_nom, :seller_tell, :seller_adres, :tarif, :type_colis)";
    $stmt = $conn->prepare($query);
    
    // Execute the query with the provided values
    $stmt->execute([
        ':id_user' => $_SESSION["id"],
        ':seller_nom' => $data["name"],
        ':seller_tell' => $data["tel"],
        ':seller_adres' => $data["adresse"],
        ':tarif' => $data["tarif"],
        ':type_colis' => $data["type"],
    ]);
}elseif($_SERVER['REQUEST_METHOD'] === 'GET'){
    $query = "SELECT * FROM sellers where id_user=?  order by id_seller desc";
    $stmt = $conn->prepare($query);
    $stmt->execute([$_SESSION["id"]]);
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);
}elseif($_SERVER['REQUEST_METHOD']==="PUT"){
    $jsonData = file_get_contents("php://input");

// Decode the JSON data into a PHP associative array
$data = json_decode($jsonData, true);

$query = "UPDATE `sellers` SET `seller_nom`=?,`seller_tell`=?,`seller_adres`=?,`tarif`=?,`type_colis`=? WHERE `id_seller`=? and `id_user`=?";
$stm = $conn->prepare($query);
$result=$stm->execute([ $data["seller_nom"], $data["seller_tell"], $data["seller_adres"], $data["tarif"], $data["type_colis"], $data["id"], $_SESSION["id"]]);
if($result){
    http_response_code(200);
}
}elseif($_SERVER['REQUEST_METHOD']==="DELETE"){
    $id=$_REQUEST["id"];

    $query="DELETE from sellers where id_seller=? and id_user=?";
    $stm=$conn->prepare($query);
    $stm->execute([$id,$_SESSION["id"]]);
    echo "mohda";
}
?>