<?php 
    include '../DataBase/connect.php';
    if(isset($_SESSION["username"])){
        //tutti i dati, NON SENSIBILI, dell'utente sono salvati nell'array di sessione, in questo modo non dobbiamo fare richiesta al db
        $array = array("status" => 1, "username" => $_SESSION["username"], "email" => $_SESSION["email"], "telefono" => $_SESSION["telefono"]);
        $json = json_encode($array);
        print $json;
        exit;
    }else{
        $array = array("status" => -1, "answer" => "Errore durante il reperimento dei dati, l'utente non ha fatto accesso");
        $json = json_encode($array);
        print $json;
        exit;
    }
?>