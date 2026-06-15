import { Controller } from "@hotwired/stimulus"

const STEPS = [
  "Checkout creates a Razorpay order and stores the expected amount server-side.",
  "HMAC signature verification compares Razorpay's response against the server secret before marking payment as trusted.",
  "Webhook handlers are idempotent so duplicate payment events do not corrupt order state.",
  "The order moves from pending to paid to fulfilled, with admin controls reflecting the latest verified state."
]

export default class extends Controller {
  static targets = ["steps", "copy"]

  connect() {
    this.activeIndex = 0
    this.render()
  }

  select(event) {
    this.activeIndex = event.params.index
    this.render()
  }

  render() {
    this.stepsTarget.querySelectorAll(".payment-step").forEach((button, index) => {
      button.classList.toggle("is-active", index === this.activeIndex)
    })

    this.copyTarget.textContent = STEPS[this.activeIndex]
  }
}
