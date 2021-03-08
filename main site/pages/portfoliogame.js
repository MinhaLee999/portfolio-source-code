import React from "react"
import {Link} from "gatsby"
import Sidebar from "../components/navigation"
import Heading from "../components/heading"
import "../styles/global.css"

export default function portfoliogame(){
  return (
    <body>
        <Heading/>
        <div class="main">
            <div class="sidebar">
                <Sidebar/>
            </div>
            <div class="textbox alltext">
                <h3><u>Dino-Run</u></h3>
                <p> <b>What</b>: A webapp/portfolio, styled as a miniature game to control navigation between pages. 
                Optimized for both desktop and mobile viewing. (Main site built with Gatsby.js)
                </p>
                <p> <b>Responsibilities</b>: Created logic for player movement to correspond with page navigation and window selection.
                Created additional functions for rendering and internal organization atop the base engine.
                Created custom backgrounds using royalty free assets.
                </p>
                <p> <b>Tech used</b>: Replay.js (React inspired Javascript engine), JavaScript, Photoshop
                </p>
            </div>
            <div class="content">
                <img class="allpics" src={`../../desktopgif500.gif`} alt="dinorun screengrab"/>
                <p>A preview of the various "pages" visited by controlling the onscreen character</p>
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