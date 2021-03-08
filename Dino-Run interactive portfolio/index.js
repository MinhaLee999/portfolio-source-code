import { makeSprite, t } from "@replay/core";
import { Logic } from "./logic";
import { Window } from "./windows";

export const options = {
  dimensions: "scale-up",
};

export const gameProps = {
  id: "Game",
  size: {
    landscape: {
      width: 600,
      height: 402,
      maxWidthMargin: 450,
    },
    portrait: {
      width: 402,
      height: 600,
      maxHeightMargin: 275,
      maxWidthMargin: 150,
    },
  },
  defaultFont: {
    name: "Courier",
    size: 10,
  },
};


export const Game = makeSprite({
  init({ updateState, preloadFiles }) {
    preloadFiles({
      imageFileNames: ["projects.png", "welcome.png", "crossroad.png", "bio.png", "links.png",
                        "projectsp.png", "welcomep.png", "crossroadp.png", "biop.png", "linksp.png",
                        "arrowkeys.png", "WASDkeys.png", "dinorun6.png", "floordot.png", "specialdot.png",
                        "keycircle.png", "phonegifsheet.png", "desktopgifsheet.png", "wavysheet.png", "freestylesheet.png",
                        "upkey.png", "downkey.png", "rightkey.png", "leftkey.png", ]
    }).then(() => {
      updateState((prevstate) => ({ ...prevstate, loaded: true }));
    });

    return {
      loaded: false,
      infowindowid: "",
      info: "closed",
      window: false,
      windowwidth: 0,
      tip: 4,
    };
  },

  loop({ state, device }) {
    const {loaded, infowindowid} = state;
    let {info, window, windowwidth, tip} = state;
    const {size} = device;
    if (!state.loaded) {
       return state;
    }

    if(window && windowwidth <= 5*size.width/6){
        windowwidth += (size.width-windowwidth)/5;
        if(windowwidth >= 5*size.width/6){
            windowwidth = 5*size.width/6;
            info = "open";
        }
    }

    if(!window && windowwidth > 0){
        windowwidth -= size.width/6;
        if(windowwidth <= 0){
            info = "closed";
            tip += 1;
            if(tip > 4){
                tip = 0;
            }
        }
    }

    return {
      loaded: true,
      infowindowid,
      info,
      window, 
      windowwidth,
      tip 
    };

  },

  render({state, updateState, device}) {
    const {size} = device;
    const openWindow = state.info === "open";
    const window = state.window == true;   
    const tip = state.tip; 

    if (!state.loaded) {
      return [
        t.text({
          text: "Loading...",
          color: "black",
        })
      ];
    }
    return [
      Logic({
        id: "logic",
        getWindow: (id) => {      
            updateState((prevState) => {
                return{
                    ...prevState,
                    infowindowid: id,
                    window: true
                }
            })
        },
        closeWindow:() => {
            updateState((prevState) => {
                return{
                    ...prevState,
                    info: "closed",
                    window: false
                };
            });
        }
      }),
        t.rectangle({
            width: state.windowwidth,
            height: 5*size.height/6,
            color: "white",
            opacity: 0.85
        }),
      openWindow ?
        Window({
            id: "window",
            infoid: state.infowindowid,
            tip: tip,
        })
        : null,
    ];
  },
});