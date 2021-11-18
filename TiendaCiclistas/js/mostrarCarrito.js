window.onload = main;

var productos;

function main(){

    obtenerProductos();
    cargaCarrito();
}//gfadsfg

function obtenerProductos(){

    productos = JSON.parse(localStorage.getItem("productos"));
    console.log(productos);
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
                        btnPrimary.setAttribute("href", "#");
                        btnPrimary.setAttribute("class", "btn btn-primary text-end");
                        
                            var iconBtnPrimary = document.createElement("i");
                            iconBtnPrimary.setAttribute("class", "fa fa-trash-o");
                            iconBtnPrimary.setAttribute("aria-hidden", "true");

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