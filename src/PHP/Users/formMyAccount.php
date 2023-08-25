<?php 
  if(!isset($_SESSION)) { session_start();}

  if(isset($_SESSION["username"])){
    $username = $_SESSION["username"];
  }else{
    $username = "";
  }
  
?>

<!DOCTYPE html>
<html lang="it">
  <head>
    <meta charset="UTF-8">
    <meta name = "viewport" content = "width-device.width, initial-scale=1.0">
    <link href = "../../IMG/io.png" type = "image/gif" rel = "icon">
    <link href = "../../CSS/myAccountPage.css" type = "text/css" rel = "stylesheet"> 
    <script src = "https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <script src = "https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"></script>
    <script src = "../../JS/myAccount.js" type = "text/javascript"></script>
    <title>Pasta&Basta - My Account</title>
  </head>
  <body>
    <div id = "main">
      <h2>My Account</h2>
      <div id = "mainContent">
        <?php if($username != ""){ ?>
        <nav>
          <div id = "navigation">
          <nav>
            <ul class = "ilTuoAccount">
              <li id = "date">I tuoi dati</li>
              <li id = "myOrders">I tuoi ordini</li>
            </ul>
          </nav>
        </nav>
        <hr>
        <div id = "content">
        </div> 
        <?php }else{ ?><span class = "errore">Nessun dato, prima effettua l'accesso</span><?php } ?>
      </div>     
  </div>

  <?php include "../../HTML/bottom.html";?>