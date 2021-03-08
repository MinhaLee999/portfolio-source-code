import React from "react"
import Sidebar from "../components/navigation"
import Heading from "../components/heading"
import "../styles/global.css"

//sliding sidebar???

export default function Home() {
  return (
    <body>
        <Heading/>
        <div class="main">
            <div class="sidebar">
                <Sidebar/>
            </div>
            <div class="textbox alltext">
                <h3>Hello!</h3>
                <p> I'm a recent biomedical engineering graduate from Boston University. I decided to pursue, software a little late (oops) 
                    but I've been programming since 2016. I'm interested in application, game and web development and since graduating, have been
                    learning new skills and applying them towards projects like this site.
                </p>
                <p>I'm currently looking for entry level positions to kickstart my career! </p>
            </div>

            <div class="content alltext">
                <a href="/game.html" target="_blank" rel="noopener noreferrer">
                    <img class="allpics" src={`../../linkimage.png`} alt="dinorun imagelink"/>
                </a>
            </div>
        </div>
    </body>
  )
}
