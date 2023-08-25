$(function () {
    //nascondo il div che conterrà il contenuto di uno dei due file: date.html e myOrders.html 
    $("#content").hide();
    //durante la fase di riempimento viene visualizzato uno spinner appeso nel div padre di tutti
    $spinner = $('<span id = "spinnerAccount" class = "loaderAccount"></span>');
    $("#mainContent").append($spinner);
    //evidenzio il nome della sezione "date", quella visualizzata di default al caricamento della pagina
    $("#date").addClass("selected");
    //lo spinner viene rimosso a fine di ogni richiesta, poco prima di visualizzare il div content
    requestDate();

    $("li").click(function (e) {
        //rimuovo l'evidenziato alla sezione corrente, richiesta precedentemente, 
        //ed evidenzio la nuova sezione richiesta 
        $("li").removeClass("selected");
        $(this).addClass("selected");
        var idItem = $(this).attr("id");
        $("#content").hide();
        $spinner = $('<span id = "spinnerAccount" class = "loaderAccount"></span>');
        $("#mainContent").append($spinner);
        switch (idItem) {
            case "date":
                requestDate();
                break;
            case "myOrders":
                requestMyOrders();
                break;
        }
    });
});

function requestDate() {
    $.ajax({
        type: "POST",
        url: "../../PHP/Users/dateMyAccount.php",
        success: function (response) {
            const res = JSON.parse(response);
            //rimuovo l'eventuale errore generato e visualizzato precedentemente tramite uno span
            //per inserire, visualizzare, al suo posto il risultato della richiesta corrente
            $(".errore-myAccount").remove();
            //controllo se l'utente ha fatto accesso
            if(res.status == -1){
                $("#spinnerAccount").remove();
            }else{
                $("#content").load("../../HTML/myAccountPage/date.html", () => {
                    $('#nome_cognome').attr('placeholder', res.username);
                    $('#email').attr('placeholder', res.email);
                    $('#numero_telefono').attr('placeholder', res.telefono);
                    $("#spinnerAccount").remove();
                    $("#content").show();
                });
            }
        },
        error: function (response) {
            handleErrorRequest();
        }
    });
};

function requestMyOrders() {
    $.ajax({
        type: "POST",
        url: "../../PHP/Users/myOrders.php",
        success: function (response) {
            const res = JSON.parse(response);
            $(".errore-myAccount").remove();
            //l'elemento visualizzato viene costruito in un handle apposito
            //response contiene i prodotti acquistati fino a quel momento
            handleMyOrders(res);
        },
        error: function (response) {
            handleErrorRequest();
        }
    });
};

function handleMyOrders(response) {
    console.log(response);
    if (response.status == -1) {
        $errore = $('<span class = "errore-myAccount"> errore nella richiesta, riprova </span>');
        $("#content").append($errore);
        $("#spinnerAccount").remove();
        $("#content").show();
    } else {
        $("#content").load("../../HTML/myAccountPage/myOrders.html", () => {
            var productList = response.resultsQuery;
            var productDiv = "";
            //itero su tutti i prodotti creando per ognuno un suo contenitore
            $.each(productList, function (i, product) {
                productDiv += '<div id ="' + product.prodotto + '" class = "product"><div class = "pastaImage"><img src = "../../IMG/products/' + (product.prodotto - 1) + '.png"></div><span class = "nome">' + product.nome + ',</span><span class = "dataAcquisto">' + product.data_acquisto + '</span></div>';
            });
            //alla fine dell'iterazione ho creato una stringa con codice html, a questo punto procedo
            //con appendere gli elementi al contenitore apposito 
            $prod = $(productDiv);
            $("#centerMyOrders").append($prod);
            //controllo se l'utente ha mai fatto un acquisto
            if (productList.length < 1) {
                var $empty = $('<span class = "errore-myAccount"> nessun prodotto trovato </span>');
                $("#centerMyOrders").append($empty);
            }
            $("#spinnerAccount").remove();
            $("#content").show();
        });
    }
};

function handleErrorRequest() {
    $(".errore-myAccount").remove();
    $("#spinnerAccount").remove();
    $errorSpan = $('<span class = "errore-myAccount"> errore nella richiesta, riprova </span>');
    $("#mainContent").append($errorSpan);
}