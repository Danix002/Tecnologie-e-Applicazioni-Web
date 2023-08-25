$(function () {
    var registerButton = $("#registerButton");
    $(registerButton).click(function (e) { 
        if(validateRegistration()){
            $("#centerRegister").hide();
            $.ajax({
                type: "POST",
                url: "../../PHP/Users/register.php",
                data: {'nome': $("#nome").val().trim(), 'cognome': $("#cognome").val().trim(), 'email': $("#email").val().trim(), 'pwd_utente': $("#password").val().trim(), 'telefono': $('#numero_telefono').val().trim()},
                dataType: "JSON",
                success: function (response) {
                    responseToUser(response.status, response.answer);
                },
                error: function (response) {
                    handleError();
                }
            });
        }
    });
    
});

function checkEmail(emailField){
    var pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if(emailField.match(pattern)){
        $("#errore-email").text("");
        $("#errore-email").hide();
        $("#email").css("border", "2px solid green");
        return true;
    }else{
        $("#email").css("border", "2px solid red");
        $("#errore-email").text("errore, inserire un indirizzo email valido (es. example@gmail.com)");
        $("#errore-email").show();
        return false;
    }
}

function checkPassword(pwdField){
    var pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if(pwdField.match(pattern)){
        $("#errore-password").text("");
        $("#errore-password").hide();
        $("#password").css("border", "2px solid green");
        return true;
    }else{
        $("#password").css("border", "2px solid red");
        $("#errore-password").text("errore, la password deve contenere almeno una lettera minuscola, una maiuscola, un numero e un carattere speciale e deve essere lunga almeno 8 caratteri");
        $("#errore-password").show();
        return false;
    }
}

function checkNome(nomeField){
    var pattern = /^[A-Za-z\s]{2,}$/;
    if(nomeField.match(pattern)){
        $("#errore-nome").text("");
        $("#errore-nome").hide();
        $("#nome").css("border", "2px solid green");
        return true;
    }else{
        $("#nome").css("border", "2px solid red");
        $("#errore-nome").text("errore, Il tuo nome deve avere almeno due lettere e nessun carettere speciale");
        $("#errore-nome").show();
        return false;
    }
}

function checkCognome(cognomeField){
    var pattern = /^[A-Za-z\s]{2,}$/;
    if(cognomeField.match(pattern)){
        $("#errore-cognome").text("");
        $("#errore-cognome").hide();
        $("#cognome").css("border", "2px solid green");
        return true;
    }else{
        $("#cognome").css("border", "2px solid red");
        $("#errore-cognome").text("errore, Il tuo cognome deve avere almeno due lettere e nessun carettere speciale");
        $("#errore-cognome").show();
        return false;
    }
}

function checkTel(telField){
    var pattern = /^^((00|\+)39[\. ]??)??3\d{2}[\. ]??\d{6,7}$$/;
    if(telField.match(pattern)){
        $("#errore-numerotelefono").text("");
        $("#errore-numerotelefono").hide();
        $("#numero_telefono").css("border", "2px solid green");
        return true;
    }else{
        $("#numero_telefono").css("border", "2px solid red");
        $("#errore-numerotelefono").text("errore, inserire un numero di telefono valido");
        $("#errore-numerotelefono").show();
        return false;
    }
}

//alidazione lato client dei dati inseriti per registrarsi
function validateRegistration() {
    return checkNome($("#nome").val().trim()) && checkCognome($("#cognome").val().trim()) && checkEmail($("#email").val().trim()) && checkPassword($("#password").val().trim()) && checkTel($("#numero_telefono").val().trim());
}

/*risposta in caso di successo, se lo status è pari a 1 
allora la registrazione dell'utente ha avuto successo.
Altrimenti visualizzo un errore sotto il pulsante "Registrati"*/
function responseToUser(status, answer){
    if(status != 1){
        $("#errore-submit").text(answer);
        $("#errore-submit").show();
        $("#centerRegister").show();
    }else{
        //dopo mezzo secondo l'utente viene reindirizzato alla pagina del login
        setTimeout(function(){
            window.location.href = "../../PHP/Users/formLogin.php";
        }, 500)
    }
}

function handleError(){
    $("#errore-submit").text("Si è verificato un errore durante la richiesta, riprovare");
    $("#errore-submit").show();
    $("#main").show();
}
