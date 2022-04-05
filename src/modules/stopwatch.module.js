import {Module} from '../core/module'

export class StopWatch extends Module {
    constructor() {
        super('stopwatch', 'Stopwatch')
        this.sekundomersHTML = document.createElement('div')
        this.sekundomersHTML.id = 'sekundomers'
        this.createTimer = document.createElement('div')
        this.createTimer.className = 'time'
        this.getMinutes = document.createElement('span')
        this.getMinutes.id = 'minute'
        this.getMinutes.textContent = '00'
        this.getSecond = document.createElement('span')
        this.getSecond.id = 'second'
        this.getSecond.textContent = '00'
        this.timer = 0
        this.timerInterval = null
        this.variable = false
    }

    trigger() {
        this.sekundomersHTML.append(this.createTimer)
        this.createTimer.append(this.getMinutes)
        this.createTimer.append(this.getSecond)
        document.body.append(this.sekundomersHTML)
        
        document.body.addEventListener('dblclick', this.stop)
        
        document.body.addEventListener('click', this.clickCheck)
     }

     clickCheck = event => {
         if (!event.target.closest('#menu')) {
             if (this.variable) {
                 clearInterval(this.timerInterval)
                 this.variable = false
             } else {
                 this.start()
                 this.variable = true
             }
         }
     }

     start = () => {
        this.timerInterval = setInterval(() => {
            this.timer += 1
            console.log(this.timer)

            let secondVal = Math.floor(this.timer) - Math.floor(this.timer/60) * 60;
            let minuteVal = Math.floor(this.timer/60);
            this.getSecond.innerHTML = secondVal < 10 ? "0" + secondVal.toString() : secondVal
            this.getMinutes.innerHTML = minuteVal < 10 ? "0" + minuteVal.toString() : minuteVal
        }, 1000)
    }


    stop = () => {
        clearInterval(this.timerInterval)
        this.getSecond.innerHTML = '00'
        this.getMinutes.innerHTML = '00'
        this.timer = 0
    }

    removeListener() {
        document.body.removeEventListener('click', this.clickCheck)
        document.body.removeEventListener('click', this.stop)
    }

}

