import { useEffect, useRef, useState } from "react"
import { photo, productCategories, products, type Product } from "./products"

type IconName = "arrow" | "phone" | "chat" | "shield" | "tool" | "truck" | "check" | "close" | "menu" | "bolt" | "pin" | "mail"

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, React.ReactNode> = {
    arrow: (
      <>
        <path d="M4 12h16M14 6l6 6-6 6" />
      </>
    ),
    phone: (
      <path d="M7 3H4a1 1 0 0 0-1 1c0 9.4 7.6 17 17 17a1 1 0 0 0 1-1v-3l-5-2-2 2a15 15 0 0 1-7-7l2-2-2-5Z" />
    ),
    chat: (
      <>
        <path d="M21 11.5a9 9 0 0 1-13.7 7.7L3 21l1.8-4.3A9 9 0 1 1 21 11.5Z" />
        <path d="m8 7 1 3-1 1c1 2 2 3 4 4l1-1 3 1" />
      </>
    ),
    shield: (
      <>
        <path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6l8-3Z" />
        <path d="m8 12 3 3 5-6" />
      </>
    ),
    tool: (
      <path d="M14 6a5 5 0 0 0-6 6L3 17a2.8 2.8 0 0 0 4 4l5-5a5 5 0 0 0 6-6l-3 3-4-4 3-3Z" />
    ),
    truck: (
      <>
        <path d="M3 5h12v12H3zM15 9h3l3 4v4h-6" />
        <circle cx="7" cy="18" r="2" />
        <circle cx="18" cy="18" r="2" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    close: <path d="m6 6 12 12M18 6 6 18" />,
    menu: <path d="M4 6h16M4 12h16M4 18h16" />,
    bolt: <path d="m13 2-9 12h7l-1 8 10-13h-7l1-7Z" />,
    pin: (
      <>
        <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" />
        <circle cx="12" cy="9.5" r="2.5" />
      </>
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),
  }
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  )
}

const EMAIL = "chedutechenterprises@gmail.com"

const whatsapp = (message: string) =>
  `https://wa.me/254707807422?text=${encodeURIComponent(message)}`

const LOGO = `${import.meta.env.BASE_URL}favicon.svg`
const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=River+Road+Nairobi+Kenya"
const FACEBOOK_URL = "https://www.facebook.com/search/top?q=Edwin%20Osundwa"
const INSTAGRAM_URL = "https://www.instagram.com/" // TODO: replace with your Instagram profile link
// TODO: replace these two search links with the direct profile links once you have them
const TIKTOK_URL = "https://www.tiktok.com/search?q=Edwin%20Osundwa"

const CALL_NUMBER = "0707 807 422"
const GMAIL_COMPOSE = `https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}&su=${encodeURIComponent("Enquiry from the Chedutech website")}`

const isTouchDevice = () => window.matchMedia("(pointer: coarse)").matches

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}

// Call and email actions for the contact section.
// Phones: the normal tel: / mailto: links open the dialler and the mail app.
// Desktops: there is usually no calling app, and many visitors have no mail app set up,
// so the number is copied with a short confirmation and email opens Gmail compose.
function useContactActions() {
  const [notice, setNotice] = useState("")
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const showNotice = (text: string) => {
    setNotice(text)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setNotice(""), 5000)
  }

  const onCall = async () => {
    if (isTouchDevice()) return
    const copied = await copyText(CALL_NUMBER)
    showNotice(
      copied
        ? `Number copied: ${CALL_NUMBER}. Call us from your phone.`
        : `Call us on ${CALL_NUMBER}`,
    )
  }

  const onEmail = (event: React.MouseEvent) => {
    if (isTouchDevice()) return
    event.preventDefault()
    window.open(GMAIL_COMPOSE, "_blank", "noopener,noreferrer")
  }

  return { notice, onCall, onEmail }
}

type ContactActions = ReturnType<typeof useContactActions>

function SocialIcon({ name }: { name: "whatsapp" | "facebook" | "instagram" | "tiktok" }) {
  const paths = {
    whatsapp:
      "M12.04 2a9.9 9.9 0 0 0-8.5 14.9L2 22l5.25-1.38A9.9 9.9 0 1 0 12.04 2Zm0 18.1a8.2 8.2 0 0 1-4.2-1.15l-.3-.18-3.1.82.83-3.03-.2-.31a8.2 8.2 0 1 1 6.97 3.85Zm4.5-6.15c-.25-.12-1.46-.72-1.69-.8-.22-.09-.39-.13-.55.12-.17.25-.63.8-.77.96-.14.17-.28.19-.53.06-.25-.12-1.04-.38-1.98-1.22-.73-.65-1.22-1.46-1.37-1.7-.14-.25-.02-.38.1-.5.11-.11.25-.29.37-.43.12-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.41-.55-.42h-.47c-.17 0-.43.06-.65.31-.23.25-.86.84-.86 2.05s.88 2.38 1 2.55c.12.16 1.73 2.64 4.2 3.7.59.26 1.05.41 1.4.52.59.19 1.13.16 1.55.1.47-.07 1.46-.6 1.66-1.17.2-.58.2-1.07.14-1.18-.06-.1-.22-.16-.47-.28Z",
    facebook:
      "M13.5 22v-8.2h2.8l.5-3.3h-3.3V8.4c0-.95.4-1.7 1.8-1.7h1.6V3.8A20 20 0 0 0 14.6 3.7c-2.6 0-4.3 1.6-4.3 4.4v2.4H7.5v3.3h2.8V22h3.2Z",
    tiktok:
      "M12.53.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07Z",
    instagram:
      "M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm-.2 2A3.6 3.6 0 0 0 4 7.6v8.8A3.6 3.6 0 0 0 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6A3.6 3.6 0 0 0 16.4 4H7.6Zm9.65 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z",
  }
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d={paths[name]} />
    </svg>
  )
}

function SocialLinks({ onCall, onEmail }: Pick<ContactActions, "onCall" | "onEmail">) {
  return (
    <ul className="social-links" aria-label="Contact Chedutech Enterprises">
      <li>
        <a
          href={whatsapp("Hello Chedutech Enterprises, I would like to make an enquiry.")}
          target="_blank"
          rel="noreferrer"
          aria-label="Chat on WhatsApp"
          title="WhatsApp"
        >
          <SocialIcon name="whatsapp" />
        </a>
      </li>
      <li>
        <a href={FACEBOOK_URL} target="_blank" rel="noreferrer" aria-label="Chedutech on Facebook" title="Facebook">
          <SocialIcon name="facebook" />
        </a>
      </li>
      <li>
        <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" aria-label="Chedutech on Instagram" title="Instagram">
          <SocialIcon name="instagram" />
        </a>
      </li>
      <li>
        <a href={TIKTOK_URL} target="_blank" rel="noreferrer" aria-label="Chedutech on TikTok" title="TikTok">
          <SocialIcon name="tiktok" />
        </a>
      </li>
      <li>
        <a href={MAPS_URL} target="_blank" rel="noreferrer" aria-label="Find us on Google Maps: River Road, Nairobi" title="Find us on Google Maps">
          <Icon name="pin" size={22} />
        </a>
      </li>
      <li>
        <a href="tel:+254707807422" onClick={onCall} aria-label="Call 0707 807 422" title="Call us">
          <Icon name="phone" size={22} />
        </a>
      </li>
      <li>
        <a href={`mailto:${EMAIL}`} onClick={onEmail} aria-label="Email Chedutech Enterprises" title="Email us">
          <Icon name="mail" size={22} />
        </a>
      </li>
    </ul>
  )
}

function ContactForm() {
  const [sent, setSent] = useState("")
  return (
    <form
      className="contact-form"
      onSubmit={(event) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        const get = (key: string) => String(data.get(key) ?? "").trim()
        const details = [
          get("company") && `Company: ${get("company")}`,
          get("phone") && `Phone: ${get("phone")}`,
          get("email") && `Email: ${get("email")}`,
        ].filter(Boolean)
        const lines = [
          `Hello Chedutech Enterprises, my name is ${get("name")}.`,
          ...details,
          "",
          get("message"),
        ]
        const link = whatsapp(lines.join("\n"))
        setSent(link)
        window.open(link, "_blank", "noopener,noreferrer")
      }}
    >
      <label>
        <span>Full name <b>*</b></span>
        <input name="name" required maxLength={100} autoComplete="name" placeholder="John Doe" />
      </label>
      <label>
        <span>Company</span>
        <input name="company" maxLength={100} autoComplete="organization" placeholder="Company (optional)" />
      </label>
      <label>
        <span>Email address</span>
        <input name="email" type="email" maxLength={120} autoComplete="email" placeholder="you@example.com" />
      </label>
      <label>
        <span>Phone</span>
        <input name="phone" type="tel" maxLength={30} autoComplete="tel" placeholder="0707 807 422" />
      </label>
      <label className="contact-form-wide">
        <span>Message <b>*</b></span>
        <textarea name="message" required maxLength={2000} rows={4} placeholder="Product, model, quantity, or the job you have in mind…" />
      </label>
      <div className="contact-form-wide contact-form-submit">
        <button type="submit" className="button button-orange">
          <Icon name="chat" /> Send via WhatsApp <Icon name="arrow" size={18} />
        </button>
        <small>Opens WhatsApp with your details filled in.</small>
      </div>
      {sent && (
        <div className="enquiry-status contact-form-wide" role="status">
          <Icon name="check" size={18} />
          <div>
            Your enquiry is ready.
            <small>
              WhatsApp didn't open?{" "}
              <a href={sent} target="_blank" rel="noreferrer">Continue here</a> and press Send.
            </small>
          </div>
        </div>
      )}
    </form>
  )
}

const quoteCategories = [...productCategories, "Spare parts", "Other"]

const questions = [
  {
    question: "How do I get a price or check availability?",
    answer:
      "Choose a product category and send us an enquiry, or call either of our contact numbers. Our team will confirm the available models and current prices before you make a decision.",
  },
  {
    question: "Can you help me find the right spare part?",
    answer:
      "Yes—send us the equipment brand, model number, and a description of the part you need. A clear photo of the old part or the equipment label is helpful. We will check the options with you.",
  },
  {
    question: "What should I include in a water pump enquiry?",
    answer:
      "Tell us what you will use the pump for, your water source, the approximate pumping distance or height, and whether electricity is available. These details help us discuss a suitable option for your job.",
  },
]

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [filter, setFilter] = useState<string>("All")
  const [viewer, setViewer] = useState<{ product: Product; index: number } | null>(null)
  const [quoteOpen, setQuoteOpen] = useState(false)
  const [quoteProduct, setQuoteProduct] = useState<Product | null>(null)
  const [category, setCategory] = useState<string>(productCategories[0])
  const [customerName, setCustomerName] = useState("")
  const [message, setMessage] = useState("")
  const [enquiryLink, setEnquiryLink] = useState("")
  const modalRef = useRef<HTMLElement>(null)
  const triggerRef = useRef<HTMLElement | null>(null)
  const modalOpen = quoteOpen || viewer !== null
  const { notice, onCall, onEmail } = useContactActions()

  useEffect(() => {
    if (!modalOpen) return
    const previousOverflow = document.body.style.overflow
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false)
        setViewer(null)
        setQuoteOpen(false)
      }
      if (event.key === "Tab") {
        const controls = modalRef.current?.querySelectorAll<HTMLElement>(
          "button, a[href], input, select, textarea",
        )
        if (!controls?.length) return
        const first = controls[0]
        const last = controls[controls.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", onKey)
    modalRef.current?.querySelector<HTMLElement>("button")?.focus()
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", onKey)
      triggerRef.current?.focus()
    }
  }, [modalOpen])

  function openViewer(product: Product) {
    triggerRef.current = document.activeElement as HTMLElement
    setViewer({ product, index: 0 })
  }

  // Opens the price-request form. Pass a product to pre-fill it.
  function openQuote(product?: Product) {
    if (!viewer) triggerRef.current = document.activeElement as HTMLElement
    setQuoteProduct(product ?? null)
    if (product) {
      setCategory(product.category)
      setMessage(
        `Please send me the price and availability of the ${product.name}.`,
      )
    }
    setEnquiryLink("")
    setViewer(null)
    setQuoteOpen(true)
  }

  function closeModal() {
    setViewer(null)
    setQuoteOpen(false)
  }

  const visibleProducts =
    filter === "All" ? products : products.filter((p) => p.category === filter)

  return (
    <div>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <div className="topbar">
        <div className="site-width topbar-inner">
          <span>Your partner for every project.</span>
          <div className="topbar-phones">
            <Icon name="phone" size={13} />
            <span>Let's talk:</span>
            <a href="tel:+254707807422">0707 807 422</a>
            <span className="top-divider">|</span>
            <a href="tel:+254737918217">0737 918 217</a>
          </div>
        </div>
      </div>

      <header className="site-header">
        <div className="site-width header-inner">
          <a className="brand" href="#" aria-label="Chedutech Enterprises home">
            <img className="brand-logo" src={LOGO} alt="Chedutech Enterprises" width={82} height={54} />
          </a>
          <nav
            className={menuOpen ? "nav-links is-open" : "nav-links"}
            aria-label="Main navigation"
          >
            <a className="active" href="#" onClick={() => setMenuOpen(false)}>
              Home
            </a>
            <a href="#products" onClick={() => setMenuOpen(false)}>
              Our products
            </a>
            <a href="#about" onClick={() => setMenuOpen(false)}>
              Why Chedutech
            </a>
            <a href="#contact" onClick={() => setMenuOpen(false)}>
              Contact us
            </a>
          </nav>
          <button
            className="button button-orange header-quote"
            onClick={() => openQuote()}
          >
            Get a quote <Icon name="arrow" size={17} />
          </button>
          <button
            className="menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
          >
            <Icon name={menuOpen ? "close" : "menu"} />
          </button>
        </div>
      </header>

      <main id="main-content">
        <section className="hero">
          <img
            className="hero-image"
            width={1920}
            height={1272}
            fetchPriority="high"
            decoding="async"
            src={photo("power-tools-wall-display")}
            alt="Ryobi cordless drills, air tools and hand tools hanging on a wooden tool wall"
          />
          <div className="hero-shade" />
          <div className="site-width hero-content">
            <img
              className="hero-phone-logo"
              src={`${import.meta.env.BASE_URL}phone-logo.jpg`}
              alt="Chedutech Enterprises"
              width={240}
              height={240}
            />
            <div className="eyebrow hero-eyebrow">
              <span /> CHEDUTECH. THE RIGHT TOOLS. THE RIGHT PARTNER.
            </div>
            <h1>
              Power your work.
              <br />
              Keep it <em>moving.</em>
            </h1>
            <p>
              We are dealers in power tools, water pumps and all types of spares.
              <br className="desktop-break" /> Everything you need to get the
              job done right.
            </p>
            <div className="hero-actions">
              <a className="button button-orange" href="#products">
                Explore our products <Icon name="arrow" />
              </a>
              <a
                className="button button-outline"
                href={whatsapp(
                  "Hello Chedutech Enterprises, I would like to enquire about your products.",
                )}
                target="_blank"
                rel="noreferrer"
              >
                <Icon name="chat" /> Chat on WhatsApp
              </a>
            </div>
            <div className="hero-note">
              <span>
                <Icon name="check" size={15} /> Quality you can count on
              </span>
              <span>
                <Icon name="check" size={15} /> Expert advice, always
              </span>
            </div>
          </div>
          <div className="hero-stamp">
            <span className="stamp-icon">
              <Icon name="shield" size={26} />
            </span>
            <div>
              Built for the job.<small>Backed by Chedutech.</small>
            </div>
          </div>
          <span className="hero-index">01 — EQUIPPED FOR MORE</span>
        </section>

        <section className="benefits-strip" aria-label="Our commitment">
          <div className="site-width benefits-grid">
            <div>
              <Icon name="shield" size={26} />
              <span>
                <strong>Quality equipment</strong>
                <small>Reliable tools for real work</small>
              </span>
            </div>
            <div>
              <Icon name="tool" size={26} />
              <span>
                <strong>The right spare parts</strong>
                <small>Keep your equipment running</small>
              </span>
            </div>
            <div>
              <Icon name="chat" size={26} />
              <span>
                <strong>Knowledgeable support</strong>
                <small>Practical advice you can trust</small>
              </span>
            </div>
            <div>
              <Icon name="phone" size={26} />
              <span>
                <strong>Just a call away</strong>
                <small>Let's find what you need</small>
              </span>
            </div>
          </div>
        </section>

        <section id="products" className="products-section site-width">
          <div className="section-heading">
            <div>
              <div className="eyebrow">GEAR UP FOR THE JOB</div>
              <h2>Big jobs. Right equipment.</h2>
              <p>
                Tap a product to see it up close, then ask for a price. Our
                team replies with current pricing and availability.
              </p>
            </div>
          </div>
          <div className="filter-bar" role="group" aria-label="Filter products by category">
            {["All", ...productCategories].map((name) => (
              <button
                key={name}
                className={filter === name ? "filter-chip is-active" : "filter-chip"}
                aria-pressed={filter === name}
                onClick={() => setFilter(name)}
              >
                {name}
              </button>
            ))}
          </div>
          <div className="product-grid">
            {visibleProducts.map((item, index) => (
              <article className="product-card" key={item.id}>
                <button
                  className="product-photo"
                  onClick={() => openViewer(item)}
                  aria-label={`View ${item.name} photos`}
                >
                  <img
                    src={photo(item.photos[0], true)}
                    alt={item.name}
                    style={{ objectPosition: item.focus ?? "50% 50%" }}
                    loading={index < 6 ? "eager" : "lazy"}
                    decoding="async"
                  />
                  <span className="product-zoom">View photo{item.photos.length > 1 ? `s (${item.photos.length})` : ""}</span>
                </button>
                <div className="product-body">
                  <span className="product-tag">{item.category}</span>
                  <h3>{item.name}</h3>
                  {item.note && <p>{item.note}</p>}
                  <button
                    className="button button-orange product-ask"
                    onClick={() => openQuote(item)}
                  >
                    Ask for price <Icon name="arrow" size={16} />
                  </button>
                </div>
              </article>
            ))}
            {filter === "All" && (
              <article className="product-card product-card-help">
                <div className="product-body">
                  <span className="product-tag">Spare parts</span>
                  <h3>Need a spare part?</h3>
                  <p>
                    Send the brand, model and a photo of the part and we will
                    check it for you.
                  </p>
                  <a
                    className="button button-orange product-ask"
                    href={whatsapp(
                      "Hello, I am looking for a spare part. Can you help?",
                    )}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Icon name="chat" size={16} /> Send a photo
                  </a>
                </div>
              </article>
            )}
          </div>
          <div className="products-footnote">
            <Icon name="tool" size={17} />
            <p>
              Don't see what you need?{" "}
              <a
                href={whatsapp(
                  "Hello, I am looking for a specific tool or spare part. Can you help?",
                )}
                target="_blank"
                rel="noreferrer"
              >
                Let us help you find it <span>↗</span>
              </a>
            </p>
          </div>
        </section>

        <section id="about" className="about-section">
          <div className="site-width about-inner">
            <div>
              <div className="eyebrow">MORE THAN EQUIPMENT</div>
              <h2>
                A partner in
                <br />
                getting things done.
              </h2>
            </div>
            <div className="about-copy">
              <p>
                At Chedutech Enterprises, we know that the right equipment makes
                all the difference. We bring power tools, water pumps, and a
                wide range of spare parts together in one place.
              </p>
              <p>
                Whether you're building, repairing, or keeping your business
                running, talk to us. We'll help you find the right fit for the
                job.
              </p>
              <a className="text-link" href="#contact">
                Let's work together <Icon name="arrow" size={18} />
              </a>
            </div>
          </div>
        </section>

        <section
          className="site-width help-section"
          aria-labelledby="help-title"
        >
          <div className="help-intro">
            <div className="eyebrow">A LITTLE GUIDANCE</div>
            <h2 id="help-title">
              Good questions.
              <br />
              Practical answers.
            </h2>
            <p>
              Not sure where to start? We're here to help you find the right
              equipment.
            </p>
            <a
              className="text-link"
              href={whatsapp(
                "Hello Chedutech Enterprises, I would like some help choosing equipment.",
              )}
              target="_blank"
              rel="noreferrer"
            >
              Ask our team <Icon name="arrow" size={18} />
            </a>
          </div>
          <div className="faq-list">
            {questions.map((item) => (
              <details key={item.question}>
                <summary>
                  {item.question}
                  <span aria-hidden="true">+</span>
                </summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section id="contact" className="site-width contact-section">
          <div className="contact-panel">
            <div className="contact-card contact-info">
              <div className="eyebrow">LET'S GET TO WORK</div>
              <h2>Tell us about your product.</h2>
              <p className="contact-lead">We'll get back to you within one business day.</p>
              <p className="contact-or">Fill out the form or reach us directly:</p>
              <a className="button button-soft" href="tel:+254707807422" onClick={onCall}>
                <Icon name="phone" size={18} /> Call {CALL_NUMBER}
              </a>
              {notice && (
                <p className="contact-notice" role="status">
                  <Icon name="check" size={16} /> {notice}
                </p>
              )}
              <div className="contact-phones">
                <Icon name="phone" size={15} />
                <a href="tel:+254707807422">0707 807 422</a>
                <span>/</span>
                <a href="tel:+254737918217">0737 918 217</a>
              </div>
              <div className="contact-phones">
                <Icon name="mail" size={15} />
                <a href={`mailto:${EMAIL}`} onClick={onEmail}>{EMAIL}</a>
              </div>
              <a className="contact-address" href={MAPS_URL} target="_blank" rel="noreferrer">
                <Icon name="pin" size={16} /> River Road, Nairobi — view on Google Maps
              </a>
              <SocialLinks onCall={onCall} onEmail={onEmail} />
            </div>
            <div className="contact-card contact-form-card">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="site-width footer">
        <a className="brand footer-brand" href="#">
          <img className="brand-logo brand-logo-sm" src={LOGO} alt="Chedutech Enterprises" width={61} height={40} />
        </a>
        <p>Power tools. Water pumps. Spare parts.</p>
        <span>© {new Date().getFullYear()} Copyright Chedutech Enterprises. All Rights Reserved.</span>
      </footer>

      <a
        className="floating-chat"
        href={whatsapp(
          "Hello Chedutech Enterprises, I would like to make an enquiry.",
        )}
        target="_blank"
        rel="noreferrer"
        aria-label="Enquire on WhatsApp"
      >
        <Icon name="chat" size={24} />
        <span>Let's talk</span>
      </a>

      {modalOpen && (
        <div className="modal-backdrop" onClick={closeModal}>
          <section
            ref={modalRef}
            className={viewer ? "modal modal-viewer" : "modal"}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close"
              aria-label="Close dialog"
              onClick={closeModal}
            >
              <Icon name="close" />
            </button>
            {viewer ? (
              <>
                <div className="viewer-stage">
                  <img
                    src={photo(viewer.product.photos[viewer.index])}
                    alt={viewer.product.name}
                  />
                </div>
                {viewer.product.photos.length > 1 && (
                  <div className="viewer-thumbs">
                    {viewer.product.photos.map((slug, i) => (
                      <button
                        key={slug}
                        className={i === viewer.index ? "is-active" : ""}
                        aria-label={`Show photo ${i + 1}`}
                        aria-current={i === viewer.index}
                        onClick={() => setViewer({ ...viewer, index: i })}
                      >
                        <img src={photo(slug, true)} alt="" />
                      </button>
                    ))}
                  </div>
                )}
                <div className="viewer-info">
                  <div>
                    <span className="product-tag">{viewer.product.category}</span>
                    <h2 id="modal-title">{viewer.product.name}</h2>
                    {viewer.product.note && <p>{viewer.product.note}</p>}
                  </div>
                  <button
                    className="button button-orange"
                    onClick={() => openQuote(viewer.product)}
                  >
                    Ask for price <Icon name="arrow" size={17} />
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="eyebrow">CHEDUTECH ENTERPRISES</div>
                <h2 id="modal-title">Ask for a price.</h2>
                <p className="modal-description">
                  Share a few details and continue to WhatsApp to send your
                  request. No account or payment needed.
                </p>
                {quoteProduct && (
                  <div className="quote-product">
                    <img src={photo(quoteProduct.photos[0], true)} alt="" />
                    <div>
                      <strong>{quoteProduct.name}</strong>
                      <small>{quoteProduct.category}</small>
                    </div>
                  </div>
                )}
                <form
                  onSubmit={(event) => {
                    event.preventDefault()
                    if (!customerName.trim() || !message.trim()) return
                    const link = whatsapp(
                      `Hello Chedutech Enterprises, my name is ${customerName.trim()}. I'm interested in ${quoteProduct ? quoteProduct.name : category}.\n${message.trim()}`,
                    )
                    setEnquiryLink(link)
                    window.open(link, "_blank", "noopener,noreferrer")
                  }}
                >
                  <label>
                    Your name
                    <input
                      required
                      maxLength={100}
                      autoComplete="name"
                      value={customerName}
                      onChange={(event) => {
                        setCustomerName(event.target.value)
                        setEnquiryLink("")
                      }}
                      placeholder="Enter your name"
                    />
                  </label>
                  {!quoteProduct && (
                    <label>
                      What are you looking for?
                      <select
                        value={category}
                        onChange={(event) => {
                          setCategory(event.target.value)
                          setEnquiryLink("")
                        }}
                      >
                        {quoteCategories.map((name) => (
                          <option key={name}>{name}</option>
                        ))}
                      </select>
                    </label>
                  )}
                  <label>
                    Tell us about your requirements
                    <textarea
                      required
                      maxLength={2000}
                      value={message}
                      onChange={(event) => {
                        setMessage(event.target.value)
                        setEnquiryLink("")
                      }}
                      placeholder="Product, model, quantity, or the job you have in mind…"
                      rows={4}
                    />
                  </label>
                  <button type="submit" className="button button-orange">
                    <Icon name="chat" /> Continue to WhatsApp{" "}
                    <Icon name="arrow" size={18} />
                  </button>
                  <small className="form-note">
                    Availability and pricing will be confirmed by our team.
                  </small>
                  {enquiryLink && (
                    <div className="enquiry-status" role="status">
                      <Icon name="check" size={18} />
                      <div>
                        Your enquiry is ready.
                        <small>
                          WhatsApp didn't open?{" "}
                          <a
                            href={enquiryLink}
                            target="_blank"
                            rel="noreferrer"
                          >
                            Continue here
                          </a>{" "}
                          and press Send in WhatsApp.
                        </small>
                      </div>
                    </div>
                  )}
                </form>
              </>
            )}
          </section>
        </div>
      )}
    </div>
  )
}