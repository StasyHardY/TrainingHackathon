import {Module} from "../core/module";
import {random, modalWindow} from "../utils";

Element.prototype.appendAfter = function (element) {
    element.parentNode.insertBefore(this, element.nextSibling)
}

export class CardMemoryGameModule extends Module {
    constructor() {
        super('card-memory-game', 'Card Memory Game');
        this.arrayOfDataAttributes = []
        this.arrayOfBoxes = []
        this.board = document.createElement('div')
        this.board.classList.add('board')
        this.boardBoxes = null

        this.screen = document.createElement('div')
        this.screen.classList.add('screen')
        this.secondsHTML = null
        this.seconds = null
        this.minutesHTML = null
        this.minutes = null
        this.interval = null
        this.stars = null
        this.moves = null

        this.countOpenBoxes = null
        this.countStars = null
        this.countMoves = null
    }

    trigger() {
        clearInterval(this.interval)
        this.countOpenBoxes = 0
        this.countStars = 2
        this.countMoves = 0

        this.screen.innerHTML = this.createScreen()
        document.body.append(this.screen)

        for (let i = 0; i < 16; i++) {
            this.createBoxes()
        }
        document.body.append(this.board)
        document.body.style.backgroundColor = '#1f1f1f'

        this.secondsHTML = document.querySelector('.timer__seconds')
        this.secondsHTML.innerHTML = '00'
        this.seconds = '00'
        this.minutesHTML = document.querySelector('.timer__minutes')
        this.minutesHTML.innerHTML = '00'
        this.minutes = '00'
        this.stars = document.querySelectorAll('.star')
        this.moves = document.querySelector('.moves')

        this.startTimer()

        for (let i = 0; i < 16; i++) {
            const randomNumber = random(1, 16)
            if (!this.arrayOfDataAttributes.includes(randomNumber)) {
                this.arrayOfDataAttributes.push(randomNumber)
            } else {
                i--
            }
        }
        this.arrayOfDataAttributes = this.arrayOfDataAttributes.map(item => {
            if (item > 8) {
                return item - 8
            } else {
                return  item
            }
        })

        this.boardBoxes = document.querySelectorAll('.board__box')
        this.boardBoxes.forEach((box, index) => box.setAttribute('id', String(this.arrayOfDataAttributes[index])))
        this.arrayOfDataAttributes.length = 0
        this.board.addEventListener('click', this.opensBoxes)
    }

    opensBoxes = event => {
        event.preventDefault()
        const isBox = event.target.closest('.board__box_listener')
        if (isBox) {
            isBox.style.background = '#cc0000'
            isBox.textContent = isBox.id
            this.arrayOfBoxes.push(isBox)
            isBox.classList.remove('board__box_listener')
            if (this.arrayOfBoxes.length ===2) {
                if (this.arrayOfBoxes[0].id === this.arrayOfBoxes[1].id) {
                    this.arrayOfBoxes.forEach(box => {
                        box.classList.add('board__box_found')
                        setTimeout(() => {
                            box.style.background = '#1f1f1f'
                            box.textContent = ''
                        }, 1000)
                    })
                    this.countOpenBoxes++
                    this.countStars < 2 && this.countStars++
                    this.stars[this.countStars].style.background = '#fff'
                } else {
                    this.arrayOfBoxes.forEach(box => {
                        setTimeout(() => {
                            box.style.background = '#336633'
                            box.textContent = ''
                            box.classList.add('board__box_listener')
                        }, 300)
                    })
                    setTimeout(() => {
                        this.stars[this.countStars].style.background = 'transparent'
                        this.countStars--
                    }, 300)
                    this.countStars === 0 && this.finishGame('lose')
                }
                for (let i = 0; i < 2; i++) {
                    this.arrayOfBoxes.pop()
                }
                this.countMoves++
                this.moves.innerHTML = `${this.countMoves} Moves`
            }
        }
        this.countOpenBoxes === 8 && this.finishGame('win')
    }

    createBoxes() {
        const boardBox = document.createElement('div')
        boardBox.classList.add('board__box', 'board__box_listener')
        this.board.append(boardBox)
    }

    createScreen() {
        return `
            <div class="stars">
                <div class="star"></div>
                <div class="star"></div>
                <div class="star"></div>
            </div>
            <div class="stopwatch">
                <div class="timer__minutes"></div>
                <div><h1 class="dots ">:</h1></div>
                <div class="timer__seconds"></div>
            </div>
            <div class="moves">0 Moves</div>
        `
    }

    startTimer() {
        this.interval = setInterval(() => {
            this.seconds = +this.seconds + 1
            if (this.seconds < 10) {
                this.seconds = '0' + this.seconds
            }
            if (+this.seconds === 60) {
                this.seconds = '00'
                this.minutes = +this.minutes + 1
            }

            this.secondsHTML.innerHTML = this.seconds
            this.minutesHTML.innerHTML = this.minutes
        }, 1000)
    }

    finishGame(gameResult) {
        if (gameResult === 'win') {
            const modalResult = modalWindow({
                title: `<h1>You win</h1>`,
                content: `
                    <h2>Move: ${this.moves.innerHTML.replace('Moves', '')}</h2>
                    <h2>Time: ${this.minutesHTML.innerHTML}:${this.secondsHTML.innerHTML}</h2>
                `
            })
            modalResult.appendAfter(document.querySelector('#menu'))
        } else if (gameResult === 'lose') {
            const modalResult = modalWindow({
                title: `<h1>You lose</h1>`,
                content: `
                      <h2>Move: ${this.moves.innerHTML.replace('Moves', '')}</h2>
                      <h2>Time: ${this.minutesHTML.innerHTML}:${this.secondsHTML.innerHTML}</h2>
                `
            })
            modalResult.appendAfter(document.querySelector('#menu'))
        }

        clearInterval(this.interval)
    }

    removeListener() {
        this.board.removeEventListener('click', this.opensBoxes)
        this.board.innerHTML = ''
        document.body.style.backgroundColor = '#fff'
    }
}