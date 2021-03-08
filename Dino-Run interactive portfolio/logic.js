import { makeSprite, t } from "@replay/core";
import { Dino } from "./dino";
import { Background, spaces, allowedPoints } from "./screens";
import { windows } from "./windows";

export const directions = ["w", "ArrowUp", "s", "ArrowDown", "d", "ArrowRight", "a", "ArrowLeft"];

let dinoFrame = 0;
let dinoFrame2 = 0;

export const Logic = makeSprite({
  init({device}) {
    const {size} = device;
    return {
      dinoY: [0, 0],
      dinoX: [0, 0], 
      horSpace: 1, 
      vertSpace: 0,
      screen: spaces[1][0],
    };
  },
 
 loop({ props, state, device }) {
    const {inputs, size} = device;
    let {dinoX, dinoY, screen, vertSpace, horSpace} = state;
        
    const keys = directions.map(key => inputs.keysJustPressed[key]);
    
    //DIRECTION MOVE
    const horStep = size.width/6;
    const vertStep = size.height/6;
    move(keys, horSpace, vertSpace, dinoX, dinoY, horStep, vertStep);
    if(inputs.pointer.justPressed){
        const pointerX = inputs.pointer.x;
        const pointerY = inputs.pointer.y;    
        pointermove(pointerX, pointerY, dinoX, dinoY, horSpace, vertSpace, horStep, vertStep);
    }
    //POPUP WINDOWS
    if(inputs.keysDown){
        const result = windowcall(horSpace, vertSpace, dinoX[1], dinoY[1]);
        if(result[0]){
            props.getWindow(result[1]);
        }
        else{
            props.closeWindow();
        }
    }

    //change to a switch
    //TO IMPLEMENT LATER: Sliding into next area instead of rapid switch
    //SCREEN CHANGE (move to function later)
      if(dinoY[0] >= size.height/2 - 3){
        vertSpace += 1;
        dinoY[0] = -size.height/2 + 5;
        dinoY[1] = -size.height/3;
      }
      if(dinoY[0] <= -size.height/2 + 3){
        vertSpace -= 1;
        dinoY[0] = size.height/2 - 5;
        dinoY[1] = size.height/3;
      }
      if(dinoX[0] >= size.width/2 - 3){
        horSpace += 1;
        dinoX[0] = -size.width/2 + 5;
        dinoX[1] = -size.width/3;
      }
      if(dinoX[0] <= -size.width/2 + 3){
        horSpace -= 1;
        dinoX[0] = size.width/2 - 5;
        dinoX[1] = size.width/3;
      }

    //forced numerical correcters? should never be above/below thresholds
  
    screen = spaces[horSpace][vertSpace];
    dinoX[0] = dinoX[0] + (dinoX[1] - dinoX[0])/3;
    dinoY[0] = dinoY[0] + (dinoY[1] - dinoY[0])/3;

    return { 
        dinoY,
        dinoX,
        screen,
        vertSpace,
        horSpace,
        //dinoFrame 
    };
  },

  render({props, state, device }) {
    
    dinoFrame += 1;
    if(dinoFrame % 6 == 0){
        dinoFrame2 = dinoFrame/6;
        if(dinoFrame >= 36){
            dinoFrame = 0;
            dinoFrame2 = 0;
         }
    }
    const rnscreen = state.screen;

    return [
      Background({
        id: "bg",
        currentScreen: rnscreen,
      }), 
      Dino({
        id: "dino",
        index: dinoFrame2,
        x: state.dinoX[0],
        y: state.dinoY[0],
        anchorY: -17
      }),
    ];
  },
});

function move(keys, horSpace, vertSpace, dinoX, dinoY, hstep, vstep){
    if (keys[0]||keys[1]){
      dinoY[1] += vstep;
      if(!incl(allowedPoints, horSpace, vertSpace, dinoX[1], dinoY[1])[0]){
        dinoY[0] += vstep/2;
        dinoY[1] -= vstep;
      }   
    }
    if (keys[2]||keys[3]){
      dinoY[1] -= vstep;
      if(!incl(allowedPoints, horSpace, vertSpace, dinoX[1], dinoY[1])[0]){
        dinoY[0] -= vstep/2;
        dinoY[1] += vstep;
      }
    }
    if (keys[4]||keys[5]){
      dinoX[1] += hstep;
      if(!incl(allowedPoints, horSpace, vertSpace, dinoX[1], dinoY[1])[0]){
        dinoX[0] += hstep/2;
        dinoX[1] -= hstep;
      }
    }
    if (keys[6]||keys[7]){
      dinoX[1] -= hstep;
      if(!incl(allowedPoints, horSpace, vertSpace, dinoX[1], dinoY[1])[0]){
        dinoX[0] -= hstep/2;
        dinoX[1] += hstep;
      }
    }
}

function pointermove(px, py, x, y, horSpace, vertSpace, hstep, vstep){

    if(Math.abs(px) > Math.abs(py) && Math.abs(px) > 2*hstep){
            const direction = px/(Math.abs(px));
            switch(direction){
                case 1:
                  x[1] += hstep;
                  if(!incl(allowedPoints, horSpace, vertSpace, x[1], y[1])[0]){
                    x[0] += hstep/2;
                    x[1] -= hstep;
                  }
                    break;
                case -1:
                  x[1] -= hstep;
                  if(!incl(allowedPoints, horSpace, vertSpace, x[1], y[1])[0]){
                    x[0] -= hstep/2;
                    x[1] += hstep;
                  };
                    break;
                default:
                    break;
            }
    }
    else if(Math.abs(px) < Math.abs(py) && Math.abs(py) > vstep*2){
            const direction = py/(Math.abs(py));
            switch(direction){
                case 1:
                  y[1] += vstep;
                  if(!incl(allowedPoints, horSpace, vertSpace, x[1], y[1])[0]){
                    y[0] += vstep/2;
                    y[1] -= vstep;
                  }   
                  break;
                case -1:
                  y[1] -= vstep;
                  if(!incl(allowedPoints, horSpace, vertSpace, x[1], y[1])[0]){
                    y[0] -= vstep/2;
                    y[1] += vstep;
                  }
                    break;
                default:
                    break;
            }
     }
}

function windowcall(horScreen, vertScreen, x, y){
    const recieve = incl(windows, horScreen, vertScreen, x, y);
    if(recieve[0]){
        const workingarray = windows[horScreen][vertScreen];
        const last = workingarray.length-1;
        return [true, workingarray[last][recieve[1]]];  
    }
    else{
        return [false, 0];
    }
}

function incl(array, horScreen, vertScreen, x, y){
    const workingarray = array[horScreen][vertScreen];
    const stringed = workingarray.map(x => x.toString());
    const pos = [x, y];
    const stringpos = pos.toString();
    if(stringed.includes(stringpos)){
        const index = stringed.indexOf(stringpos);
        return [true, index];
    }
    else{
        return [false, 0];
    }
}
