import React from "react"
import {Link} from "gatsby"
import "../styles/global.css"


export default function Sidebar(){
    return (
        <div>
            <div class="navlinks">
                <Link to="/" 
                    activeClassName="activelink">
                        Main
                </Link>
            </div>
            <div class="navlinks">
                <Link to="/projects/"
                    activeClassName="activelink">
                        Projects
                </Link>
            </div>
            <div class="navlinks">
                <Link to="/contact/"
                    activeClassName="activelink">
                        Contact
                </Link>
            </div>
        </div>
    )
}