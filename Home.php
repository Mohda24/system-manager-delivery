<?php
include "config.php";
session_start();
if($_SESSION['user']){
    $query="SELECT imag from users where user_name=?";
    $stm=$conn->prepare($query);
    $stm->execute([$_SESSION["user"]]);
    $result=$stm->fetch(PDO::FETCH_ASSOC);
    if($result["imag"]!=null){
        $img=$result["imag"]; 
    }else{
        $img="profile.png";
    }
    


}else{
    header("location:login.php");
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- link css style -->
    <link rel="stylesheet" type="text/css" href="css/Home.css?v=1"/>
    <link rel="stylesheet" href="css/main.css">
    <!-- link css bootstrap -->
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <!-- link font awesome -->
    <link rel="stylesheet" href="css/all.min.css">
    <link rel="stylesheet" href="css/fontawesome.min.css">
    <!-- font google -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap" rel="stylesheet">
    <title>Home</title>
</head>
<body>
    <aside>
        <ul>
            <li>
                <a href="">
                <i class="fa-solid fa-house-user icon"></i>
                <p class="title fw-bold text-capitalize"><?php echo 'Hello ' .$_SESSION['user']?></p>
                </a>
            </li>
            <li>
                <a href="">
                <i class="fa-regular fa-folder-open icon"></i>
                    <p class="title">Orders</p>
                </a>
            </li>
            <li>
                <a href="">
                <i class="fa-solid fa-file-waveform icon"></i>
                <p class="title">Historique</p>
                </a>
            </li>
            <li>
                <a href="">
                <i class="fa-solid fa-user-group icon"></i>
                <p class="title">Clients</p>
                </a>
            </li>
            <li>
                <a href="#" data-bs-toggle="modal" data-bs-target="#logoutModal">
                    <i class="fa-solid fa-right-from-bracket icon"></i>
                    <p class="title">Logout</p>
                </a>
                
            </li>
        </ul>
    </aside>
    <main>
        <header class="d-flex align-items-center justify-content-between mb-5">
            
            <i class="fa-solid fa-bars menu fs-2 tagle"></i>
            <div class="content d-flex align-items-center gap-2">
                <div class="colis livre d-flex align-items-center py-2 px-3 me-4">
                    <i class="fa-solid fa-truck fs-2"></i>
                    <div class="colis-detail">
                        <h2 class="fs-5">Colis livrés</h2>
                        <p class="fs-4 fw-bold text-end total_l">0</p>
                    </div>
                </div>
                <div class="colis retourn d-flex align-items-center py-2 px-3 me-4 gap-2">
                    <i class="fa-solid fa-box fs-2"></i>
                    <div class="colis-detail">
                        <h2 class="fs-5">Colis retournés</h2>
                        <p class="fs-4 fw-bold text-end total_r">0</p>
                    </div>
                </div>
                <div class="colis d-flex align-items-center py-2 px-3 cash gap-2">
                    <i class="fa-solid fa-sack-dollar fs-2"></i>
                    <div class="colis-detail">
                        <h2 class="fs-5">cash à versé</h2>
                        <p class="fs-4 fw-bold text-end total">0</p>
                    </div>
                </div>
            </div>
            <img src=<?php echo"uploaded_img/$img"?> class="profil" width="40px" alt="">

            
        </header>
        <section>
            <table class="m-auto">
                <thead class="pb-4">
                    <tr class="">
                        <th>nom</th>
                        <th>Tel</th>
                        <th>Adresse</th>
                        <th>Qnt</th>
                        <th>Statu</th>
                        <th>Prix</th>
                        <th>Seller</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- Form inputs -->
                    <tr class="form">
                        <form action="" method="POST">
                            <td>
                                <input type="text" name="name" class="name" placeholder="name" required>
                            </td>
                            <td>
                                <input type="text" name="tel" class="tel" placeholder="tel" required>
                            </td>
                            <td>
                                <input type="text" name="adresse" class="adresse" placeholder="adresse" required>
                            </td>
                            <td>
                                <input type="number" name="qnt" min="" class="qnt" placeholder="Qnt" required>
                            </td>
                            <td>
                                <select name="statu" class="statu">
                                    <option selected value="en coeur">en coeur</option>
                                    <option value="Livré">Livré</option>
                                    <option value="retourné">retourné</option>
                                </select>
                            </td>
                            <td>
                                <input type="number" name="prix" class="prix" placeholder="Prix" required>
                            </td>
                            <td>
                            <select name="seller" class="seller">
                                    <option selected value="Unkonu">Unkonu</option>
                                </select>
                            </td>
                            <td>
                                <button name="submit" onclick="insert()" type="button" class="submit"><i class="fa-solid fa-plus"></i></button>
                            </td>
                        </form>
                    </tr>
                    <!-- START DISPLAY DATA -->
                    <!-- <tr class="data">
                        <td><span class="first border border-1 border-primary border-end-0">Hello</span></td>
                        <td><span class=" border border-1 border-primary border-start-0 border-end-0">hddh</span></td>
                        <td><span class="border border-1 border-primary border-start-0 border-end-0">hddh</span></td>
                        <td><span class=" border border-1 border-primary border-start-0 border-end-0">hddh</span></td>
                        <td><span class=" border border-1 border-primary border-start-0 border-end-0">hddh</span></td>
                        <td><span class=" border border-1 border-primary border-start-0 border-end-0">hddh</span></td>
                        <td><span class=" border border-1 border-primary border-start-0 border-end-0">hddh</span></td>
                        <td><span class="last border border-1 border-primary border-start-0">hdhd</span></td>
                    </tr> -->
                </tbody>
            </table>
            <h1 class="fs-1 text-capitalize text-center">NO data</h1>
            
        </section>
    </main>
    <!-- Modal -->
    <div class="modal fade" id="logoutModal" tabindex="-1" aria-labelledby="logoutModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header mb-2">
                    <h5 class="modal-title text-capitalize fw-bolder" id="logoutModalLabel">Logout</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body mb-2 text-capitalize fw-semibold">
                    <p>Are you sure you want to logout?</p>
                </div>
                <div class="modal-footer mt-2 gap-2 pt-3 ">
                    <button type="button" class="btn btn-secondary py-1 px-2 fw-bold" data-bs-dismiss="modal">Cancel</button>
                    <a  onclick="logout()" class="btn btn-primary py-1 px-2 fw-bold">Logout</a>
                </div>
            </div>
        </div>
    </div>
    <!-- Offcanvas -->
    <div class="offcanvas offcanvas-end" data-bs-backdrop="static" tabindex="-1" id="staticBackdrop" aria-labelledby="staticBackdropLabel">
        <div class="offcanvas-header p-3">
            <h5 class="offcanvas-title text-capitalize fw-bold" id="staticBackdropLabel">Modify Data</h5>
            <button type="button" class="btn-close" onclick="deletealert() "data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body p-3">
            <p class="prob_modify"></p>
            <form class="update d-flex flex-column p-3">
                <div class="name d-flex justify-content-between align-items-center mb-3">
                    <label for="name" class="fw-semibold fs-5">Name :</label>
                    <input type="text" name="name" class="py-2 px-3 w-auto border border-1 border-primary" placeholder="enter ur name">
                </div>
                <div class="tel d-flex justify-content-between align-items-center mb-3">
                    <label for="tel" class="fw-semibold fs-5">Tel :</label>
                <input type="text" name="tel" class="py-2 px-3 w-auto border border-1 border-primary" placeholder="enter ur Phone">
                </div>
                <div class="Adresse d-flex justify-content-between align-items-center mb-3">
                    <label for="Adresse" class="fw-semibold fs-5">Adresse :</label>
                    <input type="text" class="py-2 px-3 w-auto border border-1 border-primary" name="Adresse" placeholder="enter ur Adresse">
                </div>
                <div class="Qnt d-flex justify-content-between align-items-center mb-3">
                    <label for="Qnt" class="fw-semibold fs-5">Qnt :</label>
                    <input type="number" min="1" class="py-2 px-3 w-auto border border-1 border-primary" name="Qnt" placeholder="enter Qnt">
                </div>
                <div class="statu d-flex justify-content-between align-items-center mb-3">
                    <label for="statu" class="fw-semibold fs-5">Statu :</label>
                    <select name="statu" class="py-2 px-3 w-auto border border-1 border-primary text-center">
                            <option selected value="en coeur">en coeur</option>
                            <option value="Livré">Livré</option>
                            <option value="retourné">retourné</option>
                    </select>
                </div>
                <div class="Prix d-flex justify-content-between align-items-center mb-3">
                    <label for="prix" class="fw-semibold fs-5">prix :</label>
                    <input type="number" min="0" class="py-2 px-3 w-auto border border-1 border-primary" name="prix" placeholder="enter Prix">
                </div>
                <div class="Seller d-flex justify-content-between align-items-center mb-3">
                    <label for="Seller" class="fw-semibold fs-5">Seller :</label>
                    <select name="Seller" class="py-2 px-3 w-auto border border-1 border-primary text-center">
                            <option selected value="Unkonu">Unkonu</option>
                    </select>
                </div>
                <input type="text" class="id_client d-none" readonly>
                <div class="btns-update d-flex gap-3 justify-content-center mt-2">
                    <button type="button" class="btn btn-success py-2 px-3" onclick="modify()">Update</button>
                    <button type="button" class="btn btn-secondary py-2 px-3"  data-bs-dismiss="offcanvas" aria-label="Close" onclick="deletealert()">Close</button>
                </div>
                
                
            </form>
        </div>
    </div>
    <script src="js/script.js"></script>
    <script src="js/bootstrap.bundle.min.js"></script>
</body>
</html>