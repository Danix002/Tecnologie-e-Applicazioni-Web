<?php 
    include '../DataBase/connect.php'; 

    $flag = $_POST["flag"];
    try{
        switch($flag){
            case "COUNT":
                heandleRowsCount($db);
                break;
            case "ADD":
                heandleAddProduct($db);
                break;
            case "REMOVE":
                heandleRemoveProduct($db);
                break;
            case "BUY":
                heandleBuyProducts($db);
                break;
        }
    }catch(PDOException $e){
        $array = array("status" => -1, "answer" => "Errore durante la connessione con il database: ".$e->getMessage());
        $json = json_encode($array);
        print $json;
    }

    function heandleRowsCount($db){
        //controllo se l'utente ha fatto accesso, ovvero se esiste un utente salvato in sessione
        if(isset($_SESSION["username"])){
            $utente = $_SESSION["id"];
            //richiedo tutti i dati dei prodotti presenti nella tabella "inserimento" (nel carrello) dalla tabella "prodotto", dove l'utente 
            //è quello che ha fatto accesso e ne ha fatto richiesta
            $query = 'SELECT * FROM inserimento JOIN prodotto ON inserimento.prodotto = prodotto.id WHERE carrello = :utente';
            $stmt = $db->prepare($query);
            $stmt->bindParam(':utente', $utente);
            $stmt->execute();
            $results = $stmt->fetchAll();
            $num_prodotti = $stmt->rowCount();
            $array = array("status" => 1, "utente"=> $utente, "num_prodotti" => $num_prodotti,"resultsQuery" => $results);
            $json = json_encode($array);
            print $json;
            exit;
        }else{
            $utente = -1;
            $num_prodotti = -1;
            $array = array("status" => -1, "utente"=> $utente, "num_prodotti" => $num_prodotti);
            $json = json_encode($array);
            print $json;
            exit;
        }
    }

    function heandleAddProduct($db){
        $utente = $_SESSION["id"];
        $prodotto = $_POST["idProd"];
        //controllo se il prodotto esiste (non controllo se l'utente ha fatto acesso in questo caso perchè l'operazione 
        //di inserimento nel carrello è disponibile solo nel momento in cui l'utente ha fatto accesso)
        if($prodotto > 0 && $prodotto < 25){
            //mi ricavo l'ora e la data corrente dell'azione 
            $dataIns = date("Y-m-d");
            $ora = date("H:i:s");
            //creo la nuova tupla da inserire nella tabella "inserimento"
            $query = 'INSERT INTO inserimento(carrello, prodotto, data_inserimento, ora_inserimento) VALUES(:utente, :prodotto, :dataIns, :ora)';
            $stmt = $db->prepare($query);
            $stmt->bindParam(':utente', $utente);
            $stmt->bindParam(':prodotto', $prodotto);
            $stmt->bindParam(':dataIns', $dataIns);
            $stmt->bindParam(':ora', $ora);
            $stmt->execute();
            $array = array("status" => 1, "answer" => "Prodotto aggiunto nel carrello correttamente");
            $json = json_encode($array);
            print $json;
            exit;
        }else{
            $array = array("status" => -1, "answer" => "Errore durante l'inserimento nel carrello, id prodotto invalido");
            $json = json_encode($array);
            print $json;
            exit;
        }
    }

    function heandleRemoveProduct($db){
        $utente = $_SESSION["id"];
        $ora = $_POST["oraIns"];
        $prodotto = $_POST["idProd"];
        $query = 'DELETE FROM inserimento WHERE carrello = :utente AND ora_inserimento = :ora AND prodotto = :prodotto';
        $stmt = $db->prepare($query);
        $stmt->bindParam(':utente', $utente);
        $stmt->bindParam(':prodotto', $prodotto);
        $stmt->bindParam(':ora', $ora);
        $stmt->execute();
        $array = array("status" => 1, "answer" => "Prodotto rimosso dal carrello correttamente");
        $json = json_encode($array);
        print $json;
        exit;
    }

    function heandleBuyProducts($db){
        $utente = $_SESSION["id"];
        $prodotti = $_POST["products"];
        $indirizzo = $_POST["indirizzo"];
        //lato client tra i dati passati, c'è l'array di id dei prodotti su cui itero
        //in modo tale da inserirne uno per uno  
        foreach($prodotti as $prod){  
            $dataAcquisto = date("Y-m-d");
            //creo la nuova tupla da inserire nella tabella "acquisto"
            $query = 'INSERT INTO acquisto(utente, prodotto, data_acquisto, indirizzo_consegna) VALUES(:utente, :prod, :dataAcquisto, :indirizzo)';
            $stmt = $db->prepare($query);
            $stmt->bindParam(':utente', $utente);
            $stmt->bindParam(':prod', $prod);
            $stmt->bindParam(':dataAcquisto', $dataAcquisto);
            $stmt->bindParam(':indirizzo', $indirizzo);
            $stmt->execute();
        }
        //dato che sono prodotti ormai acquistati non devono piu' essere intesi come inseriti nel carrello
        //l'operazione di conferma di acquisto viene intesa quindi anche come operazione di rimozione di tutti i
        //prodotti presenti in quel momento nel carrello 
        $query = 'DELETE FROM inserimento WHERE carrello = :utente';
        $stmt = $db->prepare($query);
        $stmt->bindParam(':utente', $utente);
        $stmt->execute();
        $array = array("status" => 1, "answer" => "Acquisto dei prodotti nel carrello eseguito correttamente");
        $json = json_encode($array);
        print $json;
        exit;
    }
?>