import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["query", "results", "metric"]
  static values = { products: Array }

  connect() {
    this.search()
  }

  search() {
    const query = this.queryTarget.value.trim().toLowerCase()
    const ranked = this.productsValue
      .map((product) => ({ ...product, score: this.score(product.name, product.category, query) }))
      .filter((product) => product.score > 0)
      .sort((a, b) => b.score - a.score || a.latency - b.latency)
      .slice(0, 4)

    this.render(ranked, query)
  }

  render(products, query) {
    this.resultsTarget.replaceChildren()

    if (products.length === 0) {
      const empty = document.createElement("p")
      empty.className = "rounded-lg border border-white/10 bg-black/35 p-3 text-sm text-[#F5F2EB]/55"
      empty.textContent = `No result for "${query}". Try rails, checkout, modal, qr, or search.`
      this.resultsTarget.appendChild(empty)
      this.metricTarget.textContent = "0ms"
      return
    }

    products.forEach((product) => {
      const row = document.createElement("div")
      row.className = "rounded-lg border border-white/10 bg-black/35 p-3"

      const title = document.createElement("div")
      title.className = "flex items-center justify-between gap-3"

      const name = document.createElement("strong")
      name.className = "text-sm text-white"
      name.textContent = product.name

      const latency = document.createElement("span")
      latency.className = "font-mono text-xs text-emerald-200"
      latency.textContent = `${product.latency}ms`

      const category = document.createElement("p")
      category.className = "mt-1 font-mono text-xs text-[#F5F2EB]/45"
      category.textContent = product.category

      title.append(name, latency)
      row.append(title, category)
      this.resultsTarget.appendChild(row)
    })

    this.metricTarget.textContent = `${products[0].latency}ms`
  }

  score(name, category, query) {
    if (!query) return 1

    const haystack = `${name} ${category}`.toLowerCase()
    if (haystack.startsWith(query)) return 100
    if (haystack.includes(query)) return 80

    let score = 0
    let cursor = 0

    for (const character of query) {
      const index = haystack.indexOf(character, cursor)
      if (index === -1) return 0

      score += Math.max(1, 12 - (index - cursor))
      cursor = index + 1
    }

    return score
  }
}
