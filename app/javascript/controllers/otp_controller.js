import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["digit", "status"]

  advance(event) {
    const field = event.target
    field.value = field.value.replace(/[^0-9]/g, "").slice(0, 1)

    if (field.value) {
      const next = this.digitTargets[this.digitTargets.indexOf(field) + 1]
      next?.focus()
    }

    this.updateStatus()
  }

  retreat(event) {
    if (event.target.value) return

    const previous = this.digitTargets[this.digitTargets.indexOf(event.target) - 1]
    previous?.focus()
  }

  updateStatus() {
    const code = this.digitTargets.map((field) => field.value).join("")
    this.statusTarget.textContent = code.length === 6 ? "OTP verified. Admin namespace unlocked." : `Waiting for ${6 - code.length} digits.`
  }
}
