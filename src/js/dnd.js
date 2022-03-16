class DnD {

  position = {
    top: 'auto',
    left: 'auto'
  }

  shifts = {
    x: 0,
    y: 0
  }

  constructor(element) {
    this.element = element

    this.init()
  }

  init() {
    this.handleMouseMove = this.handleMouseMove.bind(this)

    this.element.addEventListener('mousedown', this.handleMouseDown.bind(this))
    this.element.addEventListener('mouseup', this.handleMouseUp.bind(this))
  }

  handleMouseDown({ clientX, clientY }) { // { clientX, clientY } = event
    // const clientX = event.clientX
    // const clientY = event.clientY
    // const { clientX, clientY } = event
    // console.log('mousedown')

    document.addEventListener('mousemove', this.handleMouseMove)

    this.calcShifts(clientX, clientY)
    this.setPosition(clientX, clientY)


  }

  handleMouseMove({ clientX, clientY }) {
    // console.log('mousemove')
    this.setPosition(clientX, clientY)


  }

  handleMouseUp({clientX, clientY }) {
    // console.log('mouseup')

    document.removeEventListener('mousemove', this.handleMouseMove)
    this.setPosition(clientX, clientY)
    let positionTop=this.position.top
    let positionLeft=this.position.left
    const customEvent = new CustomEvent('dnd.positionSet', {
      detail: {positionTop,positionLeft}
    })
    window.dispatchEvent(customEvent)
  }

  calcShifts(x, y) {
    const rect = this.element.getBoundingClientRect()
    const { left,top } = rect

    this.shifts.x = x - left
    this.shifts.y = y - top

  }

  setPosition(left, top) {
    this.position.left = left - this.shifts.x
    this.position.top = top - this.shifts.y

    this.element.style.top = this.position.top + 'px'
    this.element.style.left = this.position.left + 'px'




  }
}

export { DnD }
