export function random(min, max) {
  return Math.round(min - 0.5 + Math.random() * (max - min + 1))
}

export function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export function getContastRandomColor(sourseColor) {
  const sourseColorNumber = sourseColor.slice(1, sourseColor.length)
  let contrastColorNumberDec = (Math.pow(256, 3) - 1) - parseInt(sourseColorNumber, 16)
  let contrastColor = `#${contrastColorNumberDec.toString(16)}`
  return contrastColor
}

export function cleanBody() {
  while (document.body.childNodes.length > 2) {
    document.body.removeChild(document.body.lastChild)
  }
}


export function modalWindow(options) {
  const modal = document.createElement('div')
  modal.classList.add('modal')
  modal.insertAdjacentHTML('afterbegin', `
    <div class="modal-overlay">
        <div class="modal-window">
            <div class="modal-header">
                <span class="modal-header__title">${options.title || 'Window'}</span>
            </div>
            <div class="header-body">
                ${options.content || ''}
            </div>
        </div>
    </div>
  `)
  return modal
}
