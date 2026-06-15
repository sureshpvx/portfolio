import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["payload", "foreground", "background", "grid"]

  connect() {
    this.render()
  }

  render() {
    const payload = this.payloadTarget.value || "rails"
    const foreground = this.foregroundTarget.value
    const background = this.backgroundTarget.value
    const size = 17

    this.gridTarget.style.setProperty("--qr-fg", foreground)
    this.gridTarget.style.setProperty("--qr-bg", background)
    this.gridTarget.replaceChildren()

    for (let row = 0; row < size; row += 1) {
      for (let column = 0; column < size; column += 1) {
        const cell = document.createElement("span")
        cell.className = "qr-cell"

        if (this.isFinder(row, column, size) || this.seed(payload, row, column)) {
          cell.classList.add("is-active")
        }

        this.gridTarget.appendChild(cell)
      }
    }
  }

  isFinder(row, column, size) {
    return this.inSquare(row, column, 0, 0) || this.inSquare(row, column, 0, size - 5) || this.inSquare(row, column, size - 5, 0)
  }

  inSquare(row, column, startRow, startColumn) {
    return row >= startRow && row < startRow + 5 && column >= startColumn && column < startColumn + 5
  }

  seed(payload, row, column) {
    let hash = 0
    for (let index = 0; index < payload.length; index += 1) {
      hash = (hash * 31 + payload.charCodeAt(index) + row * 7 + column * 13) % 9973
    }

    return (hash + row * column + row + column) % 5 < 2
  }
}
