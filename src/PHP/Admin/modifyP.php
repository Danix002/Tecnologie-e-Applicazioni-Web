<?php 
    include '../DataBase/connect.php'; 

    $flag = $_POST["flag"];
    try{
        switch($flag){
            case "INFOP":
                heandleDataProduct($db);
                break;
            case "MODIFYPRODUCT":
                heandleModifyProduct($db);
                break;
        }
    }catch(PDOException $e){
        $array = array("status" => -1, "answer" => "Errore durante la connessione con il database: ".$e->getMessage());
        $json = json_encode($array);
        print $json;
    }

    function heandleDataProduct($db){
        $idProd = $_POST["idProd"];
        $query = 'SELECT * FROM prodotto WHERE id = :idProd';
        $stmt = $db->prepare($query);
        $stmt->bindParam(':idProd', $idProd);
        $stmt->execute();
        $results = $stmt->fetch(PDO::FETCH_ASSOC);
        $array = array("status" => 1, "nome" => $results["nome"], "descrizione" => $results["descrizione"], "regione" => $results["regione"], "inOfferta" => $results["inOfferta"], "prezzo" => $results["prezzo"]);
        $json = json_encode($array);
        print $json;
        exit;
    }

    function heandleModifyProduct($db){
        $idProd = $_POST["idProd"];
        $infoProd = $_POST["infoProd"];
        $query = 'UPDATE prodotto SET nome = :nome, descrizione = :descrizione, regione = :regione WHERE id = :idProd';
        $stmt = $db->prepare($query);
        $stmt->bindParam(':idProd', $idProd);
        $stmt->bindParam(':nome', $infoProd[0]);
        $stmt->bindParam(':descrizione', $infoProd[1]);
        $stmt->bindParam(':regione', $infoProd[2]);
        $stmt->execute();

        $query = 'UPDATE prodotto SET prezzo = :prezzo, inOfferta = :inOfferta WHERE id = :idProd';
        $stmt = $db->prepare($query);
        $stmt->bindParam(':idProd', $idProd);
        $stmt->bindParam(':prezzo', $infoProd[3]);
        $stmt->bindParam(':inOfferta', $infoProd[4]);
        $stmt->execute();

        $array = array("status" => 1, "answer" => "Prodotto modificato nel database correttamente");
        $json = json_encode($array);
        print $json;
        exit;
    }
?>