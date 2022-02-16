import React, { useContext } from "react"
import { appContext } from "../../../tareas/src/components/contextData"

const Footer = () => {

    const valors = useContext(appContext)

    console.log(JSON.parse(localStorage.getItem('data')))

    return <footer className="App-header">Footer <p style={{color: valors.color2}}>{valors.footerTitle}</p></footer>
}

export default Footer