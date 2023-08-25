<?php 
  if(!isset($_SESSION)) { session_start();}
?>

<!DOCTYPE html>
<html lang="it">
  <head>
    <meta charset="UTF-8">
    <meta name = "viewport" content = "width-device.width, initial-scale=1.0">
    <link href = "../../IMG/io.png" type = "image/gif" rel = "icon">
    <link href = "../../CSS/loginUserPage.css" type = "text/css" rel = "stylesheet"> 
    <script src = "https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <script src = "../../JS/loginU.js" type = "text/javascript"></script>
    <title>Pasta&Basta - Accedi</title>
  </head>
  <body>
    <div id = "main">
      <h2>Accedi</h2>
      <div id = "centerLogin">
        <fieldset>
          <div id = "centerLoginEmail">
            <label for = "email">Email:</label>          
            <input type = "email" id = "email" placeholder = "esempio@gmail.com" autocomplete = "on" required>
            <p id = "errore-email" class = "errore" hidden></p>
          </div>
          <div id = "centerLoginPwd">
            <label for = "password">Password:</label>
            <input type = "password" id = "password" name = "password" autocomplete = "off" required>
            <p id = "errore-password" class = "errore" hidden></p>
          </div>
          <div id = "formBoxButton">
            <input id = "loginButton" type = "submit" value = "Accedi">
            <p id = "errore-submit" class = "errore" hidden></p>
          </div>
          <p id = "register-now">Non sei registrato? <span class = "registerNow"><a href="formRegister.php">Registrati Adesso</a></span></p>
        </fieldset>
      </div>
    </div>

<?php include "../../HTML/bottom.html";?>
