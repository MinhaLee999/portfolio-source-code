import { makeSprite, t } from "@replay/core";
import { Animation } from 'playset';

/*
new makesprite for bg slide transition (new file)
 - accepts same screen info 
 - at the end of the slide:
    - pass in null so there isn't one secretly rendering
    - officially change to next screen
 - return early in logic loop until done
*/

export const spaces = [[null, "bio", null], ["welcome", "crossroad", "projects"], [null, "links", null]];

let screenheight = 0; let screenwidth = 0;

if(window.innerHeight < window.innerWidth){
     screenheight = 402; screenwidth = 600;
}
else {
    screenheight = 600; screenwidth = 402;
}

const moveVert = screenheight/6;
const moveHor = screenwidth/6;

const welcomePoints = [[0, -moveVert], [0, 0], [0, moveVert], [0, moveVert*2], [0,moveVert*3]];
const crossroadPoints = [[0, -(2*moveVert)], [0, -moveVert], [0, 0], [0, moveVert], [0, moveVert*2], [-(2*moveHor), 0], [-moveHor, 0], [moveHor, 0], [2* moveHor, 0], [3*moveHor, 0], [-(3*moveHor), 0], [0, 3*moveVert], [0, -(3*moveVert)]];
const bioPoints = [[moveHor, 0], [2* moveHor, 0], [3*moveHor, 0]];
const projectsPoints = [[0, -(2*moveVert)], [0, -moveVert], [-moveHor, -moveVert], [0, 0], [moveHor, 0], [0, moveVert], [0, -(3*moveVert)]];
const linksPoints = [[-(2*moveHor), 0], [-moveHor, 0], [-(3*moveHor), 0]];

export const allowedPoints = [[null, bioPoints, null], [welcomePoints, crossroadPoints, projectsPoints], [null, linksPoints, null]];
const dotArrays = [welcomePoints, crossroadPoints, bioPoints, projectsPoints, linksPoints];
const bgfiles = ["welcome.png", "crossroad.png", "projects.png", "bio.png", "links.png"];

const bgfilesp = ["welcomep.png", "crossroadp.png", "projectsp.png", "biop.png", "linksp.png"];
const keys = ["upkey.png", "downkey.png", "rightkey.png", "leftkey.png"];

export const Background = makeSprite({

    render({props, device}) {
        const {size} = device;
        
        const allDots = dotArrays.map(array => {
            return (array.map(coord => {
                    return t.image({
                        fileName: "floordot.png",
                        width: 40,
                        height: 35,
                        x: coord[0],        
                        y: coord[1]
                    })
                })
            )
        });

        const backgrounds = bgfiles.map(file => {
            return ([t.image({
                fileName: file,
                width: 900,
                height: 402,
                })
            ])
        });

        const specialDots = [
            [t.image({fileName: "specialdot.png", width: 40,
                height: 35,x: 0, y: 0
            })],
            [t.image({fileName: "specialdot.png", width: 40,
                height: 35,x: moveHor, y: 0
            })],
            [t.image({fileName: "specialdot.png", width: 40,
                height: 35,x: -moveHor, y: 0
            })],
            [t.image({fileName: "specialdot.png", width: 40,
                height: 35,x: -moveHor, y: -moveVert
            })],
            [t.image({fileName: "specialdot.png", width: 40,
                height: 35,x: 0, y: moveVert
            })],
        ]

        const pointers = [];

        if(device.isTouchScreen){
            const top = 2.1*size.height/5;
            const side = 2.1*size.width/5;
            const keyspos = [[top, 0], [-top, 0], [0, side], [0, -(side)]];
            for(var i = 0; i < 4; i++){
                pointers.push(
                    Animation({
                        id: i,
                        fileName: keys[i], 
                        y: keyspos[i][0], 
                        x: keyspos[i][1],
                        width: 60,
                        height: 60,
                        columns: 2,
                        rows: 1,
                        fps: 2
                    })
                );
            }
        }
        const currentscreen = props.currentScreen;

        if(currentscreen == "welcome"){
            const temparrow = [t.text({
                text: "^ Navigation",
                color: "black",
                font: {name: "Arial", size: 12},
                x: 1.2*moveHor,
                y: 2.6*moveVert
            })];
            const line = t.line({
              color: "crimson",
              thickness: 10,
              path: [
                [0, -size.height/6],
                [0, size.height/2],
              ],
            })
            return ( backgrounds[0].concat(line, allDots[0], specialDots[0], pointers, temparrow, ) )
        }

        if(currentscreen == "crossroad"){
            const temparrow = [
                t.text({
                    text: "^ Projects",
                    color: "black",
                    font: {name: "Arial", size: 12},
                    x: 0.9*moveHor,
                    y: 2.6*moveVert
                }),
                t.text({
                    text: "Main v",
                    color: "black",
                    font: {name: "Arial", size: 12},
                    x: -0.9*moveHor,
                    y: -2.67*moveVert
                }),
                t.text({
                    text: "Contact >",
                    color: "black",
                    font: {name: "Arial", size: 12},
                    x: 2.7*moveHor,
                    y: 0.9*moveVert
                }),
                t.text({
                    text: "< Bio",
                    color: "black",
                    font: {name: "Arial", size: 12},
                    x: -2.7*moveHor,
                    y: 1.3*moveVert
                }),
            ];
            
            const line = [t.line({
              color: "crimson",
              thickness: 10,
              path: [
                [0, -size.height/2], [0, size.height/2],
              ],
            }),
            t.line({
              color: "crimson",
              thickness: 10,
              path: [
                [-525, 0], [525, 0],
              ],
            })]

            return ( backgrounds[1].concat(line, allDots[1], specialDots[0], pointers, temparrow) );
        }

        if(currentscreen == "projects"){
            const projectTitles = [
                t.rectangle({
                    width: 90,
                    height: 22,
                    x: -moveHor,
                    y: -moveVert/2,
                    color: "black",
                }),
                t.rectangle({
                    width: 95,
                    height: 22,
                    x: moveHor,
                    y: moveVert/2,
                    color: "black",
                }),
                t.text({
                    text: "Android App",
                    color: "white",
                    font: {name: "Arial", size: 15},
                    x: -moveHor,
                    y: -moveVert/2
                }),
                t.text({
                    text: "Portfolio Site",
                    color: "white",
                    font: {name: "Arial", size: 15},
                    x: moveHor,
                    y: moveVert/2
                }),
                t.text({
                    text: "Navigation v",
                    color: "black",
                    font: {name: "Arial", size: 12},
                    x: -1.2*moveHor,
                    y: -2.7*moveVert
                }),
            ]
            const line = [t.line({
              color: "crimson",
              thickness: 10,
              path: [
                [0, -size.height/2], [0, size.height/6],
              ],
            }),
            t.line({
              color: "crimson",
              thickness: 10,
              path: [
                [-size.width/6, -size.height/6], [0, -size.height/6], [0,0], [size.width/6, 0]
              ],
            })]
            return ( backgrounds[2].concat(line, allDots[3], specialDots[1], specialDots[3], specialDots[4], projectTitles, pointers) );
        }

        if(currentscreen == "bio"){
            const temparrow = [t.text({
                text: "Navigation >",
                color: "black",
                font: {name: "Arial", size: 12},
                x: 2.3*moveHor,
                y: -0.9*moveVert
            })]
            const line = t.line({
              color: "crimson",
              thickness: 10,
              path: [
                [525, 0], [size.width/6, 0],
              ],
            })
            return ( backgrounds[3].concat(line, allDots[2], specialDots[1], pointers, temparrow) );
        }

        if(currentscreen == "links"){
            const temparrow = [t.text({
                text: "< Navigation",
                color: "black",
                font: {name: "Arial", size: 12},
                x: -2.3*moveHor,
                y: 1.0*moveVert
            })]
            const line = t.line({
              color: "crimson",
              thickness: 10,
              path: [
                [-525, 0], [-size.width/6, 0],
              ],
            })
            return ( backgrounds[4].concat(line, allDots[4], specialDots[2], pointers, temparrow) );
        }
        //is this even necessary anymore
        else{
            return[
                t.rectangle({
                width: size.width + size.widthMargin * 4,
                height: size.height, 
                color: "gray"
                })
            ]
        }
    },

//PORTRAIT MODE RENDERS

    renderP({props, device}) {

        const {size} = device;

        const backgrounds = bgfilesp.map(file => {
            return ([t.image({
                fileName: file,
                //width: 900,
                //height: 402,
                width: 485,
                height: 871,
                })
            ])
        });

        const allDots = dotArrays.map(array => {
            return (array.map(coord => {
                    return t.image({
                        fileName: "floordot.png",
                        width: 40,
                        height: 35,
                        x: coord[0],        
                        y: coord[1]
                    })
                })
            )
        });
        
        const specialDots = [
            [t.image({fileName: "specialdot.png", width: 40,
                height: 35,x: 0, y: 0
            })],
            [t.image({fileName: "specialdot.png", width: 40,
                height: 35,x: moveHor, y: 0
            })],
            [t.image({fileName: "specialdot.png", width: 40,
                height: 35,x: -moveHor, y: 0
            })],
            [t.image({fileName: "specialdot.png", width: 40,
                height: 35,x: -moveHor, y: -moveVert
            })],
            [t.image({fileName: "specialdot.png", width: 40,
                height: 35,x: 0, y: moveVert
            })],
        ]

        const pointers = [];

        if(device.isTouchScreen){
            const top = 2.1*size.height/5;
            const side = 2.1*size.width/5;
            const keyspos = [[top, 0], [-top, 0], [0, side], [0, -(side)]];
            for(var i = 0; i < 4; i++){
                pointers.push(
                    Animation({
                        id: i,
                        fileName: keys[i], 
                        y: keyspos[i][0], 
                        x: keyspos[i][1],
                        width: 60,
                        height: 60,
                        columns: 2,
                        rows: 1,
                        fps: 2
                    })
                );
            }
        }

        const currentscreen = props.currentScreen;

        if(currentscreen == "welcome"){
            const temparrow = [t.text({
                text: "^ Navigation",
                color: "black",
                font: {name: "Arial", size: 12},
                x: 1.5*moveHor,
                y: 2.5*moveVert
            })]
            const line = t.line({
              color: "crimson",
              thickness: 10,
              path: [
                [0, -size.height/6], [0, 740],
              ],
            })
            return ( backgrounds[0].concat(line, allDots[0], pointers, specialDots[0], temparrow));
        }
        if(currentscreen == "crossroad"){   
            const temparrow = [
                t.text({
                    text: "^ Projects",
                    color: "black",
                    font: {name: "Arial", size: 12},
                    x: 1.5*moveHor,
                    y: 2.6*moveVert
                }),
                t.text({
                    text: "Main v",
                    color: "black",
                    font: {name: "Arial", size: 12},
                    x: -1.5*moveHor,
                    y: -2.5*moveVert
                }),
                t.text({
                    text: "Contact >",
                    color: "black",
                    font: {name: "Arial", size: 12},
                    x: 2.5*moveHor,
                    y: -0.7*moveVert
                }),
                t.text({
                    text: "< Bio",
                    color: "black",
                    font: {name: "Arial", size: 12},
                    x: -2.5*moveHor,
                    y: 0.7*moveVert
                }),
            ]
            const line = [t.line({
              color: "crimson",
              thickness: 10,
              path: [
                [0, -740], [0, 740],
              ],
            }),
            t.line({
              color: "crimson",
              thickness: 10,
              path: [
                [-275, 0], [275, 0],
              ],
            })]
            return ( backgrounds[1].concat(line, allDots[1], pointers, specialDots[0], temparrow));
        }

        if(currentscreen == "projects"){
            const projectTitles = [
                t.rectangle({
                    width: 90, height: 22,
                    x: -moveHor, y: -moveVert/2,
                    color: "gray",
                }),
                t.rectangle({
                    width: 95, height: 22,
                    x: moveHor, y: moveVert/2,
                    color: "gray",
                }),
                t.text({
                    text: "Android App",
                    color: "white", font: {name: "Arial", size: 15},
                    x: -moveHor, y: -moveVert/2,
                }),
                t.text({
                    text: "Portfolio Site",
                    color: "white", font: {name: "Arial", size: 15},
                    x: moveHor, y: moveVert/2
                }),
                t.text({
                    text: "Navigation v",
                    color: "black",
                    font: {name: "Arial", size: 12},
                    x: -1.5*moveHor,
                    y: -2.3*moveVert
                }),
            ]
            const line = [t.line({
              color: "crimson",
              thickness: 10,
              path: [
                [0, -740], [0, size.height/6],
              ],
            }),
            t.line({
              color: "crimson",
              thickness: 10,
              path: [
                [-size.width/6, -size.height/6], [0, -size.height/6], [0,0], [size.width/6, 0]
              ],
            })]
            return ( backgrounds[2].concat(line, allDots[3], specialDots[1], 
                    specialDots[3], specialDots[4], pointers, projectTitles) );
        }

        if(currentscreen == "bio"){
            const temparrow = [t.text({
                text: "Navigation >",
                color: "black",
                font: {name: "Arial", size: 12},
                x: 2.3*moveHor,
                y: -0.7*moveVert
            })]
            const line = t.line({
              color: "crimson",
              thickness: 10,
              path: [
                [275, 0], [size.width/6, 0],
              ],
            })
            return ( backgrounds[3].concat(line, allDots[2], specialDots[1], pointers, temparrow) );
        }

        if(currentscreen == "links"){
            const temparrow = [t.text({
                text: "< Navigation",
                color: "black",
                font: {name: "Arial", size: 12},
                x: -2.3*moveHor,
                y: 1.0*moveVert
            })]
            const line = t.line({
              color: "crimson",
              thickness: 10,
              path: [
                [-275, 0], [-size.width/6, 0],
              ],
            })
            return ( backgrounds[4].concat(line, allDots[4], specialDots[2], pointers, temparrow) );
        }
    }
})