import React from "react"
import {Link} from "gatsby"
import Sidebar from "../components/navigation"
import Heading from "../components/heading"
import "../styles/global.css"

export default function bounchie(){
  return (
    <body>
        <Heading/>
        <div class="main">
            <div class="sidebar">
                <Sidebar/>
            </div>
            <div class="textbox alltext">
                <h3><u>Bounchie</u></h3>
                <p> <b>What</b>:A mobile video game application
                meant to run across all android devices. 
                Made for my Fall 2017 semester final project.
                </p>
                <p> <b>Responsibilities</b>: Created two gamemodes (shown) with
                unique movement mechanics and features. 
                Contributed to the development of the 
                architecture design, documentation and
                overall appearance.
                </p>
                <p> <b>Tech used</b>: Java, Android Studio, libGDX (engine), Github
                </p>
            </div>
            <div class="content">
                <img class="allpics" src={`../../bounchie.gif`} alt="bounchie screengrab"/>
                <p>Left: Freestyle mode, Right: Wavy mode</p>
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