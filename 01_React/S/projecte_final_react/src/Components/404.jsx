import React from "react";

function Error() {
    const error = () => {
        window.location.href = "/";
    }
    return (
        <div>
            <h1>
                ERROR
            </h1>
            <h2>
                ESTA PAGINA NO EXISTE
            </h2>
        </div>
    )
}

export default Error;