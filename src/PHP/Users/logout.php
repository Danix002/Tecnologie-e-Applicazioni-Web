<?php
    include '../DataBase/connect.php';

    if(!isset($_SESSION)){session_start();};
    session_unset();
    session_regenerate_id(TRUE);
    session_destroy();
    
    redirect("../HomePage/index.php","Logout effettuato con successo, ciao ciao!");
    exit;
?>