<?php
session_start();

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Bootstrap file -->
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <link rel="stylesheet" href="css/Registre.css">
    <!-- Font Family -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Karla:ital,wght@0,200..800;1,200..800&family=Outfit:wght@100..900&display=swap" rel="stylesheet">
    <title>Login Page</title>
</head>
<body>
    <form action="" method="POST" class="form mx-auto d-flex flex-column align-items-center">
        <h2 class="form_header">Login</h2>
        <p class="error"></p>
        <input type="text" name="User" class="User" placeholder="User Name">
        <input type="password" name="Password" class="Password" placeholder="Password">
        <button class="login-submit" onclick="login()" name="Login" type="button">Login</button>
        <p class="sign_up">I dont Have Account!!<a href="Register.php">Sign Up</a></p>
        

    </form>
    

    <script src="js/login.js"></script>
</body>
</html>