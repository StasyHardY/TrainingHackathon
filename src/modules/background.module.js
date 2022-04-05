import {Module} from '../core/module'
import {getContastRandomColor, getRandomColor, random} from "@/utils";

let coordinateX
let coordinateY

export class BackgroundModule extends Module {
  trigger() {
    document.body.addEventListener('click', changeBackground)
    document.body.addEventListener('mousemove', mouseCoordinates)
  }

  removeListener() {
    document.body.removeEventListener('click', changeBackground)
    document.body.removeEventListener('click', mouseCoordinates)
  }
}

function mouseCoordinates(event) {
  const {x, y} = event
  coordinateX = x
  coordinateY = y
  return coordinateX, coordinateY
}

function changeBackground() {
  document.body.removeEventListener('click', changeBackground)

  const randomNumber = random(2, 9)

  if (randomNumber > 5) {
    changeSomeBackground(randomNumber)
  } else {
    fillBackgroundFigure()
  }
}

function fillBackgroundFigure() {
  let fillFigure
  let fillFigureSize = 1

  setTimeout(() => {
    createFigure('square', 'square', coordinateX, coordinateY)
    fillFigure = document.querySelector('.square')
    fillFigure.style.position = 'absolute'
    document.body.style.overflow = "hidden"
    fillFigure.style.width = fillFigure.style.height = `${fillFigureSize}px`

    const interval = setInterval(() => {
      if (fillFigureSize < window.screen.width * 2) {
        fillFigureSize *= 1.3
        fillFigure.style.width = fillFigure.style.height = `${fillFigureSize}px`
        fillFigure.style.left = `${coordinateX - fillFigureSize / 2}px`
        fillFigure.style.top = `${coordinateY - fillFigureSize / 2}px`
      } else {
        clearInterval(interval)
        document.body.style.background = fillFigure.style.backgroundColor
        fillFigure.remove()
      }
    }, 100)
  }, 500)
}

function changeSomeBackground(randomNumber) {
  document.body.style.transition = `background 0.8s steps(${randomNumber}) 0.2s`
  const counter = createCounter()
  const interval = randomBackgroundAndCounter(counter)
  finishClear(interval, counter, randomNumber)
}

function createCounter() {
  const container = document.createElement('div')
  container.className = 'container-counter-background'
  document.body.append(container)

  let counter
  if (container && container.childElementCount === 0) {
    counter = document.createElement('div')
    counter.className = 'counter-background'
    container.append(counter)
  } else {
    counter = document.querySelector('.counter-background')
  }
  return counter
}

function randomBackgroundAndCounter(counter, count = 1) {
  const interval = setInterval(() => {
    counter.textContent = `количество замен цвета: ${count++}`
    const randomColor = getRandomColor()
    const contrastColor = getContastRandomColor(randomColor)
    document.body.style.background = `${randomColor}66`
    counter.style.color = contrastColor
  }, 1000)
  return interval
}

function finishClear(interval, counter, randomNumber) {
  setTimeout(() => {
    clearInterval(interval)
    document.body.style.transition = ``
    setTimeout(() => counter.parentElement.remove(), 2000)
  }, 1000 * randomNumber)
}

function createFigure(name,classList) {
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
}

