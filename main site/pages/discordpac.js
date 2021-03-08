import React from "react"
import {Link} from "gatsby"
import Sidebar from "../components/navigation"
import Heading from "../components/heading"
import "../styles/global.css"

export default function discordpac(){
  return (
    <body>
        <Heading/>
        <div class="main">
            <div class="sidebar">
                <Sidebar/>
            </div>
            <div class="textbox alltext">
                <h3><u>Discord-Pac</u></h3>
                <p> <b>What</b>: A remake of the classic Pac-Man arcade game as a discord bot. 
                    Accepts various user commands and inputs to control gameplay, view scores and change modes.
                </p>
                <p> <b>Responsibilities</b>: Created the core game "engine" that sends updated player/ghost positions as new frames in messages.
                    Created logic for player input and enemy AI with various behavior types.
                </p>
                <p> <b>Tech used</b>: Discord API/discord.py library, Python 3.9
                </p>
            </div>
            <div class="content">
                <img class="allpics" src={`../../discordpac.gif`} alt="pac screengrab"/>
                <p class> A screen recording of the game at 2.5x speed. Various message inputs dictate future turns.
                </p>
            </div>
            <div class="textbox alltext">
                <Link to="/projects/">
                    <b>Back to Projects</b>
                </Link>
            </div>
        </div>
    </body>
    )
}