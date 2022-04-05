import {Module} from "../core/module";
import {random} from "../utils";

export class HoverBoardModule extends Module {
    constructor() {
        super('hover-board', 'Hover Board');
        this.board = document.createElement('div')
        this.board.classList.add('container')
        this.board.id = 'board'
        this.SQUARES_NUMBER = 1000
        this.SQUARE_SIZE = 30
        this.colors = ['#F08080', '#FF1493', '#FF8C00', '#FFFF00',
            '#EE82EE', '#9370DB', '#DAA520', '#1E90FF']
        this.squaresStyle = false
    }

    trigger() {
        document.body.append(this.board)
        document.body.style.backgroundColor = '#111'
        for (let i = 0; i < this.SQUARES_NUMBER; i++) {
            const square = document.createElement('div')
            square.classList.add('board__square')
            square.style.width = `${this.SQUARE_SIZE}px`
            square.style.height = `${this.SQUARE_SIZE}px`

            this.board.append(square)
        }

        this.board.addEventListener('click', this.changeStyle)
        this.board.addEventListener('mouseover', this.setColor)
        this.board.addEventListener('mouseout', this.removeColor)

    }

    setColor = event => {
        const isSquare = event.target.closest('.board__square')
        if (isSquare) {
            const color = this.colors[random(0, this.colors.length)]
            isSquare.style.backgroundColor = color
            isSquare.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`
            document.body.style.backgroundColor = color
            if (this.squaresStyle) {
                isSquare.style.borderRadius = '50%'
            } else {
                isSquare.style.borderRadius = '0%'
            }
        }
    }

    removeColor = event => {
        const isSquare = event.target.closest('.board__square')
        if (isSquare) {
            isSquare.style.backgroundColor = ''
            isSquare.style.boxShadow = ''
        }
    }

    changeStyle = () => {
        this.squaresStyle = !this.squaresStyle
    }

    removeListener() {
        this.board.removeEventListener('mouseover', this.setColor)
        this.board.removeEventListener('mouseout', this.removeColor)
        this.board.removeEventListener('click', this.changeStyle)
    }
}