import React from "react";

function TodoSearch({ searchValue, setSearchValue }) {

    function onSearchValueChange(e) {
        setSearchValue(e.target.value)
    }

    return (
        <>
            <input onChange={onSearchValueChange} value={searchValue} type="text" placeholder='Tarera numero la que quieras' />
            <p>{searchValue}</p>
        </>
    )
}

export { TodoSearch }