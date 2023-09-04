const grid = document.querySelector(".grid");
const boxWidth = 100
const boxHeight = 20
//create block
class Box {
  constructor(xAxis, yAxis) {
    this.bottomLeft = [xAxis, yAxis];
    this.bottomRight = [xAxis + boxWidth, yAxis];
    this.topLeft = [xAxis, yAxis + boxHeight];
    this.topRight = [xAxis + boxWidth, yAxis + boxHeight];
  }
}

//all my boxes
const boxes = [
    new Box(10, 270),
/*     new Box(120, 270),
    new Box(230, 270),
    new Box(340, 270),
    new Box(450, 270), */
   /*  new Box(10, 270),
    new Box(10, 270),
    new Box(10, 270),
    new Box(10, 270),
     */
]

console.log(boxes[0]);

function createBoxes() {
    for (let i = 0;i < boxes.length;i++) {
  const box = document.createElement("div");

  box.classList.add("box");
  box.style.left = boxes[i].bottomLeft[0] + "px";
  box.style.bottom =  boxes[i].bottomLeft[1] + "px";
  grid.appendChild(box);
    }
}

createBoxes();
