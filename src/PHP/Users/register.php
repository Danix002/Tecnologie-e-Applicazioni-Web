<?php
    include '../DataBase/connect.php';

    $nome = $_POST["nome"];
    $cognome = $_POST["cognome"];
    $email = $_POST["email"];
    $pwd_utente = $_POST["pwd_utente"];
    $telefono = $_POST["telefono"];
    handleRegister($db, $nome, $cognome, $email, $pwd_utente, $telefono);

    function handleRegister($db, $nome, $cognome, $email, $pwd_utente, $telefono){
        if(empty($db) || empty($nome) || empty($cognome) || empty($email) || empty($pwd_utente) || empty($telefono)){
            //in questo caso c'è stato un problema con l'invio dei dati al server
            $array = array("status" => -1, "answer" => "errore nel corso dell'invio dei dati, riprova");
            $json = json_encode($array);
            print $json;
        }else{
            //strip_tags rimuove dalla stringa i tag HTML e PHP, protezione contro attacchi XSS
            $nome = strip_tags($nome);
            $cognome = strip_tags($cognome);
            $email = strip_tags($email);
            $pwd_utente = strip_tags($pwd_utente);
            $telefono = strip_tags($telefono);
    
            $patternEmail = "/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/";
            $patternPwd = "/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/";
            $patternNameSurname = "/^[A-Za-z\s]{2,}$/";
            $patternNumber =  "/^((00|\+)39[\. ]??)??3\d{2}[\. ]??\d{6,7}$/";
            
            if(preg_match($patternNameSurname, $nome) == 0 || preg_match($patternNameSurname, $cognome) == 0 || preg_match($patternEmail, $email) == 0 || preg_match($patternPwd, $pwd_utente) == 0 || preg_match($patternNumber, $telefono) == 0 ){
                $array = array("status" => -1, "answer" => "I dati inseriti non sono validi");
                $json = json_encode($array);
                print $json;
                exit;
            }
            
            try{
                //hash della password
                $pwd_utente_hash = md5($pwd_utente);
                $query = "SELECT * FROM utente WHERE email = :email";
                $stmt = $db->prepare($query);
                $stmt->bindParam(':email', $email);
                $stmt->execute();
                if($stmt->rowCount() > 0){
                    $array = array("status" => -1, "answer" => "Errore account già esistente");
                    $json = json_encode($array);
                    print $json;
                    exit;
                }else{
                    $query = "INSERT INTO utente(email, pwd_utente, nome, cognome, telefono) VALUES (:email, :pwd_utente, :nome, :cognome, :telefono)";
                    $stmt = $db->prepare($query);
                    $stmt->bindParam(':email', $email);
                    $stmt->bindParam(':pwd_utente', $pwd_utente_hash);
                    $stmt->bindParam(':nome', $nome);
                    $stmt->bindParam(':cognome', $cognome);
                    $stmt->bindParam(':telefono', $telefono);
                    $stmt->execute();
                    //creo il carrello dell'utente appena registrato
                    $idUser = $db->lastInsertId();
                    $query = 'INSERT INTO carrello(utente) VALUES (:utente)';
                    $stmt = $db->prepare($query);
                    $stmt->bindParam(':utente', $idUser);
                    $stmt->execute();
    
                    $array = array("status" => 1, "answer" => "Registrazione completata con successo!");
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