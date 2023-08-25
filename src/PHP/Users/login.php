<?php
    include '../DataBase/connect.php';

    $email = $_POST["email"];
    $pwd_utente = $_POST["pwd_utente"];
    handleLogin($db, $email, $pwd_utente);

    function handleLogin($db, $email, $pwd_utente){
        if(empty($db) || empty($email) ||  empty($pwd_utente)){
            //in questo caso c'è stato un problema con l'invio dei dati al server
            $array = array("status" => -1, "answer" => "qualcosa è andato storto con l'invio dei dati, riprova");
            $json = json_encode($array);
            print $json;
        }else{
            //strip_tags rimuove dalla stringa i tag HTML e PHP, protezione contro attacchi XSS
            $email = strip_tags($email);
            $pwd_utente = strip_tags($pwd_utente);
            try{
                //hash della password
                $pwd_utente_hash = md5($pwd_utente);
                $query = "SELECT * FROM utente WHERE email = :email AND pwd_utente = :pwd_utente";
                $stmt = $db->prepare($query);
                $stmt->bindParam(':email', $email);
                $stmt->bindParam(':pwd_utente', $pwd_utente_hash);
                $stmt->execute();
            
                if($stmt->rowCount() > 0){
                    //specificando il flag PDO::FETCH_ASSOC
                    //indichiamo che i dati devono essere restituiti
                    //come un array associativo, fetch estrae la prima e unica riga
                    $row = $stmt ->fetch(PDO::FETCH_ASSOC);
                    $_SESSION["id"] = $row["id"];
                    $_SESSION["username"] = $row["nome"]." ".$row["cognome"];
                    $_SESSION["email"] = $row["email"];
                    $_SESSION["telefono"] = $row["telefono"];
                    $_SESSION["isAdmin"] = $row["isAdmin"];
                    
                    $array = array("status" => 1, "answer" => "Login effettuato!");
                    $json = json_encode($array);
                    print $json;
                    exit;
                }else{
                    $array = array("status" => -1, "answer" => "email o password errate");
                    $json = json_encode($array);
                    print $json;
                    exit;
                }
            }catch(PDOException $e){
                $array = array("status" => -1, "answer" => "Errore durante la connessione con il database: ".$e->getMessage());
                $json = json_encode($array);
                print $json;
                exit;
            }
        }
    }
?>


