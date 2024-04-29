<?php
include("config.php");
if (isset($_POST['submit'])) {
    $name = $_POST["name"];
    $user_name = $_POST["UserName"];
    $user_pass = $_POST['password'];

    $image = null;
    if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
        $image = $_FILES['image']['name'];
        $image_size = $_FILES['image']['size'];
        $image_tmp_name = $_FILES['image']['tmp_name'];
        $image_folder = 'uploaded_img/' . $image; // Assuming filename storage
    }

    // Check for empty fields
    if (empty($name) || empty($user_name) || empty($user_pass)) {
        $message[] = "Please fill in all required fields";
    } else {
        $query = "SELECT * FROM users WHERE user_name = ? AND pass = ?";
        $stmt = $conn->prepare($query);
        $stmt->execute([$user_name, $user_pass]);
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if (count($result) > 0) {
            $message[] = "User already exists";
        } else {
            if ($user_pass !== $_POST["config_pass"]) {
                $message[] = "Password Not Matched!";
            } elseif ($image !== null && $image_size > 2000000) {
                $message[] = 'Image size is too large!';
            } else {
                $query = "INSERT INTO users (nom, user_name, pass, imag) VALUES (?, ?, ?, ?)";
                $stmt = $conn->prepare($query);
                $insert = $stmt->execute([$name, $user_name, $user_pass, $image]);

                if ($insert) {
                    if ($image !== null) {
                        if (!move_uploaded_file($image_tmp_name, $image_folder)) {
                            $message[] = 'Error uploading image.'; // Handle upload failure
                        }
                    }
                    $message[] = "Registered successfully!";
                    header("location:Login.php");
                } else {
                    $message[] = "Registration failed!";
                }
            }
        }
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/Registre.css">
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Karla:ital,wght@0,200..800;1,200..800&family=Outfit:wght@100..900&display=swap" rel="stylesheet">
    <title>Document</title>
</head>
<body>
    <div class="container">
        <form  method="POST" enctype="multipart/form-data" class="form mx-auto d-flex flex-column align-items-center">
            <h2 class="form_header">Create An Account</h2>
            <?php
            if(isset($message)){
                foreach($message as $mes){
                    echo '<p class="alert alert-danger">'.$mes.'</p>';
                }
            }
            ?>
            <input type="text" name="name" placeholder="Enter your Name">
            <input type="text" name="UserName" placeholder="UserName">
            <input type="password" name="password" placeholder="Password">
            <input type="password" name="config_pass" placeholder="Config Password" >
            <input type="file" name="image" id="image">
            <button type="submit" name="submit">Create Account</button>
        </form>
    </div>
    
    
</body>
</html>