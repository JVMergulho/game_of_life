class Cell {
  constructor(state, x, y, w) {
    this.state = state;
    this.previous = this.state;

    this.x = x;
    this.y = y;
    this.w = w;
  }
  
  updateState(neighbors){
    this.previous = this.state
    
    if(this.state === 0 && neighbors == 3){
        this.state = 1
      }else if(this.state == 1 && (neighbors < 2 || neighbors > 3)){
        this.state = 0
      } 
  }

  show() {
    stroke(0);
    // If the cell is born, color it blue!
    if (this.previous === 0 && this.state == 1) {
      fill(100, 100, 255);
    } else if (this.state == 1) {
      fill(0);
      // If the cell dies, color it red!
    } else if (this.previous == 1 && this.state === 0) {
      fill(255, 150, 150);
    } else {
      fill(255);
    }
    square(this.x, this.y, this.w);
  }
}