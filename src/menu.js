import {Menu} from './core/menu'

const menu = document.querySelector('#menu')

export class ContextMenu extends Menu {
    open() {
        menu.classList.toggle('open')
    }
    close() {
        menu.classList.remove('open')
    }
    add(module) {
        menu.innerHTML += module.toHTML()
    }
}