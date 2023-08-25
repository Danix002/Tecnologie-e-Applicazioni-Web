<?php
  if(!isset($_SESSION)) { session_start(); }

  if(isset($_SESSION["username"])){
    $username = $_SESSION["username"];
    $email = $_SESSION["email"];
    $isAdmin = $_SESSION["isAdmin"];
    $ulogged = true;
  }else{
    $username = "UTENTE OSPITE";
    $email = "";
    $isAdmin = 0;
    $ulogged = false;
  }
?>

<!DOCTYPE html>
<html lang = "it">
  <head>
    <meta charset = "UTF-8">
    <meta name = "viewport" content = "width-device.width, initial-scale=1.0">
    <link rel = "stylesheet" href = "https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css">
    <link rel = "stylesheet" href = "https://use.fontawesome.com/releases/v5.14.0/css/all.css">
    <link href = "../../IMG/io.png" type = "image/gif" rel = "icon">
    <link href = "../../CSS/mainHomePage.css" type = "text/css" rel = "stylesheet"> 
    <script src = "https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <script src = "https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"></script>
    <script src = "../../JS/home.js" type = "text/javascript"></script>
    <script src = "../../JS/cart.js" type = "text/javascript"></script>
    <title>Pasta&Basta</title> 
  </head>
  <body> 
  <header>
    <div id = "topRight-content">
      <div id = "userShop">
        <?php if(!$isAdmin){ ?>
          <i class = "fas fa-shopping-cart iconCart" title = "Vai al carrello"></i>
          <span id = "cartAccess" class = "iconShop">Carrello</span>
        <?php } ?>
      </div>
      <div id = "userInfo"> 
        <div class = "backP"> 
            <span>
              <?php if(!$isAdmin){?><img src = "../../IMG/profilo.png" width = "34px" height = "34px"> <?php }else{?><img src = "../../IMG/profiloadmin.png" width = "34px" height = "34px"><?php } ?>
            </span>
            <span>
                <span>Ciao <?= $username ?>!</span><br> 
                <span class = "account">
                <?php if($ulogged){ ?>
                  <a href = "../Users/logout.php"><span class = "Logout">Logout</span></a> 
                <?php }else{ ?> 
                  <a href = "../Users/formLogin.php"><span class = "Accedi">Accedi</span></a>
            </span><?php } ?> 
        </div>
      </div>
    </div>
    <h4 id = "instructions" class = "animated bounceInDown">Ordina il tuo pasto online e paga alla consegna!</h4>
  </header>

  <?php include "../../HTML/viewImage.html"; ?>

  <nav><div id = "navigation"> <?php include "navigation.php"; ?></div></nav>
