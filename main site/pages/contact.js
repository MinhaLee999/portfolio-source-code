import React from "react"
import Sidebar from "../components/navigation"
import Heading from "../components/heading"
import "../styles/global.css"

export default function Contact(){
  return (
    <body>
        <Heading/>
        <div class="main">
            <div class="sidebar">
                <Sidebar/>
            </div>
            <div class="textbox alltext">
                <p>You can contact me at: <b>minhalee999@gmail.com</b></p>
                <br/>
                <p><a href="https://github.com/minhaminha"><b>My Github</b></a></p>
                <br/>
                <p><a href="https://www.linkedin.com/in/minha-lee-432547130/"><b>My Linkedin</b></a></p>
            </div>
            
        </div>
    </body>
    )
}