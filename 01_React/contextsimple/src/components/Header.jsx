import React, { useContext } from "react"
import { appContext } from "./contextData"


const Header = () => {

    const valors = useContext(appContext)

    return <header className="App-header">Header <h1 style={{color: valors.color}}>{valors.title}</h1></header>
}

export default Header