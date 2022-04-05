import {Module} from "../core/module"

export class RandomSoundModule extends Module {
   constructor() {
      super('random-sound','Random Sound')
      this.btn = document.createElement('button')
      this.btn.classList.add('start-button.hidden')
      this.btn.textContent = 'Sound!'

   }

   trigger() {
      document.body.append(this.btn)

      this.btn.addEventListener('click',() => {
         playSound()
      })

      function playSound() {
         let rand = Math.floor(Math.random() * soundContainer.length)
         if(rand === 0) {
            firstSound.play()
         }
         if(rand === 1) {
            secondtSound.play()
         }

         if(rand === 2) {
            threeSound.play()
         }
         if(rand === 3) {
            foursSound.play()
         }
      }
      let firstSound = new Audio("https://www.mediacollege.com/downloads/sound-effects/alien/laser-01.mp3")
      let secondtSound = new Audio("https://www.mediacollege.com/downloads/sound-effects/money/cash-register-02.wav")
      let threeSound = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3")
      let foursSound = new Audio("https://www.mediacollege.com/downloads/sound-effects/people/laugh/laugh-man-01.wav")
      const soundContainer = [firstSound,secondtSound, threeSound, foursSound]
   }
}