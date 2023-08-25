$(function () {
    //nascondo il div che contiene i contenitori dei prodotti nel carrello e del form di conferma di acquisto
    //in attesa che questi vengano riempiti
    $("#formBoxCart").hide();
    //durante la fase di riempimento viene visualizzato uno spinner appeso nel div padre di tutti
    $spinner = $('<span id = "spinnerCart" class = "loaderCart"></span>');
    $("#formCart-content").append($spinner);
    //lo spinner viene rimosso a fine di ogni richiesta, poco prima di visualizzare il div formBoxcart
    requestRowsCount();

    var cartAccessButton = $("#cartAccess");
    $(cartAccessButton).click(function (e) {
        //al click del bottone "carrello" nella pagina principale, mi reindirizzo solo alla pagina del
        //carrello, questo perchè i dati li ho già caricati precedentemente 
        window.location.href = "../../PHP/HomePage/formCart.php";
    });

    var buyButton = $("#buyButton");
    $(buyButton).click(function (e) {
        requestBuyProd();
    });
});

//gestione richiesta caricamento elementi nel carrello
function requestRowsCount() {
    $.ajax({
        type: "POST",
        url: "../../PHP/HomePage/cartOp.php",
        data: {'flag': "COUNT"},
        dataType: "JSON",
        success: function (response) {
            //rimuovo l'eventuale errore generato e visualizzato precedentemente tramite uno span
            //per inserire, visualizzare, al suo posto il risultato della richiesta corrente
            $(".errore-cart").remove();
            //l'elemento visualizzato viene costruito in un handle apposito
            //response contiene il numero dei prodotti e i prodotti, nel caso in cui il numero fosse > 0
            handleViewContentCart(response);
        },
        error: function (response) {
            handleErrorRequest();
        }
    });
};

//gestione richiesta conferma acquisto prodotti del carrello
//quando viene schiacciato il bottone, si intende che l'utente compra tutti i prodotti presenti in quel momento nel carrello
function requestBuyProd(){
    //vengono estrapolati tutti gli elementi all'interno del contenitore dei prodotti
    //con questi viene riempito un oggetto javascript, un array di id dei prodotti
    //che verrà passato al server tramite json
    var div = document.getElementById('productsInCart');
    var length = div.childNodes.length;
    const arrayProd = [];
    for(let i = 1; i < length; i++){
        arrayProd.push($(div.childNodes[i]).attr("id"));
    }
    //prima di avviare la richiesta ajax controllo che l'utente abbia inserito un inidirizzo 
    if(checkIndirizzo($("#indirizzo").val().trim())){
        $(".errore-cart").remove();
        $.ajax({
            type: "POST",
            url: "../../PHP/HomePage/cartOp.php",
            data: {'flag': "BUY", 'products' : arrayProd, 'indirizzo' : $("#indirizzo").val().trim()},
            dataType: "JSON",
            success: function (response) {
                //completata la richiesta lato server, procedo lato client nascondendo il contenitore
                //in attesa che questo venga aggiornato 
                $("#formBoxCart").hide();
                //aggiorno il contenitore facendo una richiesta di ricarica di tutti gli elementi  
                requestRowsCount();
            },
            error: function (response) {
                $errorSpan = $('<span class = "errore-cart"> errore nella richiesta, riprova </span>');
                $("#formIndirizzoConsegna").append($errorSpan);
            }
        });
    }else{
        //se non è stato inserito un indirizzo, viene visualizzato uno span di errore all'interno del form
        //di conferma di acquisto
        $(".errore-cart").remove();
        $errorSpan = $('<span class = "errore-cart">inserisci un indirizzo per procedere</span>');
        $("#formIndirizzoConsegna").append($errorSpan);
    }
}

function checkIndirizzo(indirizzoField){
    if(indirizzoField.length > 0){
        return true;
    }else{
        return false;
    }
}

function checkLengthCart(length){
    if(length > 1){
        return true;
    }else{
        return false;
    }
}

//gestione richiesta rimozione prodotto nel carrello 
function requestRemoveProd($oraIns, $idProduct, $prezzoTot){
    $.ajax({
        type: "POST",
        url: "../../PHP/HomePage/cartOp.php",
        data: {'flag': "REMOVE", 'oraIns' : $oraIns, 'idProd' : $idProduct},
        dataType: "JSON",
        success: function (response) {
            //rimuovo l'eventuale errore generato e visualizzato precedentemente tramite uno span
            //per inserire, visualizzare, al suo posto il risultato della richiesta corrente
            $(".errore").remove();
            //grazie alla struttura div implementata per ogni prodotto posso accedere al prezzo
            //del prodotto rimosso dal carrello senza fare ulteriori richieste
            var removePrice = parseInt($("#" + $idProduct).attr("name"));
            //aggiorno il prezzo totale dei prodotti nel carrello togliendo il costo dell'elemento rimosso
            $prezzoTot -= removePrice;
            //aggiorno il prezzo totale anche nello span di visualizzazione per l'utente
            $("#price").text("Prezzo totale: " + $prezzoTot + "€");
            $("#price").attr('name', $prezzoTot);
            //completate le operazioni tutte le operazioni necessarie di modifica rimuovo il div contenitore
            //del prodotto rimosso dal carrello 
            $("#" + $idProduct).remove();
            var div = document.getElementById('productsInCart');
            var length = div.childNodes.length;
            //controllo se il carrello è il vuoto
            if(!(checkLengthCart(length))){
                $("#formBoxCart").hide();
                $("#spinnerCart").remove();
                $("#errore-count").show();
                //se è vuoto mostro un bottone che mi reindirizza alla pagina proncipale per invogliare l'utente
                //ad acquistare ancora
                $("#noProdRedirect").show();
            }
        },
        error: function (response) {
            $(".errore").remove();
            $errorSpan = $('<span class = "errore"> errore nella richiesta, riprova </span>');
            $("#" + $idProduct).append($errorSpan);
        }
    });
};

function handleViewContentCart(response) {
     //controllo se il carrello è il vuoto
    if((response.utente == -1 && response.num_prodotti == -1)|| response.num_prodotti == 0){
        $("#spinnerCart").remove();
        $("#errore-count").show();
        //se è vuoto mostro un bottone che mi reindirizza alla pagina proncipale per invogliare l'utente
        //ad acquistare ancora
        $("#noProdRedirect").show();
    }else{
        var productList = response.resultsQuery;
        var productDiv = "";
        //variabile che conterrà la somma dei prezzi degli elementi presenti in resultsQuery, ovvero i prodotti inseriti 
        //dall'utente nel carrello
        var prezzoTot = 0;
        //itero su tutti i prodotti creando per ognuno un suo contenitore
        $.each(productList, function (i, product) {
            if (product.inOfferta == 0) {
                prezzoTot += product.prezzo;
                productDiv += '<div id ="' + product.id + '" class = "product" name = "' + product.prezzo +'"><div class = "pastaImage"><img src = "../../IMG/products/' + (product.id - 1) + '.png"></div><div id = "left-contentInCart"><span class = "nome">' + product.nome + '</span><span class = "prezzo">' + product.prezzo + '€</span></div><div id = "right-contentInCart"><button id = "' + product.id + '" class = "buttonRemoveCart" name ="' + product.ora_inserimento + '">Rimuovi dal carrello</button></div></div>';
            }else{
                //mi calcolo il prezzo scontato 
                var oldPrice = product.prezzo;
                var sale = (oldPrice / 100) * product.inOfferta;
                var newPrice = Math.round(oldPrice - sale);
                productDiv += '<div id ="' + product.id + '" class = "product" name = "' + newPrice +'"><div class = "pastaImage"><img src = "../../IMG/products/' + (product.id - 1) + '.png"></div><div id = "left-contentInCart"><span class = "nome">' + product.nome + '</span><span class = "prezzo">' + newPrice + '€</span></div><div id = "right-contentInCart"><button id = "' + product.id + '" class = "buttonRemoveCart" name ="' + product.ora_inserimento + '">Rimuovi dal carrello</button></div></div>';
                prezzoTot += newPrice;
            }
        });
        $prod = $(productDiv);
        $("#productsInCart").append($prod);
        if(document.getElementById('formIndirizzoConsegna') != null){
            $("#price").attr('name', prezzoTot);
            $("#price").text("Prezzo totale: " + prezzoTot + "€");
            $("#price").show();
            //aggiorno il tipo di display da none a grid per rendere visibile il div
            document.getElementById('formIndirizzoConsegna').style.display = 'grid';
        }
        //associo un azione ad ogni bottone di ogni prodotto iterativamente, per distinguere così il bottone per prodotto 
        $(".buttonRemoveCart").click(function (e) { 
            if(!isNaN(parseInt($(this).attr("name")))){
                requestRemoveProd($(this).attr("name"), parseInt($(this).attr("id")), parseInt($("#price").attr("name")));  
            }   
        });
        $("#spinnerCart").remove();
        $("#formBoxCart").show();
    }
};

function handleErrorRequest() {
    $(".errore-cart").remove();
    $("#spinnerCart").remove();
    $errorSpan = $('<span class = "errore-cart"> errore nella richiesta, riprova </span>');
    $("#formCart-content").append($errorSpan);
}