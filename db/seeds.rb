Profile.find_or_create_by!(email: "sureshsharma4658@gmail.com") do |profile|
  profile.name = "Suresh Sharma"
  profile.role = "Ruby on Rails Developer"
  profile.location = "Nagaur, Rajasthan, India"
  profile.availability = "Available for remote Rails work worldwide"
  profile.phone = "+91 9057104825"
  profile.github = "https://github.com/your_username"
  profile.linkedin = "https://linkedin.com/in/your_username"
end

skills = [
  {
    name: "Rails 8",
    category: "Application Architecture",
    metric: "MVC + service objects",
    description: "Builds maintainable Rails systems with clear boundaries, fast server-rendered UX, and pragmatic conventions."
  },
  {
    name: "PostgreSQL Search",
    category: "Data Layer",
    metric: "Sub-50ms target",
    description: "Uses trigram and full-text search patterns for fuzzy, prefix-aware discovery without reaching for unnecessary infrastructure."
  },
  {
    name: "Turbo + Stimulus",
    category: "Frontend",
    metric: "40% faster modal UX",
    description: "Ships rich interactions with small, inspectable JavaScript and HTML-over-the-wire flows."
  },
  {
    name: "Razorpay",
    category: "Payments",
    metric: "HMAC verified",
    description: "Models checkout, signature verification, webhook idempotency, and payment state transitions carefully."
  },
  {
    name: "QR Code Engine",
    category: "Tools",
    metric: "Custom branded output",
    description: "Built production QR tooling with customization controls for business workflows at Reel On Technologies."
  },
  {
    name: "Render Deployments",
    category: "Operations",
    metric: "Zero-downtime mindset",
    description: "Treats deploys, uptime checks, CI, and observability as part of the product surface."
  }
]

skills.each do |skill_attrs|
  Skill.find_or_create_by!(name: skill_attrs[:name]) do |skill|
    skill.category = skill_attrs[:category]
    skill.metric = skill_attrs[:metric]
    skill.description = skill_attrs[:description]
  end
end

timeline_events = [
  {
    status: "deployed",
    company: "Reel On Technologies",
    duration: "May-Aug 2025",
    title: "CRUD Architecture for Business Profiles",
    description: "Structured profile management flows so teams could create, update, and ship business-facing records with confidence.",
    detail: "Resourceful routing, validation-first models, and tidy controller boundaries kept the feature easy to extend."
  },
  {
    status: "deployed",
    company: "Reel On Technologies",
    duration: "May-Aug 2025",
    title: "Turbo-Powered Modals",
    description: "Moved modal workflows to Turbo-driven partial updates and reduced perceived load time by 40%.",
    detail: "The interaction below streams in through a Turbo frame, keeping the page state intact."
  },
  {
    status: "review",
    company: "Reel On Technologies",
    duration: "May-Aug 2025",
    title: "QR Code Engine",
    description: "Built a customizable QR workflow with colors, payload controls, and production-friendly output patterns.",
    detail: "This portfolio includes a lightweight pattern studio to show the interaction model."
  }
]

timeline_events.each do |event_attrs|
  TimelineEvent.find_or_create_by!(title: event_attrs[:title]) do |event|
    event.status = event_attrs[:status]
    event.company = event_attrs[:company]
    event.duration = event_attrs[:duration]
    event.description = event_attrs[:description]
    event.detail = event_attrs[:detail]
  end
end

snippets = [
  {
    category: "Payments",
    title: "Razorpay Signature Verification",
    code: <<~RUBY
      expected = OpenSSL::HMAC.hexdigest(
        "SHA256",
        Rails.application.credentials.razorpay_secret,
        "\#{order.razorpay_order_id}|\#{params[:razorpay_payment_id]}"
      )

      raise PaymentSignatureError unless secure_compare(expected, params[:razorpay_signature])
    RUBY
  },
  {
    category: "Search",
    title: "Prefix-Aware pg_search Scope",
    code: <<~RUBY
      pg_search_scope :discover,
        against: [:name, :description],
        using: {
          tsearch: { prefix: true },
          trigram: { threshold: 0.18 }
        }
    RUBY
  },
  {
    category: "Data Integrity",
    title: "Soft Delete Without Losing History",
    code: <<~RUBY
      scope :visible_to_customer, -> { where(deleted_at: nil) }
      scope :admin_archive, -> { reorder(deleted_at: :desc, created_at: :desc) }

      def soft_delete!
        update!(deleted_at: Time.current)
      end
    RUBY
  }
]

snippets.each do |snippet_attrs|
  Snippet.find_or_create_by!(title: snippet_attrs[:title]) do |snippet|
    snippet.category = snippet_attrs[:category]
    snippet.code = snippet_attrs[:code]
  end
end
