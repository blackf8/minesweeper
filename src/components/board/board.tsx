import React, { useState } from 'react';
import Tile from "../Tile/Tile.tsx";
import "./board.css";


const board_size = 16;
const num_bombs = 40;
let bombs = [];

let i = 0;
while(i < num_bombs){
  let temp_x = Math.floor(Math.random()*board_size)
  let temp_y = Math.floor(Math.random()*board_size)

  //check if created bomb is different from all existing bombs
  let unique_bomb = true;
  for(let j = 0; j < bombs.length; j++){
    if((temp_x === bombs[j][0]) & (temp_y === bombs[j][1])){
      unique_bomb = false;
    }
  }
  if(unique_bomb){
    bombs.push([temp_x, temp_y]);
    i = i + 1;
  }
}
let temp_board = {};
for(let i = 0; i < board_size; i++){
    let temp_row = {};

  for(let j = 0; j < board_size; j++){
    //Check if current tile is a bomb.
    let is_bomb = false;
    for(let k = 0; k < bombs.length; k++){
      if(i===bombs[k][0] & j===bombs[k][1]){
        is_bomb = true;
      }
    }
    //Calculate adjacent bombs to current tile.
    let adjacent_bombs = 0;
    for(let k = 0; k < bombs.length; k++){
      if(((i-1===bombs[k][0]) | (i+1===bombs[k][0]) | (i===bombs[k][0])) & ((j-1===bombs[k][1]) | (j+1===bombs[k][1]) | (j===bombs[k][1]))){
        adjacent_bombs = adjacent_bombs + 1;
      }
    }
    if(is_bomb){
      adjacent_bombs = -1;
    }
    temp_row[j] = [adjacent_bombs];
  }
  temp_board[i] = temp_row;
}
const board_layout = temp_board;

export default function board(){
  let board_state = [];
  const [tile_data, clickTile] = useState([false,-1,-1]);

  //if a tile is clicked, recursively find all other tiles that should be clicked
  let recursive_tiles = {};
  let recursive_array = [];
  if(tile_data[0] != false){
    recursive_array.push([tile_data[1], tile_data[2]]);
    let prev_tiles = [];
    while(recursive_array.length != 0){
      for(let i = 0; i < recursive_array.length; i++){
        let base_element = recursive_array[0];
        //console.log(base_element, (board_layout[base_element[0]][base_element[1]][0] === 0));
        //adding to dict
        if(recursive_tiles[base_element[0]] != undefined){
          recursive_tiles[base_element[0]][base_element[1]] = false;
        }else{
          let temp_recursive = {};
          temp_recursive[base_element[1]] = false;
          recursive_tiles[base_element[0]] = temp_recursive;
        }

        if((board_layout[base_element[0]][base_element[1]][0] === 0) & (base_element[0] < board_size)){
          //console.log(base_element)
          for(let j=-1; j<2; j++){
            for(let k=-1; k<2; k++){
              let new_x = base_element[0]+j;
              let new_y = base_element[1]+k;
              let cond1 = new_x==base_element[0] & new_y==base_element[1];
              let cond3 = true;
              for(let l=0; l<prev_tiles.length; l++){
                if(prev_tiles[l][0]===new_x & prev_tiles[l][1]===new_y){
                  cond3 = false;
                }
              }
              if((new_x>=0) & (new_x<board_size) & (new_y>=0) & (new_y<board_size)){
                if(cond3){
                  recursive_array.push([new_x,new_y]);
                  //console.log(new_x, new_y)
                }
              }
            }
          }
        }
        prev_tiles.push([base_element[0], base_element[1]]);
        recursive_array.shift();
      }
    }
  }
  //Update board
  for(let i = 0; i < board_size; i++){
    for(let j = 0; j < board_size; j++){
      let manual = false;
      if(recursive_tiles[i] != undefined ){
        if(recursive_tiles[i][j] != undefined){
          manual = true;
        }
      }
      board_state.push(<Tile key={[i,j]} x={i} y={j} adjacent_bombs={board_layout[i][j][0]} clickTile={clickTile} search={tile_data} manual_click={manual}/>);
    }
  }
  let status = "Minesweeper";
  if(tile_data[0]===true){
    if(board_layout[tile_data[1]][tile_data[2]][0] === -1){
      status = "Game Over";
    }
  }
  //const hStyle = {display:grid;grid-template-columns: repeat(9,auto)};
  return <div>
          <div id = "header">
            <h1>{status}</h1>
          </div>
          <div id = 'board'>{board_state}</div>
         </div>;
}


// 1) figure out how to display counts for each Tile
// 2) figure out how to hide and then display single Tile
// 3) write breath first search function to actualize real clicks
