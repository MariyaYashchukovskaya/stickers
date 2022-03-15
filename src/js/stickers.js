import { nanoid } from 'nanoid'
class Stickers {
  constructor () {
    console.log('hello')
    this.buttonCreateElement = document.querySelector('#btnCreate')
    this.init()
  }

  init () {
    this.buttonCreateElement.addEventListener('click', this.handleClickButtonCreateSticker.bind(this))
  }

  handleClickButtonCreateSticker () {
    console.log('click')
  }
}

export { Stickers }
