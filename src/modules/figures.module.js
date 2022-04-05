import {Module} from "../core/module";
import {getRandomColor, random} from "../utils";

let coordinateX
let coordinateY

export class FiguresModule extends Module {
  constructor() {
    super('figures', 'Create Figure');
    this.figuresArray = []
  }
  trigger() {
    document.body.addEventListener('click', this.createFigures)
  }

  createFigures = event => {
    const randomNumber = random(1, 3)
    if (this.figuresArray[0]) {
      this.figuresArray[0].remove()
      this.figuresArray.shift()
    }
    if (!event.target.closest('#menu')) {
      if (randomNumber === 1) {
        this.createFigure('triangle', 'triangle', coordinateX, coordinateY)
      } else if (randomNumber === 2) {
        this.createFigure('circle', 'circle', coordinateX, coordinateY)
      } else if (randomNumber === 3) {
        this.createFigure('square', 'square', coordinateX, coordinateY)
      }
    }
  }

  createFigure = (name, classList) => {
    name = document.createElement('div')
    name.classList.add(`${classList}`, 'figure')
    if (classList === 'triangle') {
      name.style.borderBottom = `100px solid ${getRandomColor()}`
    } else {
      name.style.background = getRandomColor()
    }
    name.style.top = `${coordinateY - 50}px`
    name.style.left = `${coordinateX - 50}px`
    document.body.append(name)
    this.figuresArray.push(name)
  }

  removeListener() {
    document.body.removeEventListener('click', this.createFigures)
  }

}

document.body.addEventListener('mousemove', event => {
    const { x, y } = event
    coordinateX = x
    coordinateY = y
})