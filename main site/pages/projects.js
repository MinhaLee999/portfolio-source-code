import React from "react"
import {Link} from "gatsby"
import Sidebar from "../components/navigation"
import Heading from "../components/heading"
import "../styles/global.css"

export default function Projects() {
  return (
    <body>
        <Heading/>
        <div class="main">
            <div class="sidebar">
                <Sidebar/>
            </div>
            <div class="projectitem alltext" text-align="center">
                <Link to="/discordpac/">
                    <img class="allpics" src={`../../pac3.png`} alt="pac thumb"/>
                </Link>
                Discord-Pac!: Discord Bot
            </div>
            <div class="projectitem alltext">
                <Link to="/portfoliogame/">
                    <img class="allpics" src={`../../dinorun.png`} alt="test thingie"/>
                </Link>
                Interactive Portfolio: React Webapp
            </div>
            <div class="projectitem alltext">
                <Link to="/bounchie/">
                    <img class="allpics" src={`../../Bounchie.png`} alt="test thingie"/>
                </Link>
                Bounchie: Android Mobile Application
            </div>
            <div class="projectitem alltext">
                More to come...
            </div>
        </div>
    </body>
    )
}