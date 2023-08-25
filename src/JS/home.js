$(function () {
    //nascondo il div che contiene il contenuto centrale della pagina, il contenuto viene caricato dinamicamente 
    //in base alla richiesta
    $("#content").hide();
    //durante la fase di riempimento viene visualizzato uno spinner appeso nel div padre di tutti
    $spinner = $('<span id = "spinnerHome" class = "loaderHome"></span>');
    $("#mainContent").append($spinner);
    //evidenzio il nome della sezione "home", quella visualizzata di default al caricamento della pagina
    $("#home").addClass("selected");
    //lo spinner viene rimosso a fine di ogni richiesta, poco prima di visualizzare il div content
    requestHome();

    $("li").click(function (e) {
        //rimuovo l'evidenziato alla sezione corrente, richiesta precedentemente, 
        //ed evidenzio la nuova sezione richiesta 
        $("li").removeClass("selected");
        $(this).addClass("selected");
        var idItem = $(this).attr("id");
        if(idItem != "liAdmin"){
            $("#content").hide();
            $spinner = $('<span id = "spinnerHome" class = "loaderHome"></span>');
            $("#mainContent").append($spinner);
            switch (idItem) {
                case "profile":
                    requestProfile();
                    break;
                case "hourly":
                    requestHourly();
                    break;
                case "etics":
                    requestEtics();
                    break;
                case "contacts":
                    requestContacts();
                    break;
                case "myAccount":
                    requestMyAccount();
                    break;
                case "products":
                    requestProducts();
                    break;
                case "home":
                    requestHome();
                    break;
            }
        }
    });

    //richiesta admin
    $("#confirmModifyP").click(function (e) {
        requestConfirmModifyP();
    });
});

//gestione richiesta aggiungi prodotto al carrello
function requestAddProduct($idProduct) {
    var $feedback = $('<div id ="feedbackAddToCart"></div>');
    var div = document.getElementById('opUserProd-' + $idProduct);
    //nascondo il bottone "aggiungi al carrello" del prodotto identificato selezionato 
    $(div.childNodes[0]).hide();
    $("#opUserProd-" + $idProduct).prepend($feedback);
    $("#feedbackAddToCart").fadeIn(500);
    //disabilito temporaneamente tutti gli altri pulsanti "aggiungi al carrello", questo per evitare 
    //che l'utente prema piu' pulsanti durante l'animazione e causare così incongruenze con l'animazione
    $('.buttonAddCart').attr('disabled', 'disabled');
    $.ajax({
        type: "POST",
        url: "../../PHP/HomePage/cartOp.php",
        data: {'flag': "ADD", 'idProd' : $idProduct},
        dataType: "JSON",
        success: function (response) {
            $("#errore-addCart").remove();
            //rimuovo l'eventuale errore generato e visualizzato precedentemente tramite uno span
            //per inserire, visualizzare, al suo posto il risultato della richiesta corrente
            $el = $('<div id = "animationAddToCart"><img id = "prodAnimation" src = "../../IMG/products/' + ($idProduct - 1) + '.png"><img id = "cartEmptyFull" src = "../../IMG/carrelloVuoto.png"></div>');
            $("#feedbackAddToCart").append($el);
            $("#prodAnimation").animate({
                opacity: 0
            }, 1000, "linear", function(){
               $("#prodAnimation").hide();
               $("#cartEmptyFull").attr("src", "../../IMG/carrelloPieno.png");
            });
            //dopo 1.5 secondi cancello il feedback del carrello e riabilito tutti i pulsanti
            setTimeout(function(){
                $("#feedbackAddToCart").fadeOut(500);
                $("#feedbackAddToCart").remove();
                $('.buttonAddCart').removeAttr('disabled');
                $(div.childNodes[0]).show();
            }, 1500);
        },
        error: function (response) {
            $errorSpan = $('<span class = "errore-addCart"> errore nella richiesta, riprova </span>');
            $("#" + $idProduct).append($errorSpan);
        }
    });
};

//gestione richiesta modifica prodotto
function requestModifyProduct($idProduct){
    $.ajax({
        type: "POST",
        url: "../../PHP/Admin/modifyP.php",
        data: {'flag': "INFOP", 'idProd' : $idProduct},
        dataType: "JSON",
        success: function (response) {
            $(".errore-home").remove();
            $("#line").remove();
            //rimuovo l'eventuale errore generato e visualizzato precedentemente tramite uno span
            //per inserire, visualizzare, al suo posto il risultato della richiesta corrente
            $("#content").load("../../HTML/modifyP.html", () => {
                //carico e riempio il form di modifica implementato con un fieldset con i dati ricavati
                //dalla richiesta, ovvero i dati del prodotto che vogliamo modificare
                $('#idProduct').attr('placeholder', $idProduct);
                $('#nome').attr('placeholder', response.nome);
                $('#descrizione').attr('placeholder', response.descrizione);
                $('#regione').attr('placeholder', response.regione);
                $('#prezzo').attr('placeholder', response.prezzo);
                $('#inOfferta').attr('placeholder', response.inOfferta);
                $(".buttonConfirmModifyP").click(function (e) {
                    $("#content").hide();
                    $spinner = $('<span id = "spinnerHome" class = "loaderHome"></span>');
                    $("#mainContent").append($spinner);
                    requestConfirmModifyP();
                });
                $("#spinnerHome").remove();
                $("#content").show();
            });
        },
        error: function (response) {
            handleErrorRequest();
        }
    });
};

//gestione richiesta conferma modifica prodotto
function requestConfirmModifyP(){
    $idProduct = $('#idProduct').attr('placeholder');
    var count = 0;
    var arrayInfoProd = [];
    //controllo se è stata fatta almeno una modifica tenendo l'informazione nella variabile count
    //riempio il mio oggetto javascript con gli elementi da aggiornare nel database
    if(($("#nome").val().trim()).length > 0){
        //inserisco nuovo valore "nome" per il prodotto 
        //e incremento count
        count += 1;
        arrayInfoProd.push($("#nome").val().trim());
    }else{
        //inserisco il valore corrente "nome" del prodotto 
        //in questo caso non modifichiamo e non incremento count
        arrayInfoProd.push($("#nome").attr('placeholder'));
    }
    if(($("#descrizione").val().trim()).length > 0){
        count += 1;
        arrayInfoProd.push($('#descrizione').val().trim());
    }else{
        arrayInfoProd.push($('#descrizione').attr('placeholder'));
    }
    if(($("#regione").val().trim()).length > 0){
        count += 1;
        arrayInfoProd.push($('#regione').val().trim());
    }else{
        arrayInfoProd.push($('#regione').attr('placeholder'));
    }
    var prezzo = $("#prezzo").val().trim();
    if(prezzo.length > 0){
        if(parseFloat(prezzo) >= 0 && parseFloat(prezzo) <= 99){
            count += 1;
            arrayInfoProd.push(prezzo);  
        }else{
            //nuovo "prezzo" inserito non valido visualizzo errore ed esco dalla funzione
            $(".errore-home").remove();
            $("#line").remove();
            $("#spinnerHome").remove();
            $errorSpan = $('<hr id = "line"><span class = "errore-home"> valore prezzo invalido. </span>');
            $("#mainContent").append($errorSpan);
            return;
        }
    }else{
        arrayInfoProd.push($('#prezzo').attr('placeholder'));
    }
    var inOfferta = $("#inOfferta").val().trim();
    if(inOfferta.length > 0){
        if(parseFloat(inOfferta) >= 0 && parseFloat(inOfferta) <= 99){
            count += 1;
            arrayInfoProd.push(inOfferta);
        }else{
            $(".errore-home").remove();
            $("#line").remove();
            $("#spinnerHome").remove();
            $errorSpan = $('<hr id = "line"><span class = "errore-home"> valore offerta invalido. </span>');
            $("#mainContent").append($errorSpan);
            return;
        }
    }else{
        arrayInfoProd.push($('#inOfferta').attr('placeholder'));
    }
    //se è stata fatta almeno una modifica procedo con la richiesta, altrimenti sarebbe ridondante modificare 
    //prodotto nel db con gi stessi valori
    if(count > 0){
        $.ajax({
            type: "POST",
            url: "../../PHP/Admin/modifyP.php",
            data: {'flag': "MODIFYPRODUCT", 'idProd' : $idProduct, 'infoProd' : arrayInfoProd},
            dataType: "JSON",
            //comunico un feedback positivo o negativo riguardo l'operazione appena svolta
            //visualizzo l'animazione di feedback per un totale i 4 secondi per poi reindirizzare l'utente admin
            //alla sezione principale
            success: function (response) {
                $(".errore-home").remove();
                $("#line").remove();
                $("#spinnerHome").remove();
                if(response.status != -1){
                    $el = $('<hr id = "line"><div id = "feedbackModifyP"><img src = "../../IMG/feedbackPositivo.png"><span class = "feedbackPositivo-modifyP"> operazione completata con successo </span></div>');
                    $("#mainContent").append($el);
                    setTimeout(function(){
                        $("#feedbackModifyP").remove();
                        $communicationSpan = $('<span id = "redirectComunication" class = "feedbackPositivo-modifyP">Stai per tornare alla home page..</span>');
                        $("#mainContent").append($communicationSpan); 
                    }, 1000);
                    setTimeout(function(){
                        $("#redirectComunication").remove();
                        requestHome();
                    }, 3000);
                }else{
                    $el = $('<hr id = "line"><div id = "feedbackModifyP"><img src = "../../IMG/feedbackNegativo.png"><span class = "feedbackNegativo-modifyP">' + response.answer + ' </span></div>');
                    $("#mainContent").append($el);
                    setTimeout(function(){
                        $("#feedbackModifyP").remove();
                        requestHome();
                    }, 4000);
                }
            },
            error: function (response) {
                $(".errore-home").remove();
                $("#line").remove();
                $("#spinnerHome").remove();
                $el = $('<hr id = "line"><div id = "feedbackModifyP"><img src = "../../IMG/feedbackNegativo.png"><span class = "feedbackNegativo-modifyP">' + response.answer +' </span></div>');
                $("#mainContent").append($el);
                setTimeout(function(){
                    $("#feedbackModifyP").remove();
                    requestHome();
                }, 4000);
            }
        });
    }else{
        $("#spinnerHome").remove();
        $("#content").show();
    }
};

//gestione richiesta profilo
function requestProfile() {
    $.ajax({
        type: "POST",
        url: "../../PHP/HomePage/response.php",
        success: function (response) {
            $(".errore-home").remove();
            $("#line").remove();
            $("#content").load("../../HTML/profile.html", () => {
                $("#spinnerHome").remove();
                $("#content").show();
            });
        },
        error: function (response) {
            handleErrorRequest();
        }
    });
};

//gestione richiesta orario
function requestHourly() {
    $.ajax({
        type: "POST",
        url: "../../PHP/HomePage/response.php",
        success: function (response) {
            $(".errore-home").remove();
            $("#line").remove();
            $("#content").load("../../HTML/hourly.html", () => {
                $("#spinnerHome").remove();
                $("#content").show();
            });
        },
        error: function (response) {
            handleErrorRequest();
        }
    });
}

//gestione richiesta etica
function requestEtics() {
    $.ajax({
        type: "POST",
        url: "../../PHP/HomePage/response.php",
        success: function (response) {
            $(".errore-home").remove();
            $("#line").remove();
            $("#content").load("../../HTML/etics.html", () => {
                $("#spinnerHome").remove();
                $("#content").show();
            });
        },
        error: function (response) {
            handleErrorRequest();
        }
    });
}

//gestione richiesta contatti
function requestContacts() {
    $.ajax({
        type: "POST",
        url: "../../PHP/HomePage/response.php",
        success: function (response) {
            $(".errore-home").remove();
            $("#line").remove();
            $("#content").load("../../HTML/contacts.html", () => {
                $("#spinnerHome").remove();
                $("#content").show();
            });
        },
        error: function (response) {
            handleErrorRequest();
        }
    });
}

//gestione richiesta piatti proposti
function requestProducts() {
    $.ajax({
        type: "POST",
        url: "../../PHP/HomePage/products.php",
        success: function (response) {
            const res = JSON.parse(response);
            $(".errore-home").remove();
            $("#line").remove();
            //il contenuto visualizzato viene costruito in un handle apposito
            //res contiene i prodotti
            heandleRequestProducts(res);
        },
        error: function (response) {
            handleErrorRequest();
        }
    });
}

function heandleRequestProducts(response) {
    console.log(response);
    if (response.status == -1) {
        $errore = $('<hr id = "line"><span class = "errore-home"> errore nella richiesta, riprova </span>');
        $("#content").append($errore);
        $("#spinnerHome").remove();
        $("#content").show();
    } else {
        $("#content").load("../../HTML/products.html", () => {
            var productList = response.resultsQuery;
            //itero su tutti i prodotti creando per ognuno un suo contenitore
            $.each(productList, function (i, product) {
                var productDiv = "";
                //se il mio prodotto è in offerta oppure no cambia nella visione di questo, in particolare come viene visualizzato il prezzo
                var flagSale = false;
                if (product.inOfferta == 0) {
                    productDiv += '<div id ="' + product.id + '" class = "product"><div id = "top-contentP"><div class = "pastaImage"><img src = "../../IMG/products/' + i + '.png"></div></div><h4 class = "nome">' + product.nome + '</h4><span class = "regione">' + product.regione + '</span><span class = "descrProd">' + product.descrizione + '</span><span class = "prezzo">' + product.prezzo + '€</span>';
                } else {
                    //mi calcolo il prezzo scontato 
                    flagSale = true;
                    var oldPrice = product.prezzo;
                    var sale = (oldPrice / 100) * product.inOfferta;
                    var newPrice = oldPrice - sale;
                    productDiv += '<div id ="' + product.id + '" class = "product"><div id = "top-contentP"><div class = "pastaImage"><img src = "../../IMG/products/' + i + '.png"></div></div><h4 class = "nome">' + product.nome + '</h4><span class = "regione">' + product.regione + '</span><span class = "descrProd">' + product.descrizione + '</span><span class = "prezzo"><s>' + product.prezzo + '€</s></span><span class = "sconto">' + Math.round(newPrice) + '€</span>';
                }
                //una volta creata la prima parte di contenuto viene inserita la seconda in base al ruolo dell'utente
                //(sta sempre dentro il div principale con l'id dell'id pel prodotto)
                if (response.userIsLogged && response.userIsAdmin != "1") {
                    productDiv += '<div id = "opUserProd-' + product.id + '"><button id = "addCart" class = "buttonAddCart" name ="' + product.id + '">Aggiungi al carrello</button></div></div>';
                } else {
                    if (response.userIsAdmin == "1") {
                        productDiv += '<div id = "opAdminProd"><span class = "numProd">Prodotto n°' + product.id + '</span><button id = "modificaProd" class = "buttonModificaProd" name ="' + product.id + '">Modifica prodotto</button></div></div>';
                    } else if(!(response.userIsLogged)){
                        productDiv += '<span class = "alertSale">Per acquistare prima accedi.</span></div>';
                    }
                }
                $prod = $(productDiv);
                $("#products-list").append($prod);
                $("#products-list").addClass('listOfProducts');
            });
            if (productList.length < 1) {
                var $empty = $('<hr id = "line"><span class = "errore-home"> nessun prodotto trovato </span>');
                $("#products-list").append($empty);
            }
            //associo un azione ad ogni bottone di ogni prodotto iterativamente, per distinguere così il bottone per prodotto 
            $(".buttonAddCart").click(function (e) { 
                if(!isNaN(parseInt($(this).attr("name")))){
                    requestAddProduct(parseInt($(this).attr("name")));  
                }   
            });
            $(".buttonModificaProd").click(function (e) { 
                if(!isNaN(parseInt($(this).attr("name")))){
                    requestModifyProduct(parseInt($(this).attr("name")));  
                }   
            });
            $("#spinnerHome").remove();
            $("#content").show();
        });
    }
}

//gestione richiesta home
function requestHome() {
    $.ajax({
        type: "POST",
        url: "../../PHP/HomePage/home.php",
        success: function (response) {
            const res = JSON.parse(response);
            $(".errore-home").remove();
            $("#line").remove();
            //il contenuto visualizzato viene costruito in un handle apposito
            //res contiene i prodotti
            heandleRequestHome(res);
        },
        error: function (response) {
            handleErrorRequest();
        }
    });
}

function heandleRequestHome(response){
    console.log(response);
    if (response.status == -1) {
        $errore = $('<hr id = "line"><span class = "errore-home"> errore nella richiesta, riprova </span>');
        $("#content").append($errore);
        $("#spinnerHome").remove();
        $("#content").show();
    } else {
        $("#content").load("../../HTML/home.html", () => {
            var productList = response.resultsQuery;
            $.each(productList, function (i, product) {
                //calcolo di default il prezzo scontato perchè so già che il "resultsQuery" abbiamo estrapolato solo
                //i prodotti scontati 
                var oldPrice = product.prezzo;
                var sale = (oldPrice / 100) * product.inOfferta;
                var newPrice = oldPrice - sale;
                var productDiv = '<div id ="' + product.id + '" class = "product"><div id = "top-contentP"><div class = "pastaImage"><img src = "../../IMG/products/' + (product.id - 1) + '.png"></div></div><h4 class = "nome">' + product.nome + '</h4><span class = "regione">' + product.regione + '</span><span class = "descrProd">' + product.descrizione + '</span><span class = "prezzo"><s>' + product.prezzo + '€</s></span><span class = "sconto">' + Math.round(newPrice) + '€</span>';
                if (response.userIsLogged && response.userIsAdmin != "1") {
                    productDiv += '<div id = "opUserProd-' + product.id + '"><button id = "addCart" class = "buttonAddCart" name ="' + product.id + '">Aggiungi al carrello</button></div></div>';
                } else {
                    if (response.userIsAdmin == "1") {
                        productDiv += '<div id = "opAdminProd"><span class = "numProd">Prodotto n°' + product.id + ' </span><button id = "modificaProd" class = "buttonModificaProd" name ="' + product.id + '">Modifica prodotto</button></div></div>';
                    } else if(!(response.userIsLogged)){
                        productDiv += '<span class = "alertSale">Per acquistare prima accedi.</span></div>';
                    }
                }
                $prod = $(productDiv);
                $("#offers-list").append($prod);
            });
            if (productList.length < 1) {
                var $empty = $('<hr id = "line"><span class = "errore-home">nessun prodotto trovato</span>');
                $("#offers-list").append($empty);
            }
            $(".buttonAddCart").click(function (e) { 
                if(!isNaN(parseInt($(this).attr("name")))){
                    requestAddProduct(parseInt($(this).attr("name")));  
                }   
            });
            $(".buttonModificaProd").click(function (e) { 
                if(!isNaN(parseInt($(this).attr("name")))){
                    requestModifyProduct(parseInt($(this).attr("name")));  
                }   
            });
            $("#spinnerHome").remove();
            $("#content").show();
        });
    }
}

//gestione richiesta account
function requestMyAccount() {
    $.ajax({
        type: "POST",
        url: "../../PHP/HomePage/response.php",
        success: function (response) {
            $(".errore-home").remove();
            $("#line").remove();
            $("#content").load("../../HTML/myAccount.html", () => {
                //il file html in questione contiene solo un bottone che reindirizza alla pagina dove c'è 
                //l'effettivo contenuto di questa sezione 
                $("#buttonRedirectMyAccountPage").click(function (e) {
                    window.location.href = "../../PHP/Users/formMyAccount.php";   
                });
                $("#spinnerHome").remove();
                $("#content").show();
            });
        },
        error: function (response) {
            handleErrorRequest();
        }
    });
};

function handleErrorRequest() {
    $(".errore-home").remove();
    $("#line").remove();
    $("#spinnerHome").remove();
    $errorSpan = $('<hr id = "line"><span class = "errore-home"> errore nella richiesta, riprova </span>');
    $("#mainContent").append($errorSpan);
}