import React, { useState } from 'react';
import "./Tile.css"


interface Coordinate{
  x: Number;
  y: Number;
  bombs: Array;
  clickTitle: Function;
  search: Boolean;
}


export default function Tile({x, y, adjacent_bombs, clickTile, search, manual_click}:Coordinate){
  const [clicked, setClick] = useState("notclicked");
  //Check if current tile is a bomb.
  let is_bomb = false;
  if(adjacent_bombs===-1){
    is_bomb = true;
  }

  if(manual_click & clicked === "notclicked"){
    setClick("click");
  }

  const clickHandler = (event) => {
    let eventName = event.type;
    if(eventName === 'click'){
      setClick("click");
      clickTile([true, x, y]); //AKA Search
    }
    if(eventName === 'contextmenu' & clicked === "notclicked"){
        event.preventDefault();
        setClick('contextmenu');
    }else if(eventName === 'contextmenu' & clicked === "contextmenu"){
      event.preventDefault();
      setClick('notclicked');
    }
  };

  if((clicked === "notclicked") & (manual_click === false)){
    return (<div>
              <button className = 'hidden' onClick={clickHandler} onContextMenu={clickHandler}></button>
            </div>);
  }

  if(clicked === "contextmenu"){
    return (<div>
              <button className = 'hiddenflag' onClick={clickHandler} onContextMenu={clickHandler}></button>
            </div>);
  }else if(is_bomb){
    //If it is a bomb give the tile a class of bomb
    return (<div>
              <button className = 'bomb' onClick={() => setClick(clicked + 1)}>
              </button>
            </div>);
  }else{
    //Else calculate the neighborhood bombs and display that value
    let color_map = {1:"blue", 2:"green", 3:"red", 4:"purple", 5:"brown", 6:"teal", 7:"black", 8:"gray"}
    const hStyle = { color: color_map[adjacent_bombs] };
    return (<div>
              <button className = 'tile' onClick={() => setClick(clicked + 1)}>
                <div className = 'bombtext' style = {hStyle}>{adjacent_bombs}</div>
              </button>
            </div>);//{x}{y}
  }
}
