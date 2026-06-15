import { Controller } from "@hotwired/stimulus"

const COPY = {
  admin: "Admin view keeps soft-deleted records visible for refunds, support, fraud checks, and operational audits.",
  customer: "Customer view hides soft-deleted records from active lists while preserving historical invoices and fulfillment references."
}

export default class extends Controller {
  static targets = ["panel"]

  connect() {
    this.showMode("admin")
  }

  show(event) {
    this.showMode(event.params.mode)
  }

  showMode(mode) {
    this.panelTarget.textContent = COPY[mode]
  }
}
