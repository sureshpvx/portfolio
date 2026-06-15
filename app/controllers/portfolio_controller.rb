class PortfolioController < ApplicationController
  before_action :load_portfolio

  def index
  end

  def hypee
  end

  def terminal
  end

  def modal_demo
    render layout: false
  end

  private

  def load_portfolio
    @profile = Profile.first || Profile.new(
      name: "Suresh Sharma",
      role: "Ruby on Rails Developer",
      location: "Nagaur, Rajasthan, India",
      email: "sureshsharma04885@gmail.com",
      availability: "Available for remote Rails work worldwide",
      phone: "+91 9057104825",
      github: "https://github.com/sureshpvx",
      linkedin: "https://linkedin.com/in/sureshsharma"
    )

    @terminal_lines = [
      "booting suresh.sharma.portfolio",
      "ruby: 3.4.2",
      "rails: 8.0",
      "database: postgresql + pg_search",
      "frontend: turbo + stimulus + tailwind",
      "payments: razorpay hmac verification",
      "status: production ready"
    ]

    @skills = Skill.all.to_a
    @timeline = TimelineEvent.all.to_a
    @snippets = Snippet.all.to_a

    @search_products = [
      { name: "Ruby Gem Starter Kit", category: "Tooling", latency: 31 },
      { name: "Rails Admin Dashboard", category: "SaaS", latency: 28 },
      { name: "PostgreSQL Trigram Search", category: "Search", latency: 24 },
      { name: "Razorpay Checkout Flow", category: "Payments", latency: 36 },
      { name: "Turbo Modal System", category: "Frontend", latency: 19 },
      { name: "Soft Delete Order Archive", category: "Data Integrity", latency: 22 },
      { name: "OTP Auth Namespace", category: "Authentication", latency: 34 },
      { name: "QR Business Profile", category: "Reel On", latency: 29 }
    ]

    @hypee_metrics = [
      ["Search latency", "Sub-50ms"],
      ["Search surface", "6 models"],
      ["Deploy style", "Zero downtime"],
      ["Payment safety", "HMAC verified"],
      ["UX gain", "40% faster modals"],
      ["Build mode", "Solo full-stack"]
    ]

    @terminal_commands = {
      "whoami" => "Suresh Sharma - Ruby on Rails developer focused on production-grade commerce, search, payments, and Turbo UX.",
      "skills --list" => "Ruby, Rails 8, PostgreSQL, pg_search, Turbo, Stimulus, Tailwind CSS, Razorpay, Devise, OTP auth, Sidekiq, Render.",
      "projects --deployed" => "Hypee: full-stack e-commerce architecture with multi-model search, Razorpay payment flow, admin operations, and soft-delete order history.",
      "contact --schedule" => "Send a note to sureshsharma04885@gmail.com with the role, timezone, and project shape. Calendly can be connected when the live booking URL is ready.",
      "cv --download" => "Resume download endpoint is intentionally waiting for the verified PDF asset.",
      "help" => "Try: whoami, skills --list, projects --deployed, contact --schedule, cv --download, clear"
    }
  end
end
