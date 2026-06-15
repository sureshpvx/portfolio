import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["input", "output"]
  static values = { email: String }

  async submit(event) {
    event.preventDefault()

    const command = this.inputTarget.value.trim()

    if (!command) {
      this.outputTarget.textContent = "Try: start project discovery"
      return
    }

    this.outputTarget.textContent = "Sending message..."
    this.inputTarget.disabled = true

    try {
      const response = await fetch('/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ inquiry: { message: command } })
      })

      if (response.ok) {
        this.outputTarget.textContent = "Message saved to database successfully! We will be in touch."
        this.inputTarget.value = ""
      } else {
        this.outputTarget.replaceChildren(
          document.createTextNode(`Failed to save message. Open your mail client and send it to `),
          this.mailLink()
        )
      }
    } catch (e) {
      this.outputTarget.replaceChildren(
        document.createTextNode(`Error saving message. Open your mail client and send it to `),
        this.mailLink()
      )
    } finally {
      this.inputTarget.disabled = false
      this.inputTarget.focus()
    }
  }

  mailLink() {
    const link = document.createElement("a")
    link.href = `mailto:${this.emailValue}?subject=Rails%20project%20discovery`
    link.textContent = this.emailValue
    link.className = "text-emerald-200 underline decoration-emerald-200/40 underline-offset-4"
    return link
  }
}
