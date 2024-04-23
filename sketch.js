// John Conway's Game of Life

const WIDTH = 600
const HEIGHT = 600
// RES tem que ser divisor de WIDTH e HEIGHT
const RES = 20

let grid
let cols
let rows
let start = false

let startBtn
let resetBtn
let slider

function setup() {
  frameRate(30)
  createCanvas(WIDTH, HEIGHT)
  cols = floor(width / RES)
  rows = floor(height / RES)
  
  grid = makeGrid(cols, rows)
  
  startBtn = createButton('Start');
  startBtn.position(WIDTH - 130, HEIGHT + 10);
  startBtn.mousePressed(play)
  startBtn.size(60, 30)
  startBtn.style("font-size", "16px");
  
  resetBtn = createButton('Reset');
  resetBtn.position(WIDTH - 60, HEIGHT + 10);
  resetBtn.mousePressed(reset)
  resetBtn.size(60, 30)
  resetBtn.style("font-size", "16px");
  
  slider = createSlider(1,30,20);
  slider.position(WIDTH - 150, HEIGHT + 50);
  slider.style('width', '150px');
}

function draw() {
  background(0)
  frameRate(slider.value());
  
  // renderizar as células
  for (let i = 0; i < cols; i++){
    for(let j = 0; j < rows; j++){
      grid[i][j].show()
    }
  }
  
  // calcular os novos estados
  if(start){
    for (let i = 0; i < cols; i++){
      for(let j = 0; j < rows; j++){
        let neighbors = countNeighbors(i, j)
        grid[i][j].updateState(neighbors)
      }
    }
  }
  
}

function play(){
  start = !start
  
  if(!start){
    startBtn.html("Start")
  } else {
    startBtn.html("Stop")
  }
}

function reset(){
  grid = makeGrid()
  start = false
  startBtn.html("Start")
}

function makeGrid(){
  let arr = new Array(cols)
  for (let i = 0; i < cols; i++){
    arr[i] = new Array(rows)
    
    for(let j = 0; j < rows; j++){
      arr[i][j] = new Cell(0, i*RES, j*RES, RES)
    }
  }
  
  return arr
}

function mouseClicked() {
  if (mouseX >= 0 && mouseX < WIDTH && mouseY >= 0 && mouseY < HEIGHT) {
    let col = floor(mouseX / RES);
    let row = floor(mouseY / RES);
    
    if(grid[col][row].state===0){
      grid[col][row].state = 1;
      grid[col][row].previous =  grid[col][row].state;
    } else{
      grid[col][row].state = 0;
      grid[col][row].previous =  grid[col][row].state;
    }
    
  }
}

function countNeighbors(x, y){
  let sum = 0
  
  for (let i = -1; i < 2; i++){
    for(let j = -1; j < 2; j++){
      if(i==0 && j==0){
        continue
      }
      let col = (x + i + cols) % cols
      let row = (y + j + rows) % rows
      sum += grid[col][row].previous
    }
  }
  
  
  return sum
}