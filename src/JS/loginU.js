$(function () {
    var loginButton = $("#loginButton");
    $(loginButton).click(function (e) { 
        if(validateLogin()){
            $("#centerLogin").hide();
            $.ajax({
                type: "POST",
                url: "../../PHP/Users/login.php",
                data: {'email': $("#email").val().trim(), 'pwd_utente': $("#password").val().trim()},
                dataType: "JSON",
                success: function (response) {
                    responseToUser(response.status, response.answer);
                },
                error: function (response) {
                    handleErrorLogin();
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
        return true;
    }else{
        $("#errore-email").text("errore, inserire un indirizzo email valido (es. example@gmail.com)");
        $("#errore-email").show();
        return false;
    }
}

function checkPassword(pwdField){
    if(pwdField.length > 0){
        $("#errore-password").text("");
        $("#errore-password").hide();
        return true;
    }else{
        $("#password").css("border", "2px solid red");
        $("#errore-password").text("errore, password invalida");
        $("#errore-password").show();
        return false;
    }
}

//validazione lato client login
function validateLogin() {
    return (checkEmail($("#email").val().trim()) && checkPassword($("#password").val().trim()));
}

/*risposta in caso di successo, se lo status è pari a 1 
allora il login dell'utente ha avuto successo.
Altrimenti visualizzo un errore sotto il pulsante "Accedi"*/
function responseToUser(status, answer){
    if(status != 1){
        $("#email").css("border", "2px solid red");
        $("#password").css("border", "2px solid red");
        $("#centerLogin").show();
        $("#errore-submit").text(answer);
        $("#errore-submit").show();
    }else{
        //dopo mezzo secondo l'utente viene reindirizzato alla pagina principale, al contenuto del sito
        setTimeout(function(){
            window.location.href = "../../PHP/HomePage/index.php";
        }, 500)
    }
}

function handleErrorLogin(){
    $("#errore-submit").text("Si è verificato un errore durante la richiesta, riprovare");
    $("#errore-submit").show();
    $("#main").show();
}
