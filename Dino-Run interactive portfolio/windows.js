import { makeSprite, t } from "@replay/core";
import { Button, Animation } from 'playset';


let screenheight = 0;
let screenwidth = 0;

if(window.innerHeight < window.innerWidth){
     screenheight = 402;
     screenwidth = 600;
}
else {
    screenheight = 600;
    screenwidth = 402;
}

const welcomeWindows = [[0,0], ["welcome"]];
const crossroadWindows = [[0,0], ["crossroad"]];
const bioWindows = [[screenwidth/6, 0], ["bio"]];
const projectsWindows = [[-screenwidth/6, -screenheight/6], [screenwidth/6, 0], [0, screenheight/6], ["bounchie", "portfolio", "notice"]];
const linksWindows = [[-screenwidth/6, 0], ["links"]];

const phonegif = "phonegifsheet.png";
const desktopgif = "desktopgifsheet.png";
const wavymode = "wavysheet.png"; 
const freestylemode = "freestylesheet.png";

export const windows = [[null, bioWindows, null], [welcomeWindows, crossroadWindows, projectsWindows], [null, linksWindows, null]];

const welcomewords = ["I'm a recent graduate looking for work.",
                        "This is my interactive portfolio.",
                        "Navigate UP to learn more!"]

const crosstips = ["Tip: Try standing on PURPLE squares!",
                    "Tip: Click on links in RED!",
                    "Tip: Check out this site on DESKTOP and MOBILE!",
                    "Tip: Learn more about this site in PROJECTS!",
                    "Tip: Hire me!",];

const biowords = ["I am a recent biomedical engineering graduate", 
                    "from Boston University. I decided to pursue", 
                    "software a little late (oops) but I've been",
                    "programming since 2016.",
                    "I'm interested in application, game and web",
                    "development and since graduating, have been",
                    "learning new skills and applying them towards",
                    "projects like this site.",
                    "I am currently looking for entry level positions",
                    "to kickstart my career!"];

const biowords2 = ["I am a recent biomedical engineering graudate from Boston University.", 
                    "I decided to pursue software a little late (oops) but I've been",
                    "programming since 2016.",
                    "I'm interested in application, game and web development and since",
                    "graduating, have been learning new skills and applying them towards",
                    "projects like this site.",
                    "I am currently looking for entry level positions to kickstart my career!"];

const skilllist = ["Skills!", "- C++", "- Java", "- Python", "- JS/React", "- Photoshop"];
const interestlist = ["Interests!", "- Web Design", "- Game/App Dev", "- Digital Art", "- Hiking"];
const buzzlist = ["Buzzwords!", "- Fast-learner", "- Creative", "- Driven", "- Curious",];

const bounchiewide = ["Project:",
                "A mobile video game application",
                "meant to run across all android devices.",
                "Made for my Fall 2017 semester",
                "final project.",
                " ",
                "Responsibilties:",
                "Created two gamemodes (shown) with",
                "unique movement mechanics and features.",
                "Contributed to the development of the",
                "architecture design, documentation and",
                "overall appearance.",
                " ",
                "Tech Used: Java, Android Studio, Git,",
                "libGDX (engine)"];

const bounchietall = ["Project:",
                "A mobile video game application meant to run across",
                "all android devices. Made for my Fall 2017 semester",
                "final project.",
                " ",
                "Responsibilties:",
                "Created two game modes (shown) with unique",
                "movement mechanics and features.",
                "Contributed to the development of the architecture",
                "design, documentation and overall appearance.",
                " ",
                "Tech Used: Java, Android Studio, Git, libGDX (engine)"];

const portfolio = ["Project:",
                "A portfolio site deployed using Github Pages, styled as",
                "a miniature game to control navigation between pages.",
                "Optimized for both desktop and mobile viewing (shown).",
                " ",
                "Responsibilities:",
                "Created logic for player movement to correspond with",
                "page navigation and window selection.",
                "Created additional functions for rendering and internal",
                "organization atop the base engine.",
                "Created custom backgrounds using royalty free assets.",
                " ",
                "Tech Used: Replay.js (a cross-platform JavaScript",
                "game engine inspired by React), JavaScript, Photoshop"];

const credits = ["Special thanks to Ed Bentley for creating Replay.js and Elliot Bentley for creating additional",
                "utilities. Assets used with permission from Estudio Vaca Roxa, Arks, and Hyohnoo on itch.io.",
                ];

export const Window = makeSprite ({

    render({props, device}){
        const {size} = device;
        const infoid = props.infoid
        const tip = props.tip

        const iswide = size.width > size.height;

//WELCOME WINDOW
        if(infoid == "welcome"){

            const welcomepara = paragraph(welcomewords, "top", 8*size.height/40, 
                            3*size.height/40, "left", -size.width/3, "black", 15)

            const main = [
                t.text({
                    text: "Hi, I'm Minha!",
                    color: "black",
                    align: "left",
                    x: -size.width/3,
                    y: 5*size.height/16,
                    font: {name: "Arial", size: 25}
                }),
                t.text({
                    text: device.isTouchScreen
                        ? "Tap the ARROWS around the screen to move!"
                        : "Use W,A,S,D or ARROW keys to navigate!",
                    color: "black",
                    y: -size.height/3,
                    font: {name: "Arial", size: 15.5}
                }),
            ]

            let images = [];

            if(device.isTouchScreen){images = [
                Animation({
                    id: 'keycircle',
                    y: -size.height/7, 
                    fileName: "keycircle.png",
                    width: 120,
                    height: 120,
                    columns: 2,
                    rows: 2,
                    fps: 2
                })]
            }
            else{images = [
                Animation({
                    id: 'WASD',
                    x: -size.width/5,
                    y: -size.height/7, 
                    fileName: "WASDkeys.png",
                    width: 120,
                    height: 85,
                    columns: 2,
                    rows: 1,
                    fps: 2
                }),
                Animation({
                    id: 'arrow',
                    fileName: "arrowkeys.png",
                    width: 120,
                    height: 85,
                    x: size.width/5,
                    y: -size.height/7,
                    columns: 2,
                    rows: 1,
                    fps: 2
                })]
            }
            
            return (main.concat(welcomepara, images));
        }

//CROSSROAD WINDOW
        if(infoid == "crossroad"){
            const spacing = [6*size.height/35, size.height/9, -size.height/9, -6*size.height/35];
            const arrows = ["Projects", "^", "v", "Main"];

            const directions = arrows.map(x => {
                const y = arrows.indexOf(x);
                return t.text({
                    text: x,
                    y: spacing[y],
                    color: "black",
                    font: {name: "Arial", size: 20}
                })
            })            
 
            const other = [t.text({
                    text: "About <            > Contact",
                    x: size.width/65,
                    color: "black",
                    font: {name: "Arial", size: 20}
                }),
                t.text({
                    text: "Pick a direction!",
                    y: size.height/3,
                    color: "black",
                    font: {name: "Arial", size: 25}
                }),
                t.text({
                    text: crosstips[tip],
                    y: -size.height/3,
                    color: "black",
                    font: {name: "Arial", size: 14}
                })]

            return (other.concat(directions));
        }

//BIO WINDOW
        if(infoid == "bio"){

            var xcoords = [];

            if(iswide){
                xcoords = [-size.width/3, -size.width/12, size.width/5];
            }
            else{
                xcoords = [-11*size.width/30, -size.width/11, 3*size.width/15];
            }

            const skills = paragraph(skilllist, "top", -4*size.height/24, 
                            0.9*size.height/24, "left", xcoords[0], "black", 12)
        
            const interests = paragraph(interestlist, "top", -4*size.height/24, 
                            0.9*size.height/24, "left", xcoords[1], "black", 12)

            const buzz = paragraph(buzzlist, "top", -4*size.height/24, 
                            0.9*size.height/24, "left", xcoords[2], "black", 12)


            let bios = [];

            if(iswide){
                bios = paragraph(biowords2, "bottom", -4*size.height/100, 
                            28*(size.height/100)/6, "left", -size.width/3, "black", 11)
            }
            else{
                bios = paragraph(biowords, "bottom", -4*size.height/100, 
                            28*(size.height/100)/9, "left", -size.width/3, "black", 13)
            }

            const paragraphs = bios.concat(skills, interests, buzz);

            const main = [
                t.text({
                    text: "About Minha...",
                    color: "black",
                    align: "left",
                    x: -size.width/3,
                    y: 5*size.height/16,
                    font: {name: "Arial", size: 25}
                }),
                //"profile pic" 
                t.text({
                    text: "The Rundown",
                    color: "black",
                    align: iswide
                        ? "left"
                        : "center",
                    x: iswide
                        ? -size.width/3
                        : 0,
                    y: iswide
                        ? -size.height/10
                        : -size.height/9,
                    font: {name: "Arial", size: 15}
                })
            ]
    
            return (main.concat(paragraphs));
        }

//PROJECT - BOUNCHIE WINDOW

        if(infoid == "bounchie"){            
            
            var words = []

            if(iswide){
                words = paragraph(bounchiewide, "bottom", -4.8*size.height/16, 
                            size.height/27, "left", size.width/16, "black", 11)
            }
            else{
                words = paragraph(bounchietall, "bottom", -5*size.height/16, 
                            size.height/43, "left", -size.width/3, "black", 12)
            }

            const main = [
                t.text({
                    text: "Bounchie (Android App)",
                    color: "black",
                    align: "left",
                    x: -size.width/3,
                    y: iswide
                        ? 5*size.height/16 : 5.5*size.height/16,
                    font: {name: "Arial", size: 25}
                }),
                Animation({
                    id: 'freestyle',
                    fileName: freestylemode,
                    x: iswide
                        ? -21*size.width/75 : -size.height/10,
                    y: iswide
                        ? -size.height/16 : size.height/7.5,
                    width: iswide
                        ? 120 : 110,
                    height: iswide
                        ? 225 : 195,
                    columns: 35,
                    rows: 3,
                    fps: 15
                }),
                Animation({
                    id: 'wavy',
                    fileName: wavymode,
                    x: iswide
                        ? -6*size.width/100 : size.height/10,
                    y: iswide
                        ? -size.height/16 : size.height/7.5,
                    width: iswide
                        ? 120 : 110,
                    height: iswide
                        ? 225 : 195,
                    columns: 53,
                    rows: 2,
                    fps: 15
                }),
                Button({
                    id: 'bounchiegithub',
                    x: iswide
                        ? 11*size.width/50 : 0,
                    y: iswide
                        ? -18*size.height/50 : -18.3*size.height/50,
                    width: 120,
                    height: 20,
                    text: 'Go to Project on Github',
                    onPress: () => {
                        window.open("https://github.com/nicholaschow98/bounchie-boull");
                    },
                    font: { name: 'Arial', size: 11 },
                    color: 'crimson',
                    colorPressed: 'darkred'
                }),
                t.text({
                    x: iswide
                        ? 11*size.width/50 : 0,
                    y: iswide
                        ? -18*size.height/50 : -18.3*size.height/50,
                    text: 'Go to Project on Github',
                    color: "white", 
                    font: { name: 'Arial', size: 11 },
                })
            ]

            return(main.concat(words));
        }

//PROJECT - PORTFOLIO
        if(infoid == "portfolio"){

            var portfoliowords = [];
            var thanks = [];

            if(iswide){
                portfoliowords = paragraph(portfolio, "bottom", -5*size.height/22, 
                            size.height/29, "left", -size.width/12, "black", 11)
                thanks = paragraph(credits, "bottom", -19*size.height/50, 
                            size.height/34, "right", 19.5*size.width/50, "black", 7)
            }
            else{
                portfoliowords = paragraph(portfolio, "bottom", -27*size.height/100, 
                            size.height/42, "left", -size.width/3, "black", 11.5)
                thanks = paragraph(credits, "bottom", -19*size.height/50, 
                            size.height/54, "right", size.width/3, "black", 7)
            }

            const main = [ 
                t.text({
                    text: "Portfolio WebApp",
                    color: "black",
                    align: "left",
                    x: -size.width/3,
                    y: iswide
                        ? 5*size.height/16 : 5.5*size.height/16,
                    font: {name: "Arial", size: 25}
                }),
                Button({
                    id: 'portfoliogithub',
                    x: iswide
                        ? size.width/70 : 0,
                    y: iswide
                        ? -14.5*size.height/50 : -15.6*size.height/50,
                    width: 120,
                    height: 20,
                    text: 'Go to Project on Github',
                    onPress: () => {
                        window.open("https://github.com/minhaminha/minhaminha.github.io");
                    },
                    font: { name: 'Arial', size: 11 },
                    color: 'crimson',
                    colorPressed: 'darkred'
                }),
                t.text({
                    x: iswide
                        ? size.width/70 : 0,
                    y: iswide
                        ? -14.5*size.height/50 : -15.6*size.height/50,
                    text: 'Go to Project on Github',
                    color: "white",     
                    font: { name: 'Arial', size: 11 },
                })
            ]

            let image = []

                if(iswide){image = [
                    Animation ({
                        fileName: phonegif,
                        x: -11*size.width/50,
                        y: -size.height/20,
                        width: 120,
                        height: 225,
                        id: 'phonegif',
                        columns: 59,
                        rows: 3,
                        fps: 20
                    })
                ]}
                else{image = [
                    Animation ({
                        fileName: desktopgif,
                        x: 0,
                        y: 3*size.height/16,
                        width: 250,
                        height: 140,
                        id: 'desktopgif',
                        columns: 31,
                        rows: 3,
                        fps: 10
                    })
                ]}

            return(main.concat(image, thanks, portfoliowords));
        }

//PROJECT - COMING SOON
        if(infoid == "notice"){
            //console.log("here");
            const message = [t.text({
                    text: "More projects coming soon...",
                    color: "black",
                    //y: size.height/8,
                    font: {name: "Arial", size: 18}
                })];
            return (message)
        }

//CONTACT SHEET
        if(infoid == "links"){

            const main = [t.text({
                    text: "Contact Me!",
                    color: "black",
                    y: 5*size.height/16,
                    font: {name: "Arial", size: 25}
                }),
                Button({
                    id: 'linkedin',
                    width: 125,
                    height: 30,
                    text: 'Go to LinkedIn',
                    onPress: () => {
                        window.open("https://www.linkedin.com/in/minha-lee-432547130/");
                    },
                    font: { name: 'Arial', size: 18 },
                    color: 'crimson',
                    colorPressed: 'darkred'
                }),
                t.text({ 
                    text: 'Go to LinkedIn',
                    font: { name: 'Arial', size: 18 },
                    color: "white",
                }),
                t.text({
                    text: "minhalee999@gmail.com",
                    color: "black",
                    y: size.height/8,
                    font: {name: "Arial", size: 18}
                }),
                Button({
                    id: 'github',
                    y: -size.height/8,
                    width: 115,
                    height: 30,
                    text: 'Go to GitHub',
                    onPress: () => {
                        window.open("https://github.com/minhaminha");
                    },
                    font: { name: 'Arial', size: 18 },
                    color: 'crimson',
                    colorPressed: 'darkred'
                }),
                t.text({ 
                    text: 'Go to GitHub',
                    font: { name: 'Arial', size: 18 },
                    color: "white",
                    y: -size.height/8,
                }),]
                if(device.isTouchScreen){
                    const warning = 
                        t.text({
                            text: "(Links may not work on mobile version.)",
                            y: -size.height/3,
                            font: {name: "Arial", size: 12},
                            color: "black",
                        });
                    return(main.concat(warning));
                }

            return (main);
        }

    }
});

function paragraph(texts, vertalign, start, spacing, horalign, xx, tcolor, fontsize){
    
    var linespacing = [];       
 
    if(vertalign == "top"){
        for(var i = 0; i < texts.length ; i++){
                linespacing.push(start-(spacing*i));
            }
    }
    else if(vertalign == "bottom"){
        for(var i = 0; i < texts.length; i++){
                linespacing.push(start + (texts.length-1-i)*spacing);
            }
    }

    const paragraphlines = texts.map(line => {
                const index = texts.indexOf(line);
                return t.text({
                    text: line,
                    align: horalign,
                    x: xx,
                    y: linespacing[index],
                    color: tcolor,
                    font: { name: 'Arial', size: fontsize}
                })
            })

    return paragraphlines;

}