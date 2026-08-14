import { NavLink, Service, Course, Testimonial, FAQItem, BlogPost, StatItem } from "@/types";
import { images } from "@/lib/images";

export const site = {
  name: "Tamil Trading Education",
  shortName: "TTE",
  tagline: "Learn & Earn Together",
  businessType: "Forex Trading Education & Trading Community",
  gst: "33GNGPK0300C2ZT",
  address: {
    line1: "MATHAPURAM POST",
    line2: "2/121/3, THORANAMALAI ROAD",
    line3: "Asirvathapuram, Kadayam Perumpattu",
    district: "TENKASI DISTRICT",
    state: "Tamil Nadu",
    pincode: "627415",
  },
  mapUrl: "https://share.google/Pr8dGVbNFbd3q9znC",
  mapEmbedQuery: "Kadayam, Tenkasi, Tamil Nadu 627415",
  phone: "+91 86100 66102",
  phoneRaw: "+918610066102",
  email: "",
  whatsapp: "https://wa.me/918610066102",
  telegram: "https://t.me/tamilforexnanbargal",
  telegramDirect: "https://t.me/kripsonp97",
  instagram: "https://www.instagram.com/tamiltradingeducationofficial",
  youtube: "https://www.youtube.com/channel/UCGTpxTnLjofbkUPGzgaB0Nw",
  tradingview: "https://in.tradingview.com/u/kripsonfx97/",
  x: "https://x.com/tamiltradingedc",
  domain: "https://www.tamiltradingeducation.com",
};

/**
 * Official IB (Introducing Broker) partner details.
 * Referral codes and links are what make a new account eligible for free
 * VIP community access and a dedicated relationship manager. Update these
 * if a link/code ever changes — nothing else in the site needs to change.
 */
export const vantagePartner = {
  name: "Vantage",
  accountLink: "https://vigco.co/la-com-inv/wjufbK0e",
  referralCode: "wjufbK0e",
  transferEmail: {
    to: "india.care@vantagemarkets.com",
    cc: ["adam.grow@vantagemarkets.com", "perumal.31998@gmail.com"],
    subject: "Account Transfer Request",
    body: "Dear Vantage,\n\nKindly map my account under this 16506157\n\nThank you.",
  },
};

export const octafxPartner = {
  name: "OctaFX",
  accountLink: "https://clickto.trade/bgHbZb1t3MX?ib=714232",
  referralCode: "714232",
  ibChangeLink: "https://clickto.trade/bpqGhSs734k?ib=714232",
};

export const xmPartner = {
  name: "XM",
  note: "Message us on WhatsApp and we'll walk you through XM account setup directly.",
};

export const ibPartners = [
  { name: vantagePartner.name },
  { name: octafxPartner.name },
  { name: xmPartner.name },
];

/**
 * USDT (Tether) buy/sell rate against INR.
 * Update these two numbers whenever your rate changes — nothing else needs
 * to change. Both the homepage rate card and any page that imports this
 * will reflect the new numbers automatically.
 */
export const usdtRates = {
  buy: 104,
  sell: 104,
  currency: "INR",
  lastUpdated: "4 August 2026",
};

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Courses", href: "/courses" },
  { label: "Market Analysis", href: "/market-analysis" },
  { label: "VIP Community", href: "/vip-community" },
  { label: "Broker Assistance", href: "/broker-assistance" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export const footerLinks = {
  quickLinks: [
    { label: "Courses", href: "/courses" },
    { label: "Services", href: "/#services" },
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Risk Disclaimer", href: "/risk-disclaimer" },
  ],
};

export const stats: StatItem[] = [
  { value: 5000, suffix: "+", label: "Community Members" },
  { value: 1000, suffix: "+", label: "Students Trained" },
  { value: 500, suffix: "+", label: "Live Sessions Delivered" },
  { value: 24, suffix: "/7", label: "Community Support" },
];

export const services: Service[] = [
  {
    slug: "forex-trading-course",
    title: "Forex Trading Course",
    description:
      "A structured, sequential curriculum that takes you from currency-pair basics to professional-level execution.",
    icon: "LineChart",
  },
  {
    slug: "technical-analysis",
    title: "Technical Analysis",
    description:
      "Chart reading, indicators, support & resistance and multi-timeframe analysis taught with real, live charts.",
    icon: "CandlestickChart",
  },
  {
    slug: "price-action",
    title: "Price Action",
    description:
      "Trade clean, indicator-light charts using candlestick behaviour and pure market structure.",
    icon: "Waypoints",
  },
  {
    slug: "smart-money-concepts",
    title: "Smart Money Concepts",
    description:
      "Understand liquidity, order blocks and institutional footprints behind major market moves.",
    icon: "Layers",
  },
  {
    slug: "risk-management",
    title: "Risk Management",
    description:
      "Position sizing, stop-loss discipline and capital-preservation frameworks — the foundation of longevity.",
    icon: "ShieldCheck",
  },
  {
    slug: "trading-psychology",
    title: "Trading Psychology",
    description:
      "Build the discipline and emotional control that separates consistent traders from the rest.",
    icon: "BrainCircuit",
  },
  {
    slug: "live-trading-sessions",
    title: "Live Trading Sessions",
    description:
      "Watch mentors analyse and trade real market conditions in real time, several times a week.",
    icon: "Radio",
  },
  {
    slug: "vip-community",
    title: "VIP Community",
    description:
      "A private, actively-moderated space for serious traders to share ideas and stay accountable.",
    icon: "Users",
  },
  {
    slug: "broker-account-support",
    title: "Broker Account Opening Support",
    description:
      "Official IB partner for Vantage, OctaFX and XM — step-by-step guidance to open, verify and configure a trading account safely.",
    icon: "Landmark",
  },
  {
    slug: "ib-partner-program",
    title: "IB Partner Program",
    description:
      "Guidance for community leaders and traders exploring an Introducing Broker partnership pathway.",
    icon: "Handshake",
  },
  {
    slug: "mentorship",
    title: "Mentorship",
    description:
      "Ongoing, long-term guidance that continues well beyond course completion — not a one-off class.",
    icon: "GraduationCap",
  },
];

export const courses: Course[] = [
  {
    slug: "beginner-forex",
    level: "Level 01",
    title: "Beginner Forex",
    description:
      "For those starting from zero. Market structure, terminology, currency pairs and your first practice account.",
    outcomes: [
      "Understand how the forex market actually works",
      "Read your first candlestick chart with confidence",
      "Set up and navigate a demo trading account",
    ],
  },
  {
    slug: "intermediate-forex",
    level: "Level 02",
    title: "Intermediate Forex",
    description:
      "Build on the basics with support & resistance, trend structure and a repeatable trade-planning process.",
    outcomes: [
      "Map support, resistance and key liquidity levels",
      "Build a written, repeatable trade plan",
      "Time entries and exits with more precision",
    ],
  },
  {
    slug: "advanced-forex",
    level: "Level 03",
    title: "Advanced Forex",
    description:
      "Multi-timeframe strategy, confluence-based entries and the execution discipline of professional traders.",
    outcomes: [
      "Combine multiple timeframes into one strategy",
      "Stack confluence before entering a trade",
      "Apply institutional-grade execution habits",
    ],
    featured: true,
  },
  {
    slug: "price-action",
    level: "Specialisation",
    title: "Price Action",
    description:
      "Trade clean charts using candlestick behaviour, structure shifts and pure price — no indicator clutter.",
    outcomes: [
      "Identify high-probability candlestick patterns",
      "Spot market structure shifts early",
      "Trade confidently without indicator dependence",
    ],
  },
  {
    slug: "ict-concepts",
    level: "Specialisation",
    title: "ICT / Smart Money Concepts",
    description:
      "Learn liquidity-based concepts — order blocks, fair value gaps and institutional order flow.",
    outcomes: [
      "Understand liquidity pools and stop hunts",
      "Identify order blocks and fair value gaps",
      "Read institutional order flow on any chart",
    ],
    featured: true,
  },
  {
    slug: "scalping",
    level: "Specialisation",
    title: "Scalping",
    description:
      "Fast-timeframe execution strategies for traders who prefer short, high-frequency sessions.",
    outcomes: [
      "Execute high-speed setups on lower timeframes",
      "Manage spread, slippage and session timing",
      "Build the focus required for scalping discipline",
    ],
  },
  {
    slug: "swing-trading",
    level: "Specialisation",
    title: "Swing Trading",
    description:
      "Position-style strategies for working professionals who can't watch charts all day.",
    outcomes: [
      "Plan trades that hold for days, not minutes",
      "Manage swing positions around a full-time job",
      "Use higher timeframes for lower-stress trading",
    ],
  },
  {
    slug: "risk-management",
    level: "Specialisation",
    title: "Risk Management",
    description:
      "The single most important skill in trading — position sizing, stop-loss strategy and capital protection.",
    outcomes: [
      "Calculate correct position size every time",
      "Set stop-losses that respect market structure",
      "Protect capital through losing streaks",
    ],
  },
  {
    slug: "trading-psychology",
    level: "Specialisation",
    title: "Trading Psychology",
    description:
      "Master the mental game — discipline, patience and emotional control under real market pressure.",
    outcomes: [
      "Recognise and interrupt revenge-trading patterns",
      "Build a pre-trade and post-trade routine",
      "Trade your plan, not your emotions",
    ],
  },
];

export const testimonials: Testimonial[] = [
  {
    name: "Ramesh K.",
    location: "Madurai, Tamil Nadu",
    course: "Beginner Forex",
    quote:
      "I started with zero knowledge. The step-by-step lessons and live sessions made concepts click that I'd struggled with for months on YouTube.",
    rating: 5,
  },
  {
    name: "Priya S.",
    location: "Coimbatore, Tamil Nadu",
    course: "Advanced Forex",
    quote:
      "The risk management module alone changed how I trade. My drawdowns are smaller and my confidence is much higher now.",
    rating: 5,
  },
  {
    name: "Arun V.",
    location: "Chennai, Tamil Nadu",
    course: "Price Action",
    quote:
      "The VIP community is genuinely active — mentors reply, traders share ideas, and it never feels like a dead group like the others I've tried.",
    rating: 5,
  },
  {
    name: "Divya M.",
    location: "Trichy, Tamil Nadu",
    course: "Trading Psychology",
    quote:
      "Trading Psychology was the missing piece for me. I finally understand why I kept breaking my own rules, and how to stop.",
    rating: 5,
  },
  {
    name: "Karthik B.",
    location: "Salem, Tamil Nadu",
    course: "Intermediate Forex",
    quote:
      "Live sessions are the best part — watching a mentor think through a trade in real time taught me more than any recorded course.",
    rating: 5,
  },
  {
    name: "Suriya N.",
    location: "Tirunelveli, Tamil Nadu",
    course: "Advanced Forex",
    quote:
      "Support didn't stop after the course ended. Mentors still answer my questions in the community months later.",
    rating: 5,
  },
  {
    name: "Lakshmi P.",
    location: "Thoothukudi, Tamil Nadu",
    course: "Scalping",
    quote:
      "Everything is taught in Tamil with English terms explained properly. That combination is why it finally made sense to me.",
    rating: 5,
  },
  {
    name: "Manoj E.",
    location: "Namakkal, Tamil Nadu",
    course: "ICT / Smart Money Concepts",
    quote:
      "Smart Money Concepts is usually taught in a very confusing way online. Here it was broken into steps I could actually follow on a chart.",
    rating: 4,
  },
  {
    name: "Anitha R.",
    location: "Karur, Tamil Nadu",
    course: "Beginner Forex",
    quote:
      "As a woman starting out I was hesitant about joining a trading group. The community here is respectful and questions never get mocked.",
    rating: 5,
  },
  {
    name: "Gopinath S.",
    location: "Cuddalore, Tamil Nadu",
    course: "Swing Trading",
    quote:
      "Recorded sessions saved me. I work shifts, so being able to catch up later without falling behind the batch mattered a lot.",
    rating: 4,
  },
  {
    name: "Revathi K.",
    location: "Sivakasi, Tamil Nadu",
    course: "Risk Management",
    quote:
      "They are honest about losses, which I did not expect. No one promises guaranteed profit — that made me trust the teaching more.",
    rating: 5,
  },
];

export const faqs: FAQItem[] = [
  {
    question: "What is Forex trading?",
    answer:
      "Forex (foreign exchange) trading is the buying and selling of one currency against another on the global currency market, with the aim of profiting from changes in exchange rates. It is the largest and most liquid financial market in the world.",
  },
  {
    question: "Can complete beginners learn to trade with you?",
    answer:
      "Yes. Our Beginner Forex course assumes no prior knowledge and builds your foundation step by step — market structure, terminology and your first demo account — before moving into intermediate and advanced concepts.",
  },
  {
    question: "Do you provide investment advice or guaranteed profits?",
    answer:
      "No. Tamil Trading Education provides educational content only. We do not provide personalised investment or financial advice, and we never guarantee profits. Trading decisions and their outcomes remain your responsibility.",
  },
  {
    question: "How do I join the community or a course?",
    answer:
      "Join our free WhatsApp or Telegram community to see how we teach, or fill in the enrollment form on the Courses or Contact page and our team will reach out with batch timings and next steps.",
  },
  {
    question: "Do you help with opening a broker trading account?",
    answer:
      "Yes, our Broker Account Assistance service walks you through choosing, opening and verifying a trading account safely — we do not hold or manage your funds at any point.",
  },
  {
    question: "What is an IB partner, and why does the referral code matter?",
    answer:
      "We are an official IB (Introducing Broker) partner for Vantage, OctaFX and XM. When you open an account using our referral code, you're linked to us — which unlocks free VIP community access and a dedicated relationship manager for any deposit, withdrawal or account support, resolved within 24 hours. Without the code, we can't provide these benefits.",
  },
  {
    question: "Is the VIP Community included with a course, or separate?",
    answer:
      "The VIP Community is available as a standalone membership or bundled with select courses. It includes daily market discussion, mentor access and accountability check-ins.",
  },
  {
    question: "What if I have a full-time job — can I still learn to trade?",
    answer:
      "Absolutely. Many of our students are working professionals. Our Swing Trading course and recorded session library are designed specifically for people who cannot watch charts all day.",
  },
];

export const blogPosts: BlogPost[] = [
  {
    slug: "how-to-read-candlestick-charts",
    title: "How to Read Candlestick Charts: A Beginner's Framework",
    excerpt:
      "Candlesticks tell a story about buyers and sellers in every session. Here's a simple framework to start reading that story correctly.",
    category: "Technical Analysis",
    date: "2026-06-12",
    readTime: "6 min read",
    image: images.blogChart1,
    content: [
      "Every candlestick on your chart represents a battle between buyers and sellers over a fixed period of time. Before you learn any pattern names, it helps to understand the four data points that make up a single candle: the open, the high, the low and the close.",
      "The body of the candle shows the range between the open and close, while the wicks (or shadows) show the full range the price travelled during that period. A long body with short wicks suggests strong, decisive movement in one direction. A small body with long wicks on both sides suggests indecision.",
      "Rather than memorising dozens of pattern names, we teach students to first ask three questions of any candle or group of candles: Who was in control — buyers or sellers? Where did that control happen relative to a key level? And did the following candles confirm or reject that control? This context-first approach is far more useful in live markets than pattern-spotting alone.",
      "In our Price Action course, we spend an entire module building this reading skill on real historical charts before introducing any strategy — because a strategy is only as good as your ability to read what the market is actually doing.",
    ],
  },
  {
    slug: "risk-management-position-sizing",
    title: "Position Sizing 101: The Math Most New Traders Skip",
    excerpt:
      "Most blown trading accounts fail because of position sizing, not strategy. Here's the simple formula every trader should know.",
    category: "Risk Management",
    date: "2026-06-05",
    readTime: "5 min read",
    image: images.blogChart2,
    content: [
      "New traders spend months searching for the 'perfect' entry strategy, while the single biggest driver of long-term survival — position sizing — often gets a few minutes of attention, if any.",
      "The core formula is simple: Position Size = (Account Risk %) × (Account Balance) ÷ (Stop-Loss Distance in Pips × Pip Value). If you risk 1% of a $1,000 account with a 25-pip stop, you are risking $10 on that trade, and your position size is calculated backward from that number — not the other way around.",
      "The mistake we see most often is traders picking a lot size first, based on what 'feels right' or what a signal group suggests, and only then discovering how much of their account is actually at risk. That is backwards, and it is how consistent traders occasionally take account-ending losses.",
      "In our Risk Management course, students build their own position-sizing calculator by hand before we ever hand them a spreadsheet — because understanding the mechanics matters more than the tool.",
    ],
  },
  {
    slug: "trading-psychology-revenge-trading",
    title: "Why Traders Revenge Trade (and How to Actually Stop)",
    excerpt:
      "Revenge trading is rarely about strategy. It's a psychological response — and it has a specific, learnable off-switch.",
    category: "Trading Psychology",
    date: "2026-05-28",
    readTime: "7 min read",
    image: images.blogChart3,
    content: [
      "Revenge trading — re-entering the market immediately after a loss, often with a larger size, to 'win back' what was lost — is one of the most common ways disciplined traders undo weeks of good decisions in a single session.",
      "It's rarely a strategy problem. It's an emotional response to loss that bypasses the rational, plan-following part of the brain. The trade after a loss is almost never based on the same analysis as the trades that came before it — it's based on the discomfort of the loss itself.",
      "The most effective off-switch we teach is a mandatory pause rule: after any loss that breaks your daily risk limit, trading stops for the day, full stop, no exceptions, no matter how obvious the next setup looks. This single rule, enforced without negotiation, prevents more account damage than almost any other psychological technique.",
      "Our Trading Psychology course dedicates a full session to building a personal 'stop rule' like this one, along with a pre-trade checklist that catches emotional decisions before they become executed trades.",
    ],
  },
  {
    slug: "smart-money-concepts-explained",
    title: "Smart Money Concepts, Explained Without the Jargon",
    excerpt:
      "Order blocks. Liquidity. Fair value gaps. Here's what these Smart Money Concepts terms actually mean in plain language.",
    category: "Smart Money Concepts",
    date: "2026-05-19",
    readTime: "8 min read",
    image: images.candlestickChart,
    content: [
      "Smart Money Concepts (SMC) can sound intimidating because of the vocabulary — order blocks, liquidity sweeps, fair value gaps — but the underlying idea is simple: large institutional participants leave footprints on a chart, and those footprints are often visible if you know what to look for.",
      "A 'liquidity pool' is simply an area where many retail stop-losses or pending orders are likely clustered — often just beyond an obvious high or low. Price frequently moves toward these areas before reversing, because that is where the volume needed for a large move exists.",
      "An 'order block' is the last opposing candle before a strong, decisive move — it marks a zone where large orders were likely placed. A 'fair value gap' is simply an imbalance between buying and selling pressure, visible as a gap in overlapping candle ranges, which price often revisits later.",
      "None of these concepts are magic predictors — they are context tools, used alongside structure and risk management, exactly as we teach them in our ICT / Smart Money Concepts course.",
    ],
  },
];
