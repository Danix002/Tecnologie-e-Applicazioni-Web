<?php
  if(!isset($_SESSION)) { session_start(); }

  if(isset($_SESSION["username"])){
    $username = $_SESSION["username"];
    $email = $_SESSION["email"];
    $tel = $_SESSION["telefono"];
  }else{
    $username = "";
    $email = "";
    $tel = "";
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
    <link href = "../../CSS/cartPage.css" type = "text/css" rel = "stylesheet"> 
    <script src = "https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <script src = "https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"></script>
    <script src = "../../JS/cart.js" type = "text/javascript"></script>
    <title>Pasta&Basta - Carrello</title>
  </head>
  <body>
    <div id = "formCart-content">
        <h2>Carrello</h2>
        <div id = "formBoxCart">
            <div id = "productsInCart">
            </div>
            <div id = "formIndirizzoConsegna">
              <div id = "infoUser">
                <label for = "nome_cognome">Nome e Cognome:</label>
                <input type = "text" id = "nome_cognome" placeholder = "<?= $username ?>" readonly>
              </div>
              <div id = "infoUser">
                <label for = "email">Email:</label>
                <input type = "email" id = "email" placeholder = "<?= $email ?>" readonly>
              </div>
              <div id = "infoUser">
                <label for = "numero_telefono">Numero di telefono:</label>
                <input type = "tel" id = "numero_telefono" placeholder = "<?= $tel ?>" readonly>
              </div>
              <div id = "infoUser">
                <label for = "indirizzo">Indirizzo:</label>          
                <input type = "text" id = "indirizzo" autocomplete = "off" required>
              </div>
              <div id = "infoUser">
                <span id = "price" hidden></span>
              </div>
              <div id = "confirmAndBuy">
                <input id = "buyButton" type = "submit" value = "Acquista">
                <p id = "errore-submit" class = "errore-cart" hidden></p>
              </div>
            </div>
        </div>
        <span id = "errore-count" hidden>Nessun prodotto nel carrello</span>
        <a href = "index.php"><button id = "noProdRedirect" class = "buttonNoProdRedirect" hidden>Torna alla home page</button></a>
    </div>

  <?php include "../../HTML/bottom.html";?>