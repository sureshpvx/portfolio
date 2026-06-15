import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["output"]
  static values = { lines: Array }

  connect() {
    this.timers = []

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      this.outputTarget.textContent = this.linesValue.map((line) => `$ ${line}`).join("\n")
      return
    }

    this.typeLine(0, 0)
  }

  disconnect() {
    this.timers.forEach((timer) => clearTimeout(timer))
  }

  typeLine(lineIndex, characterIndex) {
    if (lineIndex >= this.linesValue.length) return

    const line = `$ ${this.linesValue[lineIndex]}`
    this.outputTarget.textContent = [
      ...this.linesValue.slice(0, lineIndex).map((done) => `$ ${done}`),
      line.slice(0, characterIndex)
    ].join("\n")

    if (characterIndex <= line.length) {
      this.timers.push(setTimeout(() => this.typeLine(lineIndex, characterIndex + 1), 24))
    } else {
      this.timers.push(setTimeout(() => this.typeLine(lineIndex + 1, 0), 240))
    }
  }
}
