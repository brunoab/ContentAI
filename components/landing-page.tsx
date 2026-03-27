"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import {
  Check,
  Zap,
  Linkedin,
  Mail,
  UserCircle,
  Sun,
  Moon,
  Globe,
  ChevronDown,
  ArrowRight,
  Sparkles,
  Star,
  Shield,
  Clock,
  TrendingUp,
} from "lucide-react"
import { cn } from "@/lib/utils"

// ─── Types ───────────────────────────────────────────────────────────────────

type Lang = "en" | "fr" | "es"

// ─── Translations ─────────────────────────────────────────────────────────────

const translations = {
  en: {
    nav: { pricing: "Pricing", login: "Log in", getStarted: "Get started" },
    heroBadge: "Powered by Bruno A.",
    heroTitle: ["Generate", "professional content", "in seconds"],
    heroHighlight: 1,
    heroSubtitle:
      "LinkedIn posts, cold emails, and profile bios — crafted by Claude AI in seconds. Stop spending hours writing.",
    heroCTA1: "Start for free",
    heroCTA2: "See pricing",
    heroDisclaimer: "No credit card required · 5 free generations / day",
    stats: [
      { value: "10K+", label: "Posts generated" },
      { value: "5K+", label: "Active users" },
      { value: "3h", label: "Saved per week" },
    ],
    trustTitle: "Our trusted tools & partners",
    featuresTitle: "Everything you need to create great content",
    featuresSubtitle: "Three powerful tools. One seamless experience.",
    features: [
      {
        title: "LinkedIn Posts",
        description:
          "Write engaging posts that get likes and comments. Stand out in your professional network with content that resonates.",
      },
      {
        title: "Cold Emails",
        description:
          "Personalized outreach that actually gets replies. Craft compelling messages tailored to each prospect.",
      },
      {
        title: "Profile Bios",
        description:
          "Stand out on any platform with a compelling bio. Make a great first impression everywhere you show up.",
      },
    ],
    benefitsTitle: "Content Reimagined for the Future You",
    benefitsSubtitle: "One platform for all your professional content needs — worldwide.",
    benefits: [
      {
        title: "AI-Powered Quality",
        description: "Claude AI ensures every piece of content is polished, engaging, and professional.",
      },
      {
        title: "Lightning Fast",
        description: "Generate content in seconds, not hours. Real-time streaming lets you see results instantly.",
      },
      {
        title: "Enterprise Secure",
        description: "Your data is encrypted and never used for training. We take privacy seriously.",
      },
      {
        title: "Always Improving",
        description: "Our AI models are constantly updated to produce better, more relevant content.",
      },
    ],
    howTitle: "How it works",
    howSubtitle: "From signup to published content in under a minute.",
    steps: [
      {
        title: "Sign up for free",
        description:
          "Create your account with just an email and password. No credit card required.",
      },
      {
        title: "Choose your content type",
        description:
          "Select LinkedIn post, cold email, or bio. Add context about yourself or your topic.",
      },
      {
        title: "Generate & publish",
        description:
          "Watch your content appear in real time. Copy with one click and publish anywhere.",
      },
    ],
    pricingTitle: "Simple, transparent pricing",
    pricingSubtitle: "Start free. Upgrade when you need more.",
    freeLabel: "Free",
    freeDesc: "Perfect for trying out ContentAI",
    proLabel: "Pro",
    proDesc: "For professionals who need more",
    perMonth: "/month",
    mostPopular: "Most Popular",
    freeFeatures: [
      "5 AI generations per day",
      "LinkedIn Post generator",
      "Cold Email generator",
      "Profile Bio generator",
    ],
    proFeatures: [
      "Unlimited AI generations",
      "LinkedIn Post generator",
      "Cold Email generator",
      "Profile Bio generator",
      "Priority generation speed",
      "Full generation history",
    ],
    getStartedBtn: "Get started — free",
    upgradeBtn: "Upgrade to Pro — $9/month",
    testimonialsTitle: "Real feedback from satisfied customers",
    testimonials: [
      { name: "Sarah Chen", role: "Marketing Lead", text: "ContentAI saved me 10+ hours a week on LinkedIn content. The quality is indistinguishable from hand-written posts." },
      { name: "Marcus Johnson", role: "Sales Director", text: "Our cold email response rate went up 3x after switching to ContentAI. It's like having a copywriter on demand." },
      { name: "Emma Laurent", role: "Freelance Designer", text: "My bio went from generic to magnetic. I've gotten more inbound leads in a month than the entire previous quarter." },
    ],
    ctaTitle: "Empowering Your Content Creation Freedom",
    ctaSubtitle: "Join thousands of professionals saving hours every week with AI-powered content.",
    ctaBtn: "Start for free",
    footerRights: "© 2026 ContentAI - Bruno A.",
  },
  fr: {
    nav: { pricing: "Tarifs", login: "Connexion", getStarted: "Commencer" },
    heroBadge: "Propulsé par Bruno A.",
    heroTitle: ["Générez du contenu", "professionnel", "en quelques secondes"],
    heroHighlight: 1,
    heroSubtitle:
      "Posts LinkedIn, emails de prospection et bios — rédigés par Claude AI en secondes. Arrêtez de passer des heures à écrire.",
    heroCTA1: "Commencer gratuitement",
    heroCTA2: "Voir les tarifs",
    heroDisclaimer: "Sans carte bancaire · 5 générations gratuites par jour",
    stats: [
      { value: "10K+", label: "Posts générés" },
      { value: "5K+", label: "Utilisateurs actifs" },
      { value: "3h", label: "Économisées / semaine" },
    ],
    trustTitle: "Nos outils et partenaires de confiance",
    featuresTitle: "Tout ce qu'il faut pour créer du super contenu",
    featuresSubtitle: "Trois outils puissants. Une expérience fluide.",
    features: [
      {
        title: "Posts LinkedIn",
        description:
          "Rédigez des posts engageants qui récoltent des likes et commentaires. Démarquez-vous dans votre réseau professionnel.",
      },
      {
        title: "Emails de prospection",
        description:
          "Des messages personnalisés qui obtiennent de vraies réponses. Rédigez des emails convaincants pour chaque prospect.",
      },
      {
        title: "Bios de profil",
        description:
          "Démarquez-vous sur toutes les plateformes avec une bio percutante. Faites une excellente première impression.",
      },
    ],
    benefitsTitle: "Le contenu réimaginé pour le futur",
    benefitsSubtitle: "Une plateforme pour tous vos besoins de contenu professionnel.",
    benefits: [
      {
        title: "Qualité IA",
        description: "Claude AI garantit un contenu poli, engageant et professionnel.",
      },
      {
        title: "Ultra rapide",
        description: "Générez du contenu en secondes, pas en heures. Le streaming en temps réel vous montre les résultats instantanément.",
      },
      {
        title: "Sécurité entreprise",
        description: "Vos données sont chiffrées et jamais utilisées pour l'entraînement.",
      },
      {
        title: "En amélioration constante",
        description: "Nos modèles IA sont constamment mis à jour pour produire un meilleur contenu.",
      },
    ],
    howTitle: "Comment ça marche",
    howSubtitle: "De l'inscription au contenu publié en moins d'une minute.",
    steps: [
      {
        title: "Inscrivez-vous gratuitement",
        description:
          "Créez votre compte avec seulement un email et un mot de passe. Aucune carte bancaire requise.",
      },
      {
        title: "Choisissez votre type de contenu",
        description:
          "Sélectionnez un post LinkedIn, un email ou une bio. Ajoutez du contexte.",
      },
      {
        title: "Générez & publiez",
        description:
          "Regardez votre contenu apparaître en temps réel. Copiez-le en un clic.",
      },
    ],
    pricingTitle: "Tarifs simples et transparents",
    pricingSubtitle: "Commencez gratuitement. Évoluez selon vos besoins.",
    freeLabel: "Gratuit",
    freeDesc: "Parfait pour essayer ContentAI",
    proLabel: "Pro",
    proDesc: "Pour les professionnels qui veulent plus",
    perMonth: "/mois",
    mostPopular: "Le plus populaire",
    freeFeatures: [
      "5 générations IA par jour",
      "Générateur de posts LinkedIn",
      "Générateur d'emails de prospection",
      "Générateur de bios de profil",
    ],
    proFeatures: [
      "Générations IA illimitées",
      "Générateur de posts LinkedIn",
      "Générateur d'emails de prospection",
      "Générateur de bios de profil",
      "Vitesse de génération prioritaire",
      "Historique complet des générations",
    ],
    getStartedBtn: "Commencer — gratuit",
    upgradeBtn: "Passer en Pro — 9$/mois",
    testimonialsTitle: "De vrais retours de clients satisfaits",
    testimonials: [
      { name: "Sarah Chen", role: "Responsable Marketing", text: "ContentAI m'a fait gagner plus de 10h par semaine sur le contenu LinkedIn. La qualité est indiscernable de l'écriture manuelle." },
      { name: "Marcus Johnson", role: "Directeur Commercial", text: "Notre taux de réponse aux emails a triplé avec ContentAI. C'est comme avoir un rédacteur à la demande." },
      { name: "Emma Laurent", role: "Designer Freelance", text: "Ma bio est passée de générique à magnétique. J'ai eu plus de leads entrants en un mois qu'en tout le trimestre précédent." },
    ],
    ctaTitle: "Libérez votre créativité de contenu",
    ctaSubtitle:
      "Rejoignez des milliers de professionnels qui économisent des heures chaque semaine.",
    ctaBtn: "Commencer gratuitement",
    footerRights: "© 2026 ContentAI - Bruno A.",
  },
  es: {
    nav: { pricing: "Precios", login: "Iniciar sesión", getStarted: "Empezar" },
    heroBadge: "Impulsado por Bruno A.",
    heroTitle: ["Genera contenido", "profesional", "en segundos"],
    heroHighlight: 1,
    heroSubtitle:
      "Posts de LinkedIn, emails en frío y bios — creados por Claude AI en segundos. Deja de pasar horas escribiendo.",
    heroCTA1: "Empezar gratis",
    heroCTA2: "Ver precios",
    heroDisclaimer: "Sin tarjeta de crédito · 5 generaciones gratuitas al día",
    stats: [
      { value: "10K+", label: "Posts generados" },
      { value: "5K+", label: "Usuarios activos" },
      { value: "3h", label: "Ahorradas / semana" },
    ],
    trustTitle: "Nuestras herramientas y socios de confianza",
    featuresTitle: "Todo lo que necesitas para crear contenido brillante",
    featuresSubtitle: "Tres herramientas potentes. Una experiencia perfecta.",
    features: [
      {
        title: "Posts de LinkedIn",
        description:
          "Escribe posts atractivos que consiguen likes y comentarios. Destaca en tu red profesional.",
      },
      {
        title: "Emails en frío",
        description:
          "Mensajes personalizados que consiguen respuestas reales. Redacta mensajes convincentes para cada prospecto.",
      },
      {
        title: "Bios de perfil",
        description:
          "Destaca en cualquier plataforma con una bio atractiva. Causa una excelente primera impresión.",
      },
    ],
    benefitsTitle: "Contenido reimaginado para tu futuro",
    benefitsSubtitle: "Una plataforma para todas tus necesidades de contenido profesional.",
    benefits: [
      {
        title: "Calidad con IA",
        description: "Claude AI asegura que cada pieza de contenido sea pulida, atractiva y profesional.",
      },
      {
        title: "Ultra rápido",
        description: "Genera contenido en segundos, no horas. El streaming en tiempo real muestra resultados al instante.",
      },
      {
        title: "Seguridad empresarial",
        description: "Tus datos están cifrados y nunca se usan para entrenamiento.",
      },
      {
        title: "Mejora constante",
        description: "Nuestros modelos de IA se actualizan constantemente para producir mejor contenido.",
      },
    ],
    howTitle: "Cómo funciona",
    howSubtitle: "Del registro al contenido publicado en menos de un minuto.",
    steps: [
      {
        title: "Regístrate gratis",
        description:
          "Crea tu cuenta solo con un email y contraseña. No se requiere tarjeta de crédito.",
      },
      {
        title: "Elige tu tipo de contenido",
        description:
          "Selecciona un post de LinkedIn, email en frío o bio. Añade contexto.",
      },
      {
        title: "Genera y publica",
        description:
          "Observa tu contenido en tiempo real. Cópialo con un clic y publícalo.",
      },
    ],
    pricingTitle: "Precios simples y transparentes",
    pricingSubtitle: "Empieza gratis. Mejora cuando necesites más.",
    freeLabel: "Gratis",
    freeDesc: "Perfecto para probar ContentAI",
    proLabel: "Pro",
    proDesc: "Para profesionales que necesitan más",
    perMonth: "/mes",
    mostPopular: "Más popular",
    freeFeatures: [
      "5 generaciones IA por día",
      "Generador de posts LinkedIn",
      "Generador de emails en frío",
      "Generador de bios de perfil",
    ],
    proFeatures: [
      "Generaciones IA ilimitadas",
      "Generador de posts LinkedIn",
      "Generador de emails en frío",
      "Generador de bios de perfil",
      "Velocidad de generación prioritaria",
      "Historial completo de generaciones",
    ],
    getStartedBtn: "Empezar — gratis",
    upgradeBtn: "Pasar a Pro — $9/mes",
    testimonialsTitle: "Opiniones reales de clientes satisfechos",
    testimonials: [
      { name: "Sarah Chen", role: "Líder de Marketing", text: "ContentAI me ahorró más de 10 horas por semana en contenido de LinkedIn. La calidad es indistinguible de lo escrito a mano." },
      { name: "Marcus Johnson", role: "Director de Ventas", text: "Nuestra tasa de respuesta a emails se triplicó con ContentAI. Es como tener un redactor a demanda." },
      { name: "Emma Laurent", role: "Diseñadora Freelance", text: "Mi bio pasó de genérica a magnética. Recibí más leads en un mes que en todo el trimestre anterior." },
    ],
    ctaTitle: "Potencia tu libertad creativa de contenido",
    ctaSubtitle:
      "Únete a miles de profesionales que ahorran horas cada semana.",
    ctaBtn: "Empezar gratis",
    footerRights: "© 2026 ContentAI - Bruno A.",
  },
} as const

// ─── Sub-components ───────────────────────────────────────────────────────────

const LANG_OPTIONS: { code: Lang; label: string; short: string }[] = [
  { code: "en", label: "English", short: "EN" },
  { code: "fr", label: "Français", short: "FR" },
  { code: "es", label: "Español", short: "ES" },
]

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted)
    return (
      <div className="size-9 rounded-full border border-emerald-900/20 bg-emerald-900/5" />
    )

  const isDark = resolvedTheme === "dark"
  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
      className="flex size-9 items-center justify-center rounded-full border border-white/20 bg-white/10 transition-all duration-200 hover:bg-white/20"
    >
      {isDark ? (
        <Sun className="size-4 text-amber-300" />
      ) : (
        <Moon className="size-4 text-white" />
      )}
    </button>
  )
}

function LangSwitcher({
  lang,
  setLang,
}: {
  lang: Lang
  setLang: (l: Lang) => void
}) {
  const [open, setOpen] = useState(false)
  const current = LANG_OPTIONS.find((l) => l.code === lang)!

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex h-9 items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 text-xs font-medium text-white/90 transition-all duration-200 hover:bg-white/20"
      >
        <Globe className="size-3.5" />
        {current.short}
        <ChevronDown
          className={cn("size-3 transition-transform", open && "rotate-180")}
        />
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 top-full z-50 mt-2 min-w-[130px] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-900">
            {LANG_OPTIONS.map((opt) => (
              <button
                key={opt.code}
                onClick={() => {
                  setLang(opt.code)
                  setOpen(false)
                }}
                className={cn(
                  "flex w-full items-center gap-2 px-3 py-2.5 text-xs font-medium transition-colors text-gray-700 dark:text-gray-300",
                  "hover:bg-gray-100 dark:hover:bg-gray-800",
                  lang === opt.code && "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                )}
              >
                {opt.label}
                {lang === opt.code && (
                  <Check className="ml-auto size-3 text-emerald-600 dark:text-emerald-400" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

const FEATURE_ICONS = [Linkedin, Mail, UserCircle]
const FEATURE_COLORS = [
  "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
  "bg-violet-50 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400",
  "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
]

const BENEFIT_ICONS = [Sparkles, Clock, Shield, TrendingUp]

// ─── Main Component ───────────────────────────────────────────────────────────

export function LandingPage() {
  const [lang, setLang] = useState<Lang>("en")

  useEffect(() => {
    const saved = localStorage.getItem("contentai-lang") as Lang | null
    if (saved && ["en", "fr", "es"].includes(saved)) setLang(saved)
  }, [])

  function handleSetLang(l: Lang) {
    setLang(l)
    localStorage.setItem("contentai-lang", l)
  }

  const t = translations[lang]

  return (
    <div className="landing-root min-h-screen flex flex-col font-[family-name:var(--font-syne)]">
      {/* ── Navigation ─────────────────────────────────────────────── */}
      <header className="absolute top-0 left-0 right-0 z-40">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex size-8 items-center justify-center rounded-lg bg-white shadow-sm transition-transform group-hover:scale-110">
              <Zap className="size-4 text-emerald-600" />
            </div>
            <span className="text-[15px] font-bold tracking-tight text-white">ContentAI</span>
          </Link>

          {/* Nav links */}
          <nav className="hidden items-center gap-7 sm:flex">
          </nav>

          {/* Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            <LangSwitcher lang={lang} setLang={handleSetLang} />
            <ThemeToggle />
            <Link
              href="/login"
              className="hidden h-9 items-center rounded-full px-4 text-sm font-medium text-white/80 transition-all hover:text-white sm:flex"
            >
              {t.nav.login}
            </Link>
            <Link
              href="/register"
              className="hidden h-9 items-center rounded-full bg-white px-5 text-sm font-semibold text-emerald-900 shadow-sm transition-all hover:scale-105 hover:shadow-md sm:flex"
            >
              {t.nav.getStarted}
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* ── Hero ───────────────────────────────────────────────────── */}
        <section className="hero-section relative flex min-h-[100vh] flex-col items-center justify-center overflow-hidden px-4 pt-24 pb-20 text-center">
          {/* Background image overlay */}
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="hero-bg-image absolute inset-0" />
            <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/80 via-emerald-950/70 to-emerald-950/90" />
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-emerald-950/90 to-transparent" />
          </div>

          <div className="relative z-10 mx-auto max-w-4xl space-y-7">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium text-white/90 backdrop-blur-sm">
              <Sparkles className="size-3 text-emerald-300" />
              {t.heroBadge}
            </div>

            {/* Headline */}
            <h1 className="font-[family-name:var(--font-fraunces)] text-5xl font-black leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-[5.5rem]">
              {t.heroTitle.map((line, i) =>
                i === t.heroHighlight ? (
                  <span key={i} className="hero-gradient-text block">
                    {line}
                  </span>
                ) : (
                  <span key={i} className="block">
                    {line}
                  </span>
                )
              )}
            </h1>

            {/* Subtitle */}
            <p className="mx-auto max-w-2xl text-base text-white/65 sm:text-lg leading-relaxed">
              {t.heroSubtitle}
            </p>

            {/* CTAs */}
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/register"
                className="group flex h-12 items-center gap-2 rounded-full bg-emerald-500 px-7 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition-all hover:bg-emerald-400 hover:scale-105 hover:shadow-emerald-500/50"
              >
                <Zap className="size-4" />
                {t.heroCTA1}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href="#pricing"
                onClick={(e) => { e.preventDefault(); document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" }) }}
                className="flex h-12 items-center gap-2 rounded-full border border-white/20 bg-white/10 px-7 text-sm font-medium text-white/90 backdrop-blur-sm transition-all hover:bg-white/20"
              >
                {t.heroCTA2}
              </a>
            </div>

            <p className="text-xs text-white/40">
              {t.heroDisclaimer}
            </p>

            {/* Stats */}
            <div className="mx-auto mt-6 flex max-w-sm items-center justify-center gap-8 border-t border-white/10 pt-8 sm:max-w-none sm:gap-16">
              {t.stats.map(({ value, label }) => (
                <div key={label} className="text-center">
                  <div className="font-[family-name:var(--font-fraunces)] text-2xl font-bold text-white sm:text-3xl">
                    {value}
                  </div>
                  <div className="mt-0.5 text-xs text-white/50">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Trust bar ──────────────────────────────────────────────── */}
        <section className="landing-section-light px-4 py-14">
          <div className="mx-auto max-w-5xl text-center">
            <p className="mb-8 text-sm font-medium tracking-widest uppercase landing-muted-text">
              {t.trustTitle}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-14 gap-y-8">
              {/* Anthropic / Claude */}
              <div className="flex items-center gap-2 landing-trust-text">
                <svg className="size-6" viewBox="0 0 24 24" fill="currentColor"><path d="M13.827 3.52l3.603 10.108h-4.83L9.556 3.52h4.271zm-7.334 0l-3.48 10.108H7.07L10.55 3.52H6.493zM17.47 20.48l3.48-10.108h-4.057L13.413 20.48h4.057zm-7.334 0L13.656 10.372H8.826L5.346 20.48h4.79z"/></svg>
                <span className="text-sm font-semibold tracking-wide">Claude AI</span>
              </div>
              {/* Next.js */}
              <div className="flex items-center gap-2 landing-trust-text">
                <svg className="size-6" viewBox="0 0 24 24" fill="currentColor"><path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.534-.051.469 0 .554.018.67.185a647.4 647.4 0 0 1 2.573 3.86l2.602 3.91 1.315 1.976 1.314 1.976.066-.044a12.016 12.016 0 0 0 3.51-3.753 11.895 11.895 0 0 0 1.49-4.075c.096-.659.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.86-8.292-8.208-9.695a12.236 12.236 0 0 0-2.535-.525 53.08 53.08 0 0 0-1.171-.007zm3.014 7.26a.471.471 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 0 1 .233-.296c.096-.05.13-.054.5-.054.347 0 .408.005.485.047z"/></svg>
                <span className="text-sm font-semibold tracking-wide">Next.js</span>
              </div>
              {/* Stripe */}
              <div className="flex items-center gap-2 landing-trust-text">
                <svg className="size-6" viewBox="0 0 24 24" fill="currentColor"><path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z"/></svg>
                <span className="text-sm font-semibold tracking-wide">Stripe</span>
              </div>
              {/* Vercel */}
              <div className="flex items-center gap-2 landing-trust-text">
                <svg className="size-6" viewBox="0 0 24 24" fill="currentColor"><path d="M24 22.525H0l12-21.05 12 21.05z"/></svg>
                <span className="text-sm font-semibold tracking-wide">Vercel</span>
              </div>
              {/* PostgreSQL */}
              <div className="flex items-center gap-2 landing-trust-text">
                <svg className="size-6" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5594 14.7228a.5269.5269 0 0 0-.0958-.2744c-.3833-.6487-1.1316-.9997-2.2858-.9997-.3722 0-.7697.0373-1.1878.1087-.5765.0979-1.1077.2914-1.578.5765.0373-.1948.0671-.3937.0884-.5956.0543-.5139.046-1.0238-.0382-1.4697.1745-.4622.2957-.9513.3589-1.464.1284-1.0385.0351-2.0394-.2769-2.9688-.6366-1.8908-1.8282-3.3673-3.4418-4.2651-1.2942-.7201-2.7364-1.0651-4.0839-1.0651-.3068 0-.6097.0192-.9039.0563-1.8719-1.275-3.754-1.5958-5.0866-1.5958-.8527 0-1.5067.1437-1.8762.3065C2.4503 1.585 1.9148 2.22 1.5702 3.105c-.5765 1.479-.6326 3.5414-.1593 5.8552.1305.6389.3127 1.2957.5429 1.9585-.099.3368-.1835.677-.2507 1.0193-.2608 1.3243-.1948 2.618.1815 3.737.502 1.4907 1.4666 2.5267 2.7158 2.9159.3647.1135.7447.1708 1.131.1708.1284 0 .2577-.0074.3866-.0222.7143-.0818 1.4102-.354 2.0472-.7864a12.2736 12.2736 0 0 0 1.357.5803c1.3505.4749 2.7816.7155 4.2546.7155h.0076c.7584-.0006 1.4936-.0744 2.1868-.2193.6395.5765 1.4259.9284 2.3028 1.0268.1656.0186.3303.0278.4932.0278.9378 0 1.7743-.3217 2.4338-.9377.7266-.6782 1.1713-1.6385 1.2492-2.6934l.0091-.1174.0098-.1788c.013-.2372.0249-.4744.0295-.7116.0078-.3977.061-1.5879.0637-1.6342.0057-.0969-.0053-.1924-.0232-.2799z"/></svg>
                <span className="text-sm font-semibold tracking-wide">PostgreSQL</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Benefits ───────────────────────────────────────────────── */}
        <section className="landing-section-alt px-4 py-24">
          <div className="mx-auto max-w-6xl">
            <div className="mb-16 text-center">
              <h2 className="font-[family-name:var(--font-fraunces)] text-4xl font-bold tracking-tight landing-heading sm:text-5xl">
                {t.benefitsTitle}
              </h2>
              <p className="mt-4 text-base landing-muted-text">
                {t.benefitsSubtitle}
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {t.benefits.map((benefit, i) => {
                const Icon = BENEFIT_ICONS[i]
                return (
                  <div
                    key={benefit.title}
                    className="landing-card group rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="mb-5 flex size-12 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-900/30">
                      <Icon className="size-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <h3 className="mb-2 text-base font-bold landing-heading">
                      {benefit.title}
                    </h3>
                    <p className="text-sm leading-relaxed landing-muted-text">
                      {benefit.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ── Features ─────────────────────────────────────────────── */}
        <section className="landing-section-light px-4 py-24">
          <div className="mx-auto max-w-6xl">
            <div className="mb-16 text-center">
              <h2 className="font-[family-name:var(--font-fraunces)] text-4xl font-bold tracking-tight landing-heading sm:text-5xl">
                {t.featuresTitle}
              </h2>
              <p className="mt-4 text-base landing-muted-text">
                {t.featuresSubtitle}
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-3">
              {t.features.map((feature, i) => {
                const Icon = FEATURE_ICONS[i]
                return (
                  <div
                    key={feature.title}
                    className="landing-card group rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className={cn("mb-5 flex size-12 items-center justify-center rounded-xl", FEATURE_COLORS[i])}>
                      <Icon className="size-5" />
                    </div>
                    <h3 className="mb-2 text-base font-bold landing-heading">
                      {feature.title}
                    </h3>
                    <p className="text-sm leading-relaxed landing-muted-text">
                      {feature.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ── How it works ─────────────────────────────────────────── */}
        <section className="landing-section-alt px-4 py-24">
          <div className="mx-auto max-w-5xl">
            <div className="mb-16 text-center">
              <h2 className="font-[family-name:var(--font-fraunces)] text-4xl font-bold tracking-tight landing-heading sm:text-5xl">
                {t.howTitle}
              </h2>
              <p className="mt-4 text-base landing-muted-text">
                {t.howSubtitle}
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-3">
              {t.steps.map(({ title, description }, i) => (
                <div key={title} className="relative text-center group">
                  {/* Step number */}
                  <div className="relative mx-auto mb-6 flex size-16 items-center justify-center">
                    <div className="absolute inset-0 rounded-full bg-emerald-50 dark:bg-emerald-900/20 transition-all group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/40" />
                    <span className="relative font-[family-name:var(--font-fraunces)] text-2xl font-black text-emerald-600 dark:text-emerald-400">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mb-2 text-base font-bold landing-heading">
                    {title}
                  </h3>
                  <p className="text-sm leading-relaxed landing-muted-text">
                    {description}
                  </p>
                  {/* Connector line */}
                  {i < t.steps.length - 1 && (
                    <div className="absolute right-0 top-8 hidden h-px w-1/3 translate-x-1/2 bg-gradient-to-r from-emerald-300/50 to-transparent dark:from-emerald-600/30 sm:block" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Pricing ──────────────────────────────────────────────── */}
        <section id="pricing" className="landing-section-light px-4 py-24">
          <div className="mx-auto max-w-5xl">
            <div className="mb-16 text-center">
              <h2 className="font-[family-name:var(--font-fraunces)] text-4xl font-bold tracking-tight landing-heading sm:text-5xl">
                {t.pricingTitle}
              </h2>
              <p className="mt-4 text-base landing-muted-text">
                {t.pricingSubtitle}
              </p>
            </div>

            <div className="mx-auto grid max-w-3xl gap-6 sm:grid-cols-2">
              {/* Free */}
              <div className="landing-card rounded-2xl p-8">
                <div className="mb-6">
                  <h3 className="text-lg font-bold landing-heading">
                    {t.freeLabel}
                  </h3>
                  <p className="mt-1 text-sm landing-muted-text">
                    {t.freeDesc}
                  </p>
                  <div className="mt-5 flex items-end gap-1">
                    <span className="font-[family-name:var(--font-fraunces)] text-5xl font-black landing-heading">
                      $0
                    </span>
                    <span className="mb-1.5 text-sm landing-muted-text">
                      {t.perMonth}
                    </span>
                  </div>
                </div>
                <ul className="mb-7 space-y-3">
                  {t.freeFeatures.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm landing-body-text">
                      <Check className="size-4 shrink-0 text-emerald-500" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/register"
                  className="flex h-11 w-full items-center justify-center rounded-xl border-2 border-emerald-600/20 text-sm font-semibold text-emerald-700 transition-all hover:border-emerald-600/40 hover:bg-emerald-50 dark:border-emerald-500/20 dark:text-emerald-400 dark:hover:border-emerald-500/40 dark:hover:bg-emerald-900/20"
                >
                  {t.getStartedBtn}
                </Link>
              </div>

              {/* Pro */}
              <div className="relative overflow-hidden rounded-2xl border-2 border-emerald-500 bg-emerald-900 p-8 text-white shadow-2xl shadow-emerald-500/10 dark:bg-emerald-950">
                {/* Popular badge */}
                <div className="absolute right-4 top-4">
                  <span className="rounded-full bg-emerald-400 px-3 py-1 text-xs font-semibold text-emerald-950">
                    {t.mostPopular}
                  </span>
                </div>
                {/* Glow */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full bg-emerald-400/15 blur-3xl"
                />
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-white">{t.proLabel}</h3>
                  <p className="mt-1 text-sm text-emerald-200/70">{t.proDesc}</p>
                  <div className="mt-5 flex items-end gap-1">
                    <span className="font-[family-name:var(--font-fraunces)] text-5xl font-black text-white">
                      $9
                    </span>
                    <span className="mb-1.5 text-sm text-emerald-200/70">
                      {t.perMonth}
                    </span>
                  </div>
                </div>
                <ul className="mb-7 space-y-3">
                  {t.proFeatures.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-emerald-100/80">
                      <Check className="size-4 shrink-0 text-emerald-400" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/register"
                  className="group flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-emerald-400 text-sm font-semibold text-emerald-950 shadow-lg transition-all hover:bg-emerald-300 hover:scale-[1.02]"
                >
                  <Zap className="size-4" />
                  {t.upgradeBtn}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── Testimonials ───────────────────────────────────────────── */}
        <section className="landing-section-alt px-4 py-24">
          <div className="mx-auto max-w-6xl">
            <div className="mb-16 text-center">
              <h2 className="font-[family-name:var(--font-fraunces)] text-4xl font-bold tracking-tight landing-heading sm:text-5xl">
                {t.testimonialsTitle}
              </h2>
            </div>

            <div className="grid gap-6 sm:grid-cols-3">
              {t.testimonials.map((testimonial) => (
                <div key={testimonial.name} className="landing-card rounded-2xl p-7">
                  <div className="mb-4 flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="size-4 fill-emerald-400 text-emerald-400" />
                    ))}
                  </div>
                  <p className="mb-6 text-sm leading-relaxed landing-body-text italic">
                    &ldquo;{testimonial.text}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-semibold landing-heading">{testimonial.name}</div>
                      <div className="text-xs landing-muted-text">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA Banner ───────────────────────────────────────────── */}
        <section className="relative overflow-hidden px-4 py-24">
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl bg-emerald-900 px-6 py-20 text-center dark:bg-emerald-950">
            {/* Glow effects */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
            >
              <div className="absolute left-1/2 top-1/2 size-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/15 blur-3xl" />
              <div className="absolute right-0 top-0 size-64 rounded-full bg-emerald-400/10 blur-3xl" />
            </div>

            <div className="relative z-10">
              <h2 className="font-[family-name:var(--font-fraunces)] text-3xl font-black leading-tight tracking-tight text-white sm:text-5xl">
                {t.ctaTitle}
              </h2>
              <p className="mt-5 text-base text-emerald-200/60 sm:text-lg">{t.ctaSubtitle}</p>
              <Link
                href="/register"
                className="mt-8 inline-flex h-13 items-center gap-2 rounded-full bg-emerald-400 px-8 text-sm font-semibold text-emerald-950 shadow-xl shadow-emerald-400/20 transition-all hover:bg-emerald-300 hover:scale-105"
              >
                <Zap className="size-4" />
                {t.ctaBtn}
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ──────────────────────────────────────────────────── */}
      <footer className="landing-footer px-4 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2.5">
            <div className="flex size-7 items-center justify-center rounded-lg bg-emerald-600">
              <Zap className="size-3.5 text-white" />
            </div>
            <span className="text-sm font-bold landing-heading">
              ContentAI
            </span>
          </div>

          <nav className="flex items-center gap-5 text-sm landing-muted-text">
            <a href="#pricing" onClick={(e) => { e.preventDefault(); document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" }) }} className="transition-colors hover:text-emerald-600 dark:hover:text-emerald-400">
              {t.nav.pricing}
            </a>
            <Link href="/login" className="transition-colors hover:text-emerald-600 dark:hover:text-emerald-400">
              {t.nav.login}
            </Link>
            <a
              href="https://github.com"
              className="transition-colors hover:text-emerald-600 dark:hover:text-emerald-400"
            >
              GitHub
            </a>
          </nav>

          <p className="text-xs landing-muted-text opacity-60">
            {t.footerRights}
          </p>
        </div>
      </footer>
    </div>
  )
}
