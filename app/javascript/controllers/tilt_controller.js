import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    this.reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  }

  move(event) {
    if (this.reduceMotion) return

    const bounds = this.element.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width - 0.5
    const y = (event.clientY - bounds.top) / bounds.height - 0.5

    this.element.style.transform = `perspective(1000px) rotateX(${y * -4}deg) rotateY(${x * 5}deg) translateY(-2px)`
  }

  leave() {
    this.element.style.transform = ""
  }
}
