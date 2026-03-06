import { useState, useEffect, useRef } from "react";

const ACCENT = "#E8A838";
const ACCENT_LIGHT = "#F5C563";
const BG_DARK = "#0A0A0F";
const BG_CARD = "#12121A";
const BG_CARD_HOVER = "#1A1A25";
const TEXT_PRIMARY = "#F0EDE6";
const TEXT_SECONDARY = "#8A8A96";
const BORDER = "#2A2A35";

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, isVisible];
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = ["How It Works", "Features", "Testimonials", "Pricing", "FAQ"];
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      padding: "0 40px", height: 72,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: scrolled ? "rgba(10,10,15,0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? `1px solid ${BORDER}` : "1px solid transparent",
      transition: "all 0.4s ease",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          width: 36, height: 36, borderRadius: 8,
          background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_LIGHT})`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "'DM Serif Display', serif", fontSize: 18, color: BG_DARK, fontWeight: 700,
        }}>S</div>
        <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, letterSpacing: "-0.5px" }}>
          Script<span style={{ color: ACCENT }}>Pilot</span>
        </span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
        {links.map(l => (
          <a key={l} href={`#${l.toLowerCase().replace(/\s/g, "-")}`} style={{
            color: TEXT_SECONDARY, textDecoration: "none", fontSize: 14, fontWeight: 500,
            transition: "color 0.3s", letterSpacing: "0.3px",
          }} onMouseEnter={e => e.target.style.color = TEXT_PRIMARY}
             onMouseLeave={e => e.target.style.color = TEXT_SECONDARY}>
            {l}
          </a>
        ))}
        <a href="#pricing" style={{
          background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_LIGHT})`,
          color: BG_DARK, padding: "10px 24px", borderRadius: 8,
          textDecoration: "none", fontSize: 14, fontWeight: 600,
          transition: "transform 0.2s, box-shadow 0.2s",
          boxShadow: `0 0 20px ${ACCENT}33`,
        }} onMouseEnter={e => { e.target.style.transform = "translateY(-1px)"; e.target.style.boxShadow = `0 4px 30px ${ACCENT}55`; }}
           onMouseLeave={e => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = `0 0 20px ${ACCENT}33`; }}>
          Get Started
        </a>
      </div>
    </nav>
  );
}

function Hero() {
  const [ref, isVisible] = useInView(0.1);
  return (
    <section ref={ref} style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", textAlign: "center",
      padding: "120px 24px 80px", position: "relative", overflow: "hidden",
    }}>
      {/* Background effects */}
      <div style={{
        position: "absolute", top: "-20%", left: "50%", transform: "translateX(-50%)",
        width: 800, height: 800, borderRadius: "50%",
        background: `radial-gradient(circle, ${ACCENT}08 0%, transparent 70%)`,
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", top: 100, left: "10%", width: 300, height: 300,
        border: `1px solid ${ACCENT}10`, borderRadius: "50%",
        animation: "float 8s ease-in-out infinite",
      }} />
      <div style={{
        position: "absolute", bottom: 100, right: "8%", width: 200, height: 200,
        border: `1px solid ${ACCENT}08`, borderRadius: "50%",
        animation: "float 6s ease-in-out infinite 1s",
      }} />

      {/* Badge */}
      <div style={{
        opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.6s ease 0.1s",
        display: "inline-flex", alignItems: "center", gap: 8,
        padding: "12px 28px", borderRadius: 100, marginBottom: 36,
        background: `${ACCENT}10`, border: `1px solid ${ACCENT}25`,
      }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: ACCENT, animation: "pulse 2s infinite" }} />
        <span style={{ fontSize: 17, fontWeight: 600, color: ACCENT, letterSpacing: "1.5px" }}>
          AI-POWERED AD SCRIPTING FOR AGENCIES
        </span>
      </div>

      {/* Headline */}
      <h1 style={{
        opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(30px)",
        transition: "all 0.7s ease 0.25s",
        fontFamily: "'DM Serif Display', serif", fontSize: "clamp(40px, 6vw, 80px)",
        lineHeight: 1.08, maxWidth: 900, letterSpacing: "-2px",
        marginBottom: 24, display: "flex", flexDirection: "column", alignItems: "center",
      }}>
        <span>From product link</span>
        <span>to{" "}
          <span style={{
            background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_LIGHT})`,
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            backgroundSize: "200% 200%", animation: "gradientShift 4s ease infinite",
          }}>
            scroll-stopping scripts
          </span>
        </span>
        <span style={{
          fontSize: "clamp(18px, 2.5vw, 28px)", color: TEXT_SECONDARY,
          fontFamily: "'Outfit', sans-serif", fontWeight: 300,
          letterSpacing: "2px", textTransform: "uppercase", marginTop: 16,
        }}>in minutes</span>
      </h1>

      {/* Subheadline */}
      <p style={{
        opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(30px)",
        transition: "all 0.7s ease 0.4s",
        fontSize: "clamp(16px, 2vw, 20px)", color: TEXT_SECONDARY,
        maxWidth: 620, lineHeight: 1.7, marginBottom: 48, fontWeight: 300,
      }}>
        ScriptPilot analyzes your product, researches your audience, and drafts
        high-converting Meta video ad scripts — with multiple hooks ready to test.
        The creative brief your team never has time to write.
      </p>

      {/* CTAs */}
      <div style={{
        opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(30px)",
        transition: "all 0.7s ease 0.55s",
        display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center",
      }}>
        <a href="#pricing" style={{
          background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_LIGHT})`,
          color: BG_DARK, padding: "16px 40px", borderRadius: 10,
          textDecoration: "none", fontSize: 16, fontWeight: 600,
          boxShadow: `0 4px 40px ${ACCENT}33`,
          transition: "transform 0.2s, box-shadow 0.2s",
        }} onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = `0 8px 50px ${ACCENT}55`; }}
           onMouseLeave={e => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = `0 4px 40px ${ACCENT}33`; }}>
          Start Free Trial
        </a>
        <a href="#how-it-works" style={{
          background: "transparent", color: TEXT_PRIMARY,
          padding: "16px 40px", borderRadius: 10,
          textDecoration: "none", fontSize: 16, fontWeight: 500,
          border: `1px solid ${BORDER}`, transition: "all 0.3s",
        }} onMouseEnter={e => { e.target.style.borderColor = ACCENT; e.target.style.color = ACCENT; }}
           onMouseLeave={e => { e.target.style.borderColor = BORDER; e.target.style.color = TEXT_PRIMARY; }}>
          See How It Works ↓
        </a>
      </div>

      {/* Social proof bar */}
      <div style={{
        opacity: isVisible ? 1 : 0, transition: "all 0.7s ease 0.7s",
        marginTop: 64, display: "flex", alignItems: "center", gap: 40,
        flexWrap: "wrap", justifyContent: "center",
      }}>
        {[
          { num: "2,400+", label: "Scripts Generated" },
          { num: "180+", label: "Agencies Onboard" },
          { num: "3.2×", label: "Avg. ROAS Lift" },
        ].map((s, i) => (
          <div key={i} style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 28, color: ACCENT }}>{s.num}</div>
            <div style={{ fontSize: 12, color: TEXT_SECONDARY, marginTop: 4, letterSpacing: "1px", textTransform: "uppercase" }}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function HowItWorks() {
  const [ref, isVisible] = useInView(0.1);
  const steps = [
    {
      num: "01",
      title: "Paste Your Product Link",
      desc: "Drop in any product URL. ScriptPilot's engine crawls the page and extracts every detail — descriptions, features, benefits, pricing, imagery cues, and brand tone.",
      icon: "🔗",
      detail: "Supports Shopify, Amazon, WooCommerce, landing pages, and more",
    },
    {
      num: "02",
      title: "Deep Audience Research",
      desc: "We scan reviews, competitor ads, social conversations, and sentiment data to build a complete voice-of-customer profile. Then we select the optimal persuasion framework for your audience.",
      icon: "🔍",
      detail: "Analyzes 500+ data points per product across platforms",
    },
    {
      num: "03",
      title: "Scripts & Hooks, Ready to Shoot",
      desc: "Receive polished video ad scripts with multiple hook variations — each built on proven persuasion frameworks and informed by the thinking principles of leading experts in copywriting, consumer psychology, and direct response advertising.",
      icon: "🎬",
      detail: "3-5 script variants with 2-4 hooks each, formatted for production",
    },
  ];

  return (
    <section id="how-it-works" ref={ref} style={{
      padding: "120px 24px", maxWidth: 1100, margin: "0 auto",
    }}>
      <div style={{ textAlign: "center", marginBottom: 80 }}>
        <div style={{
          opacity: isVisible ? 1 : 0, transition: "all 0.5s ease",
          fontSize: 13, color: ACCENT, letterSpacing: "3px", textTransform: "uppercase",
          fontWeight: 600, marginBottom: 16,
        }}>HOW IT WORKS</div>
        <h2 style={{
          opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.6s ease 0.15s",
          fontFamily: "'DM Serif Display', serif", fontSize: "clamp(32px, 4vw, 52px)",
          letterSpacing: "-1px",
        }}>
          Three steps. Zero guesswork.
        </h2>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 0, position: "relative" }}>
        {/* Vertical connecting line */}
        <div style={{
          position: "absolute", left: 35, top: 40, bottom: 40, width: 2,
          background: `linear-gradient(to bottom, ${ACCENT}40, ${ACCENT}10)`,
          display: "block",
        }} />

        {steps.map((step, i) => (
          <div key={i} style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateX(0)" : "translateX(-40px)",
            transition: `all 0.7s ease ${0.3 + i * 0.2}s`,
            display: "flex", gap: 40, alignItems: "flex-start",
            padding: "40px 0", position: "relative",
          }}>
            {/* Step number circle */}
            <div style={{
              width: 72, height: 72, minWidth: 72,
              borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
              background: BG_CARD, border: `2px solid ${ACCENT}40`,
              fontFamily: "'DM Serif Display', serif", fontSize: 24, color: ACCENT,
              position: "relative", zIndex: 2,
            }}>
              {step.num}
            </div>

            {/* Content */}
            <div style={{
              flex: 1, background: BG_CARD, borderRadius: 16, padding: 36,
              border: `1px solid ${BORDER}`, transition: "all 0.3s",
              cursor: "default",
            }} onMouseEnter={e => {
              e.currentTarget.style.borderColor = `${ACCENT}40`;
              e.currentTarget.style.background = BG_CARD_HOVER;
              e.currentTarget.style.transform = "translateX(8px)";
            }} onMouseLeave={e => {
              e.currentTarget.style.borderColor = BORDER;
              e.currentTarget.style.background = BG_CARD;
              e.currentTarget.style.transform = "translateX(0)";
            }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>{step.icon}</div>
              <h3 style={{
                fontFamily: "'DM Serif Display', serif", fontSize: 26,
                marginBottom: 12, letterSpacing: "-0.5px",
              }}>{step.title}</h3>
              <p style={{
                color: TEXT_SECONDARY, lineHeight: 1.7, fontSize: 15, marginBottom: 16,
              }}>{step.desc}</p>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                fontSize: 13, color: ACCENT, fontWeight: 500,
                padding: "6px 14px", borderRadius: 6,
                background: `${ACCENT}10`,
              }}>
                ✦ {step.detail}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Features() {
  const [ref, isVisible] = useInView(0.1);
  const features = [
    { icon: "⚡", title: "Instant Product Intelligence", desc: "Our crawler extracts and structures product data from any URL in seconds — no manual briefs, no copy-pasting." },
    { icon: "🎯", title: "Voice of Customer Engine", desc: "Aggregates real customer language from reviews, forums, and social mentions to ensure your scripts speak your audience's language." },
    { icon: "🧠", title: "Framework-Driven Scripts", desc: "Each script is built on proven persuasion frameworks (PAS, AIDA, BAB, 4Ps) selected based on product type and audience psychology." },
    { icon: "🪝", title: "Multi-Hook Variations", desc: "Every script comes with 2-4 hook alternatives — curiosity, pain-point, social proof, and contrarian angles ready to A/B test." },
    { icon: "📐", title: "Meta-Optimized Format", desc: "Scripts are formatted for Facebook and Instagram video ads — with timing cues, visual direction notes, and CTA placement." },
    { icon: "🤝", title: "Managed Service Option", desc: "Need hands-off execution? Our creative strategists can run ScriptPilot for your clients and deliver production-ready scripts." },
  ];

  return (
    <section id="features" ref={ref} style={{
      padding: "120px 24px", maxWidth: 1100, margin: "0 auto",
    }}>
      <div style={{ textAlign: "center", marginBottom: 72 }}>
        <div style={{
          opacity: isVisible ? 1 : 0, transition: "all 0.5s ease",
          fontSize: 13, color: ACCENT, letterSpacing: "3px", textTransform: "uppercase",
          fontWeight: 600, marginBottom: 16,
        }}>FEATURES</div>
        <h2 style={{
          opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.6s ease 0.15s",
          fontFamily: "'DM Serif Display', serif", fontSize: "clamp(32px, 4vw, 52px)",
          letterSpacing: "-1px", maxWidth: 700, margin: "0 auto",
        }}>
          Everything your creative team wishes they had time for
        </h2>
      </div>

      <div style={{
        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        gap: 20,
      }}>
        {features.map((f, i) => (
          <div key={i} style={{
            opacity: isVisible ? 1 : 0, transform: isVisible ? "scale(1)" : "scale(0.95)",
            transition: `all 0.5s ease ${0.15 + i * 0.08}s`,
            background: BG_CARD, borderRadius: 16, padding: 32,
            border: `1px solid ${BORDER}`, cursor: "default",
            transition: `all 0.3s ease, opacity 0.5s ease ${0.15 + i * 0.08}s, transform 0.5s ease ${0.15 + i * 0.08}s`,
          }} onMouseEnter={e => {
            e.currentTarget.style.borderColor = `${ACCENT}35`;
            e.currentTarget.style.transform = "translateY(-4px)";
            e.currentTarget.style.boxShadow = `0 20px 60px ${ACCENT}08`;
          }} onMouseLeave={e => {
            e.currentTarget.style.borderColor = BORDER;
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "none";
          }}>
            <div style={{
              fontSize: 32, marginBottom: 16, width: 56, height: 56,
              display: "flex", alignItems: "center", justifyContent: "center",
              background: `${ACCENT}10`, borderRadius: 12,
            }}>{f.icon}</div>
            <h3 style={{
              fontFamily: "'DM Serif Display', serif", fontSize: 20,
              marginBottom: 10, letterSpacing: "-0.3px",
            }}>{f.title}</h3>
            <p style={{ color: TEXT_SECONDARY, lineHeight: 1.7, fontSize: 14 }}>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Testimonials() {
  const [ref, isVisible] = useInView(0.1);
  const testimonials = [
    {
      quote: "ScriptPilot cut our creative briefing time from 3 hours to 15 minutes. The hook variations alone are worth the subscription — our CTR jumped 40% in the first month.",
      name: "Sarah Chen",
      role: "Head of Paid Social",
      company: "Bolt Media Agency",
      metric: "+40% CTR",
    },
    {
      quote: "We used to outsource script writing for every DTC client. Now we run it through ScriptPilot first and only fine-tune. Our creative output tripled without adding headcount.",
      name: "Marcus Webb",
      role: "Creative Director",
      company: "Redline Performance Marketing",
      metric: "3× Output",
    },
    {
      quote: "The audience research phase is genuinely impressive. It surfaced customer pain points from reviews that we'd completely missed — and the scripts nailed the messaging.",
      name: "Priya Patel",
      role: "Founder & Strategist",
      company: "Neon Growth Co.",
      metric: "2.8× ROAS",
    },
  ];

  return (
    <section id="testimonials" ref={ref} style={{
      padding: "120px 24px", position: "relative",
      background: `linear-gradient(180deg, transparent 0%, ${ACCENT}03 50%, transparent 100%)`,
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <div style={{
            opacity: isVisible ? 1 : 0, transition: "all 0.5s ease",
            fontSize: 13, color: ACCENT, letterSpacing: "3px", textTransform: "uppercase",
            fontWeight: 600, marginBottom: 16,
          }}>TESTIMONIALS</div>
          <h2 style={{
            opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.6s ease 0.15s",
            fontFamily: "'DM Serif Display', serif", fontSize: "clamp(32px, 4vw, 52px)",
            letterSpacing: "-1px",
          }}>
            Trusted by agencies that ship creative fast
          </h2>
        </div>

        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 20,
        }}>
          {testimonials.map((t, i) => (
            <div key={i} style={{
              opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(30px)",
              transition: `all 0.6s ease ${0.2 + i * 0.15}s`,
              background: BG_CARD, borderRadius: 16, padding: 36,
              border: `1px solid ${BORDER}`, display: "flex", flexDirection: "column",
              justifyContent: "space-between", position: "relative", overflow: "hidden",
            }}>
              {/* Metric badge */}
              <div style={{
                position: "absolute", top: 20, right: 20,
                background: `${ACCENT}15`, color: ACCENT,
                padding: "6px 14px", borderRadius: 8,
                fontSize: 14, fontWeight: 700, fontFamily: "'DM Serif Display', serif",
              }}>{t.metric}</div>

              {/* Quote mark */}
              <div style={{
                fontFamily: "'DM Serif Display', serif", fontSize: 64,
                color: `${ACCENT}20`, lineHeight: 1, marginBottom: -10,
              }}>"</div>

              <p style={{
                color: TEXT_SECONDARY, lineHeight: 1.8, fontSize: 15,
                marginBottom: 28, flex: 1, fontStyle: "italic",
              }}>{t.quote}</p>

              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: "50%",
                  background: `linear-gradient(135deg, ${ACCENT}30, ${ACCENT}10)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "'DM Serif Display', serif", fontSize: 18, color: ACCENT,
                }}>{t.name[0]}</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 15 }}>{t.name}</div>
                  <div style={{ color: TEXT_SECONDARY, fontSize: 13 }}>{t.role}, {t.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const [ref, isVisible] = useInView(0.1);
  const [annual, setAnnual] = useState(false);
  const plans = [
    {
      name: "Starter",
      desc: "For freelancers and small teams getting started",
      price: annual ? 59 : 74,
      features: [
        "10 scripts / month",
        "Product page analysis",
        "Basic audience research",
        "2 hook variations per script",
        "Meta format export",
        "Email support",
      ],
      cta: "Start Free Trial",
      accent: false,
    },
    {
      name: "Agency",
      desc: "For teams running multiple client accounts",
      price: annual ? 179 : 224,
      features: [
        "50 scripts / month",
        "Advanced product intelligence",
        "Deep audience & competitor research",
        "4 hook variations per script",
        "Framework selection AI",
        "Brand voice customization",
        "Team collaboration (5 seats)",
        "Priority support",
      ],
      cta: "Start Free Trial",
      accent: true,
      badge: "MOST POPULAR",
    },
    {
      name: "Enterprise + Managed",
      desc: "Unlimited scripts plus our strategists on call",
      price: annual ? 599 : 749,
      features: [
        "Unlimited scripts",
        "Everything in Agency",
        "Dedicated creative strategist",
        "Done-for-you script writing",
        "Custom framework development",
        "White-label reports",
        "Unlimited seats",
        "Slack & phone support",
      ],
      cta: "Talk to Sales",
      accent: false,
    },
  ];

  return (
    <section id="pricing" ref={ref} style={{ padding: "120px 24px", maxWidth: 1100, margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <div style={{
          opacity: isVisible ? 1 : 0, transition: "all 0.5s ease",
          fontSize: 13, color: ACCENT, letterSpacing: "3px", textTransform: "uppercase",
          fontWeight: 600, marginBottom: 16,
        }}>PRICING</div>
        <h2 style={{
          opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.6s ease 0.15s",
          fontFamily: "'DM Serif Display', serif", fontSize: "clamp(32px, 4vw, 52px)",
          letterSpacing: "-1px", marginBottom: 24,
        }}>
          Plans that scale with your client roster
        </h2>

        {/* Toggle */}
        <div style={{
          opacity: isVisible ? 1 : 0, transition: "all 0.5s ease 0.25s",
          display: "inline-flex", alignItems: "center", gap: 16,
          padding: "6px 8px", borderRadius: 100,
          background: BG_CARD, border: `1px solid ${BORDER}`,
        }}>
          <span style={{ fontSize: 14, color: !annual ? TEXT_PRIMARY : TEXT_SECONDARY, fontWeight: !annual ? 600 : 400, padding: "8px 18px", borderRadius: 100, background: !annual ? `${ACCENT}15` : "transparent", cursor: "pointer", transition: "all 0.3s" }}
            onClick={() => setAnnual(false)}>Monthly</span>
          <span style={{ fontSize: 14, color: annual ? TEXT_PRIMARY : TEXT_SECONDARY, fontWeight: annual ? 600 : 400, padding: "8px 18px", borderRadius: 100, background: annual ? `${ACCENT}15` : "transparent", cursor: "pointer", transition: "all 0.3s", display: "flex", alignItems: "center", gap: 6 }}
            onClick={() => setAnnual(true)}>Annual <span style={{ fontSize: 11, color: ACCENT, fontWeight: 700 }}>SAVE 20%</span></span>
        </div>
      </div>

      <div style={{
        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20,
        alignItems: "start",
      }}>
        {plans.map((p, i) => (
          <div key={i} style={{
            opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transition: `all 0.6s ease ${0.2 + i * 0.12}s`,
            background: p.accent ? BG_CARD_HOVER : BG_CARD,
            borderRadius: 20, padding: 40,
            border: p.accent ? `2px solid ${ACCENT}50` : `1px solid ${BORDER}`,
            position: "relative",
            boxShadow: p.accent ? `0 20px 80px ${ACCENT}10` : "none",
          }}>
            {p.badge && (
              <div style={{
                position: "absolute", top: -13, left: "50%", transform: "translateX(-50%)",
                background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_LIGHT})`,
                color: BG_DARK, fontSize: 11, fontWeight: 700,
                padding: "6px 20px", borderRadius: 100, letterSpacing: "1px",
              }}>{p.badge}</div>
            )}

            <h3 style={{
              fontFamily: "'DM Serif Display', serif", fontSize: 26,
              marginBottom: 8,
            }}>{p.name}</h3>
            <p style={{ color: TEXT_SECONDARY, fontSize: 14, marginBottom: 24 }}>{p.desc}</p>

            <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 32 }}>
              <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 52, letterSpacing: "-2px" }}>${p.price}</span>
              <span style={{ color: TEXT_SECONDARY, fontSize: 14 }}>/month</span>
            </div>

            <a href="#" style={{
              display: "block", textAlign: "center", textDecoration: "none",
              padding: "14px 0", borderRadius: 10, fontSize: 15, fontWeight: 600,
              marginBottom: 32, transition: "all 0.3s",
              background: p.accent ? `linear-gradient(135deg, ${ACCENT}, ${ACCENT_LIGHT})` : "transparent",
              color: p.accent ? BG_DARK : TEXT_PRIMARY,
              border: p.accent ? "none" : `1px solid ${BORDER}`,
              boxShadow: p.accent ? `0 4px 30px ${ACCENT}25` : "none",
            }} onMouseEnter={e => {
              if (!p.accent) { e.target.style.borderColor = ACCENT; e.target.style.color = ACCENT; }
              else { e.target.style.transform = "translateY(-1px)"; e.target.style.boxShadow = `0 8px 40px ${ACCENT}40`; }
            }} onMouseLeave={e => {
              if (!p.accent) { e.target.style.borderColor = BORDER; e.target.style.color = TEXT_PRIMARY; }
              else { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = `0 4px 30px ${ACCENT}25`; }
            }}>{p.cta}</a>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {p.features.map((f, j) => (
                <div key={j} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: TEXT_SECONDARY }}>
                  <span style={{ color: ACCENT, fontSize: 14 }}>✓</span>
                  {f}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function FAQ() {
  const [ref, isVisible] = useInView(0.1);
  const [openIndex, setOpenIndex] = useState(null);
  const faqs = [
    {
      q: "What types of product pages does ScriptPilot support?",
      a: "ScriptPilot works with virtually any product URL — Shopify stores, Amazon listings, WooCommerce pages, custom landing pages, and more. If it has a product description, we can extract and analyze it.",
    },
    {
      q: "How is this different from ChatGPT or Jasper for ad copy?",
      a: "ScriptPilot isn't a general copywriting tool. It's purpose-built for video ad scripts on Meta. The difference is the research layer — we analyze real customer reviews, competitor positioning, and audience sentiment before writing a single word. Every script is rooted in actual voice-of-customer data and structured around proven persuasion frameworks.",
    },
    {
      q: "What are the 'persuasion frameworks' you mention?",
      a: "We use established copywriting and advertising frameworks like PAS (Problem-Agitate-Solve), AIDA (Attention-Interest-Desire-Action), Before/After/Bridge, the 4Ps, and more. ScriptPilot's AI selects the best framework based on your product type, audience, and competitive landscape.",
    },
    {
      q: "Can I customize the brand voice and tone?",
      a: "Absolutely. On Agency and Enterprise plans, you can define brand voice profiles for each client — specifying tone, vocabulary preferences, phrases to avoid, and style guidelines. ScriptPilot will match these in every output.",
    },
    {
      q: "What does the managed service include?",
      a: "Our Enterprise + Managed plan pairs you with a dedicated creative strategist who runs ScriptPilot on your behalf. They'll handle product analysis, review research, framework selection, and deliver polished, production-ready scripts — essentially functioning as an extension of your creative team.",
    },
    {
      q: "Is there a free trial?",
      a: "Yes — every plan includes a 7-day free trial with full access to that tier's features. No credit card required to start.",
    },
    {
      q: "Can my whole team use one account?",
      a: "The Starter plan is single-user. Agency includes 5 team seats, and Enterprise offers unlimited seats. Each team member gets their own login and can save client profiles independently.",
    },
  ];

  return (
    <section id="faq" ref={ref} style={{ padding: "120px 24px", maxWidth: 800, margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: 64 }}>
        <div style={{
          opacity: isVisible ? 1 : 0, transition: "all 0.5s ease",
          fontSize: 13, color: ACCENT, letterSpacing: "3px", textTransform: "uppercase",
          fontWeight: 600, marginBottom: 16,
        }}>FAQ</div>
        <h2 style={{
          opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.6s ease 0.15s",
          fontFamily: "'DM Serif Display', serif", fontSize: "clamp(32px, 4vw, 48px)",
          letterSpacing: "-1px",
        }}>
          Common questions
        </h2>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {faqs.map((faq, i) => (
          <div key={i} style={{
            opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(15px)",
            transition: `all 0.5s ease ${0.15 + i * 0.06}s`,
            borderRadius: 12, overflow: "hidden",
            border: `1px solid ${openIndex === i ? `${ACCENT}30` : BORDER}`,
            background: openIndex === i ? BG_CARD_HOVER : BG_CARD,
            transition: "background 0.3s, border-color 0.3s",
          }}>
            <button onClick={() => setOpenIndex(openIndex === i ? null : i)} style={{
              width: "100%", textAlign: "left", background: "none", border: "none",
              color: TEXT_PRIMARY, padding: "20px 24px", cursor: "pointer",
              display: "flex", justifyContent: "space-between", alignItems: "center",
              fontFamily: "'Outfit', sans-serif", fontSize: 15, fontWeight: 500,
            }}>
              {faq.q}
              <span style={{
                color: ACCENT, fontSize: 20, transition: "transform 0.3s",
                transform: openIndex === i ? "rotate(45deg)" : "rotate(0deg)",
                minWidth: 24, textAlign: "center",
              }}>+</span>
            </button>
            <div style={{
              maxHeight: openIndex === i ? 300 : 0, overflow: "hidden",
              transition: "max-height 0.4s ease",
            }}>
              <p style={{
                padding: "0 24px 20px", color: TEXT_SECONDARY,
                lineHeight: 1.7, fontSize: 14,
              }}>{faq.a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function FinalCTA() {
  const [ref, isVisible] = useInView(0.15);
  return (
    <section ref={ref} style={{
      padding: "120px 24px", textAlign: "center", position: "relative",
    }}>
      {/* Background glow */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)", width: 600, height: 400,
        background: `radial-gradient(circle, ${ACCENT}08 0%, transparent 70%)`,
        borderRadius: "50%", pointerEvents: "none",
      }} />

      <div style={{
        opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(30px)",
        transition: "all 0.7s ease",
        maxWidth: 700, margin: "0 auto", position: "relative",
      }}>
        <h2 style={{
          fontFamily: "'DM Serif Display', serif",
          letterSpacing: "-1.5px", marginBottom: 20, lineHeight: 1.1,
          display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
        }}>
          <span style={{ fontSize: "clamp(26px, 3.5vw, 44px)", color: TEXT_SECONDARY }}>
            Stop writing briefs.
          </span>
          <span style={{
            fontSize: "clamp(38px, 5.5vw, 68px)",
            background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_LIGHT})`,
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>Start shipping scripts.</span>
        </h2>
        <p style={{
          color: TEXT_SECONDARY, fontSize: 18, lineHeight: 1.7,
          marginBottom: 40, maxWidth: 520, margin: "0 auto 40px", fontWeight: 300,
        }}>
          7-day free trial. No credit card required. Cancel anytime.
        </p>
        <a href="#pricing" style={{
          display: "inline-block",
          background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_LIGHT})`,
          color: BG_DARK, padding: "18px 48px", borderRadius: 12,
          textDecoration: "none", fontSize: 17, fontWeight: 700,
          boxShadow: `0 4px 50px ${ACCENT}30`,
          transition: "all 0.3s",
        }} onMouseEnter={e => { e.target.style.transform = "translateY(-3px)"; e.target.style.boxShadow = `0 12px 60px ${ACCENT}50`; }}
           onMouseLeave={e => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = `0 4px 50px ${ACCENT}30`; }}>
          Get Started Free →
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{
      padding: "60px 24px 40px", borderTop: `1px solid ${BORDER}`,
      maxWidth: 1100, margin: "0 auto",
    }}>
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "flex-start",
        flexWrap: "wrap", gap: 40, marginBottom: 48,
      }}>
        {/* Brand */}
        <div style={{ maxWidth: 280 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <div style={{
              width: 32, height: 32, borderRadius: 7,
              background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_LIGHT})`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "'DM Serif Display', serif", fontSize: 16, color: BG_DARK, fontWeight: 700,
            }}>S</div>
            <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 20 }}>
              Script<span style={{ color: ACCENT }}>Pilot</span>
            </span>
          </div>
          <p style={{ color: TEXT_SECONDARY, fontSize: 13, lineHeight: 1.7 }}>
            AI-powered video ad script generation for agencies that move fast.
          </p>
        </div>

        {/* Links */}
        {[
          { title: "Product", links: ["Features", "Pricing", "How It Works", "Changelog"] },
          { title: "Company", links: ["About", "Blog", "Careers", "Contact"] },
          { title: "Legal", links: ["Privacy Policy", "Terms of Service", "Cookie Policy"] },
        ].map((col, i) => (
          <div key={i}>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 16, letterSpacing: "0.5px" }}>{col.title}</div>
            {col.links.map((l, j) => (
              <a key={j} href="#" style={{
                display: "block", color: TEXT_SECONDARY, textDecoration: "none",
                fontSize: 13, marginBottom: 10, transition: "color 0.2s",
              }} onMouseEnter={e => e.target.style.color = TEXT_PRIMARY}
                 onMouseLeave={e => e.target.style.color = TEXT_SECONDARY}>{l}</a>
            ))}
          </div>
        ))}
      </div>

      <div style={{
        borderTop: `1px solid ${BORDER}`, paddingTop: 24,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        flexWrap: "wrap", gap: 16,
      }}>
        <span style={{ color: TEXT_SECONDARY, fontSize: 12 }}>© 2026 ScriptPilot. All rights reserved.</span>
        <div style={{ display: "flex", gap: 20 }}>
          {["Twitter", "LinkedIn", "Instagram"].map(s => (
            <a key={s} href="#" style={{ color: TEXT_SECONDARY, textDecoration: "none", fontSize: 12, transition: "color 0.2s" }}
               onMouseEnter={e => e.target.style.color = ACCENT}
               onMouseLeave={e => e.target.style.color = TEXT_SECONDARY}>{s}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default function ScriptPilotLanding() {
  return (
    <div style={{ minHeight: "100vh", background: BG_DARK }}>
      <Navbar />
      <Hero />
      <HowItWorks />
      <Features />
      <Testimonials />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
}
