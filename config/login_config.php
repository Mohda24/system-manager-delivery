<?php
include "../config.php";


$jsonData = file_get_contents("php://input");

// Decode the JSON data into a PHP associative array
$data = json_decode($jsonData, true);

// Check if 'user' key exists and access the value
if (isset($data['user'])&&isset($data['password'])) {
    $user = $data['user'];
    $password=$data["password"];
    $query="SELECT * from users where user_name=? and pass=?";
    $stm=$conn->prepare($query);
    $stm->execute([$user,$password]);
    $result=$stm->fetch(PDO::FETCH_ASSOC);
    if($result){
        session_start();
        $_SESSION['user'] = $user;
        $_SESSION["id"]=$result["id_user"];
        echo "correct data";
    }
    else{
        echo "Invalid login data.";
    }
} else {

    echo "Invalid login data.";
}
?>
