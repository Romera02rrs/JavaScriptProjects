window.onload = main;

var productos;

function main(){

    obtenerProductos();
    cargaCarrito();
}

function obtenerProductos(){

    productos = JSON.parse(localStorage.getItem("productos"));
    console.log(productos);
}

function cargaCarrito(){

    articulosEle = document.getElementById("articulos");

    productos.forEach(producto => {
       
        cardEle = document.createElement("div");
        cardEle.setAttribute("class", "card mt-2");
        cardEle.setAttribute("style", "width: 25rem;");

            cardHeaderEle = document.createElement("h5");
            cardHeaderEle.setAttribute("class", "card-header");
                cardHeaderTxt = document.createTextNode(producto.nombreArticulo);
                cardHeaderEle.appendChild(cardHeaderTxt);
            
            cardBodyEle = document.createElement("div");
            cardBodyEle.setAttribute("class", "card-body");

                rowEle = document.createElement("div");
                rowEle.setAttribute("calss", "row");

                    colEle = document.createElement("div");
                    colEle.setAttribute("class", "col");

                        cardTitleEle = document.createElement("h3");
                        cardTitleEle.setAttribute("class", "card-title");
                            cardTitleTxt = document.createTextNode(producto.precioArticulo);
                            cardTitleEle.appendChild(cardTitleTxt);

                        cardTextEle = document.createElement("h3");
                        cardTextEle.setAttribute("class", "card-title");
                            cardTextTxt = document.createTextNode(producto.tallas[0]);
                            cardTextEle.appendChild(cardTextTxt);

                        btnPrimary = document.createElement("a");
                        btnPrimary.setAttribute("href", "#");
                        btnPrimary.setAttribute("class", "btn btn-primary text-end");
                        
                            iconBtnPrimary = document.createElement("i");
                            iconBtnPrimary.setAttribute("class", "fa fa-trash-o");
                            iconBtnPrimary.setAttribute("aria-hidden", "true");

                        btnPrimary.appendChild(iconBtnPrimary);
                    
                    colEle.appendChild(cardTitleEle);
                    colEle.appendChild(cardTextEle);
                    colEle.appendChild(btnPrimary);
                
                rowEle.appendChild(colEle);

            cardBodyEle.appendChild(rowEle);
        
        cardEle.appendChild(cardHeaderEle);
        cardEle.appendChild(cardBodyEle);

        
        articulosEle.appendChild(cardEle);
    });
}