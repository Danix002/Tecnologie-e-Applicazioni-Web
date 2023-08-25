<?php
    define('dbMySqlUser', 'root');
    define('dbMySqlPassword', '');
    define('dbMySqlDatabaseConnection',  'mysql:dbname=pastificio; host=localhost:3306');

    if (!isset($_SESSION)){ session_start(); }

    try{
        $db = new PDO(dbMySqlDatabaseConnection, dbMySqlUser, dbMySqlPassword); 
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }catch(PDOException $exception){
        $array = array("status" => -1, "answer" => 'Connessione al server fallita: '.$exception->getMessage());
        $json = json_encode($array);
        print $json;
        exit;
    }

    function redirect($url, $messaggio = NULL){
        if ($messaggio){
            $_SESSION["flash"] = $messaggio;
        }
        header("Location: $url");
        die;
    }
?>
