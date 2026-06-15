import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["input", "output"]
  static values = { commands: Object }

  connect() {
    this.history = []
    this.historyIndex = 0
  }

  submit(event) {
    event.preventDefault()

    const command = this.inputTarget.value.trim()
    if (!command) return

    if (command === "clear") {
      this.outputTarget.replaceChildren()
      this.inputTarget.value = ""
      return
    }

    this.history.push(command)
    this.historyIndex = this.history.length

    this.append(`guest@suresh:~$ ${command}`, "text-white")
    this.append(this.commandsValue[command] || `Command not found: ${command}. Type help.`)

    this.inputTarget.value = ""
    this.outputTarget.scrollTop = this.outputTarget.scrollHeight
  }

  historySearch(event) {
    if (!["ArrowUp", "ArrowDown"].includes(event.key)) return

    event.preventDefault()
    this.historyIndex += event.key === "ArrowUp" ? -1 : 1
    this.historyIndex = Math.max(0, Math.min(this.historyIndex, this.history.length))
    this.inputTarget.value = this.history[this.historyIndex] || ""
  }

  append(text, className = "text-emerald-200/80") {
    const line = document.createElement("p")
    line.className = className
    line.textContent = text
    this.outputTarget.appendChild(line)
  }
}
