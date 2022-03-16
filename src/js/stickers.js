import { nanoid } from 'nanoid'
import { DnD } from './dnd'

class Stickers {
  storage = localStorage.getItem('data')
  parseStorage = this.storage ? JSON.parse(this.storage) : []
  data = this.parseStorage
  constructor() {
    this.buttonCreateElement = document.querySelector('#btnCreate')
    this.containerElement = document.querySelector('.container')

    this.init()
  }

  init() {
    this.buttonCreateElement.addEventListener('click', this.handleClickButtonCreateSticker.bind(this))
    this.containerElement.addEventListener('click', this.handleRemoveSticker.bind(this))
    this.containerElement.addEventListener('dblclick', this.handleEditSticker.bind(this))
    this.containerElement.addEventListener('submit', this.handleSubmitStickerEdit.bind(this))
    window.addEventListener('dnd.positionSet', this.handleSetDataPosition.bind(this))


    window.addEventListener('beforeunload', () => {
      const string = JSON.stringify(this.data)
      localStorage.setItem('data', string)
    })
    document.addEventListener('DOMContentLoaded', () => this.render(this.data))
  }



  handleClickButtonCreateSticker() {
    const sticker = {
      id: nanoid(),
      createdAt: new Date(),
      content: 'Добавьте заметку',
      top: 'auto',
      left: 'auto'

    }

    this.data.push(sticker)
    this.render(sticker)
  }

  handleEditSticker(event) {
    const { target } = event
    if (target.dataset.role != 'edit') return
    let parent = target.closest('.card')
    parent.classList.add('card__edit')

  }

  handleSubmitStickerEdit(event) {
    event.preventDefault()
    const { target } = event
    const textareaElement = target.querySelector('textarea[name="content"]')
    const { value } = textareaElement
    const { id } = target.dataset
    this.data.forEach((item) => {
      if (item.id == id) {
        item.content = value
      }
    })
    let parent = target.closest('.card')
    parent.classList.remove('card__edit')
    this.render(this.data)
  }

  buildStickerElement(data) {
    const stickerElement = document.createElement('div')
    stickerElement.classList.add('card')
    stickerElement.setAttribute('data-id', data.id)
    stickerElement.setAttribute('data-role', 'edit')

    const temlateSticker = `
    <div class="card__item">
    ${data.content} </div>
    <form class="form-edit" data-id="${data.id}">
    <textarea name="content" type="text">${data.content}</textarea>
    <button type="submit" data-role="save" id="btnSave">Сохранить</button>
    </form>
    <button data-id="${data.id}" data-role="remove">✕</button>
    <time>${data.createdAt}</time>
    `

    stickerElement.innerHTML = temlateSticker
    new DnD(stickerElement)



    return stickerElement
  }

  handleSetDataPosition({ detail }) {

    const { positionTop,positionLeft } = detail
    this.data.forEach(item => {
      item.top = positionTop
      item.left = positionLeft
    })

  }


  handleRemoveSticker(event) {
    const { target } = event
    if (target.dataset.role != 'remove') return
    const { id } = target.dataset
    this.data.forEach((item, index) => {
      if (item.id == id) {
        this.data.splice(index, 1)
      }
    })
    this.render(this.data)

  }


  render(data) {

    this.containerElement.innerHTML = ''
    this.data.forEach(item => {
      const stickerElement = this.buildStickerElement(item)
      this.containerElement.append(stickerElement)
    })

  }

}

export { Stickers }
