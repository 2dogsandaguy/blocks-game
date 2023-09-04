const grid = document.querySelector(".grid");
const boxWidth = 100
const boxHeight = 20

const userStart = [230, 10]
let currentPosition = userStart
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
    new Box(120, 270),
    new Box(230, 270),
    new Box(340, 270),
    new Box(450, 270),
    new Box(10, 240),
    new Box(120, 240),
    new Box(230, 240),
    new Box(340, 240),
    new Box(450, 240),
    new Box(10, 210),
    new Box(120, 210),
    new Box(230, 210),
    new Box(340, 210),
    new Box(450, 210),

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

const user = document.createElement("user");
user.classList.add("user");
user.style.left = currentPosition[0] + "px";

user.style.bottom = currentPosition[1] + "px";
grid.appendChild(user);