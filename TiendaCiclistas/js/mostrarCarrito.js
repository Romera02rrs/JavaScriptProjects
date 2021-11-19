window.onload = main;

var productos = [];

function main(){

    borrarCarrito();
    obtenerProductos();
    cargaCarrito();
    calculaPrecio();
}

function calculaPrecio(){

    var precioFinal = 0;
    var precioFinalDivEleArr = document.getElementsByClassName("d-flex align-items-end flex-column");
    var precioFinalDivEle = precioFinalDivEleArr[0];

    productos.forEach(producto => {
        precioFinal += parseInt(producto.precioArticulo);
    });

    precioFinalTxt = document.createTextNode(precioFinal + " €");
    precioFinalEle = document.createElement("h1");
    precioFinalEle.setAttribute("class", "text-end");

    precioFinalEle.appendChild(precioFinalTxt);
    precioFinalDivEle.appendChild(precioFinalEle);

    precioFinalDivEle.replaceChildren(precioFinalEle, precioFinalEle);

}

function obtenerProductos(){

    productos = JSON.parse(localStorage.getItem("productos"));
}

function borraProducto(producto){

    var posicion = productos.indexOf(producto);
        
    productos.splice(posicion, 1);
    
    localStorage.setItem("productos", JSON.stringify(productos));

    main();
}

function borrarCarrito(){

    var articulosEle = document.getElementById("articulos");

    do{
        articulosEle.lastChild.parentNode.removeChild(articulosEle.lastChild);
    }while(articulosEle.lastChild != null);
}

function cargaCarrito(){

    var articulosEle = document.getElementById("articulos");

    productos.forEach(producto => {
       
        var cardEle = document.createElement("div");
        cardEle.setAttribute("class", "card mt-2");
        cardEle.setAttribute("style", "width: 25rem;");

            var cardHeaderEle = document.createElement("h5");
            cardHeaderEle.setAttribute("class", "card-header");
                var cardHeaderTxt = document.createTextNode(producto.nombreArticulo);
                cardHeaderEle.appendChild(cardHeaderTxt);
            
            var cardBodyEle = document.createElement("div");
            cardBodyEle.setAttribute("class", "card-body");

                var rowEle = document.createElement("div");
                rowEle.setAttribute("class", "row");

                    var colEle = document.createElement("div");
                    colEle.setAttribute("class", "col");

                        var cardTitleEle = document.createElement("h3");
                        cardTitleEle.setAttribute("class", "card-title");
                            var cardTitleTxt = document.createTextNode(producto.precioArticulo);
                            cardTitleEle.appendChild(cardTitleTxt);

                        var cardTextEle = document.createElement("p");
                        cardTextEle.setAttribute("class", "card-text");
                            cardTextTxt = document.createTextNode(producto.tallas[0]);
                            cardTextEle.appendChild(cardTextTxt);

                        var btnPrimary = document.createElement("a");
                        btnPrimary.setAttribute("class", "btn btn-primary text-end");
                        
                            var iconBtnPrimary = document.createElement("i");
                            iconBtnPrimary.setAttribute("class", "fa fa-trash-o");
                            iconBtnPrimary.setAttribute("aria-hidden", "true");

                            /** LISTENER DE LAS PAPELERAS */
                            btnPrimary.addEventListener("click", ()=>borraProducto(producto));

                        btnPrimary.appendChild(iconBtnPrimary);
                    
                    var col2Ele = document.createElement("div");
                    col2Ele.setAttribute("class", "col");

                        var cardImageEle = document.createElement("img");
                        cardImageEle.setAttribute("src", "./img/"+producto.imagen);
                        cardImageEle.setAttribute("class", "img-fluid img-thumbnail");
                        

                    colEle.appendChild(cardTitleEle);
                    colEle.appendChild(cardTextEle);
                    colEle.appendChild(btnPrimary);
                
                rowEle.appendChild(colEle);
                rowEle.appendChild(col2Ele);
                col2Ele.appendChild(cardImageEle);

            cardBodyEle.appendChild(rowEle);
        
        cardEle.appendChild(cardHeaderEle);
        cardEle.appendChild(cardBodyEle);

        
        articulosEle.appendChild(cardEle);
    });
}