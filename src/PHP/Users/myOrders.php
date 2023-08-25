<?php 
    include '../DataBase/connect.php'; 

    try{
        handleRequestOrders($db);
        exit;

    }catch(PDOException $e){
        $array = array("status" => -1, "answer" => "Errore durante la connessione con il database: ".$e->getMessage());
        $json = json_encode($array);
        print $json;
    }

    function handleRequestOrders($db){
        $utente = $_SESSION["id"];
        //richiedo l'id, il nome, la data dell'acquisto dei prodotti presenti nella tabella "acquisto", dove l'utente 
        //è quello che ha fatto accesso e ne ha fatto richiesta
        $query = 'SELECT acquisto.prodotto, prodotto.nome, acquisto.data_acquisto FROM acquisto JOIN utente ON acquisto.utente = utente.id JOIN prodotto ON acquisto.prodotto = prodotto.id WHERE utente = :utente';   
        $stmt = $db->prepare($query);
        $stmt->bindParam(':utente', $utente);
        $stmt->execute();
        $results = $stmt->fetchAll();
        $array = array("status" => 1, "resultsQuery" => $results);
        $json = json_encode($array);
        print $json;
    }
?>