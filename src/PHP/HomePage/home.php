<?php 
    include '../DataBase/connect.php'; 

    try{
        heandleRequestHome($db);
        exit;

    }catch(PDOException $e){
        $array = array("status" => -1, "answer" => "Errore durante la connessione con il database: ".$e->getMessage());
        $json = json_encode($array);
        print $json;
    }

    function heandleRequestHome($db){
        $query = 'SELECT * FROM prodotto WHERE inOfferta > 0';   
        $stmt = $db->prepare($query);
        $stmt->execute();
        $results = $stmt->fetchAll();
        if(!(isset($_SESSION["username"]))){
            $array = array("status" => 1, "userIsLogged" => isset($_SESSION["username"]), "userIsAdmin" => -1, "resultsQuery" => $results);
        }else{
            $array = array("status" => 1, "userIsLogged" => isset($_SESSION["username"]), "userIsAdmin" => $_SESSION["isAdmin"], "resultsQuery" => $results);
        }
        $json = json_encode($array);
        print $json;
    }
?>