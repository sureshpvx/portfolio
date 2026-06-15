import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["time"]
  static values = { timezone: String }

  connect() {
    this.update()
    this.timer = setInterval(() => this.update(), 1000)
  }

  disconnect() {
    clearInterval(this.timer)
  }

  update() {
    const formatter = new Intl.DateTimeFormat("en-IN", {
      timeZone: this.timezoneValue || "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false
    })

    this.timeTarget.textContent = formatter.format(new Date())
  }
}
