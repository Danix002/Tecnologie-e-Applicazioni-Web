<?php 
  if(!isset($_SESSION)) { session_start();}
?>

<!DOCTYPE html>
<html lang="it">
  <head>
    <meta charset="UTF-8">
    <meta name = "viewport" content = "width-device.width, initial-scale=1.0">
    <link href = "../../IMG/io.png" type = "image/gif" rel = "icon">
    <link href = "../../CSS/registerUserPage.css" type = "text/css" rel="stylesheet"> 
    <script src = "https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <script src = "../../JS/registerU.js" type = "text/javascript"></script>
    <title>Pasta&Basta - Registrati</title>
  </head>
  <body>
    <div id = "main">
      <h2>Registrati</h2>
      <div id = "centerRegister">
        <fieldset>
          <div id = "centerRegisterUser">
            <label class = "required" for = "nome">Nome:</label>
            <input type = "text" id = "nome" name = "nome" required>
            <p id = "errore-nome" class = "errore" hidden></p>
          </div>
          <div id = "centerRegisterUser">
            <label class = "required" for = "cognome">Cognome:</label>
            <input type = "text" id = "cognome" name = "cognome" required>
            <p id = "errore-cognome" class = "errore" hidden></p>
          </div>
          <div id = "centerRegisterUser">
            <label class = "required" for = "email">Email:</label>          
            <input type = "email" id = "email" name = "email" placeholder = "esempio@gmail.com" required>
            <p id = "errore-email" class = "errore" hidden></p>
          </div>
          <div id = "centerRegisterUser">
            <label class = "required" for = "password">Password:</label>
            <input type = "password" id = "password" name = "password" required>
            <p id = "errore-password" class = "errore" hidden></p>
          </div>
          <div id = "centerRegisterUser">
            <label class = "required" for = "numero_telefono">Numero di telefono:</label>
            <input type = "tel" id = "numero_telefono" name = "numero_telefono" placeholder = "+39 3333333333" required>
            <p id = "errore-numerotelefono" class = "errore" hidden></p>
          </div>
          <div id = "formBoxButton">
            <input id = "registerButton" type = "submit" value = "Registrati">
            <p id = "errore-submit" class = "errore" hidden></p>
          </div>
          <p id = "redirectLogin">Sei già registrato? <a href = "formLogin.php">Accedi</a></p>
        </fieldset>
      </div>
    </div>

<?php include "../../HTML/bottom.html";?>