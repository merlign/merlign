import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { useLocation, Link, BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence, motion, useScroll, useTransform, useSpring } from "framer-motion";
import { X, Send, MessageCircle, ArrowRight, ChevronDown, Menu, Check, Layout as Layout$1, LineChart, Zap, Globe, Settings, Cpu, MessageSquare, Database, Mail, Linkedin, MousePointerClick, Search, Activity } from "lucide-react";
import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import emailjs from "emailjs-com";
import { Helmet, HelmetProvider } from "react-helmet-async";
const WhatsAppWidget = ({ phoneNumber = "31647693209" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTooltipDismissed, setIsTooltipDismissed] = useState(false);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { role: "assistant", text: "Hoi! Ik ben de AI-assistent van Merlijn. 👋" },
    { role: "assistant", text: "Hoe kan ik je vandaag helpen bij het versnellen van je business?" }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);
  const scrollToBottom = () => {
    var _a;
    (_a = chatEndRef.current) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setIsTooltipDismissed(true);
    }
  }, [chatHistory, isOpen, isTyping]);
  const handleSend = async () => {
    if (!message.trim()) return;
    const userMsg = message.trim();
    setChatHistory((prev) => [...prev, { role: "user", text: userMsg }]);
    setMessage("");
    setIsTyping(true);
    setTimeout(() => {
      let response = "";
      const lowerMsg = userMsg.toLowerCase();
      if (lowerMsg.includes("website")) {
        response = "Ik bouw high-end maatwerk websites die binnen 72 uur live kunnen staan. Focus ligt op conversie en design voor MKB en solo ondernemers.";
      } else if (lowerMsg.includes("dashboard")) {
        response = "Voor een dashboard heb ik ongeveer 7 dagen nodig. Dit komt omdat ik API-koppelingen leg en alles grondig moet testen voor een foutloos inzicht.";
      } else if (lowerMsg.includes("automatisering") || lowerMsg.includes("ai")) {
        response = "Ik help je repetitief werk te automatiseren. Om te starten heb ik vaak toegang nodig tot je data of accounts, maar dat bespreken we in de gratis check.";
      } else if (lowerMsg.includes("prijs") || lowerMsg.includes("kosten") || lowerMsg.includes("duur")) {
        response = "Prijzen zijn bij mij altijd op basis van maatwerk, omdat elk bedrijf anders is. Onderhoud bied ik overigens al aan vanaf €35,- per maand.";
      } else if (lowerMsg.includes("nodig") || lowerMsg.includes("starten") || lowerMsg.includes("hoe werkt")) {
        response = "Voor de start heb ik toegang tot data en design assets nodig. We beginnen met een gratis check van 20 minuten, daarna gaan we een uurtje de diepte in.";
      } else if (lowerMsg.includes("wie") || lowerMsg.includes("voor wie") || lowerMsg.includes("doelgroep")) {
        response = "Ik werk het liefst voor ambitieuze MKB-ondernemers en solo ondernemers die hun business willen professionaliseren en automatiseren.";
      } else {
        response = "Interessante vraag! Ik kan hier dieper op ingaan tijdens een korte call of via WhatsApp. Zal ik je doorverbinden naar m'n persoonlijke app?";
      }
      setChatHistory((prev) => [...prev, { role: "assistant", text: response }]);
      setIsTyping(false);
    }, 1500);
  };
  const handleWhatsAppRedirect = () => {
    let clean = phoneNumber.replace(/\D/g, "");
    if (clean.startsWith("0")) {
      clean = "31" + clean.substring(1);
    }
    if (!clean.startsWith("31") && clean.length >= 9) {
      clean = "31" + clean;
    }
    window.open(`https://wa.me/${clean}`, "_blank");
  };
  return /* @__PURE__ */ jsxs("div", { className: "fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[1000] flex flex-col items-end gap-4", children: [
    /* @__PURE__ */ jsx(AnimatePresence, { children: !isOpen && !isTooltipDismissed && /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 10, scale: 0.9 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 10, scale: 0.9 },
        transition: { delay: 1 },
        className: "bg-white px-5 py-3 rounded-2xl rounded-br-none shadow-2xl mb-2 relative hidden md:flex items-center gap-3 transition-all border border-black/5",
        children: [
          /* @__PURE__ */ jsx("p", { className: "font-sans text-black text-[12px] font-bold uppercase tracking-widest whitespace-nowrap", children: "Vragen? Stel ze hier." }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: (e) => {
                e.stopPropagation();
                setIsTooltipDismissed(true);
              },
              className: "text-black/30 hover:text-black transition-colors",
              children: /* @__PURE__ */ jsx(X, { size: 14 })
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "absolute -bottom-2 right-4 w-4 h-4 bg-white rotate-45 border-r border-b border-black/5" })
        ]
      }
    ) }),
    /* @__PURE__ */ jsx(AnimatePresence, { children: isOpen && /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.8, y: 20, transformOrigin: "bottom right" },
        animate: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.8, y: 20 },
        className: "w-[340px] md:w-[420px] h-[550px] bg-[#141414] border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col backdrop-blur-2xl mb-4",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-primary p-6 md:p-8 flex items-center justify-between shadow-lg relative z-10", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-full overflow-hidden border-2 border-white/30 shadow-inner bg-black/20", children: /* @__PURE__ */ jsx("img", { src: "/merlijn-portrait.png", alt: "Merlijn", className: "w-full h-full object-cover" }) }),
                /* @__PURE__ */ jsx("span", { className: "absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-primary shadow-sm" })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "text-white", children: /* @__PURE__ */ jsx("h4", { className: "font-sans font-black text-sm uppercase tracking-widest leading-none", children: "Merlijn AI" }) })
            ] }),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setIsOpen(false),
                className: "w-10 h-10 rounded-full bg-black/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-black/20 transition-all",
                children: /* @__PURE__ */ jsx(X, { size: 18 })
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1 overflow-y-auto p-6 md:p-8 space-y-6 scrollbar-hide", children: [
            chatHistory.map((msg, i) => /* @__PURE__ */ jsx(
              motion.div,
              {
                initial: { opacity: 0, x: msg.role === "user" ? 10 : -10, y: 10 },
                animate: { opacity: 1, x: 0, y: 0 },
                className: `flex ${msg.role === "user" ? "justify-end" : "justify-start"}`,
                children: /* @__PURE__ */ jsx("div", { className: `max-w-[85%] p-4 rounded-2xl text-[13px] md:text-[14px] leading-relaxed font-sans shadow-sm ${msg.role === "user" ? "bg-primary text-black font-bold rounded-tr-none" : "bg-white/5 border border-white/5 text-[#F2F0E9]/80 italic rounded-tl-none"}`, children: msg.text })
              },
              i
            )),
            isTyping && /* @__PURE__ */ jsx(
              motion.div,
              {
                initial: { opacity: 0, y: 10 },
                animate: { opacity: 1, y: 0 },
                className: "flex justify-start",
                children: /* @__PURE__ */ jsx("div", { className: "bg-white/5 border border-white/5 p-4 rounded-2xl rounded-tl-none flex gap-1.5", children: [0, 1, 2].map((d) => /* @__PURE__ */ jsx(
                  motion.div,
                  {
                    animate: { opacity: [0.3, 1, 0.3], y: [0, -2, 0] },
                    transition: { duration: 1, repeat: Infinity, delay: d * 0.2 },
                    className: "w-1.5 h-1.5 bg-primary rounded-full"
                  },
                  d
                )) })
              }
            ),
            /* @__PURE__ */ jsx("div", { ref: chatEndRef })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-6 md:p-8 bg-black/20 border-t border-white/5 space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx(
                "textarea",
                {
                  value: message,
                  onKeyDown: (e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  },
                  onChange: (e) => setMessage(e.target.value),
                  placeholder: "Vraag iets aan de AI...",
                  className: "w-full bg-white/5 border border-white/10 rounded-2xl p-4 pr-14 text-[#F2F0E9] font-sans text-sm focus:outline-none focus:border-primary transition-all min-h-[60px] max-h-[120px] resize-none"
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: handleSend,
                  disabled: !message.trim() || isTyping,
                  className: `absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-full transition-all ${message.trim() ? "bg-primary text-black scale-100 shadow-lg" : "bg-white/5 text-white/20 scale-90"}`,
                  children: /* @__PURE__ */ jsx(Send, { size: 16 })
                }
              )
            ] }),
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: handleWhatsAppRedirect,
                className: "w-full group flex items-center justify-center gap-4 bg-green-500 hover:bg-green-600 p-4 rounded-2xl transition-all duration-500 shadow-[0_0_20px_rgba(34,197,94,0.2)]",
                children: [
                  /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center w-8 h-8 rounded-full bg-white/20", children: /* @__PURE__ */ jsx(MessageCircle, { className: "text-white fill-white", size: 18 }) }),
                  /* @__PURE__ */ jsx("span", { className: "text-[11px] font-black uppercase tracking-[0.2em] text-white", children: "Spreek de echte Merlijn" }),
                  /* @__PURE__ */ jsx(ArrowRight, { size: 14, className: "text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all" })
                ]
              }
            )
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxs(
      motion.button,
      {
        whileHover: { scale: 1.05 },
        whileTap: { scale: 0.95 },
        onClick: () => setIsOpen(!isOpen),
        className: `w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-700 relative group overflow-hidden ${isOpen ? "bg-white" : "bg-primary shadow-[0_0_30px_rgba(201,168,76,0.3)]"}`,
        children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 rounded-full bg-primary/40 animate-ping opacity-20 pointer-events-none" }),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/10 opacity-50" }),
          isOpen ? /* @__PURE__ */ jsx(X, { className: "text-black relative z-10", size: 28 }) : /* @__PURE__ */ jsx(MessageCircle, { className: "text-white relative z-10", size: 32 })
        ]
      }
    )
  ] });
};
const client = createClient({
  projectId: "1r5lk62n",
  dataset: "production",
  useCdn: true,
  // `false` als je de allernieuwste data wilt, `true` voor extra snelheid
  apiVersion: "2023-05-03"
  // Of een recentere datum
});
const builder = imageUrlBuilder(client);
function urlFor(source) {
  if (!source) return null;
  return builder.image(source);
}
async function getHomePageData() {
  return await client.fetch(`*[_type == "homePage"][0]`);
}
async function getAboutPageData() {
  return await client.fetch(`*[_type == "aboutPage"][0]`);
}
async function getFaqs() {
  return await client.fetch(`*[_type == "faq"] | order(order asc)`);
}
async function getCases() {
  try {
    const data = await client.fetch(`*[_type == "caseStudy"]`);
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("Sanity getCases Error:", err);
    return [];
  }
}
async function getServicePageData(serviceName) {
  return await client.fetch(`*[_type == "servicePage" && serviceName == $serviceName][0]`, { serviceName });
}
async function getContactInfo() {
  return await client.fetch(`*[_type == "contactInfo"][0]`);
}
const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDienstenOpen, setIsDienstenOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsDienstenOpen(false);
  }, [pathname]);
  const navLinks = [
    { label: "Over mij", href: "/over-mij" },
    { label: "Cases", href: "/cases" },
    { label: "Contact", href: "/contact" }
  ];
  const services = [
    { label: "Website", href: "/website", desc: "Live in 72 uur" },
    { label: "Dashboard", href: "/dashboard", desc: "Direct inzicht" },
    { label: "Automatisering", href: "/automatisering", desc: "Tijd terug" }
  ];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "fixed top-4 md:top-6 left-0 w-full z-[100] px-4 md:px-20 pointer-events-none", children: /* @__PURE__ */ jsx("nav", { className: `max-w-[1500px] mx-auto pointer-events-auto transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] rounded-full border ${isScrolled ? "bg-[#0A0A0A]/60 backdrop-blur-xl border-white/5 py-3 md:py-4 px-6 md:px-10 shadow-2xl" : "bg-[#0A0A0A]/20 backdrop-blur-sm border-white/5 py-4 md:py-6 px-4"}`, children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsx(
        Link,
        {
          to: "/",
          onClick: (e) => {
            if (pathname === "/") {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
            setIsMobileMenuOpen(false);
          },
          className: "relative z-10",
          children: /* @__PURE__ */ jsx("img", { src: "/logo_merlign.png", alt: "Merlign", className: "h-5 md:h-6 transition-all duration-500 brightness-0 invert" })
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "hidden lg:flex items-center gap-10 font-sans text-[13px] uppercase tracking-widest text-[#F2F0E9]/60", children: [
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: "relative group/diensten",
            onMouseEnter: () => setIsDienstenOpen(true),
            onMouseLeave: () => setIsDienstenOpen(false),
            children: [
              /* @__PURE__ */ jsxs("button", { className: "hover:text-[#F2F0E9] transition-colors py-2 flex items-center gap-2 font-bold group font-sans text-[13px] uppercase tracking-widest", children: [
                "Diensten",
                /* @__PURE__ */ jsx(ChevronDown, { size: 12, className: "group-hover:rotate-180 transition-transform duration-500" })
              ] }),
              /* @__PURE__ */ jsx("div", { className: `absolute top-full left-1/2 -translate-x-1/2 pt-4 transition-all duration-500 ${isDienstenOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"}`, children: /* @__PURE__ */ jsx("div", { className: "bg-[#141414] border border-white/5 rounded-[2rem] p-6 shadow-2xl w-[280px] backdrop-blur-3xl", children: /* @__PURE__ */ jsx("div", { className: "space-y-2", children: services.map((s, i) => /* @__PURE__ */ jsxs(
                Link,
                {
                  to: s.href,
                  className: "block p-4 rounded-[1.5rem] hover:bg-primary/10 transition-all group/item",
                  children: [
                    /* @__PURE__ */ jsx("p", { className: "text-[#F2F0E9] font-sans font-bold text-[13px] uppercase tracking-widest leading-none", children: s.label }),
                    /* @__PURE__ */ jsx("p", { className: "text-[#F2F0E9]/60 font-sans text-[9px] uppercase tracking-widest mt-2", children: s.desc })
                  ]
                },
                i
              )) }) }) })
            ]
          }
        ),
        navLinks.map((link, i) => /* @__PURE__ */ jsxs(Link, { to: link.href, className: "hover:text-[#F2F0E9] transition-colors py-2 relative group font-bold", children: [
          link.label,
          /* @__PURE__ */ jsx("span", { className: "absolute bottom-0 left-0 w-0 h-[1px] bg-primary transition-all duration-500 group-hover:w-full" })
        ] }, i))
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 md:gap-6 relative z-10", children: [
        /* @__PURE__ */ jsxs("a", { href: "#contact", className: "hidden sm:block btn-magnetic group bg-white/5 text-white px-6 py-2.5 rounded-full overflow-hidden", children: [
          /* @__PURE__ */ jsx("span", { className: "relative z-10 text-[12px] font-bold uppercase tracking-widest", children: "Gratis adviesgesprek" }),
          /* @__PURE__ */ jsx("div", { className: "btn-bg bg-primary shadow-[0_0_20px_rgba(201,168,76,0.5)]" })
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            className: "lg:hidden w-10 h-10 flex items-center justify-center text-[#F2F0E9]/60 hover:text-[#F2F0E9] transition-colors",
            onClick: () => setIsMobileMenuOpen(!isMobileMenuOpen),
            children: isMobileMenuOpen ? /* @__PURE__ */ jsx(X, { size: 24 }) : /* @__PURE__ */ jsx(Menu, { size: 24 })
          }
        )
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx(AnimatePresence, { children: isMobileMenuOpen && /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, x: "100%" },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: "100%" },
        transition: { type: "spring", damping: 25, stiffness: 200 },
        className: "fixed inset-0 z-[90] bg-[#0A0A0A] flex flex-col pt-32 px-8 lg:hidden",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-8", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxs(
                "button",
                {
                  className: "flex items-center gap-4 text-[#F2F0E9] uppercase tracking-widest font-sans text-3xl font-bold py-2",
                  onClick: () => setIsDienstenOpen(!isDienstenOpen),
                  children: [
                    "Diensten",
                    /* @__PURE__ */ jsx(ChevronDown, { size: 24, className: `transition-transform duration-500 text-primary ${isDienstenOpen ? "rotate-180" : ""}` })
                  ]
                }
              ),
              /* @__PURE__ */ jsx(AnimatePresence, { children: isDienstenOpen && /* @__PURE__ */ jsx(
                motion.div,
                {
                  initial: { opacity: 0, height: 0 },
                  animate: { opacity: 1, height: "auto" },
                  exit: { opacity: 0, height: 0 },
                  transition: { duration: 0.3, ease: "easeInOut" },
                  className: "overflow-hidden",
                  children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-4 pl-4", children: services.map((s, i) => /* @__PURE__ */ jsx(
                    Link,
                    {
                      to: s.href,
                      className: "text-xl md:text-2xl font-sans font-bold uppercase tracking-widest text-[#F2F0E9]/60 hover:text-[#F2F0E9] transition-colors pl-4",
                      onClick: () => setIsMobileMenuOpen(false),
                      children: s.label
                    },
                    i
                  )) })
                }
              ) })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-8", children: navLinks.map((link, i) => /* @__PURE__ */ jsx(
              Link,
              {
                to: link.href,
                className: "text-3xl font-sans font-bold text-[#F2F0E9] uppercase tracking-widest",
                onClick: () => setIsMobileMenuOpen(false),
                children: link.label
              },
              i
            )) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-auto pb-12 space-y-8", children: [
            /* @__PURE__ */ jsxs(
              "a",
              {
                href: "#contact",
                className: "w-full bg-primary text-[#0A0A0A] py-5 rounded-full font-mono text-[14px] uppercase tracking-[0.2em] font-bold flex items-center justify-center gap-4 group overflow-hidden relative",
                onClick: () => setIsMobileMenuOpen(false),
                children: [
                  /* @__PURE__ */ jsx("span", { className: "relative z-10", children: "Gratis adviesgesprek" }),
                  /* @__PURE__ */ jsx(ArrowRight, { size: 18, className: "relative z-10" }),
                  /* @__PURE__ */ jsx("div", { className: "btn-bg bg-[#F2F0E9]" })
                ]
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "flex justify-center gap-8 text-[#F2F0E9]/20 font-mono text-[10px] uppercase tracking-[0.4em]", children: /* @__PURE__ */ jsx("span", { children: "© 2026" }) })
          ] })
        ]
      }
    ) })
  ] });
};
const Footer = ({ data }) => {
  const { pathname } = useLocation();
  const description = (data == null ? void 0 : data.footerDescription) || "Websites, dashboards en automatiseringen voor ondernemers die vooruit willen.";
  const linkedinLink = (data == null ? void 0 : data.linkedin) || "https://www.linkedin.com/in/merlijn-van-der-vleuten-1b9118267/";
  return /* @__PURE__ */ jsxs("footer", { className: "bg-[#141414] text-[#F2F0E9] pt-12 md:pt-20 pb-12 px-6 md:px-8 relative overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-[1500px] mx-auto px-8 md:px-20 relative z-20", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-32 border-b border-white/5 pb-10 md:pb-16", children: [
        /* @__PURE__ */ jsxs("div", { className: "md:col-span-2 space-y-10 md:space-y-16", children: [
          /* @__PURE__ */ jsx(
            Link,
            {
              to: "/",
              onClick: (e) => {
                if (pathname === "/") {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              },
              children: /* @__PURE__ */ jsx("img", { src: "/logo_merlign.png", alt: "Merlign", className: "h-8 brightness-0 invert" })
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "space-y-8 text-left", children: /* @__PURE__ */ jsx("div", { className: "pt-4", children: /* @__PURE__ */ jsx("p", { className: "font-sans text-[#F2F0E9]/60 italic text-lg max-w-md leading-relaxed", children: description }) }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-8 md:space-y-12 pt-8 md:pt-0", children: [
          /* @__PURE__ */ jsx("h5", { className: "font-sans text-[12px] md:text-[14px] uppercase tracking-widest text-[#F2F0E9]/40 font-black italic", children: "Archief" }),
          /* @__PURE__ */ jsxs("ul", { className: "space-y-4 md:space-y-6 font-sans text-[14px] md:text-[15px] uppercase tracking-widest font-bold", children: [
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/over-mij", className: "text-[#F2F0E9]/60 hover:text-primary transition-colors", children: "Over mij" }) }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/cases", className: "text-[#F2F0E9]/60 hover:text-primary transition-colors", children: "Cases" }) }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/contact", className: "text-[#F2F0E9]/60 hover:text-primary transition-colors", children: "Contact" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-8 md:space-y-12 pt-8 md:pt-0", children: [
          /* @__PURE__ */ jsx("h5", { className: "font-sans text-[12px] md:text-[14px] uppercase tracking-widest text-[#F2F0E9]/40 font-black italic", children: "Sociaal" }),
          /* @__PURE__ */ jsx("ul", { className: "space-y-4 md:space-y-6 font-sans text-[14px] md:text-[15px] uppercase tracking-widest font-bold", children: /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: linkedinLink, target: "_blank", rel: "noopener noreferrer", className: "text-[#F2F0E9]/60 hover:text-primary transition-colors", children: "LinkedIn" }) }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row justify-between items-center gap-8 md:gap-12 pt-8 md:pt-10 border-t border-white/5", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row items-center gap-4 md:gap-8 font-mono text-[10px] md:text-[11px] uppercase tracking-[0.5em] font-black italic text-[#F2F0E9]/45", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsx("span", { children: "© 2026 MERLIJN VAN DER VLEUTEN" }),
            /* @__PURE__ */ jsx("span", { className: "opacity-40", children: "|" }),
            /* @__PURE__ */ jsx("span", { children: "KVK-NUMMER: 75629887" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsx("span", { className: "hidden md:inline opacity-40", children: "|" }),
            /* @__PURE__ */ jsx("span", { children: "Dennendreef 5-111, 5282 HK Boxtel" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-8 font-mono text-[10px] uppercase tracking-[0.4em] text-[#F2F0E9]/20", children: [
          /* @__PURE__ */ jsx(Link, { to: "/privacy", className: "hover:text-primary transition-colors italic", children: "Privacy" }),
          /* @__PURE__ */ jsx(Link, { to: "/terms", className: "hover:text-primary transition-colors italic", children: "Terms" })
        ] })
      ] })
    ] })
  ] });
};
const Layout = ({ children }) => {
  const { pathname, hash } = useLocation();
  const [contactInfo, setContactInfo] = useState(null);
  useEffect(() => {
    if (!hash) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant"
      });
    } else {
      const id = hash.substring(1);
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
    const fetchContact = async () => {
      try {
        const data = await getContactInfo();
        setContactInfo(data);
      } catch (err) {
        console.error("Footer Contact Error:", err);
      }
    };
    fetchContact();
  }, [pathname, hash]);
  return /* @__PURE__ */ jsxs("div", { className: "bg-[#0A0A0A] text-[#F2F0E9] selection:bg-primary selection:text-black min-h-screen", children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsx("main", { children }),
    /* @__PURE__ */ jsx(WhatsAppWidget, { phoneNumber: (contactInfo == null ? void 0 : contactInfo.whatsappPhone) || "31647693209" }),
    /* @__PURE__ */ jsx(Footer, { data: contactInfo })
  ] });
};
const fadeUp$7 = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
};
const SectionLabel = ({ children, className = "" }) => /* @__PURE__ */ jsx(
  motion.div,
  {
    variants: fadeUp$7,
    className: `flex items-center ${className}`,
    children: /* @__PURE__ */ jsx("span", { className: "font-mono text-[14px] md:text-[15px] uppercase tracking-[0.4em] text-[#F2F0E9]/60 font-bold italic", children })
  }
);
const ContactForm = ({ selectedUpgrade: initialUpgrade = null }) => {
  const [selectedUpgrade, setSelectedUpgrade] = useState(initialUpgrade || "website");
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", company: "", message: "" });
  const upgrades = [
    { id: "website", title: "Website die écht verkoopt", tag: "Klaar in 72u" },
    { id: "dashboard", title: "Overzicht in cijfers en winst", tag: "Dashboard" },
    { id: "automation", title: "Randzaken op autopilot", tag: "Automatisering" }
  ];
  const handleSubmit = async (e) => {
    var _a, _b, _c, _d;
    e.preventDefault();
    const trimmedEmail = (_a = formData.email) == null ? void 0 : _a.trim();
    const trimmedName = (_b = formData.name) == null ? void 0 : _b.trim();
    if (!selectedUpgrade || !trimmedEmail || isSending) return;
    setIsSending(true);
    const templateParams = {
      from_name: trimmedName,
      reply_to: trimmedEmail,
      to_email: trimmedEmail,
      // Added for auto-reply templates
      user_email: trimmedEmail,
      // Added for auto-reply templates
      email: trimmedEmail,
      // Added for auto-reply templates
      company: (_c = formData.company) == null ? void 0 : _c.trim(),
      message: formData.message,
      upgrade_choice: ((_d = upgrades.find((u) => u.id === selectedUpgrade)) == null ? void 0 : _d.title) || selectedUpgrade
    };
    try {
      await emailjs.send("service_qdlv6x6", "template_ibof6py", templateParams, "kWXpmJZNrXzXz9PHt");
      try {
        await emailjs.send("service_qdlv6x6", "template_z48xd8j", templateParams, "kWXpmJZNrXzXz9PHt");
      } catch (err) {
        console.warn("Auto-reply failed, but main email was sent:", err);
      }
      setIsSuccess(true);
    } catch (error) {
      console.error("EmailJS error:", error);
      const errorMsg = (error == null ? void 0 : error.text) || (error == null ? void 0 : error.message) || "Onbekende fout";
      alert(`Er ging iets mis bij het verzenden: ${errorMsg}. Controleer je gegevens en probeer het opnieuw.`);
    } finally {
      setIsSending(false);
    }
  };
  if (isSuccess) {
    return /* @__PURE__ */ jsxs("div", { className: "text-center space-y-12 py-20", children: [
      /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { scale: 0.5, opacity: 0 },
          animate: { scale: 1, opacity: 1 },
          className: "w-32 h-32 bg-primary/20 rounded-full flex items-center justify-center mx-auto border border-primary/50 shadow-[0_0_80px_rgba(79,70,229,0.4)]",
          children: /* @__PURE__ */ jsx(Check, { size: 64, className: "text-primary" })
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-4xl md:text-[68px] font-sans font-bold text-[#F2F0E9] leading-tight tracking-tighter", children: "Aanvraag ontvangen." }),
        /* @__PURE__ */ jsxs("p", { className: "font-sans text-[#F2F0E9]/85 text-2xl md:text-3xl font-light italic leading-tight max-w-2xl mx-auto", children: [
          "Ik neem binnen 24 uur contact met je op. ",
          /* @__PURE__ */ jsx("br", {}),
          " Tot snel."
        ] })
      ] }),
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => setIsSuccess(false),
          className: "btn-magnetic group bg-transparent text-[#F2F0E9]/30 px-10 py-5 rounded-full border border-white/10 mx-auto",
          children: [
            /* @__PURE__ */ jsx("span", { className: "relative z-10 text-[12px] font-bold italic tracking-widest uppercase", children: "Nog een aanvraag" }),
            /* @__PURE__ */ jsx("div", { className: "btn-bg bg-white/5" })
          ]
        }
      )
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-20 w-full text-left", children: [
    /* @__PURE__ */ jsx("div", { className: "lg:col-span-5 space-y-4 md:space-y-6", children: upgrades.map((u, i) => /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, x: -20 },
        whileInView: { opacity: 1, x: 0 },
        viewport: { once: true },
        transition: { delay: i * 0.1 },
        onClick: () => setSelectedUpgrade(u.id),
        className: `cursor-pointer p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border transition-all duration-700 group relative overflow-hidden flex items-center justify-between ${selectedUpgrade === u.id ? "bg-primary border-primary shadow-lg scale-[1.02]" : "bg-white/[0.02] border-white/5 hover:bg-white/[0.04]"}`,
        children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-1 md:space-y-2 relative z-10 pr-4", children: [
            /* @__PURE__ */ jsx("h4", { className: `text-lg md:text-2xl font-sans font-bold transition-all duration-500 ${selectedUpgrade === u.id ? "text-black translate-x-2" : "text-[#F2F0E9]"}`, children: u.title }),
            /* @__PURE__ */ jsx("span", { className: `font-mono text-[9px] md:text-[11px] uppercase tracking-[0.2em] font-bold ${selectedUpgrade === u.id ? "text-black/60" : "text-[#F2F0E9]/45"}`, children: u.tag })
          ] }),
          /* @__PURE__ */ jsx("div", { className: `w-8 h-8 md:w-10 md:h-10 rounded-full border flex items-center justify-center transition-all duration-700 shrink-0 ${selectedUpgrade === u.id ? "bg-white border-white scale-110 shadow-lg" : "border-white/10"}`, children: selectedUpgrade === u.id && /* @__PURE__ */ jsx(Check, { className: "w-4 h-4 md:w-5 md:h-5 text-primary" }) })
        ]
      },
      u.id
    )) }),
    /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0, x: 20 },
        whileInView: { opacity: 1, x: 0 },
        viewport: { once: true },
        className: "lg:col-span-7 bg-[#1A1A1A]/40 backdrop-blur-xl p-8 md:p-10 rounded-[1.5rem] md:rounded-[2rem] border border-white/5 relative shadow-sm",
        children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-8 md:space-y-10", children: [
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10", children: [
            { label: "Naam", placeholder: "Elon Musk", key: "name", type: "text" },
            { label: "E-mailadres", placeholder: "naam@bedrijf.nl", key: "email", type: "email" },
            { label: "Bedrijfsnaam", placeholder: "Tesla Inc.", key: "company", type: "text" }
          ].map((field, i) => /* @__PURE__ */ jsxs("div", { className: "space-y-2 md:space-y-3", children: [
            /* @__PURE__ */ jsx("label", { className: "font-mono text-[9px] md:text-[11px] uppercase tracking-[0.3em] text-[#F2F0E9]/45 block font-bold italic", children: field.label }),
            /* @__PURE__ */ jsx(
              "input",
              {
                required: field.key !== "company",
                type: field.type,
                placeholder: field.placeholder,
                className: "w-full bg-transparent border-b border-white/10 py-3 md:py-4 font-sans text-lg md:text-xl focus:outline-none focus:border-primary transition-all text-[#F2F0E9] placeholder:text-white/10",
                value: formData[field.key],
                onChange: (e) => setFormData({ ...formData, [field.key]: e.target.value })
              }
            )
          ] }, i)) }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2 md:space-y-3", children: [
            /* @__PURE__ */ jsx("label", { className: "font-mono text-[9px] md:text-[11px] uppercase tracking-[0.3em] text-[#F2F0E9]/45 block font-bold italic", children: "Bericht (optioneel)" }),
            /* @__PURE__ */ jsx(
              "textarea",
              {
                placeholder: "Laat weten wat er speelt...",
                className: "w-full bg-transparent border-b border-white/10 py-3 md:py-4 font-sans text-lg md:text-xl focus:outline-none focus:border-primary transition-all text-[#F2F0E9] placeholder:text-white/10 min-h-[100px] resize-none",
                value: formData.message,
                onChange: (e) => setFormData({ ...formData, message: e.target.value })
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "pt-6 md:pt-10", children: /* @__PURE__ */ jsxs(
            "button",
            {
              type: "submit",
              disabled: !selectedUpgrade || isSending,
              className: `btn-magnetic group w-full bg-primary text-black py-6 md:py-8 rounded-full shadow-xl shadow-primary/20 flex items-center justify-center gap-4 ${!selectedUpgrade || isSending ? "opacity-30 cursor-not-allowed" : ""}`,
              children: [
                /* @__PURE__ */ jsx("span", { className: "relative z-10 text-[12px] md:text-[14px] font-black italic tracking-[0.4em] uppercase", children: isSending ? "Verzenden..." : "Aanvraag versturen" }),
                !isSending && /* @__PURE__ */ jsx(ArrowRight, { size: 20, className: "relative z-10 group-hover:translate-x-3 transition-transform" }),
                /* @__PURE__ */ jsx("div", { className: "btn-bg bg-[#F2F0E9]" })
              ]
            }
          ) })
        ] })
      }
    )
  ] });
};
const SEO = ({ title, description, path = "", type = "website" }) => {
  const siteName = "Merlign";
  const fullTitle = `${title} | ${siteName} — Webdesign & AI-automatisering`;
  const url = `https://merlign.com${path}`;
  const ogImage = "https://merlign.com/og-image.png";
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://merlign.com"
      },
      ...path ? [{
        "@type": "ListItem",
        "position": 2,
        "name": title,
        "item": url
      }] : []
    ]
  };
  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Merlign",
    "image": "https://merlign.com/logo_merlign.png",
    "@id": "https://merlign.com",
    "url": "https://merlign.com",
    "telephone": "+31 6 47693209",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Dennendreef 5-111",
      "addressLocality": "Boxtel",
      "postalCode": "5282 HK",
      "addressRegion": "Noord-Brabant",
      "addressCountry": "NL"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 51.5974,
      "longitude": 5.2887
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    },
    "sameAs": [
      "https://www.linkedin.com/in/merlijn-van-der-vleuten-1b9118267/"
    ]
  };
  return /* @__PURE__ */ jsxs(Helmet, { children: [
    /* @__PURE__ */ jsx("title", { children: fullTitle }),
    /* @__PURE__ */ jsx("meta", { name: "description", content: description }),
    /* @__PURE__ */ jsx("link", { rel: "canonical", href: url }),
    /* @__PURE__ */ jsx("meta", { name: "robots", content: "index, follow" }),
    /* @__PURE__ */ jsx("meta", { name: "google-site-verification", content: "YOUR_VERIFICATION_CODE_HERE" }),
    /* @__PURE__ */ jsx("meta", { property: "og:type", content: type }),
    /* @__PURE__ */ jsx("meta", { property: "og:url", content: url }),
    /* @__PURE__ */ jsx("meta", { property: "og:site_name", content: siteName }),
    /* @__PURE__ */ jsx("meta", { property: "og:title", content: fullTitle }),
    /* @__PURE__ */ jsx("meta", { property: "og:description", content: description }),
    /* @__PURE__ */ jsx("meta", { property: "og:image", content: ogImage }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:card", content: "summary_large_image" }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:url", content: url }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:title", content: fullTitle }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:description", content: description }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:image", content: ogImage }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(breadcrumbSchema) }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(businessSchema) })
  ] });
};
gsap.registerPlugin(ScrollTrigger);
const fadeUp$6 = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
};
const staggerContainer$4 = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.15 } }
};
const Hero = ({ data }) => {
  const heroRef = useRef(null);
  const { scrollY } = useScroll();
  useTransform(scrollY, [0, 500], [0, 200]);
  const heroSans = (data == null ? void 0 : data.heroSans) || "Krijg meer gedaan met";
  const heroSerif = (data == null ? void 0 : data.heroSerif) || "je huidige team.";
  const heroSubtitle = (data == null ? void 0 : data.heroSubtitle) || "Ik bouw de systemen die het werk van je overnemen. Een website die zelf leads vangt, een dashboard voor direct overzicht, of slimme hulpjes voor je dagelijkse taken. Jij richt je op de groei, ik regel de techniek.";
  const heroCta = (data == null ? void 0 : data.heroCta) || "Gratis adviesgesprek";
  const heroLabel = (data == null ? void 0 : data.heroLabel) || "Senior Digitaal Strateeg · 10+ jaar Designer";
  const heroCtaAlt = (data == null ? void 0 : data.heroCtaAlt) || "Bekijk diensten";
  return /* @__PURE__ */ jsxs("section", { ref: heroRef, className: "relative h-[100dvh] flex items-center bg-[#0A0A0A] overflow-hidden", children: [
    /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 z-0 bg-[#0A0A0A]", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-[-20%] right-[-10%] w-[70vw] h-[70vw] bg-primary/10 rounded-full blur-[140px]" }),
      /* @__PURE__ */ jsx("div", { className: "absolute bottom-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-primary/5 rounded-full blur-[120px]" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 z-10 bg-gradient-to-tr from-primary/[0.04] via-transparent to-primary/[0.02]" }),
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 z-10 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-100" }),
    /* @__PURE__ */ jsx("div", { className: "relative z-20 w-full content-max-width section-px pt-24 md:pt-40", children: /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: "initial",
        animate: "whileInView",
        viewport: { once: true },
        variants: staggerContainer$4,
        className: "max-w-5xl space-y-12",
        children: [
          /* @__PURE__ */ jsx(
            motion.p,
            {
              variants: fadeUp$6,
              className: "font-mono text-[12px] md:text-[14px] uppercase tracking-[0.4em] text-primary font-bold italic",
              children: heroLabel
            }
          ),
          /* @__PURE__ */ jsxs(
            motion.h1,
            {
              variants: fadeUp$6,
              className: "font-sans font-bold text-[#F2F0E9] text-h1",
              children: [
                heroSans,
                " ",
                /* @__PURE__ */ jsx("span", { className: "text-primary font-drama font-normal text-h1-serif", children: heroSerif })
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            motion.div,
            {
              variants: fadeUp$6,
              className: "flex flex-col md:flex-row items-start md:items-center gap-12",
              children: /* @__PURE__ */ jsx("p", { className: "font-sans text-[#F2F0E9]/85 text-base md:text-xl font-light max-w-2xl leading-[1.7] italic", children: heroSubtitle })
            }
          ),
          /* @__PURE__ */ jsxs(
            motion.div,
            {
              variants: fadeUp$6,
              className: "flex flex-wrap items-center gap-4 md:gap-6 pt-2",
              children: [
                /* @__PURE__ */ jsxs("a", { href: "#contact", className: "btn-magnetic group bg-primary text-white border-transparent px-10 md:px-12 py-5 md:py-6 rounded-full shadow-[0_0_20px_rgba(201,168,76,0.3)] w-full sm:w-auto", children: [
                  /* @__PURE__ */ jsx("span", { className: "relative z-10 text-[12px] md:text-[14px] font-black italic tracking-[0.3em] uppercase", children: heroCta }),
                  /* @__PURE__ */ jsx("div", { className: "btn-bg bg-[#F2F0E9]" })
                ] }),
                /* @__PURE__ */ jsxs("a", { href: "#wat-ik-bouw", className: "btn-magnetic group bg-transparent border border-white/10 text-[#F2F0E9] px-10 md:px-12 py-5 md:py-6 rounded-full w-full sm:w-auto", children: [
                  /* @__PURE__ */ jsx("span", { className: "relative z-10 text-[12px] md:text-[14px] font-black italic tracking-[0.3em] uppercase", children: heroCtaAlt }),
                  /* @__PURE__ */ jsx("div", { className: "btn-bg bg-[#F2F0E9]" })
                ] })
              ]
            }
          )
        ]
      }
    ) })
  ] });
};
const HomeAbout = ({ data }) => {
  const headlineSans = (data == null ? void 0 : data.aboutHeadlineSans) || "Geen mooie praatjes.";
  const headlineSerif = (data == null ? void 0 : data.aboutHeadlineSerif) || "Gewoon resultaten.";
  const para1 = (data == null ? void 0 : data.aboutPara1) || "Ik ben al meer dan 10 jaar actief als designer. Dat is mijn edge. Ik begrijp hoe systemen eruit moeten zien voordat ik ze bouw: waardoor wat ik opleveer niet alleen werkt, maar er ook ziet alsof het zo hoort.";
  const para2 = (data == null ? void 0 : data.aboutPara2) || "Ik heb een allergie voor traagheid en onnodige complexiteit. Geen eindeloze meetings, geen vaag advies. Ik bouw geen websites, ik bouw tools die je werk uit handen nemen omdat ik stop met handmatige gepruts. Dit is geen tijdprobleem, dit is een systeemprobleem.";
  return /* @__PURE__ */ jsx("section", { id: "over-mij", className: "section-py relative overflow-hidden border-y border-white/5 bg-[#0A0A0A]", children: /* @__PURE__ */ jsxs("div", { className: "content-max-width section-px grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-32 items-center", children: [
    /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.95 },
        whileInView: { opacity: 1, scale: 1 },
        viewport: { once: true },
        className: "relative group lg:ml-0 order-first lg:order-none",
        children: /* @__PURE__ */ jsxs("div", { className: "aspect-[4/5] w-full max-w-[280px] md:max-w-[480px] mx-auto lg:mx-0 rounded-[2.5rem] overflow-visible bg-[#1A1A1A]/40 border border-white/5 relative shadow-2xl transition-all duration-700 group-hover:bg-[#1A1A1A]/60", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-8 rounded-[1.5rem] border border-primary/10 opacity-20 bg-[linear-gradient(to_right,#C9A84C_1px,transparent_1px),linear-gradient(to_bottom,#C9A84C_1px,transparent_1px)] bg-[size:20px_20px]" }),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-primary/20 blur-[100px] rounded-full scale-75 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" }),
          /* @__PURE__ */ jsx(
            motion.img,
            {
              src: "/merlijn-new.png",
              alt: "Merlijn",
              className: "absolute bottom-0 left-[48%] -translate-x-1/2 w-auto h-[95%] max-w-none z-10 filter brightness-95 group-hover:brightness-110 group-hover:scale-105 transition-all duration-1000 ease-out pointer-events-none origin-bottom"
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 rounded-[2.5rem] border border-white/5 pointer-events-none z-20" })
        ] })
      }
    ),
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: "initial",
        whileInView: "whileInView",
        viewport: { once: true },
        variants: staggerContainer$4,
        className: "space-y-10 md:space-y-16",
        children: [
          /* @__PURE__ */ jsx(SectionLabel, { children: "Wie ben ik?" }),
          /* @__PURE__ */ jsxs(
            motion.h2,
            {
              variants: fadeUp$6,
              className: "font-sans font-bold text-[#F2F0E9] text-h2",
              children: [
                headlineSans,
                " ",
                /* @__PURE__ */ jsx("span", { className: "text-primary font-drama font-normal text-h2-serif", children: headlineSerif })
              ]
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsx("p", { className: "font-sans text-[#F2F0E9]/85 text-base md:text-xl font-light italic leading-[1.8] max-w-2xl", children: para1 }),
            /* @__PURE__ */ jsx("p", { className: "font-sans text-[#F2F0E9]/85 text-base md:text-lg font-light leading-[1.8] max-w-2xl italic", children: para2 })
          ] }),
          /* @__PURE__ */ jsxs(
            Link,
            {
              to: "/over-mij",
              className: "inline-flex items-center gap-6 group text-[#F2F0E9]/60 hover:text-[#F2F0E9] transition-all uppercase tracking-[0.4em] font-mono font-black text-xs md:text-sm",
              children: [
                "Lees mijn verhaal",
                /* @__PURE__ */ jsx("div", { className: "w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-primary group-hover:bg-primary transition-all duration-500", children: /* @__PURE__ */ jsx(ArrowRight, { size: 18, className: "group-hover:translate-x-1 transition-transform group-hover:text-black" }) })
              ]
            }
          )
        ]
      }
    )
  ] }) });
};
const Services = ({ cmsServices, data }) => {
  const headlineSans = (data == null ? void 0 : data.servicesHeadlineSans) || "Kies waar we";
  const headlineSerif = (data == null ? void 0 : data.servicesHeadlineSerif) || "beginnen.";
  const subtitle = (data == null ? void 0 : data.servicesSubtitle) || "Drie manieren om je bedrijf weer op snelheid te krijgen. Zonder gedoe, direct resultaat.";
  const staticServices = [
    {
      icon: /* @__PURE__ */ jsx(Layout$1, {}),
      title: "Nieuwe website die écht verkoopt",
      subtitle: "Live in 72u",
      desc: "Je wacht al te lang op die nieuwe site. Ik bouw een strakke website die direct klanten voor je binnenhaalt. Geen maanden gedoe, volgende week ben je live.",
      cta: "Bekijk website aanpak",
      href: "/website"
    },
    {
      icon: /* @__PURE__ */ jsx(LineChart, {}),
      title: "Al je cijfers in één simpel overzicht",
      subtitle: "Stop met gokken",
      desc: "Van je bankrekening tot je advertenties: je ziet in één oogopslag waar je winst maakt en waar je geld verliest. Direct overzicht op je laptop of telefoon.",
      cta: "Hoe dit dashboard werkt",
      href: "/dashboard"
    },
    {
      icon: /* @__PURE__ */ jsx(Zap, {}),
      title: "Je randzaken op de autopilot",
      subtitle: "Krijg je tijd terug",
      desc: "Ik neem je saaie, herhalende werk over. Van het opvolgen van aanvragen tot je administratie. Ik bouw de slimme koppelingen, jij doet alleen nog wat je leuk vindt.",
      cta: "Ontdek de mogelijkheden",
      href: "/automatisering"
    }
  ];
  const services = staticServices.map((s, i) => {
    if (cmsServices && cmsServices[i]) {
      const typeMap = {
        "website": "/website",
        "dashboard": "/dashboard",
        "automation": "/automatisering",
        "contact": "#contact"
      };
      const mappedHref = cmsServices[i].serviceType ? typeMap[cmsServices[i].serviceType] : s.href;
      return {
        ...s,
        title: cmsServices[i].title || s.title,
        desc: cmsServices[i].description || s.desc,
        href: mappedHref
      };
    }
    return s;
  });
  return /* @__PURE__ */ jsxs("section", { id: "wat-ik-bouw", className: "py-32 bg-[#141414] relative overflow-hidden border-t border-white/5", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 pointer-events-none overflow-hidden", children: [...Array(6)].map((_, i) => /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0 },
        whileInView: { opacity: 0.1 },
        animate: {
          y: [0, Math.random() * 100 - 50, 0],
          rotate: [0, 90, 0]
        },
        transition: { duration: 10 + i * 2, repeat: Infinity, ease: "linear" },
        className: "absolute w-20 h-20 border border-primary/20 rounded-xl",
        style: {
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`
        }
      },
      i
    )) }),
    /* @__PURE__ */ jsxs("div", { className: "content-max-width section-px space-y-20 md:space-y-32 relative z-10", children: [
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: "initial",
          whileInView: "whileInView",
          viewport: { once: true },
          variants: staggerContainer$4,
          className: "flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10 md:gap-16",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-8 md:space-y-12", children: [
              /* @__PURE__ */ jsx(SectionLabel, { children: "Diensten" }),
              /* @__PURE__ */ jsxs(motion.h2, { variants: fadeUp$6, className: "font-sans font-bold leading-tight text-[#F2F0E9] tracking-tighter text-h2", children: [
                headlineSans,
                " ",
                /* @__PURE__ */ jsx("span", { className: "text-primary font-drama font-normal text-h2-serif", children: headlineSerif })
              ] })
            ] }),
            /* @__PURE__ */ jsx(motion.p, { variants: fadeUp$6, className: "font-sans text-[#F2F0E9]/85 max-w-md text-lg md:text-2xl pb-4 md:pb-6 italic leading-[1.8]", children: subtitle })
          ]
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12", children: services.map((s, i) => /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 40 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.8, delay: i * 0.15 },
          className: "group relative h-full",
          children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1A1A1A]/40 backdrop-blur-xl p-8 md:p-10 rounded-[2.5rem] border border-white/5 group-hover:border-primary/40 group-hover:bg-[#1A1A1A]/60 transition-all duration-700 flex flex-col h-full cursor-pointer shadow-sm hover:shadow-2xl overflow-hidden relative", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" }),
            /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 w-32 h-32 bg-primary/5 rounded-full blur-[60px] translate-y-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" }),
            /* @__PURE__ */ jsx("div", { className: "w-14 h-14 md:w-20 md:h-20 bg-primary/10 rounded-2xl flex items-center justify-center mb-10 md:mb-16 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-700 transform group-hover:scale-110 group-hover:rotate-3", children: React.cloneElement(s.icon, { size: 28, className: "group-hover:scale-110 transition-transform duration-500" }) }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-6 md:space-y-8 flex-grow relative z-10", children: [
              /* @__PURE__ */ jsx("p", { className: "font-mono text-xs md:text-[14px] text-primary uppercase tracking-[0.3em] font-bold", children: s.subtitle }),
              /* @__PURE__ */ jsx("h3", { className: "text-2xl md:text-4xl font-sans font-bold text-[#F2F0E9] leading-tight tracking-tight", children: s.title }),
              /* @__PURE__ */ jsx("p", { className: "font-sans text-[#F2F0E9]/85 font-light leading-[1.8] text-base md:text-xl pb-8 md:pb-12 italic", children: s.desc })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "pt-8 md:pt-12 border-t border-white/5 mt-auto", children: /* @__PURE__ */ jsxs(
              Link,
              {
                to: s.href,
                className: "btn-magnetic group w-full bg-transparent border border-white/10 text-[#F2F0E9]/50",
                children: [
                  /* @__PURE__ */ jsx("span", { className: "relative z-10", children: s.cta }),
                  /* @__PURE__ */ jsx(ArrowRight, { size: 14, className: "relative z-10 group-hover:translate-x-2 transition-transform" }),
                  /* @__PURE__ */ jsx("div", { className: "btn-bg bg-primary shadow-[0_0_20px_rgba(201,168,76,0.3)]" })
                ]
              }
            ) })
          ] })
        },
        i
      )) })
    ] })
  ] });
};
const ProcessAnimation = ({ id }) => {
  if (id === "01") {
    return /* @__PURE__ */ jsxs("div", { className: "w-full h-full flex items-center justify-center relative", children: [
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          animate: { rotate: 360 },
          transition: { duration: 10, repeat: Infinity, ease: "linear" },
          className: "w-40 h-40 border border-primary/20 rounded-full flex items-center justify-center",
          children: [
            /* @__PURE__ */ jsx(
              motion.div,
              {
                animate: { scale: [1, 1.2, 1] },
                transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                className: "w-20 h-20 border-2 border-primary/40 rounded-full"
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-1/2 -translate-x-1/2 w-1 h-20 bg-gradient-to-t from-primary/60 to-transparent origin-bottom" })
          ]
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent opacity-50" })
    ] });
  }
  if (id === "02") {
    return /* @__PURE__ */ jsxs("div", { className: "w-full h-full flex items-center justify-center relative", children: [
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-2 w-32 h-32", children: [...Array(9)].map((_, i) => /* @__PURE__ */ jsx(
        motion.div,
        {
          animate: {
            opacity: [0.2, 1, 0.2],
            scale: [0.8, 1, 0.8]
          },
          transition: {
            duration: 2.5,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut"
          },
          className: "bg-primary/30 rounded-sm"
        },
        i
      )) }),
      /* @__PURE__ */ jsx(
        motion.div,
        {
          animate: { x: [-100, 100, -100] },
          transition: { duration: 4, repeat: Infinity, ease: "linear" },
          className: "absolute h-[1px] w-48 bg-primary/40 blur-[2px]"
        }
      )
    ] });
  }
  if (id === "03") {
    return /* @__PURE__ */ jsxs("div", { className: "w-full h-full flex items-center justify-center relative", children: [
      /* @__PURE__ */ jsx(AnimatePresence, { children: [...Array(3)].map((_, i) => /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { scale: 0.5, opacity: 0.8 },
          animate: {
            scale: 2,
            opacity: 0
          },
          transition: {
            duration: 3,
            repeat: Infinity,
            delay: i * 1,
            ease: "easeOut"
          },
          className: "absolute w-20 h-20 border border-primary/40 rounded-full"
        },
        `wave-${i}`
      )) }),
      /* @__PURE__ */ jsx(
        motion.div,
        {
          animate: { scale: [1, 1.1, 1] },
          transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
          className: "w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center relative z-10",
          children: /* @__PURE__ */ jsx(Check, { size: 24, className: "text-primary" })
        }
      )
    ] });
  }
  return null;
};
const Process = ({ data }) => {
  var _a;
  const headlineSans = (data == null ? void 0 : data.processHeadlineSans) || "Drie fases.";
  const headlineSerif = (data == null ? void 0 : data.processHeadlineSerif) || "Geen verrassingen.";
  const staticSteps = [
    {
      id: "01",
      title: "De Intake",
      desc: "Eén gesprek van 45 minuten om de koers te bepalen. Ik graaf diep in je business en we trekken een streep in het zand."
    },
    {
      id: "02",
      title: "De Bouw-Sprint",
      desc: "Ik bouw je website, dashboard of automatisering in recordtempo. Alles in-house, zonder vertraging."
    },
    {
      id: "03",
      title: "De Overdracht",
      desc: "Je krijgt een systeem dat werkt, inclusief een simpele uitleg zodat je direct door kunt met real-time overzicht over je business."
    }
  ];
  const steps = ((_a = data == null ? void 0 : data.processSteps) == null ? void 0 : _a.length) > 0 ? data.processSteps.map((s, i) => {
    var _a2, _b, _c;
    return {
      id: s.stepNumber || ((_a2 = staticSteps[i]) == null ? void 0 : _a2.id),
      title: s.title || ((_b = staticSteps[i]) == null ? void 0 : _b.title),
      desc: s.description || ((_c = staticSteps[i]) == null ? void 0 : _c.desc)
    };
  }) : staticSteps;
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 1e-3
  });
  return /* @__PURE__ */ jsx("section", { ref: containerRef, id: "samenwerking", className: "section-py relative border-b border-white/5 overflow-hidden", children: /* @__PURE__ */ jsxs("div", { className: "content-max-width section-px", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-24 md:mb-40 space-y-12 text-center", children: [
      /* @__PURE__ */ jsx(SectionLabel, { className: "justify-center", children: "Het Traject" }),
      /* @__PURE__ */ jsxs("h2", { className: "font-sans font-bold text-[#F2F0E9] leading-tight tracking-tighter text-h2", children: [
        headlineSans,
        " ",
        /* @__PURE__ */ jsx("span", { className: "text-primary font-drama font-normal text-h2-serif", children: headlineSerif })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[1px] bg-white/5 -translate-x-1/2 hidden md:block" }),
      /* @__PURE__ */ jsx(
        motion.div,
        {
          style: { scaleY, originY: 0 },
          className: "absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[2px] bg-primary -translate-x-1/2 hidden md:block"
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "space-y-24 md:space-y-48", children: steps.map((step, i) => /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 40 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-100px" },
          transition: { duration: 0.8 },
          className: `relative flex flex-col md:flex-row items-center gap-12 md:gap-24 ${i % 2 !== 0 ? "md:flex-row-reverse" : ""}`,
          children: [
            /* @__PURE__ */ jsx("div", { className: "absolute left-[8px] md:left-1/2 top-0 w-6 h-6 md:w-8 md:h-8 rounded-full bg-primary flex items-center justify-center z-20 -translate-x-1/2 -mt-1 shadow-lg shadow-primary/20 sm:left-[20px] md:left-1/2", children: /* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full animate-pulse" }) }),
            /* @__PURE__ */ jsx("div", { className: "absolute left-[8px] md:hidden top-0 bottom-0 w-[1px] bg-white/10 -translate-x-1/2 z-10" }),
            /* @__PURE__ */ jsxs("div", { className: "w-full md:w-1/2 space-y-6 md:px-0 pl-10 md:pl-0", children: [
              /* @__PURE__ */ jsx("div", { className: "flex items-center gap-4", children: /* @__PURE__ */ jsx("span", { className: "font-mono text-primary text-[12px] font-black tracking-widest", children: step.id }) }),
              /* @__PURE__ */ jsx("h3", { className: "text-2xl sm:text-3xl md:text-5xl lg:text-[58px] font-sans font-bold text-[#F2F0E9] tracking-tighter leading-tight", children: step.title }),
              /* @__PURE__ */ jsx("p", { className: "text-[#F2F0E9]/85 text-base md:text-xl font-sans font-light leading-[1.8] italic max-w-lg", children: step.desc })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "hidden md:block w-1/2 h-[300px] relative pointer-events-none", children: /* @__PURE__ */ jsx(ProcessAnimation, { id: step.id }) })
          ]
        },
        i
      )) })
    ] })
  ] }) });
};
const FAQ$3 = () => {
  const staticQuestions = [
    {
      q: "Heb ik zelf technische kennis nodig?",
      a: "Totaal niet. Ik neem het volledige proces uit handen: van design en code tot de laatste API-koppeling. Jij krijgt een systeem dat simpel werkt, zodat jij je kunt focussen op je business terwijl de techniek op de achtergrond voor je draait."
    },
    {
      q: "Ik heb al een website, wat nu?",
      a: "Geen probleem. We kunnen je huidige site optimaliseren voor meer conversie, of we voegen specifiek de dashboards en automatiseringen toe aan je bestaande systeem. Ik bouw modulaire oplossingen die overal op aansluiten."
    },
    {
      q: "Hoeveel tijd kost een samenwerking mij?",
      a: "Minimaal. We starten met een check van 20 minuten. Daarna neem ik het zware werk over. Ik werk in korte sprints en jij geeft alleen feedback op de mijlpalen. Zo bouwen we high-end resultaat zonder dat het jouw agenda overneemt."
    },
    {
      q: "Moet ik alles (website, dashboard, automatisering) in één keer doen?",
      a: "Zeker niet. De meeste ondernemers beginnen met de grootste tijdvreter of het herstellen van hun 'digitale voordeur'. We pakken eerst het proces aan dat je nu de meeste winst of tijd oplevert. Opschalen kan altijd."
    }
  ];
  const [cmsQuestions, setCmsQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchCmsData = async () => {
      setLoading(true);
      try {
        const data = await getFaqs();
        if (data && data.length > 0) {
          const mappedFaqs = data.map((item) => ({
            q: item.question,
            a: item.answer
          }));
          setCmsQuestions(mappedFaqs);
        }
      } catch (err) {
        console.error("CMS Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCmsData();
  }, []);
  const allQuestions = cmsQuestions.length > 0 ? cmsQuestions : staticQuestions;
  const [openIndex, setOpenIndex] = useState(0);
  return /* @__PURE__ */ jsx("section", { id: "vragen", className: "section-py relative border-b border-white/5", children: /* @__PURE__ */ jsxs("div", { className: "content-max-width section-px grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20", children: [
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsx(SectionLabel, { children: "Vragen" }),
      /* @__PURE__ */ jsxs("h2", { className: "font-sans font-bold text-[#F2F0E9] leading-tight tracking-tighter text-h2", children: [
        "Alles wat je moet weten ",
        /* @__PURE__ */ jsx("span", { className: "text-primary font-drama font-normal text-h2-serif", children: "voordat we starten." })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "space-y-4", children: allQuestions.map((item, i) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: `rounded-[1.5rem] border transition-all duration-500 overflow-hidden ${openIndex === i ? "bg-[#1A1A1A]/80 border-primary/20 shadow-sm" : "bg-white/[0.01] border-white/5 hover:border-white/10"}`,
        children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => setOpenIndex(openIndex === i ? -1 : i),
              className: "w-full px-6 py-6 flex items-center justify-between text-left group",
              children: [
                /* @__PURE__ */ jsx("span", { className: `text-base md:text-lg font-sans font-bold transition-colors ${openIndex === i ? "text-primary" : "text-[#F2F0E9]/70"}`, children: item.q }),
                /* @__PURE__ */ jsx(ChevronDown, { size: 14, className: `transition-transform duration-500 ${openIndex === i ? "rotate-180 text-primary" : "text-[#F2F0E9]/20"}` })
              ]
            }
          ),
          /* @__PURE__ */ jsx(AnimatePresence, { children: openIndex === i && /* @__PURE__ */ jsx(
            motion.div,
            {
              initial: { height: 0, opacity: 0 },
              animate: { height: "auto", opacity: 1 },
              exit: { height: 0, opacity: 0 },
              transition: { duration: 0.4, ease: "circOut" },
              children: /* @__PURE__ */ jsx("div", { className: "px-6 pb-6 text-[#F2F0E9]/50 text-base font-sans font-light italic border-t border-white/5 pt-4 whitespace-pre-wrap", children: item.a })
            }
          ) })
        ]
      },
      i
    )) })
  ] }) });
};
const ContactSection = ({ data }) => {
  const headlineSans = (data == null ? void 0 : data.headlineSans) || "Welke upgrade gaan we als";
  const headlineSerif = (data == null ? void 0 : data.headlineSerif) || "eerste activeren?";
  const subtitle = (data == null ? void 0 : data.subtitle) || "Kies het onderdeel waar je nu de meeste winst laat liggen. Ik kijk in 20 minuten met je mee waar de kansen zitten.";
  return /* @__PURE__ */ jsxs("section", { id: "contact", className: "py-24 px-8 bg-[#0A0A0A] text-[#F2F0E9] relative overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-primary/5 rounded-full blur-[200px]" }),
    /* @__PURE__ */ jsxs("div", { className: "relative z-10 max-w-[1500px] mx-auto flex flex-col items-center", children: [
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: "initial",
          whileInView: "whileInView",
          viewport: { once: true },
          variants: staggerContainer$4,
          className: "text-left md:text-center space-y-10 md:space-y-16 mb-12 md:mb-20 w-full",
          children: [
            /* @__PURE__ */ jsx(SectionLabel, { className: "md:justify-center", children: "Plan Je Scan" }),
            /* @__PURE__ */ jsxs(motion.h2, { variants: fadeUp$6, className: "font-sans font-bold text-[#F2F0E9] leading-tight tracking-tighter text-h2", children: [
              headlineSans,
              " ",
              /* @__PURE__ */ jsx("span", { className: "text-primary font-drama font-normal text-h2-serif", children: headlineSerif })
            ] }),
            /* @__PURE__ */ jsx(motion.p, { variants: fadeUp$6, className: "font-sans text-[#F2F0E9]/85 text-base md:text-xl font-light leading-[1.8] italic max-w-3xl mx-auto border-b-2 border-white/5 pb-8 md:pb-10 text-center", children: subtitle })
          ]
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "w-full content-max-width section-px", children: /* @__PURE__ */ jsx(ContactForm, {}) })
    ] })
  ] });
};
const Home = () => {
  const [pageData, setPageData] = useState(null);
  const [contactInfo, setContactInfo] = useState(null);
  useEffect(() => {
    const fetchPageData = async () => {
      try {
        const [home, contact] = await Promise.all([
          getHomePageData(),
          getContactInfo()
        ]);
        setPageData(home);
        setContactInfo(contact);
      } catch (err) {
        console.error("Sanity Fetch Error:", err);
      }
    };
    fetchPageData();
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "bg-[#0A0A0A] min-h-screen", children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "Design & AI-automatisering voor mkb en zzpers",
        description: "Ik bouw websites die converteren, dashboards die inzicht geven en automatiseringen die tijd besparen. Geen gedoe, gewoon resultaat voor mkb en zzpers.",
        path: "/"
      }
    ),
    /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: !pageData ? /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.5 },
        className: "fixed inset-0 bg-[#0A0A0A] z-[100] flex items-center justify-center page-loader",
        children: /* @__PURE__ */ jsx(
          motion.div,
          {
            animate: { opacity: [0.3, 0.6, 0.3] },
            transition: { duration: 2, repeat: Infinity },
            className: "w-12 h-12 border border-primary/20 rounded-full"
          }
        )
      },
      "loader"
    ) : /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.8, ease: "easeOut" },
        children: [
          /* @__PURE__ */ jsx(Hero, { data: pageData }),
          /* @__PURE__ */ jsx(Services, { cmsServices: pageData == null ? void 0 : pageData.features, data: pageData }),
          /* @__PURE__ */ jsx(HomeAbout, { data: pageData }),
          /* @__PURE__ */ jsx(Process, { data: pageData }),
          /* @__PURE__ */ jsx(FAQ$3, {}),
          /* @__PURE__ */ jsx(ContactSection, { data: contactInfo })
        ]
      },
      "content"
    ) })
  ] });
};
const fadeUp$5 = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
};
const staggerContainer$3 = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.15 } }
};
const About = () => {
  var _a, _b, _c, _d, _e;
  const [data, setData] = React.useState(null);
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAboutPageData();
        setData(res);
      } catch (err) {
        console.error("About Fetch Error:", err);
      }
    };
    fetchData();
  }, []);
  const introSans = (data == null ? void 0 : data.introSans) || "Designer. Bouwer.";
  const introSerif = (data == null ? void 0 : data.introSerif) || "Jouw sparringspartner.";
  const bioText = ((_d = (_c = (_b = (_a = data == null ? void 0 : data.bio) == null ? void 0 : _a[0]) == null ? void 0 : _b.children) == null ? void 0 : _c[0]) == null ? void 0 : _d.text) || "Ik ben Merlijn. 10 jaar designer, nu ook bouwer van websites, dashboards en automatiseringen. Ik combineer wat andere freelancers niet combineren.";
  return /* @__PURE__ */ jsxs("div", { className: "bg-[#0A0A0A] min-h-screen", children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "Over Merlign | Senior design & tech specialist",
        description: "Designer, bouwer en jouw sparringspartner. Ik gebruik 10 jaar design-ervaring en de nieuwste AI-tools om ondernemers, zzpers en het mkb echt verder te helpen.",
        path: "/over-mij"
      }
    ),
    /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: !data ? /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.5 },
        className: "fixed inset-0 bg-[#0A0A0A] z-[200] flex items-center justify-center",
        children: /* @__PURE__ */ jsx(
          motion.div,
          {
            animate: { opacity: [0.3, 0.6, 0.3] },
            transition: { duration: 2, repeat: Infinity },
            className: "w-12 h-12 border border-primary/20 rounded-full"
          }
        )
      },
      "about-loader"
    ) : /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.8, ease: "easeOut" },
        className: "relative overflow-hidden",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 z-0 pointer-events-none opacity-40", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute top-[10%] left-[5%] w-[40vw] h-[40vw] bg-primary/10 rounded-full blur-[100px]" }),
            /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] left-[5%] w-[30vw] h-[30vw] bg-primary/5 rounded-full blur-[80px]" })
          ] }),
          /* @__PURE__ */ jsx("section", { className: "pt-40 md:pt-56 pb-20 md:pb-32 relative z-10", children: /* @__PURE__ */ jsx("div", { className: "content-max-width section-px", children: /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: "initial",
              whileInView: "whileInView",
              viewport: { once: true },
              className: "max-w-5xl space-y-8 md:space-y-12",
              children: [
                /* @__PURE__ */ jsx(SectionLabel, { children: "Over mij" }),
                /* @__PURE__ */ jsxs(
                  motion.h1,
                  {
                    variants: fadeUp$5,
                    className: "font-sans font-bold text-[#F2F0E9] text-h1 text-left",
                    children: [
                      introSans,
                      " ",
                      /* @__PURE__ */ jsx("span", { className: "text-primary font-drama font-normal text-h1-serif", children: introSerif })
                    ]
                  }
                ),
                /* @__PURE__ */ jsx(motion.p, { variants: fadeUp$5, className: "font-sans text-[#F2F0E9]/85 text-lg md:text-xl font-light italic leading-[1.8] max-w-2xl whitespace-pre-wrap", children: bioText }),
                /* @__PURE__ */ jsx(motion.div, { variants: fadeUp$5, className: "pt-12 md:pt-16", children: /* @__PURE__ */ jsxs("a", { href: "#contact", className: "btn-magnetic group inline-flex bg-primary text-white border-transparent px-10 md:px-12 py-5 md:py-6 rounded-full shadow-[0_0_20px_rgba(201,168,76,0.3)]", children: [
                  /* @__PURE__ */ jsx("span", { className: "relative z-10 text-[12px] md:text-[14px] font-black italic tracking-[0.3em] uppercase", children: "Vraag een gratis check aan" }),
                  /* @__PURE__ */ jsx("div", { className: "btn-bg bg-[#F2F0E9]" })
                ] }) })
              ]
            }
          ) }) }),
          /* @__PURE__ */ jsx("section", { className: "section-py relative overflow-hidden border-y border-white/5", children: /* @__PURE__ */ jsxs("div", { className: "content-max-width section-px grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-32 items-center", children: [
            /* @__PURE__ */ jsx(
              motion.div,
              {
                initial: { opacity: 0, scale: 0.95 },
                whileInView: { opacity: 1, scale: 1 },
                viewport: { once: true },
                className: "relative group lg:ml-0 order-first lg:order-none",
                children: /* @__PURE__ */ jsxs("div", { className: "aspect-[4/5] w-full max-w-[280px] md:max-w-[480px] mx-auto lg:mx-0 rounded-[2.5rem] overflow-visible bg-[#1A1A1A]/40 border border-white/5 relative shadow-2xl transition-all duration-700 group-hover:bg-[#1A1A1A]/60", children: [
                  /* @__PURE__ */ jsx("div", { className: "absolute inset-8 rounded-[1.5rem] border border-primary/10 opacity-20 bg-[linear-gradient(to_right,#C9A84C_1px,transparent_1px),linear-gradient(to_bottom,#C9A84C_1px,transparent_1px)] bg-[size:20px_20px]" }),
                  /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-primary/20 blur-[100px] rounded-full scale-75 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" }),
                  /* @__PURE__ */ jsx(
                    motion.img,
                    {
                      src: "/merlijn-new.png",
                      alt: "Merlijn van der Vleuten - Senior Design & Tech Specialist bij Merlign",
                      className: "absolute bottom-0 left-[48%] -translate-x-1/2 w-auto h-[95%] max-w-none z-10 filter brightness-95 group-hover:brightness-110 group-hover:scale-105 transition-all duration-1000 ease-out pointer-events-none origin-bottom"
                    }
                  ),
                  /* @__PURE__ */ jsx("div", { className: "absolute inset-0 rounded-[2.5rem] border border-white/5 pointer-events-none z-20" })
                ] })
              }
            ),
            /* @__PURE__ */ jsxs(
              motion.div,
              {
                initial: "initial",
                whileInView: "whileInView",
                viewport: { once: true },
                variants: staggerContainer$3,
                className: "space-y-10 md:space-y-16",
                children: [
                  /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
                    /* @__PURE__ */ jsx(SectionLabel, { children: "Wie ik ben" }),
                    /* @__PURE__ */ jsxs(
                      motion.h2,
                      {
                        variants: fadeUp$5,
                        className: "font-sans font-bold text-[#F2F0E9] text-h2",
                        children: [
                          (data == null ? void 0 : data.whoAmIHeadlineSans) || "De perfecte mix tussen",
                          " ",
                          /* @__PURE__ */ jsx("span", { className: "text-primary font-drama font-normal text-h2-serif", children: (data == null ? void 0 : data.whoAmIHeadlineSerif) || "vorm en functie." })
                        ]
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "space-y-8 font-sans text-[#F2F0E9]/85 text-lg md:text-2xl font-light italic leading-[1.8] whitespace-pre-wrap", children: (data == null ? void 0 : data.whoAmIParas) && data.whoAmIParas.length > 0 ? data.whoAmIParas.map((para, i) => /* @__PURE__ */ jsx("p", { children: para }, i)) : /* @__PURE__ */ jsxs(Fragment, { children: [
                    /* @__PURE__ */ jsx("p", { children: "Ik begon als grafisch designer en ben in AI gedoken omdat ik zag wat er mogelijk was. Nu combineer ik 10 jaar design-ervaring met moderne AI-tools om dingen te bouwen die er goed uitzien en goed werken." }),
                    /* @__PURE__ */ jsx("p", { children: "Het verschil met een bureau: ik ben snel, ik denk mee en je hebt altijd één aanspreekpunt. Het verschil met een goedkope freelancer: ik lever niet alleen wat je vraagt, maar ook wat je nodig hebt." }),
                    /* @__PURE__ */ jsx("p", { children: "Voor ondernemers van 1 tot 10 man ben ik de sparringspartner die ze anders niet hebben. Iemand die begrijpt hoe een goede uitstraling eruitziet én hoe systemen in elkaar moeten zitten." })
                  ] }) })
                ]
              }
            )
          ] }) }),
          /* @__PURE__ */ jsx("section", { className: "section-py border-t border-white/5", children: /* @__PURE__ */ jsxs("div", { className: "content-max-width section-px", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:items-center text-left md:text-center space-y-8 mb-16 md:mb-24", children: [
              /* @__PURE__ */ jsx(SectionLabel, { children: "Keuze" }),
              /* @__PURE__ */ jsxs("h2", { className: "font-sans font-bold text-[#F2F0E9] md:text-center text-h2", children: [
                (data == null ? void 0 : data.choiceHeadlineSans) || "Waarom ondernemers voor",
                " ",
                /* @__PURE__ */ jsx("span", { className: "text-primary font-drama font-normal text-h2-serif", children: (data == null ? void 0 : data.choiceHeadlineSerif) || "mij kiezen." })
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16", children: (((_e = data == null ? void 0 : data.choices) == null ? void 0 : _e.length) > 0 ? data.choices : [
              { title: "Niet alleen bouwen, ook meedenken", description: "Ik neem niet blind je briefing over. Als ik iets zie dat beter kan, zeg ik het. Dat is wat een sparringspartner doet." },
              { title: "Design en techniek in één", description: "Je hoeft niet te kiezen tussen iemand die het mooi maakt of iemand die het laat werken. Ik doe beide." },
              { title: "Snel en zonder gedoe", description: "Geen maanden wachten, geen eindeloze vergaderingen. Ik werk in korte sprints en lever op." },
              { title: "Eerlijk over wat het kost", description: "Geen vage offertes. Na de check weet je precies wat het wordt voor je akkoord gaat." }
            ]).map((item, i) => /* @__PURE__ */ jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 20 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true },
                transition: { delay: i * 0.1 },
                className: "p-10 rounded-[2.5rem] bg-[#1A1A1A]/40 border border-white/5 space-y-6 hover:bg-[#1A1A1A]/60 transition-all duration-700",
                children: [
                  /* @__PURE__ */ jsx("h3", { className: "text-xl md:text-3xl font-sans font-bold text-[#F2F0E9] tracking-tighter", children: item.title }),
                  /* @__PURE__ */ jsx("p", { className: "font-sans text-[#F2F0E9]/85 leading-[1.8] italic text-base md:text-lg whitespace-pre-wrap", children: item.description || item.desc })
                ]
              },
              i
            )) }),
            /* @__PURE__ */ jsx(motion.div, { variants: fadeUp$5, className: "pt-12 md:pt-20 text-center", children: /* @__PURE__ */ jsxs("a", { href: "#contact", className: "btn-magnetic group inline-flex bg-primary text-white border-transparent px-10 md:px-12 py-5 md:py-6 rounded-full shadow-[0_0_20px_rgba(201,168,76,0.3)]", children: [
              /* @__PURE__ */ jsx("span", { className: "relative z-10 text-[12px] md:text-[14px] font-black italic tracking-[0.3em] uppercase", children: "Vraag een gratis check aan" }),
              /* @__PURE__ */ jsx("div", { className: "btn-bg bg-[#F2F0E9]" })
            ] }) })
          ] }) }),
          /* @__PURE__ */ jsx("section", { id: "contact", className: "section-px pt-20 pb-32", children: /* @__PURE__ */ jsxs("div", { className: "content-max-width border-t border-white/5 pt-20 flex flex-col items-center text-center", children: [
            /* @__PURE__ */ jsx(SectionLabel, { className: "md:justify-center", children: "Samenwerken" }),
            /* @__PURE__ */ jsxs("h2", { className: "font-sans font-bold text-[#F2F0E9] mt-8 md:text-center text-h2", children: [
              (data == null ? void 0 : data.ctaHeadlineSans) || "Wil je",
              " ",
              /* @__PURE__ */ jsx("span", { className: "text-primary font-drama font-normal text-h2-serif", children: (data == null ? void 0 : data.ctaHeadlineSerif) || "samenwerken?" })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "font-sans text-[#F2F0E9]/40 text-lg md:text-2xl mt-8 mb-16 md:mb-24 italic max-w-2xl", children: (data == null ? void 0 : data.ctaSubtitle) || "Plan een gratis check. In 20 minuten weet je of we een match zijn." }),
            /* @__PURE__ */ jsx(ContactForm, {})
          ] }) })
        ]
      },
      "about-content"
    ) })
  ] });
};
const BrowserMockup = ({ image, title }) => {
  return /* @__PURE__ */ jsxs("div", { className: "relative w-full aspect-[16/10] group/mockup", children: [
    /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 bg-[#1A1A1A] rounded-[1.5rem] md:rounded-[2.5rem] border border-white/5 shadow-2xl overflow-hidden flex flex-col", children: [
      /* @__PURE__ */ jsxs("div", { className: "h-10 md:h-12 bg-white/[0.03] border-b border-white/5 flex items-center px-6 gap-2 shrink-0", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex gap-1.5", children: [
          /* @__PURE__ */ jsx("div", { className: "w-2.5 h-2.5 rounded-full bg-white/10" }),
          /* @__PURE__ */ jsx("div", { className: "w-2.5 h-2.5 rounded-full bg-white/10" }),
          /* @__PURE__ */ jsx("div", { className: "w-2.5 h-2.5 rounded-full bg-white/10" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mx-auto bg-white/5 rounded-md px-4 py-1 flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Globe, { size: 10, className: "text-white/20" }),
          /* @__PURE__ */ jsx("span", { className: "text-[10px] text-white/20 font-mono tracking-wider truncate max-w-[150px]", children: title || "merlign.com" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex-grow relative overflow-hidden bg-[#0A0A0A]", children: [
        image ? /* @__PURE__ */ jsx(
          "img",
          {
            src: image,
            alt: title,
            className: "w-full h-full object-cover"
          }
        ) : /* @__PURE__ */ jsx("div", { className: "w-full h-full flex items-center justify-center", children: /* @__PURE__ */ jsx("div", { className: "w-full h-full bg-gradient-to-br from-primary/5 to-transparent" }) }),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/40 to-transparent" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "absolute -inset-4 bg-primary/5 blur-3xl rounded-[3rem] -z-10 opacity-0 group-hover/mockup:opacity-100 transition-opacity duration-1000" })
  ] });
};
const DashboardMockup = ({ image, title }) => {
  return /* @__PURE__ */ jsxs("div", { className: "relative w-full aspect-[16/10] group/mockup", children: [
    /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 bg-[#141414] rounded-[1.5rem] md:rounded-[2.5rem] border border-white/5 shadow-2xl overflow-hidden flex", children: [
      /* @__PURE__ */ jsxs("div", { className: "w-12 md:w-16 bg-white/[0.02] border-r border-white/5 flex flex-col items-center py-6 gap-6 shrink-0", children: [
        /* @__PURE__ */ jsx("div", { className: "w-6 h-6 rounded-lg bg-primary/20 flex items-center justify-center text-primary", children: /* @__PURE__ */ jsx(Settings, { size: 14 }) }),
        [...Array(3)].map((_, i) => /* @__PURE__ */ jsx("div", { className: "w-6 h-1 rounded-full bg-white/5" }, i))
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex-grow flex flex-col pb-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "h-14 border-b border-white/5 flex items-center px-8 justify-between", children: [
          /* @__PURE__ */ jsx("div", { className: "w-24 h-2 bg-white/5 rounded-full" }),
          /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-full bg-white/5" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex-grow relative m-4 md:m-6 mt-4 rounded-xl md:rounded-2xl overflow-hidden border border-white/5 bg-[#0A0A0A]", children: [
          image ? /* @__PURE__ */ jsx(
            "img",
            {
              src: image,
              alt: title,
              className: "w-full h-full object-cover"
            }
          ) : /* @__PURE__ */ jsx("div", { className: "w-full h-full p-6", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4 h-full", children: [
            /* @__PURE__ */ jsx("div", { className: "bg-white/[0.02] rounded-xl border border-white/5" }),
            /* @__PURE__ */ jsx("div", { className: "bg-white/[0.02] rounded-xl border border-white/5" }),
            /* @__PURE__ */ jsx("div", { className: "col-span-2 bg-white/[0.02] rounded-xl border border-white/5" })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/40 to-transparent" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "absolute -inset-4 bg-primary/5 blur-3xl rounded-[3rem] -z-10 opacity-0 group-hover/mockup:opacity-100 transition-opacity duration-1000" })
  ] });
};
const AutomationMockup = ({ logos = [], title }) => {
  return /* @__PURE__ */ jsxs("div", { className: "relative w-full aspect-[16/10] group/mockup flex items-center justify-center p-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 bg-[#0A0A0A] rounded-[1.5rem] md:rounded-[2.5rem] border border-white/5 shadow-2xl overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 opacity-[0.03]", style: { backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "32px 32px" } }),
      /* @__PURE__ */ jsxs("div", { className: "relative h-full w-full flex items-center justify-around px-12 md:px-20", children: [
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            whileHover: { scale: 1.05 },
            className: "w-20 h-20 md:w-32 md:h-32 rounded-3xl bg-white/[0.02] border border-white/5 flex items-center justify-center relative z-10 group/node shadow-lg",
            children: [
              /* @__PURE__ */ jsx(Cpu, { className: "w-8 h-8 md:w-12 md:h-12 text-[#F2F0E9]/20 group-hover/node:text-primary transition-colors" }),
              /* @__PURE__ */ jsx("div", { className: "absolute -inset-4 bg-primary/5 blur-xl rounded-full opacity-0 group-hover/node:opacity-100 transition-opacity" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "flex-grow flex items-center justify-center relative px-4", children: [
          /* @__PURE__ */ jsx("div", { className: "h-[2px] w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent relative overflow-hidden", children: /* @__PURE__ */ jsx(
            motion.div,
            {
              animate: { x: ["100%", "-100%"] },
              transition: { duration: 2, repeat: Infinity, ease: "linear" },
              className: "absolute inset-0 bg-gradient-to-r from-transparent via-primary to-transparent"
            }
          ) }),
          /* @__PURE__ */ jsx("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0A0A0A] p-2 border border-white/5 rounded-full", children: /* @__PURE__ */ jsx(Zap, { size: 16, className: "text-primary animate-pulse" }) })
        ] }),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            whileHover: { scale: 1.05 },
            className: "w-20 h-20 md:w-32 md:h-32 rounded-3xl bg-primary/10 border border-primary/20 flex items-center justify-center relative z-10 group/node shadow-xl shadow-primary/5",
            children: [
              /* @__PURE__ */ jsx(Settings, { className: "w-8 h-8 md:w-12 md:h-12 text-primary brightness-125" }),
              /* @__PURE__ */ jsx("div", { className: "absolute -inset-4 bg-primary/20 blur-xl rounded-full opacity-0 group-hover/node:opacity-100 transition-opacity" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-white/5 backdrop-blur-md px-6 py-2 rounded-full border border-white/5", children: [
        /* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" }),
        /* @__PURE__ */ jsx("span", { className: "font-mono text-[10px] uppercase tracking-[0.2em] text-[#F2F0E9]/40 italic", children: "Process Optimized" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "absolute -inset-8 bg-primary/5 blur-[100px] rounded-full -z-10 opacity-30" })
  ] });
};
const fadeUp$4 = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
};
const Cases = () => {
  const [selectedFilter, setSelectedFilter] = useState("alle");
  const [cases, setCases] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  React.useEffect(() => {
    const fetchCases = async () => {
      try {
        setIsLoading(true);
        const data = await getCases();
        setCases(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Cases Fetch Error:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCases();
  }, []);
  const getIcon = (category) => {
    switch (category) {
      case "websites":
        return /* @__PURE__ */ jsx(Layout$1, { size: 24 });
      case "dashboards":
        return /* @__PURE__ */ jsx(Database, { size: 24 });
      case "automatiseringen":
        return /* @__PURE__ */ jsx(Zap, { size: 24 });
      default:
        return /* @__PURE__ */ jsx(Zap, { size: 24 });
    }
  };
  const filteredCases = (Array.isArray(cases) ? cases : []).filter((c) => {
    if (selectedFilter === "alle") return true;
    return (c == null ? void 0 : c.category) === selectedFilter;
  });
  const filterOptions = [
    { id: "alle", label: "Alle Cases" },
    { id: "websites", label: "Websites" },
    { id: "dashboards", label: "Dashboards" },
    { id: "automatiseringen", label: "Automatiseringen" }
  ];
  return /* @__PURE__ */ jsxs("div", { className: "bg-[#0A0A0A] min-h-screen", children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "Portfolio & success stories | Resultaten van Merlign",
        description: "Zie hoe ik andere ondernemers en bedrijven hielp met webdesign, dashboards en AI. Bekijk de meetbare resultaten van mijn samenwerkingen.",
        path: "/cases"
      }
    ),
    /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: isLoading ? /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.5 },
        className: "fixed inset-0 bg-[#0A0A0A] z-[200] flex items-center justify-center",
        children: /* @__PURE__ */ jsx(
          motion.div,
          {
            animate: { opacity: [0.3, 0.6, 0.3] },
            transition: { duration: 2, repeat: Infinity },
            className: "w-12 h-12 border border-primary/20 rounded-full"
          }
        )
      },
      "loader"
    ) : /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.8 },
        className: "pt-40 md:pt-56 pb-20 md:pb-32 relative overflow-hidden",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 z-0 pointer-events-none opacity-40", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute top-[10%] left-[-5%] w-[50vw] h-[50vw] bg-primary/10 rounded-full blur-[140px]" }),
            /* @__PURE__ */ jsx("div", { className: "absolute bottom-[20%] right-[-10%] w-[40vw] h-[40vw] bg-primary/5 rounded-full blur-[100px]" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "content-max-width section-px space-y-20 md:space-y-40 relative z-10", children: [
            /* @__PURE__ */ jsxs(
              motion.div,
              {
                initial: "initial",
                animate: "whileInView",
                className: "max-w-5xl space-y-8 md:space-y-12",
                children: [
                  /* @__PURE__ */ jsx(SectionLabel, { children: "Cases" }),
                  /* @__PURE__ */ jsxs(
                    motion.h1,
                    {
                      variants: fadeUp$4,
                      className: "font-sans font-bold text-[#F2F0E9] text-h1",
                      children: [
                        "Geen mooie praatjes. ",
                        /* @__PURE__ */ jsx("span", { className: "text-primary font-drama font-normal text-h1-serif", children: "Gewoon resultaten." })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsx(motion.p, { variants: fadeUp$4, className: "font-sans text-[#F2F0E9]/85 text-lg md:text-xl font-light italic leading-[1.8] max-w-2xl", children: "Wat ik heb gebouwd en welk meetbaar resultaat dat heeft opgeleverd." }),
                  /* @__PURE__ */ jsx(
                    motion.div,
                    {
                      variants: fadeUp$4,
                      className: "flex flex-wrap items-center gap-4 md:gap-8 pt-4",
                      children: /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2 md:gap-4 bg-[#F2F0E9]/5 p-2 rounded-[1.5rem] border border-white/5 backdrop-blur-xl", children: filterOptions.map((option) => {
                        const count = option.id === "alle" ? cases.length : cases.filter((c) => c.category === option.id).length;
                        return /* @__PURE__ */ jsxs(
                          "button",
                          {
                            onClick: () => setSelectedFilter(option.id),
                            className: `px-6 md:px-8 py-3 md:py-4 rounded-full font-mono text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-bold transition-all duration-500 relative overflow-hidden group ${selectedFilter === option.id ? "text-black" : "text-[#F2F0E9]/40 hover:text-[#F2F0E9]"}`,
                            children: [
                              /* @__PURE__ */ jsxs("span", { className: "relative z-10 flex items-center gap-2", children: [
                                option.label,
                                /* @__PURE__ */ jsxs("span", { className: `text-[8px] opacity-40 ${selectedFilter === option.id ? "text-black/60" : "text-primary"}`, children: [
                                  "(",
                                  count,
                                  ")"
                                ] })
                              ] }),
                              selectedFilter === option.id && /* @__PURE__ */ jsx(
                                motion.div,
                                {
                                  layoutId: "activeFilter",
                                  className: "absolute inset-0 bg-primary",
                                  transition: { type: "spring", bounce: 0.2, duration: 0.6 }
                                }
                              ),
                              /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-white/5 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" })
                            ]
                          },
                          option.id
                        );
                      }) })
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsx(
              motion.div,
              {
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                exit: { opacity: 0, y: -20 },
                transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                className: "space-y-32 md:space-y-64 min-h-[400px]",
                children: filteredCases.map((c, i) => {
                  var _a, _b, _c, _d, _e;
                  return /* @__PURE__ */ jsxs(
                    motion.div,
                    {
                      initial: { opacity: 0, y: 40 },
                      whileInView: { opacity: 1, y: 0 },
                      viewport: { once: true, margin: "-100px" },
                      className: "grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-32 items-start relative",
                      children: [
                        /* @__PURE__ */ jsx("div", { className: "hidden lg:block absolute -left-32 top-0 mt-2", children: /* @__PURE__ */ jsx("span", { className: "font-mono text-[100px] font-black text-white/[0.03] leading-none select-none", children: (i + 1).toString().padStart(2, "0") }) }),
                        /* @__PURE__ */ jsxs("div", { className: "lg:col-span-5 lg:sticky lg:top-48 space-y-10 md:space-y-16 lg:pb-20", children: [
                          /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
                            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
                              /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20", children: getIcon(c.category) }),
                              /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
                                /* @__PURE__ */ jsx("span", { className: "font-mono text-[10px] uppercase tracking-[0.4em] text-primary/40 font-bold italic leading-none mb-2", children: "Case Study" }),
                                /* @__PURE__ */ jsx("span", { className: "font-mono text-xs uppercase tracking-[0.2em] text-[#F2F0E9]/60 font-bold", children: c.tag })
                              ] })
                            ] }),
                            /* @__PURE__ */ jsx("h2", { className: "font-sans font-bold text-[#F2F0E9] text-h2 leading-tight", children: c.title })
                          ] }),
                          /* @__PURE__ */ jsxs("div", { className: "space-y-12", children: [
                            /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                                /* @__PURE__ */ jsx("div", { className: "w-1 h-1 rounded-full bg-primary" }),
                                /* @__PURE__ */ jsx("h4", { className: "font-mono text-[10px] uppercase tracking-[0.4em] text-[#F2F0E9]/40 font-black italic", children: "Situatie" })
                              ] }),
                              /* @__PURE__ */ jsx("p", { className: "font-sans text-[#F2F0E9]/85 text-lg md:text-xl font-light italic leading-[1.8] pl-4", children: c.situatie })
                            ] }),
                            /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                                /* @__PURE__ */ jsx("div", { className: "w-1 h-1 rounded-full bg-primary" }),
                                /* @__PURE__ */ jsx("h4", { className: "font-mono text-[10px] uppercase tracking-[0.4em] text-[#F2F0E9]/40 font-black italic", children: "Aanpak" })
                              ] }),
                              /* @__PURE__ */ jsx("p", { className: "font-sans text-[#F2F0E9]/85 text-lg md:text-xl font-light italic leading-[1.8] pl-4", children: c.aanpak })
                            ] })
                          ] }),
                          /* @__PURE__ */ jsxs("div", { className: "space-y-6 pt-8 border-t border-white/5", children: [
                            /* @__PURE__ */ jsx("h4", { className: "font-mono text-[10px] uppercase tracking-[0.4em] text-primary font-black italic", children: "Kernresultaten" }),
                            /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-4", children: (_a = c.results) == null ? void 0 : _a.map((r, ri) => /* @__PURE__ */ jsxs(
                              motion.div,
                              {
                                initial: { opacity: 0, x: -10 },
                                whileInView: { opacity: 1, x: 0 },
                                transition: { delay: ri * 0.1 },
                                className: "flex items-start gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 group/res shadow-sm hover:border-white/10 transition-colors",
                                children: [
                                  /* @__PURE__ */ jsx("div", { className: "w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5 group-hover/res:bg-primary/20 transition-colors", children: /* @__PURE__ */ jsx(Zap, { size: 12, className: "text-primary" }) }),
                                  /* @__PURE__ */ jsx("span", { className: "font-sans text-[#F2F0E9]/80 text-sm md:text-base font-medium italic", children: r })
                                ]
                              },
                              ri
                            )) })
                          ] })
                        ] }),
                        /* @__PURE__ */ jsxs("div", { className: "lg:col-span-7 space-y-12 md:space-y-20 pt-4 lg:pt-0", children: [
                          /* @__PURE__ */ jsxs("div", { className: "relative group/visual", children: [
                            /* @__PURE__ */ jsx("div", { className: "absolute -top-3 -right-3 z-20 bg-primary px-4 py-1.5 rounded-full shadow-2xl rotate-3", children: /* @__PURE__ */ jsx("span", { className: "font-mono text-[10px] font-black text-black uppercase tracking-widest", children: c.category }) }),
                            c.category === "websites" && /* @__PURE__ */ jsx(BrowserMockup, { image: (_b = urlFor(c.image)) == null ? void 0 : _b.url(), title: c.title }),
                            c.category === "dashboards" && /* @__PURE__ */ jsx(DashboardMockup, { image: (_c = urlFor(c.image)) == null ? void 0 : _c.url(), title: c.title }),
                            c.category === "automatiseringen" && /* @__PURE__ */ jsx(AutomationMockup, { title: c.title }),
                            /* @__PURE__ */ jsx("div", { className: "absolute -inset-4 bg-primary/5 blur-3xl rounded-[3rem] -z-10 opacity-0 group-hover/visual:opacity-100 transition-opacity duration-1000" })
                          ] }),
                          /* @__PURE__ */ jsxs(
                            motion.div,
                            {
                              initial: { opacity: 0, y: 10 },
                              whileInView: { opacity: 1, y: 0 },
                              viewport: { once: true },
                              className: "px-8 md:px-12 py-10 rounded-[2.5rem] bg-[#1A1A1A]/20 border border-white/5 text-[#F2F0E9] space-y-8 relative overflow-hidden group/quote transition-all duration-700 hover:bg-[#1A1A1A]/40 shadow-sm",
                              children: [
                                /* @__PURE__ */ jsx(MessageSquare, { className: "absolute top-8 right-8 w-12 h-12 text-primary/10 -rotate-12 group-hover/quote:rotate-0 transition-all duration-700" }),
                                /* @__PURE__ */ jsxs("p", { className: "text-lg md:text-2xl font-sans font-medium leading-[1.6] tracking-tight relative z-10 italic text-[#F2F0E9]/90", children: [
                                  '"',
                                  c.quote,
                                  '"'
                                ] }),
                                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 relative z-10 pt-6 border-t border-white/5", children: [
                                  c.authorImage ? /* @__PURE__ */ jsx(
                                    "img",
                                    {
                                      src: urlFor(c.authorImage).width(80).height(80).url(),
                                      alt: `Review van ${c.author} over Merlign`,
                                      className: "w-12 h-12 rounded-full object-cover border border-primary/20"
                                    }
                                  ) : /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-full border border-primary/20 bg-primary/5 flex items-center justify-center font-mono text-sm uppercase font-black italic text-primary group-hover/quote:bg-primary/10 transition-colors", children: ((_e = (_d = c.author) == null ? void 0 : _d.charAt) == null ? void 0 : _e.call(_d, 0)) || "M" }),
                                  /* @__PURE__ */ jsxs("div", { className: "space-y-0.5", children: [
                                    /* @__PURE__ */ jsx("p", { className: "font-mono text-[10px] uppercase tracking-[0.4em] font-black text-primary leading-none", children: c.author || "Merlign client" }),
                                    /* @__PURE__ */ jsx("p", { className: "font-mono text-[8px] uppercase tracking-[0.2em] text-[#F2F0E9]/20 font-bold", children: "Geverifieerde Review" })
                                  ] })
                                ] })
                              ]
                            }
                          )
                        ] })
                      ]
                    },
                    c._id || i
                  );
                })
              },
              selectedFilter
            ),
            /* @__PURE__ */ jsxs("div", { id: "contact", className: "py-20 md:py-32 border-t border-white/5 flex flex-col items-center text-center", children: [
              /* @__PURE__ */ jsx(SectionLabel, { className: "md:justify-center", children: "Volgende succes" }),
              /* @__PURE__ */ jsxs("h2", { className: "font-sans font-bold text-[#F2F0E9] mt-8 text-h2", children: [
                "Jouw bedrijf ",
                /* @__PURE__ */ jsx("span", { className: "text-primary font-drama font-normal text-h2-serif", children: "hier?" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "font-sans text-[#F2F0E9]/85 text-lg md:text-2xl mt-8 mb-16 md:mb-24 italic max-w-2xl", children: "Plan een gratis check. In 20 minuten weet je wat ik voor jou kan doen." }),
              /* @__PURE__ */ jsx(ContactForm, {})
            ] })
          ] })
        ]
      },
      "content"
    ) })
  ] });
};
const fadeUp$3 = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
};
const ContactPage = () => {
  const [data, setData] = React.useState(null);
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getContactInfo();
        setData(res);
      } catch (err) {
        console.error("Contact Page Fetch Error:", err);
      }
    };
    fetchData();
  }, []);
  const headlineSans = (data == null ? void 0 : data.headlineSans) || "Laat zien wat er speelt. ";
  const headlineSerif = (data == null ? void 0 : data.headlineSerif) || "Ik kijk mee.";
  const subtitle = (data == null ? void 0 : data.subtitle) || "In 20 minuten kijk ik met je mee naar je situatie. Je krijgt direct eerlijke feedback over wat het oplevert als je het aanpakt.";
  const contactEmail = (data == null ? void 0 : data.email) || "contact@merlign.com";
  const linkedinLink = (data == null ? void 0 : data.linkedin) || "https://www.linkedin.com/in/merlijn-van-der-vleuten-1b9118267/";
  return /* @__PURE__ */ jsxs("div", { className: "bg-[#0A0A0A] min-h-screen", children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "Gratis adviesgesprek | Plan je digital scan",
        description: "Zullen we even bellen? Plan een gratis scan van 20 minuten met mij in. Direct weten wat er beter kan op je website of in je bedrijfsprocessen.",
        path: "/contact"
      }
    ),
    /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: !data ? /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.5 },
        className: "fixed inset-0 bg-[#0A0A0A] z-[200] flex items-center justify-center",
        children: /* @__PURE__ */ jsx(
          motion.div,
          {
            animate: { opacity: [0.3, 0.6, 0.3] },
            transition: { duration: 2, repeat: Infinity },
            className: "w-12 h-12 border border-primary/20 rounded-full"
          }
        )
      },
      "loader"
    ) : /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.8 },
        className: "pt-40 md:pt-56 pb-20 md:pb-32 relative overflow-hidden",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 z-0 pointer-events-none opacity-40", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute top-[10%] left-[-5%] w-[50vw] h-[50vw] bg-primary/10 rounded-full blur-[140px]" }),
            /* @__PURE__ */ jsx("div", { className: "absolute bottom-[20%] right-[-10%] w-[40vw] h-[40vw] bg-primary/5 rounded-full blur-[100px]" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "content-max-width section-px space-y-20 md:space-y-40 relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "space-y-24 md:space-y-40 text-center", children: [
            /* @__PURE__ */ jsxs(
              motion.div,
              {
                initial: "initial",
                whileInView: "whileInView",
                viewport: { once: true },
                className: "max-w-5xl mx-auto space-y-8 md:space-y-12 mb-4 md:mb-12 flex flex-col items-center",
                children: [
                  /* @__PURE__ */ jsx(SectionLabel, { children: "Contact" }),
                  /* @__PURE__ */ jsxs(
                    motion.h1,
                    {
                      variants: fadeUp$3,
                      className: "font-sans font-bold text-[#F2F0E9] md:text-center text-h1",
                      children: [
                        headlineSans,
                        " ",
                        /* @__PURE__ */ jsx("span", { className: "text-primary font-drama font-normal text-h1-serif", children: headlineSerif })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsx(motion.p, { variants: fadeUp$3, className: "font-sans text-[#F2F0E9]/80 text-lg md:text-xl font-light italic leading-relaxed max-w-2xl text-center", children: subtitle })
                ]
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "pt-12 md:pt-24 border-t border-white/5", children: /* @__PURE__ */ jsx(ContactForm, {}) }),
            /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12", children: [
              { icon: /* @__PURE__ */ jsx(Mail, { className: "w-6 h-6 md:w-8 md:h-8" }), label: "E-mail", value: contactEmail, href: `mailto:${contactEmail}` },
              { icon: /* @__PURE__ */ jsx(Linkedin, { className: "w-6 h-6 md:w-8 md:h-8" }), label: "LinkedIn", value: "Merlijn van der Vleuten", href: linkedinLink }
            ].map((item, i) => /* @__PURE__ */ jsx(
              motion.a,
              {
                href: item.href,
                initial: { opacity: 0, y: 30 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true },
                transition: { delay: i * 0.1 },
                className: "flex items-center justify-between p-8 md:p-12 rounded-[2.5rem] bg-[#1A1A1A]/20 backdrop-blur-xl border border-white/5 group hover:bg-[#1A1A1A]/40 hover:border-primary/20 transition-all duration-700",
                children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-6", children: [
                  /* @__PURE__ */ jsx("div", { className: "w-12 h-12 md:w-16 md:h-16 rounded-full bg-primary/10 border border-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-700", children: item.icon }),
                  /* @__PURE__ */ jsxs("div", { className: "text-left space-y-1", children: [
                    /* @__PURE__ */ jsx("span", { className: "font-mono text-[10px] md:text-[12px] uppercase tracking-[0.4em] text-[#F2F0E9]/20 font-bold italic block", children: item.label }),
                    /* @__PURE__ */ jsx("span", { className: "text-lg md:text-2xl font-sans font-bold text-[#F2F0E9]/70 group-hover:text-primary transition-colors duration-500 tracking-tighter", children: item.value })
                  ] })
                ] })
              },
              i
            )) })
          ] }) })
        ]
      },
      "content"
    ) })
  ] });
};
const fadeUp$2 = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
};
const staggerContainer$2 = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.15 } }
};
const WebsiteService = () => {
  var _a, _b;
  const [data, setData] = React.useState(null);
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getServicePageData("Website");
        setData(res);
      } catch (err) {
        console.error("Website Service Fetch Error:", err);
      }
    };
    fetchData();
  }, []);
  const heroSans = (data == null ? void 0 : data.heroSans) || "Een website die voor je werkt";
  const heroSerif = (data == null ? void 0 : data.heroSerif) || "terwijl jij onderneemt.";
  const heroSubtitle = (data == null ? void 0 : data.heroSubtitle) || "Niet alleen mooi. Gebouwd om bezoekers te overtuigen en te laten converteren. Klaar in 72 uur.";
  const staticFeatures = [
    { title: "Strategie voor design", desc: "Elke sectie heeft een doel. Elke zin doet werk. Ik bouw op basis van 10 jaar design-ervaring gecombineerd met funnel-denken." },
    { title: "Live in 72 uur", desc: "Geen weken wachten. Na de check ga ik aan de slag en lever ik op. Jij geeft feedback, ik pas aan, klaar." },
    { title: "SEO ingebakken", desc: "Snelle laadtijd, schone structuur, juiste titels en beschrijvingen. Je website wordt gevonden zonder dat je er extra voor hoeft te betalen." },
    { title: "Zorgeloos onderhoud", desc: "Je website blijft veilig, snel en up-to-date. Ik zorg voor de techniek op de achtergrond, zodat jij er geen omkijken naar hebt." },
    { title: "Makkelijk te beheren", desc: "Wil je toch zelf iets aanpassen? Dat kan. Ik lever met een korte uitleg zodat je zelfstandig kleine wijzigingen kunt doen." }
  ];
  const features = ((_a = data == null ? void 0 : data.features) == null ? void 0 : _a.length) > 0 ? data.features.map((f, i) => {
    var _a2, _b2;
    return {
      title: f.title || ((_a2 = staticFeatures[i]) == null ? void 0 : _a2.title),
      desc: f.description || ((_b2 = staticFeatures[i]) == null ? void 0 : _b2.desc)
    };
  }) : staticFeatures;
  const staticProcess = [
    { step: "01", title: "Gratis check", desc: "20 minuten. Ik kijk naar je huidige situatie, wat je wil bereiken en wat daarvoor nodig is. Geen verkooppraatje.", icon: /* @__PURE__ */ jsx(Search, { size: 24 }) },
    { step: "02", title: "Bouwsprint", desc: "Ik bouw de website. Design, copy-structuur, SEO, snelheid, alles in één sprint. Jij geeft feedback als ik iets laat zien.", icon: /* @__PURE__ */ jsx(Zap, { size: 24 }) },
    { step: "03", title: "Live en klaar", desc: "Je site staat live. Korte overdracht, je bent zelfstandig, en je weet dat ik op de achtergrond het onderhoud blijf doen als je dat wenst.", icon: /* @__PURE__ */ jsx(Check, { size: 24 }) }
  ];
  const processItems = ((_b = data == null ? void 0 : data.processSteps) == null ? void 0 : _b.length) > 0 ? data.processSteps.map((p, i) => {
    var _a2, _b2, _c;
    return {
      ...staticProcess[i],
      step: p.stepNumber || ((_a2 = staticProcess[i]) == null ? void 0 : _a2.step),
      title: p.title || ((_b2 = staticProcess[i]) == null ? void 0 : _b2.title),
      desc: p.description || ((_c = staticProcess[i]) == null ? void 0 : _c.desc)
    };
  }) : staticProcess;
  return /* @__PURE__ */ jsxs("div", { className: "bg-[#0A0A0A] min-h-screen", children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "Maatwerk website laten maken",
        description: "Een website die écht voor je werkt. Ik bouw high-end sites die razendsnel zijn en meer leads opleveren. Meestal al binnen 72 uur online.",
        path: "/website"
      }
    ),
    /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: !data ? /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.5 },
        className: "fixed inset-0 bg-[#0A0A0A] z-[100] flex items-center justify-center page-loader",
        children: /* @__PURE__ */ jsx(
          motion.div,
          {
            animate: { opacity: [0.3, 0.6, 0.3] },
            transition: { duration: 2, repeat: Infinity },
            className: "w-12 h-12 border border-primary/20 rounded-full"
          }
        )
      },
      "loader"
    ) : /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 1 },
        children: /* @__PURE__ */ jsxs("div", { className: "pt-40 md:pt-56 pb-20 md:pb-32 relative overflow-hidden", children: [
          /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 z-0 pointer-events-none opacity-40", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute top-[10%] left-[-5%] w-[50vw] h-[50vw] bg-primary/10 rounded-full blur-[140px]" }),
            /* @__PURE__ */ jsx("div", { className: "absolute bottom-[20%] right-[-10%] w-[40vw] h-[40vw] bg-primary/5 rounded-full blur-[100px]" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "content-max-width section-px space-y-20 md:space-y-40 relative z-10", children: [
            /* @__PURE__ */ jsxs(
              motion.div,
              {
                initial: "initial",
                whileInView: "whileInView",
                viewport: { once: true },
                className: "max-w-5xl space-y-8 md:space-y-12 pt-12",
                children: [
                  /* @__PURE__ */ jsx(SectionLabel, { children: "Website" }),
                  /* @__PURE__ */ jsxs(
                    motion.h1,
                    {
                      variants: fadeUp$2,
                      className: "font-sans font-bold text-[#F2F0E9] text-h1",
                      children: [
                        heroSans,
                        " ",
                        /* @__PURE__ */ jsx("span", { className: "text-primary font-drama font-normal text-h1-serif", children: heroSerif })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsx(motion.p, { variants: fadeUp$2, className: "font-sans text-[#F2F0E9]/85 text-base md:text-xl font-light italic leading-[1.8] max-w-2xl", children: heroSubtitle }),
                  /* @__PURE__ */ jsx(motion.div, { variants: fadeUp$2, className: "pt-4 text-left", children: /* @__PURE__ */ jsxs("a", { href: "#contact", className: "btn-magnetic group inline-flex bg-primary text-white border-transparent px-10 md:px-12 py-5 md:py-6 rounded-full shadow-[0_0_20px_rgba(201,168,76,0.3)]", children: [
                    /* @__PURE__ */ jsx("span", { className: "relative z-10 text-[12px] md:text-[14px] font-black italic tracking-[0.3em] uppercase", children: "Vraag een gratis check aan" }),
                    /* @__PURE__ */ jsx("div", { className: "btn-bg bg-[#F2F0E9]" })
                  ] }) })
                ]
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-32 items-center", children: [
              /* @__PURE__ */ jsxs("div", { className: "space-y-10 md:space-y-16 order-2 lg:order-1", children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-6 md:space-y-10", children: [
                  /* @__PURE__ */ jsxs("h2", { className: "font-sans font-bold text-[#F2F0E9] text-h2", children: [
                    (data == null ? void 0 : data.whyHeadlineSans) || "Je website is je",
                    " ",
                    /* @__PURE__ */ jsx("span", { className: "text-primary font-drama font-normal text-h2-serif", children: (data == null ? void 0 : data.whyHeadlineSerif) || "digitale voordeur." })
                  ] }),
                  /* @__PURE__ */ jsx("p", { className: "font-sans text-[#F2F0E9]/85 text-base md:text-2xl font-light italic leading-[1.8]", children: (data == null ? void 0 : data.whySubtitle) || "Een goede website is meer dan een online visitekaartje. Het is een machine die vertrouwen bouwt en 24/7 nieuwe leads voor je binnenhaalt." })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12", children: features.map((item, i) => /* @__PURE__ */ jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0, y: 20 },
                    whileInView: { opacity: 1, y: 0 },
                    viewport: { once: true },
                    transition: { delay: i * 0.1 },
                    className: "space-y-4",
                    children: [
                      /* @__PURE__ */ jsx("h4", { className: "text-lg md:text-xl font-sans font-bold text-[#F2F0E9] tracking-tighter", children: item.title }),
                      /* @__PURE__ */ jsx("p", { className: "font-sans text-[#F2F0E9]/85 leading-[1.8] italic text-sm md:text-base whitespace-pre-wrap", children: item.desc })
                    ]
                  },
                  i
                )) })
              ] }),
              /* @__PURE__ */ jsxs(
                motion.div,
                {
                  initial: { opacity: 0, scale: 0.9 },
                  whileInView: { opacity: 1, scale: 1 },
                  viewport: { once: true },
                  className: "aspect-square bg-[#1A1A1A]/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] md:rounded-[4rem] relative overflow-hidden flex items-center justify-center p-8 md:p-16 shadow-sm hover:shadow-2xl transition-all duration-1000 order-1 lg:order-2",
                  children: [
                    /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-80 h-80 bg-primary/20 rounded-full blur-[140px] translate-x-1/2 -translate-y-1/2 opacity-30" }),
                    /* @__PURE__ */ jsxs("div", { className: "w-full h-full border border-white/5 rounded-[2rem] md:rounded-[3rem] bg-[#1A1A1A]/60 backdrop-blur-3xl shadow-2xl flex flex-col p-8 md:p-12 space-y-8 md:space-y-12 relative group hover:border-primary/20 transition-all duration-1000", children: [
                      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                        /* @__PURE__ */ jsx("div", { className: "w-3 h-3 rounded-full bg-red-400/30" }),
                        /* @__PURE__ */ jsx("div", { className: "w-3 h-3 rounded-full bg-amber-400/30" }),
                        /* @__PURE__ */ jsx("div", { className: "w-3 h-3 rounded-full bg-emerald-400/30" })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-8 flex-grow", children: [
                        /* @__PURE__ */ jsx("div", { className: "bg-white/5 rounded-[1.5rem] flex items-center justify-center overflow-hidden border border-white/5", children: /* @__PURE__ */ jsx(Layout$1, { size: 48, className: "text-[#F2F0E9]/10 group-hover:text-primary transition-all duration-1000 md:scale-125" }) }),
                        /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
                          /* @__PURE__ */ jsx("div", { className: "h-4 md:h-6 w-full bg-white/5 rounded-full" }),
                          /* @__PURE__ */ jsx("div", { className: "h-4 md:h-6 w-2/3 bg-white/5 rounded-full" }),
                          /* @__PURE__ */ jsx("div", { className: "h-3 md:h-4 w-full bg-white/5 rounded-full mt-6" }),
                          /* @__PURE__ */ jsx("div", { className: "h-3 md:h-4 w-5/6 bg-white/5 rounded-full" }),
                          /* @__PURE__ */ jsx("div", { className: "h-3 md:h-4 w-4/6 bg-white/5 rounded-full" })
                        ] })
                      ] }),
                      /* @__PURE__ */ jsx("div", { className: "h-12 md:h-16 w-full bg-primary/10 rounded-full border border-primary/10 flex items-center px-8", children: /* @__PURE__ */ jsx("div", { className: "w-1/3 h-2 bg-primary/30 rounded-full" }) })
                    ] }),
                    /* @__PURE__ */ jsx(
                      motion.div,
                      {
                        animate: {
                          scale: [1, 1.1, 1],
                          y: [-5, 5, -5]
                        },
                        transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                        className: "absolute bottom-16 right-16 md:bottom-24 md:right-24 w-16 h-16 md:w-20 md:h-20 bg-primary rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(79,70,229,0.5)] group hover:scale-110 transition-transform duration-700",
                        children: /* @__PURE__ */ jsx(MousePointerClick, { size: 24, className: "text-black md:scale-125" })
                      }
                    )
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-16 md:space-y-24", children: [
              /* @__PURE__ */ jsxs("div", { className: "text-center space-y-8", children: [
                /* @__PURE__ */ jsx(SectionLabel, { className: "justify-center", children: "Hoe het werkt" }),
                /* @__PURE__ */ jsxs("h2", { className: "font-sans font-bold text-[#F2F0E9] text-h2", children: [
                  "Zo werkt ",
                  /* @__PURE__ */ jsx("span", { className: "text-primary font-drama font-normal text-h2-serif", children: "het." })
                ] })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12", children: processItems.map((item, i) => /* @__PURE__ */ jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 30 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  transition: { delay: i * 0.1 },
                  className: "p-10 rounded-[2.5rem] bg-[#1A1A1A]/40 border border-white/5 space-y-8 group hover:bg-[#1A1A1A]/60 transition-all duration-700",
                  children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start", children: [
                      /* @__PURE__ */ jsx("div", { className: "w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-700 transform group-hover:scale-110 group-hover:rotate-3", children: React.cloneElement(item.icon, { className: "group-hover:scale-110 transition-transform duration-500" }) }),
                      /* @__PURE__ */ jsx("span", { className: "font-mono text-4xl font-black text-white/5 group-hover:text-primary/10 transition-colors uppercase italic", children: item.step })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                      /* @__PURE__ */ jsx("h3", { className: "text-xl md:text-2xl font-sans font-bold text-[#F2F0E9] tracking-tighter", children: item.title }),
                      /* @__PURE__ */ jsx("p", { className: "font-sans text-[#F2F0E9]/85 leading-[1.8] italic", children: item.desc })
                    ] })
                  ]
                },
                i
              )) })
            ] }),
            /* @__PURE__ */ jsx(FAQ$2, { cmsFaqs: data == null ? void 0 : data.faqs }),
            /* @__PURE__ */ jsxs("div", { id: "contact", className: "py-20 md:py-32 border-t border-white/5 flex flex-col items-center", children: [
              /* @__PURE__ */ jsxs(
                motion.div,
                {
                  initial: "initial",
                  whileInView: "whileInView",
                  viewport: { once: true },
                  variants: staggerContainer$2,
                  className: "text-left md:text-center space-y-10 md:space-y-16 mb-16 md:mb-24 w-full",
                  children: [
                    /* @__PURE__ */ jsx("a", { href: "#contact", className: "group flex flex-col items-center", children: /* @__PURE__ */ jsxs("h2", { className: "font-sans font-bold text-[#F2F0E9] md:text-center text-h2", children: [
                      (data == null ? void 0 : data.ctaHeadlineSans) || "Klaar om te",
                      " ",
                      /* @__PURE__ */ jsx("span", { className: "text-primary font-drama font-normal text-h2-serif", children: (data == null ? void 0 : data.ctaHeadlineSerif) || "beginnen?" })
                    ] }) }),
                    /* @__PURE__ */ jsx(motion.p, { variants: fadeUp$2, className: "font-sans text-[#F2F0E9]/85 text-base md:text-xl font-light leading-[1.8] italic max-w-3xl mx-auto border-b-2 border-white/5 pb-10 md:pb-12 text-center", children: (data == null ? void 0 : data.ctaSubtitle) || "Vraag een gratis check aan. In 20 minuten weet je wat het oplevert." })
                  ]
                }
              ),
              /* @__PURE__ */ jsx(ContactForm, { selectedUpgrade: "website" })
            ] })
          ] })
        ] })
      },
      "content"
    ) })
  ] });
};
const FAQ$2 = ({ cmsFaqs }) => {
  const staticQuestions = [
    {
      q: "Waarom kies je voor een framework als React/Vite in plaats van WordPress?",
      a: "Veel bureaus gebruiken WordPress omdat het makkelijk is voor henzelf, maar het is vaak zwaar en traag voor de bezoeker. Ik bouw je website met moderne technieken (React en Vite) die zorgen voor een 'app-achtige' ervaring. Pagina's laden direct, zonder die vervelende laadbalkjes. Voor Google is deze snelheid (Core Web Vitals) een van de belangrijkste factoren om je hoger in de zoekresultaten te plaatsen. Plus: je bent minder kwetsbaar voor hackers omdat er geen database-koppelingen op de voorgrond draaien."
    },
    {
      q: "Hoe zorg je ervoor dat mijn website meer leads en leads-aanvragen oplevert?",
      a: "Een mooi design is slechts de helft van het werk. Ik pas 'conversion centered design' toe. Dit betekent dat we bij elke knop, elke afbeelding en elke tekstregel kijken: helpt dit de bezoeker om de volgende stap te zetten? We kijken naar psychologische triggers, duidelijke Call-to-Actions en een logische flow. Een website van Merlign is geen digitaal visitekaartje, maar een verkoopmachine die 24/7 voor je aan het werk is."
    },
    {
      q: "Is mijn website schaalbaar als mijn bedrijf groeit?",
      a: "Absoluut. Omdat ik met componenten werk, kunnen we later heel eenvoudig nieuwe functionaliteiten toevoegen — van een boekingssysteem tot een klantenportaal — zonder dat de hele site verbouwd hoeft te worden. De basis die we leggen is toekomstbestendig."
    },
    {
      q: "Hoe zit het met de vindbaarheid (SEO) bij een op maat gemaakte site?",
      a: "Veel maatwerk sites vergeten SEO, maar bij Merlign zit dit in het DNA. Ik gebruik technieken zoals Static Site Generation (SSG) zodat de teksten direct leesbaar zijn voor Google-bots. Verder zorg ik voor schone meta-data, geoptimaliseerde afbeeldingen (WebP) en een logische kopstructuur (H1, H2, H3). Je krijgt een technische SEO-basis die sterker is dan de meeste standaard plugins kunnen bieden."
    },
    {
      q: "Wat zijn de kosten voor onderhoud na de lancering?",
      a: "Omdat mijn websites volledig custom codeerwerk zijn, ken ik elke regel code van binnenuit. Ik heb geen duur kantoor of personeel nodig, waardoor ik het onderhoud en de hosting voor een extreem lage prijs kan aanbieden. Je betaalt alleen voor pure technische stabiliteit."
    }
  ];
  const questions = (cmsFaqs == null ? void 0 : cmsFaqs.length) > 0 ? cmsFaqs.map((f) => ({
    q: f.question,
    a: f.answer
  })) : staticQuestions;
  const [openIndex, setOpenIndex] = React.useState(0);
  return /* @__PURE__ */ jsx("section", { className: "py-20 md:py-32 border-t border-white/5", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20", children: [
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsx(SectionLabel, { children: "FAQ" }),
      /* @__PURE__ */ jsxs("h2", { className: "font-sans font-bold text-[#F2F0E9] leading-tight tracking-tighter text-h2", children: [
        "Veelgestelde vragen over ",
        /* @__PURE__ */ jsx("span", { className: "text-primary font-drama font-normal text-h2-serif", children: "websites." })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "space-y-4", children: questions.map((item, i) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: `rounded-[1.5rem] border transition-all duration-500 overflow-hidden ${openIndex === i ? "bg-[#1A1A1A]/80 border-primary/20 shadow-sm" : "bg-white/[0.01] border-white/5 hover:border-white/10"}`,
        children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => setOpenIndex(openIndex === i ? -1 : i),
              className: "w-full px-6 py-6 flex items-center justify-between text-left group",
              children: [
                /* @__PURE__ */ jsx("span", { className: `text-base md:text-lg font-sans font-bold transition-colors ${openIndex === i ? "text-primary" : "text-[#F2F0E9]/70"}`, children: item.q }),
                /* @__PURE__ */ jsx(ChevronDown, { size: 14, className: `transition-transform duration-500 ${openIndex === i ? "rotate-180 text-primary" : "text-[#F2F0E9]/20"}` })
              ]
            }
          ),
          /* @__PURE__ */ jsx(AnimatePresence, { children: openIndex === i && /* @__PURE__ */ jsx(
            motion.div,
            {
              initial: { height: 0, opacity: 0 },
              animate: { height: "auto", opacity: 1 },
              exit: { height: 0, opacity: 0 },
              transition: { duration: 0.4, ease: "circOut" },
              children: /* @__PURE__ */ jsx("div", { className: "px-6 pb-6 text-[#F2F0E9]/85 text-base font-sans font-light italic border-t border-white/5 pt-4 whitespace-pre-wrap", children: item.a })
            }
          ) })
        ]
      },
      i
    )) })
  ] }) });
};
const fadeUp$1 = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
};
const staggerContainer$1 = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.15 } }
};
const DashboardService = () => {
  var _a, _b;
  const [data, setData] = React.useState(null);
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getServicePageData("Dashboard");
        setData(res);
      } catch (err) {
        console.error("Dashboard Service Fetch Error:", err);
      }
    };
    fetchData();
  }, []);
  const heroSans = (data == null ? void 0 : data.heroSans) || "Stop met gokken.";
  const heroSerif = (data == null ? void 0 : data.heroSerif) || "Begin met sturen op cijfers.";
  const heroSubtitle = (data == null ? void 0 : data.heroSubtitle) || "Ik bouw een dashboard dat al je belangrijkste cijfers op één plek zet. Altijd inzichtelijk, op je telefoon of laptop.";
  const staticFeatures = [
    { title: "Alles op één plek", desc: "Omzet, leads, websitebezoek, advertentiekosten. Niet meer schakelen tussen tools. Eén scherm, alles erin." },
    { title: "Altijd bij de hand", desc: "Op je laptop, telefoon of tablet. Je ziet in één oogopslag hoe het ervoor staat zonder in te loggen op vijf verschillende systemen." },
    { title: "Gebouwd op jouw data", desc: "Ik koppel de tools die jij al gebruikt. Geen gedoe met migraties of nieuwe software." },
    { title: "Simpel te begrijpen", desc: "Geen ingewikkelde grafieken. Alleen wat jij nodig hebt om snel een beslissing te nemen." }
  ];
  const features = ((_a = data == null ? void 0 : data.features) == null ? void 0 : _a.length) > 0 ? data.features.map((f, i) => {
    var _a2, _b2;
    return {
      title: f.title || ((_a2 = staticFeatures[i]) == null ? void 0 : _a2.title),
      desc: f.description || ((_b2 = staticFeatures[i]) == null ? void 0 : _b2.desc)
    };
  }) : staticFeatures;
  const staticProcess = [
    { step: "01", title: "Gratis check", desc: "We kijken samen welke cijfers voor jou het meest relevant zijn en welke tools je al gebruikt. 20 minuten, geen verplichtingen.", icon: /* @__PURE__ */ jsx(Search, { size: 24 }) },
    { step: "02", title: "Bouw en koppeling", desc: "Ik bouw het dashboard en koppel je databronnen. Jij hoeft niks te doen behalve feedback geven op het ontwerp.", icon: /* @__PURE__ */ jsx(Database, { size: 24 }) },
    { step: "03", title: "Klaar voor gebruik", desc: "Je krijgt toegang, een korte uitleg en je bent klaar. Vanaf dat moment stuur je op feiten in plaats van gevoel.", icon: /* @__PURE__ */ jsx(Layout$1, { size: 24 }) }
  ];
  const processItems = ((_b = data == null ? void 0 : data.processSteps) == null ? void 0 : _b.length) > 0 ? data.processSteps.map((p, i) => {
    var _a2, _b2, _c;
    return {
      ...staticProcess[i],
      step: p.stepNumber || ((_a2 = staticProcess[i]) == null ? void 0 : _a2.step),
      title: p.title || ((_b2 = staticProcess[i]) == null ? void 0 : _b2.title),
      desc: p.description || ((_c = staticProcess[i]) == null ? void 0 : _c.desc)
    };
  }) : staticProcess;
  return /* @__PURE__ */ jsxs("div", { className: "bg-[#0A0A0A] min-h-screen", children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "Business dashboards & data inzicht",
        description: "Stop met gissen naar je cijfers. Ik bouw dashboards die al je data van Ads, CRM en Sales samenbrengen in één duidelijk overzicht.",
        path: "/dashboard"
      }
    ),
    /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: !data ? /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.5 },
        className: "fixed inset-0 bg-[#0A0A0A] z-[100] flex items-center justify-center page-loader",
        children: /* @__PURE__ */ jsx(
          motion.div,
          {
            animate: { opacity: [0.3, 0.6, 0.3] },
            transition: { duration: 2, repeat: Infinity },
            className: "w-12 h-12 border border-primary/20 rounded-full"
          }
        )
      },
      "loader"
    ) : /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 1 },
        children: /* @__PURE__ */ jsxs("div", { className: "pt-40 md:pt-56 pb-20 md:pb-32 relative overflow-hidden", children: [
          /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 z-0 pointer-events-none opacity-40", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute top-[10%] left-[-5%] w-[50vw] h-[50vw] bg-primary/10 rounded-full blur-[140px]" }),
            /* @__PURE__ */ jsx("div", { className: "absolute bottom-[20%] right-[-10%] w-[40vw] h-[40vw] bg-primary/5 rounded-full blur-[100px]" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "content-max-width section-px space-y-20 md:space-y-40 relative z-10", children: [
            /* @__PURE__ */ jsxs(
              motion.div,
              {
                initial: "initial",
                whileInView: "whileInView",
                viewport: { once: true },
                className: "max-w-5xl space-y-8 md:space-y-12",
                children: [
                  /* @__PURE__ */ jsx(SectionLabel, { children: "Dashboard" }),
                  /* @__PURE__ */ jsxs(
                    motion.h1,
                    {
                      variants: fadeUp$1,
                      className: "font-sans font-bold text-[#F2F0E9] text-h1",
                      children: [
                        heroSans,
                        " ",
                        /* @__PURE__ */ jsx("span", { className: "text-primary font-drama font-normal text-h1-serif", children: heroSerif })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsx(motion.p, { variants: fadeUp$1, className: "font-sans text-[#F2F0E9]/85 text-base md:text-xl font-light italic leading-[1.8] max-w-2xl", children: heroSubtitle }),
                  /* @__PURE__ */ jsx(motion.div, { variants: fadeUp$1, className: "pt-4 text-left", children: /* @__PURE__ */ jsxs("a", { href: "#contact", className: "btn-magnetic group inline-flex bg-primary text-white border-transparent px-10 md:px-12 py-5 md:py-6 rounded-full shadow-[0_0_20px_rgba(201,168,76,0.3)]", children: [
                    /* @__PURE__ */ jsx("span", { className: "relative z-10 text-[12px] md:text-[14px] font-black italic tracking-[0.3em] uppercase", children: "Vraag een gratis check aan" }),
                    /* @__PURE__ */ jsx("div", { className: "btn-bg bg-[#F2F0E9]" })
                  ] }) })
                ]
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-32 items-center", children: [
              /* @__PURE__ */ jsxs("div", { className: "space-y-10 md:space-y-16 order-2 lg:order-1", children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-6 md:space-y-10", children: [
                  /* @__PURE__ */ jsxs("h2", { className: "font-sans font-bold text-[#F2F0E9] text-h2", children: [
                    (data == null ? void 0 : data.whyHeadlineSans) || "Waarom ondernemers zonder",
                    " ",
                    /* @__PURE__ */ jsx("span", { className: "text-primary font-drama font-normal text-h2-serif", children: (data == null ? void 0 : data.whyHeadlineSerif) || "dashboard geld laten liggen." })
                  ] }),
                  /* @__PURE__ */ jsx("p", { className: "font-sans text-[#F2F0E9]/85 text-base md:text-2xl font-light italic leading-[1.8]", children: (data == null ? void 0 : data.whySubtitle) || "Je kunt je bedrijf niet sturen als je niet weet wat er gebeurt. Een dashboard geeft je in één oogopslag wat je nodig hebt om de juiste beslissingen te nemen." })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12", children: features.map((item, i) => /* @__PURE__ */ jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0, y: 20 },
                    whileInView: { opacity: 1, y: 0 },
                    viewport: { once: true },
                    transition: { delay: i * 0.1 },
                    className: "space-y-4",
                    children: [
                      /* @__PURE__ */ jsx("h4", { className: "text-lg md:text-xl font-sans font-bold text-[#F2F0E9] tracking-tighter", children: item.title }),
                      /* @__PURE__ */ jsx("p", { className: "font-sans text-[#F2F0E9]/85 leading-[1.8] italic text-sm md:text-base whitespace-pre-wrap", children: item.desc })
                    ]
                  },
                  i
                )) })
              ] }),
              /* @__PURE__ */ jsxs(
                motion.div,
                {
                  initial: { opacity: 0, scale: 0.9 },
                  whileInView: { opacity: 1, scale: 1 },
                  viewport: { once: true },
                  className: "aspect-square bg-[#1A1A1A]/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] md:rounded-[4rem] relative overflow-hidden flex items-center justify-center p-8 md:p-16 shadow-sm hover:shadow-2xl transition-all duration-1000 order-1 lg:order-2",
                  children: [
                    /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-80 h-80 bg-primary/20 rounded-full blur-[140px] translate-x-1/2 -translate-y-1/2 opacity-30" }),
                    /* @__PURE__ */ jsxs("div", { className: "w-full h-auto border border-white/5 rounded-[2rem] md:rounded-[3rem] bg-[#1A1A1A]/60 backdrop-blur-3xl shadow-2xl flex flex-col p-8 md:p-12 space-y-10 md:space-y-16 relative group hover:border-primary/20 transition-all duration-1000", children: [
                      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
                        /* @__PURE__ */ jsx("div", { className: "h-6 w-32 md:w-48 bg-white/5 rounded-full" }),
                        /* @__PURE__ */ jsx(Activity, { size: 24, className: "text-primary animate-pulse" })
                      ] }),
                      /* @__PURE__ */ jsx("div", { className: "flex items-end gap-2 md:gap-3 h-32 md:h-64", children: [30, 60, 45, 80, 55, 90, 70, 85].map((h, i) => /* @__PURE__ */ jsx(
                        motion.div,
                        {
                          initial: { opacity: 0, height: 0 },
                          whileInView: { opacity: 1, height: `${h}%` },
                          transition: { duration: 1.5, delay: i * 0.1, ease: "circOut" },
                          className: "flex-grow bg-primary/10 hover:bg-primary transition-all duration-700 rounded-t-xl group/bar relative border-t border-primary/20",
                          children: /* @__PURE__ */ jsxs("div", { className: "absolute -top-10 left-1/2 -translate-x-1/2 bg-primary text-black text-[10px] font-mono font-bold px-2 py-1 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity", children: [
                            h,
                            "%"
                          ] })
                        },
                        i
                      )) }),
                      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-4 md:gap-8 border-t border-white/5 pt-10", children: [
                        /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
                          /* @__PURE__ */ jsx("div", { className: "h-2 w-1/2 bg-white/5 rounded-full" }),
                          /* @__PURE__ */ jsx("div", { className: "h-4 w-full bg-primary/20 rounded-full" })
                        ] }),
                        /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
                          /* @__PURE__ */ jsx("div", { className: "h-2 w-1/2 bg-white/5 rounded-full" }),
                          /* @__PURE__ */ jsx("div", { className: "h-4 w-full bg-white/5 rounded-full" })
                        ] }),
                        /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
                          /* @__PURE__ */ jsx("div", { className: "h-2 w-1/2 bg-white/5 rounded-full" }),
                          /* @__PURE__ */ jsx("div", { className: "h-4 w-full bg-white/5 rounded-full" })
                        ] })
                      ] })
                    ] })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-16 md:space-y-24", children: [
              /* @__PURE__ */ jsxs("div", { className: "text-center space-y-8", children: [
                /* @__PURE__ */ jsx(SectionLabel, { className: "justify-center", children: "Hoe het werkt" }),
                /* @__PURE__ */ jsxs("h2", { className: "font-sans font-bold text-[#F2F0E9] text-h2", children: [
                  "Zo werkt ",
                  /* @__PURE__ */ jsx("span", { className: "text-primary font-drama font-normal text-h2-serif", children: "het." })
                ] })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12", children: processItems.map((item, i) => /* @__PURE__ */ jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 30 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  transition: { delay: i * 0.1 },
                  className: "p-10 rounded-[2.5rem] bg-[#1A1A1A]/40 border border-white/5 space-y-8 group hover:bg-[#1A1A1A]/60 transition-all duration-700",
                  children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start", children: [
                      /* @__PURE__ */ jsx("div", { className: "w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-700 transform group-hover:scale-110 group-hover:rotate-3", children: React.cloneElement(item.icon, { className: "group-hover:scale-110 transition-transform duration-500" }) }),
                      /* @__PURE__ */ jsx("span", { className: "font-mono text-4xl font-black text-white/5 group-hover:text-primary/10 transition-colors uppercase italic", children: item.step })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                      /* @__PURE__ */ jsx("h3", { className: "text-xl md:text-2xl font-sans font-bold text-[#F2F0E9] tracking-tighter", children: item.title }),
                      /* @__PURE__ */ jsx("p", { className: "font-sans text-[#F2F0E9]/85 leading-[1.8] italic", children: item.desc })
                    ] })
                  ]
                },
                i
              )) })
            ] }),
            /* @__PURE__ */ jsx(FAQ$1, { cmsFaqs: data == null ? void 0 : data.faqs }),
            /* @__PURE__ */ jsxs("div", { id: "contact", className: "py-20 md:py-32 border-t border-white/5 flex flex-col items-center", children: [
              /* @__PURE__ */ jsxs(
                motion.div,
                {
                  initial: "initial",
                  whileInView: "whileInView",
                  viewport: { once: true },
                  variants: staggerContainer$1,
                  className: "text-left md:text-center space-y-10 md:space-y-16 mb-16 md:mb-24 w-full",
                  children: [
                    /* @__PURE__ */ jsx(SectionLabel, { className: "md:justify-center", children: "Start Vandaag" }),
                    /* @__PURE__ */ jsx("a", { href: "#contact", className: "group flex flex-col items-center", children: /* @__PURE__ */ jsxs("h2", { className: "font-sans font-bold text-[#F2F0E9] md:text-center text-h2", children: [
                      (data == null ? void 0 : data.ctaHeadlineSans) || "Klaar om te",
                      " ",
                      /* @__PURE__ */ jsx("span", { className: "text-primary font-drama font-normal text-h2-serif", children: (data == null ? void 0 : data.ctaHeadlineSerif) || "sturen op cijfers?" })
                    ] }) }),
                    /* @__PURE__ */ jsx(motion.p, { variants: fadeUp$1, className: "font-sans text-[#F2F0E9]/85 text-base md:text-xl font-light leading-[1.8] italic max-w-3xl mx-auto border-b-2 border-white/5 pb-10 md:pb-12 text-center", children: (data == null ? void 0 : data.ctaSubtitle) || "Vraag een gratis check aan. In 20 minuten weet je wat een dashboard jou oplevert." })
                  ]
                }
              ),
              /* @__PURE__ */ jsx(ContactForm, { selectedUpgrade: "dashboard" })
            ] })
          ] })
        ] })
      },
      "content"
    ) })
  ] });
};
const FAQ$1 = ({ cmsFaqs }) => {
  const staticQuestions = [
    {
      q: "Kan ik data uit verschillende bronnen combineren in één overzicht?",
      a: "Ja, dat is juist de kracht van een custom dashboard. We trekken data uit je boekhoudpakket (bijv. Moneybird), je advertentie-accounts (Meta, Google) en je CRM (HubSpot) en leggen die over elkaar heen. Zo zie je direct: 'Ik heb €1000 uitgegeven aan ads, en dat heeft onderaan de streep €4000 aan gefactureerde omzet opgeleverd.' Je stopt met gokken en begint met sturen op feiten."
    },
    {
      q: "Hoe 'live' is de data in mijn dashboard?",
      a: "Dit bepalen we samen. De meeste dashboards verversen we elk uur of elke dag, afhankelijk van hoe vaak je beslissingen neemt. Voor marketing-dashboards is daily refresh vaak perfect, voor operationele systemen kijken we naar near-real-time updates. Je kijkt in ieder geval nooit meer naar een Excel-bestand van vorige maand."
    },
    {
      q: "Heb ik speciale softwarelicenties nodig om het dashboard te gebruiken?",
      a: "Omdat ik maatwerk dashboards bouw, ben je niet gebonden aan dure maandabonnementen van tools zoals Tableau of PowerBI. Ik lever een stand-alone web-applicatie op die je via een beveiligde link op elk apparaat kunt openen — van je iPhone tot de tv op kantoor. Een eenmalige investering die jaren meegaat."
    },
    {
      q: "Wat als mijn datastructuur in de toekomst verandert?",
      a: "De dashboards zijn modulair opgebouwd. Als je overstapt naar een ander CRM of een nieuw e-commerce systeem, hoeven we alleen die specifieke 'kraan' aan te passen. De rest van je dashboard blijft gewoon werken."
    },
    {
      q: "Is mijn data veilig in het dashboard?",
      a: "Absoluut. Ik bouw dashboards die direct verbinding maken met jouw bronnen via beveiligde versleutelde verbindingen. Je behoudt volledige controle over wie toegang heeft."
    }
  ];
  const questions = (cmsFaqs == null ? void 0 : cmsFaqs.length) > 0 ? cmsFaqs.map((f) => ({
    q: f.question,
    a: f.answer
  })) : staticQuestions;
  const [openIndex, setOpenIndex] = React.useState(0);
  return /* @__PURE__ */ jsx("section", { className: "py-20 md:py-32 border-t border-white/5", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20", children: [
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsx(SectionLabel, { children: "FAQ" }),
      /* @__PURE__ */ jsxs("h2", { className: "font-sans font-bold text-[#F2F0E9] leading-tight tracking-tighter text-h2", children: [
        "Veelgestelde vragen over ",
        /* @__PURE__ */ jsx("span", { className: "text-primary font-drama font-normal text-h2-serif", children: "dashboards." })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "space-y-4", children: questions.map((item, i) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: `rounded-[1.5rem] border transition-all duration-500 overflow-hidden ${openIndex === i ? "bg-[#1A1A1A]/80 border-primary/20 shadow-sm" : "bg-white/[0.01] border-white/5 hover:border-white/10"}`,
        children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => setOpenIndex(openIndex === i ? -1 : i),
              className: "w-full px-6 py-6 flex items-center justify-between text-left group",
              children: [
                /* @__PURE__ */ jsx("span", { className: `text-base md:text-lg font-sans font-bold transition-colors ${openIndex === i ? "text-primary" : "text-[#F2F0E9]/70"}`, children: item.q }),
                /* @__PURE__ */ jsx(ChevronDown, { size: 14, className: `transition-transform duration-500 ${openIndex === i ? "rotate-180 text-primary" : "text-[#F2F0E9]/20"}` })
              ]
            }
          ),
          /* @__PURE__ */ jsx(AnimatePresence, { children: openIndex === i && /* @__PURE__ */ jsx(
            motion.div,
            {
              initial: { height: 0, opacity: 0 },
              animate: { height: "auto", opacity: 1 },
              exit: { height: 0, opacity: 0 },
              transition: { duration: 0.4, ease: "circOut" },
              children: /* @__PURE__ */ jsx("div", { className: "px-6 pb-6 text-[#F2F0E9]/85 text-base font-sans font-light italic border-t border-white/5 pt-4 whitespace-pre-wrap", children: item.a })
            }
          ) })
        ]
      },
      i
    )) })
  ] }) });
};
const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
};
const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.15 } }
};
const AutomationService = () => {
  var _a, _b;
  const [data, setData] = React.useState(null);
  const [openFaq, setOpenFaq] = React.useState(0);
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getServicePageData("Automatisering");
        setData(res);
      } catch (err) {
        console.error("Automation Service Fetch Error:", err);
      }
    };
    fetchData();
  }, []);
  const heroSans = (data == null ? void 0 : data.heroSans) || "Automatiseer alsof er";
  const heroSerif = (data == null ? void 0 : data.heroSerif) || "10 extra mensen werken.";
  const heroSubtitle = (data == null ? void 0 : data.heroSubtitle) || "Ik automatiseer de repetitieve taken in jouw bedrijf. Van leadopvolging tot administratie. Jij besteedt je tijd aan wat telt.";
  const staticFeatures = [
    { title: "Leadopvolging op autopilot", desc: "Iemand vult je contactformulier in. Automatisch krijgt hij een bevestiging, een herinnering en een follow-up. Zonder dat jij er aan denkt." },
    { title: "Tools die samenwerken", desc: "Ik koppel je bestaande tools aan elkaar zodat data automatisch doorstroomt. Geen handmatig overzetten meer." },
    { title: "Administratie die zelf doet", desc: "Van factuurverwerking tot rapportages. Ik bouw de workflows die jou uren per week teruggeven." },
    { title: "Schaalbaar zonder extra mensen", desc: "Je bedrijf kan groeien zonder dat je er meteen iemand voor hoeft aan te nemen. De automatisering schaalt mee." }
  ];
  const features = ((_a = data == null ? void 0 : data.features) == null ? void 0 : _a.length) > 0 ? data.features.map((f, i) => {
    var _a2, _b2;
    return {
      title: f.title || ((_a2 = staticFeatures[i]) == null ? void 0 : _a2.title),
      desc: f.description || ((_b2 = staticFeatures[i]) == null ? void 0 : _b2.desc)
    };
  }) : staticFeatures;
  const staticProcess = [
    { step: "01", title: "Gratis check", desc: "We kijken samen welke taken je nu handmatig doet en hoeveel tijd dat kost. Ik geef je direct een eerlijk beeld van wat er mogelijk is.", icon: /* @__PURE__ */ jsx(Search, { size: 24 }) },
    { step: "02", title: "Bouw en test", desc: "Ik bouw de automatisering, test hem grondig en koppel hem aan je bestaande tools. Jij hoeft niks te doen.", icon: /* @__PURE__ */ jsx(Settings, { size: 24 }) },
    { step: "03", title: "Live en op de achtergrond", desc: "Zodra het live staat, loopt het. Je hoeft er niet meer naar om te kijken. Het werk wordt gedaan terwijl jij onderneemt.", icon: /* @__PURE__ */ jsx(Cpu, { size: 24 }) }
  ];
  const processItems = ((_b = data == null ? void 0 : data.processSteps) == null ? void 0 : _b.length) > 0 ? data.processSteps.map((p, i) => {
    var _a2, _b2, _c;
    return {
      ...staticProcess[i],
      step: p.stepNumber || ((_a2 = staticProcess[i]) == null ? void 0 : _a2.step),
      title: p.title || ((_b2 = staticProcess[i]) == null ? void 0 : _b2.title),
      desc: p.description || ((_c = staticProcess[i]) == null ? void 0 : _c.desc)
    };
  }) : staticProcess;
  return /* @__PURE__ */ jsxs("div", { className: "bg-[#0A0A0A] min-h-screen", children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "AI & workflow automatisering",
        description: "Bespaar uren per week door saaie taken te automatiseren. Ik bouw slimme koppelingen met AI zodat jij en je team weer echt werk kunnen doen.",
        path: "/automatisering"
      }
    ),
    /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: !data ? /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.5 },
        className: "fixed inset-0 bg-[#0A0A0A] z-[100] flex items-center justify-center page-loader",
        children: /* @__PURE__ */ jsx(
          motion.div,
          {
            animate: { opacity: [0.3, 0.6, 0.3] },
            transition: { duration: 2, repeat: Infinity },
            className: "w-12 h-12 border border-primary/20 rounded-full"
          }
        )
      },
      "loader"
    ) : /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 1 },
        children: /* @__PURE__ */ jsxs("div", { className: "pt-40 md:pt-56 pb-20 md:pb-32 relative overflow-hidden", children: [
          /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 z-0 pointer-events-none opacity-40", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute top-[10%] left-[-5%] w-[50vw] h-[50vw] bg-primary/10 rounded-full blur-[140px]" }),
            /* @__PURE__ */ jsx("div", { className: "absolute bottom-[20%] right-[-10%] w-[40vw] h-[40vw] bg-primary/5 rounded-full blur-[100px]" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "content-max-width section-px space-y-20 md:space-y-40 relative z-10", children: [
            /* @__PURE__ */ jsxs(
              motion.div,
              {
                initial: "initial",
                whileInView: "whileInView",
                viewport: { once: true },
                className: "max-w-5xl space-y-8 md:space-y-12",
                children: [
                  /* @__PURE__ */ jsx(SectionLabel, { children: "Automatisering" }),
                  /* @__PURE__ */ jsxs(
                    motion.h1,
                    {
                      variants: fadeUp,
                      className: "font-sans font-bold text-[#F2F0E9] text-h1",
                      children: [
                        heroSans,
                        " ",
                        /* @__PURE__ */ jsx("span", { className: "text-primary font-drama font-normal text-h1-serif", children: heroSerif })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsx(motion.p, { variants: fadeUp, className: "font-sans text-[#F2F0E9]/85 text-base md:text-xl font-light italic leading-[1.8] max-w-2xl", children: heroSubtitle }),
                  /* @__PURE__ */ jsx(motion.div, { variants: fadeUp, className: "pt-4", children: /* @__PURE__ */ jsxs("a", { href: "#contact", className: "btn-magnetic group flex md:inline-flex bg-primary text-white border-transparent px-8 md:px-12 py-5 md:py-6 rounded-full shadow-[0_0_20px_rgba(201,168,76,0.3)]", children: [
                    /* @__PURE__ */ jsx("span", { className: "relative z-10 text-[11px] md:text-[14px] font-black italic tracking-[0.15em] md:tracking-[0.3em] uppercase", children: "Vraag een gratis check aan" }),
                    /* @__PURE__ */ jsx("div", { className: "btn-bg bg-[#F2F0E9]" })
                  ] }) })
                ]
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-32 items-center", children: [
              /* @__PURE__ */ jsxs("div", { className: "space-y-10 md:space-y-16 order-2 lg:order-1", children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-6 md:space-y-10", children: [
                  /* @__PURE__ */ jsxs("h2", { className: "font-sans font-bold text-[#F2F0E9] text-h2", children: [
                    (data == null ? void 0 : data.whyHeadlineSans) || "Winst in tijd",
                    " ",
                    /* @__PURE__ */ jsx("span", { className: "text-primary font-drama font-normal text-h2-serif", children: (data == null ? void 0 : data.whyHeadlineSerif) || "is winst in vrijheid." })
                  ] }),
                  /* @__PURE__ */ jsx("p", { className: "font-sans text-[#F2F0E9]/85 text-base md:text-2xl font-light italic leading-[1.8]", children: (data == null ? void 0 : data.whySubtitle) || "Elke taak die je herhaalt kost tijd. Opgeteld zijn dat uren per week die je aan groei had kunnen besteden. Ik bouw de systemen die dat overnemen." })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12", children: features.map((item, i) => /* @__PURE__ */ jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0, y: 20 },
                    whileInView: { opacity: 1, y: 0 },
                    viewport: { once: true },
                    transition: { delay: i * 0.1 },
                    className: "space-y-4",
                    children: [
                      /* @__PURE__ */ jsx("h4", { className: "text-lg md:text-xl font-sans font-bold text-[#F2F0E9] tracking-tighter", children: item.title }),
                      /* @__PURE__ */ jsx("p", { className: "font-sans text-[#F2F0E9]/85 leading-[1.8] italic text-sm md:text-base whitespace-pre-wrap", children: item.desc })
                    ]
                  },
                  i
                )) })
              ] }),
              /* @__PURE__ */ jsxs(
                motion.div,
                {
                  initial: { opacity: 0, scale: 0.9 },
                  whileInView: { opacity: 1, scale: 1 },
                  viewport: { once: true },
                  className: "aspect-square bg-[#1A1A1A]/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] md:rounded-[4rem] relative overflow-hidden flex items-center justify-center p-8 md:p-16 shadow-sm hover:shadow-2xl transition-all duration-1000 order-1 lg:order-2",
                  children: [
                    /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-80 h-80 bg-primary/20 rounded-full blur-[140px] translate-x-1/2 -translate-y-1/2 opacity-30" }),
                    /* @__PURE__ */ jsxs("div", { className: "w-full max-w-sm border border-white/5 rounded-[2rem] md:rounded-[3rem] bg-[#1A1A1A]/60 backdrop-blur-3xl shadow-2xl flex flex-col p-10 md:p-16 space-y-10 md:space-y-16 relative group hover:border-primary/20 transition-all duration-1000", children: [
                      [1, 2, 3].map((_, i) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between group/line", children: [
                        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-6 md:gap-8", children: [
                          /* @__PURE__ */ jsx("div", { className: `w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-white/5 flex items-center justify-center transition-all duration-1000 ${i === 1 ? "text-primary bg-primary/10 shadow-lg shadow-primary/10" : "text-[#F2F0E9]/10"}`, children: /* @__PURE__ */ jsx(Zap, { size: 24, className: "md:scale-125" }) }),
                          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                            /* @__PURE__ */ jsx("div", { className: "h-4 w-24 md:w-32 bg-white/5 rounded-full" }),
                            /* @__PURE__ */ jsx("div", { className: "h-2 w-12 md:w-16 bg-white/5 rounded-full opacity-50" })
                          ] })
                        ] }),
                        /* @__PURE__ */ jsx("div", { className: `h-8 w-8 md:h-10 md:w-10 rounded-full border border-white/5 flex items-center justify-center transition-all duration-1000 ${i === 1 ? "bg-primary border-primary scale-110 shadow-xl shadow-primary/30" : "opacity-20 translate-x-4"}`, children: i === 1 && /* @__PURE__ */ jsx(Check, { size: 18, className: "text-black md:scale-125" }) })
                      ] }, i)),
                      /* @__PURE__ */ jsxs("div", { className: "pt-10 md:pt-16 border-t border-white/5 flex flex-col items-center gap-4", children: [
                        /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
                          /* @__PURE__ */ jsx("div", { className: "w-2 h-2 rounded-full bg-primary animate-ping" }),
                          /* @__PURE__ */ jsx("div", { className: "w-2 h-2 rounded-full bg-primary animate-ping delay-75" }),
                          /* @__PURE__ */ jsx("div", { className: "w-2 h-2 rounded-full bg-primary animate-ping delay-150" })
                        ] }),
                        /* @__PURE__ */ jsx("p", { className: "font-mono text-[10px] md:text-[12px] uppercase tracking-[0.5em] text-primary font-black", children: "Running Autopilot..." })
                      ] })
                    ] })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-16 md:space-y-24", children: [
              /* @__PURE__ */ jsxs("div", { className: "text-center space-y-8", children: [
                /* @__PURE__ */ jsx(SectionLabel, { className: "justify-center", children: "Hoe het werkt" }),
                /* @__PURE__ */ jsxs("h2", { className: "font-sans font-bold text-[#F2F0E9] text-h2", children: [
                  "Zo werkt ",
                  /* @__PURE__ */ jsx("span", { className: "text-primary font-drama font-normal text-h2-serif", children: "het." })
                ] })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12", children: processItems.map((item, i) => /* @__PURE__ */ jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 30 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  transition: { delay: i * 0.1 },
                  className: "p-10 rounded-[2.5rem] bg-[#1A1A1A]/40 border border-white/5 space-y-8 group hover:bg-[#1A1A1A]/60 transition-all duration-700",
                  children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start", children: [
                      /* @__PURE__ */ jsx("div", { className: "w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-700 transform group-hover:scale-110 group-hover:rotate-3", children: React.cloneElement(item.icon, { className: "group-hover:scale-110 transition-transform duration-500" }) }),
                      /* @__PURE__ */ jsx("span", { className: "font-mono text-4xl font-black text-white/5 group-hover:text-primary/10 transition-colors uppercase italic", children: item.step })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                      /* @__PURE__ */ jsx("h3", { className: "text-xl md:text-2xl font-sans font-bold text-[#F2F0E9] tracking-tighter", children: item.title }),
                      /* @__PURE__ */ jsx("p", { className: "font-sans text-[#F2F0E9]/85 leading-[1.8] italic", children: item.desc })
                    ] })
                  ]
                },
                i
              )) })
            ] }),
            /* @__PURE__ */ jsx(FAQ, { cmsFaqs: data == null ? void 0 : data.faqs }),
            /* @__PURE__ */ jsxs("div", { id: "contact", className: "py-20 md:py-32 border-t border-white/5 flex flex-col items-center text-center", children: [
              /* @__PURE__ */ jsxs(
                motion.div,
                {
                  initial: "initial",
                  whileInView: "whileInView",
                  viewport: { once: true },
                  variants: staggerContainer,
                  className: "text-center space-y-10 md:space-y-16 mb-16 md:mb-24 w-full",
                  children: [
                    /* @__PURE__ */ jsx(SectionLabel, { className: "md:justify-center", children: "Start Vandaag" }),
                    /* @__PURE__ */ jsx("a", { href: "#contact", className: "group flex flex-col items-center", children: /* @__PURE__ */ jsxs("h2", { className: "font-sans font-bold text-[#F2F0E9] md:text-center text-h2", children: [
                      (data == null ? void 0 : data.ctaHeadlineSans) || "Klaar om je tijd",
                      " ",
                      /* @__PURE__ */ jsx("span", { className: "text-primary font-drama font-normal text-h2-serif", children: (data == null ? void 0 : data.ctaHeadlineSerif) || "terug te krijgen?" })
                    ] }) }),
                    /* @__PURE__ */ jsx(motion.p, { variants: fadeUp, className: "font-sans text-[#F2F0E9]/85 text-base md:text-xl font-light leading-[1.8] italic max-w-3xl mx-auto border-b-2 border-white/5 pb-10 md:pb-12 text-center", children: (data == null ? void 0 : data.ctaSubtitle) || "Vraag een gratis check aan. In 20 minuten weet je wat er geautomatiseerd kan worden." })
                  ]
                }
              ),
              /* @__PURE__ */ jsx(ContactForm, { selectedUpgrade: "automation" })
            ] })
          ] })
        ] })
      },
      "content"
    ) })
  ] });
};
const FAQ = ({ cmsFaqs }) => {
  const staticQuestions = [
    {
      q: "Waarom gebruik je n8n of Make in plaats van Zapier?",
      a: "Zapier is prima voor simpele taken, maar wordt extreem duur naarmate je meer automatiseert. Ik kies vaak voor n8n of Make.com omdat deze tools veel complexere logica aankunnen en vaak 70-80% goedkoper zijn op de lange termijn. Dit betekent meer automatisering voor minder maandelijkse kosten. n8n geeft ons bovendien de vrijheid om data volledig in eigen beheer te houden op eigen servers, wat essentieel is voor AVG-gevoelige informatie."
    },
    {
      q: "Voor welke bedrijfsprocessen is AI-automatisering het meest geschikt?",
      a: "Denk aan alles waar data van plek A naar plek B moet, of waar een menselijke 'filter' tussen zit. Bijvoorbeeld: automatisch offertes genereren op basis van een formulier-inzending, het automatisch sorteren van inkomende e-mails, of het laten genereren van eerste concept-blogs door AI op basis van jouw kernwaardes. Als je een taak meer dan drie keer per week op dezelfde manier doet, kunnen we het waarschijnlijk automatiseren."
    },
    {
      q: "Hoe veilig is mijn bedrijfsdata als ik AI gebruik?",
      a: "Veiligheid is mijn hoogste prioriteit. We koppelen AI-modellen via beveiligde API-sessies (zoals OpenAI's Enterprise-tier) waarbij jouw data niet wordt gebruikt om hun modellen te trainen. Je bedrijfsgeheimen blijven dus van jou. Bovendien bouwen we 'human-in-the-loop' controles in waar nodig: de AI doet het zware werk, jij geeft de definitieve klap op het resultaat."
    },
    {
      q: "Wat is de terugverdientijd (ROI) van een automatiseringstraject?",
      a: "De meeste automatiseringen die ik bouw verdienen zichzelf binnen 3 tot 6 maanden terug. Niet alleen in directe loonkosten die je bespaart, maar vooral in de foutmarge die naar 0 gaat en de snelheid waarmee je klanten kunt bedienen. Terwijl jij slaapt, blijft het systeem offertes sturen en klanten onboarden."
    }
  ];
  const questions = (cmsFaqs == null ? void 0 : cmsFaqs.length) > 0 ? cmsFaqs.map((f) => ({
    q: f.question,
    a: f.answer
  })) : staticQuestions;
  const [openIndex, setOpenIndex] = React.useState(0);
  return /* @__PURE__ */ jsx("section", { className: "py-20 md:py-32 border-t border-white/5", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20", children: [
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsx(SectionLabel, { children: "FAQ" }),
      /* @__PURE__ */ jsxs("h2", { className: "font-sans font-bold text-[#F2F0E9] leading-tight tracking-tighter text-h2", children: [
        "Veelgestelde vragen over ",
        /* @__PURE__ */ jsx("span", { className: "text-primary font-drama font-normal text-h2-serif", children: "automatisering." })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "space-y-4", children: questions.map((item, i) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: `rounded-[1.5rem] border transition-all duration-500 overflow-hidden ${openIndex === i ? "bg-[#1A1A1A]/80 border-primary/20 shadow-sm" : "bg-white/[0.01] border-white/5 hover:border-white/10"}`,
        children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => setOpenIndex(openIndex === i ? -1 : i),
              className: "w-full px-6 py-6 flex items-center justify-between text-left group",
              children: [
                /* @__PURE__ */ jsx("span", { className: `text-base md:text-lg font-sans font-bold transition-colors ${openIndex === i ? "text-primary" : "text-[#F2F0E9]/70"}`, children: item.q }),
                /* @__PURE__ */ jsx(ChevronDown, { size: 14, className: `transition-transform duration-500 ${openIndex === i ? "rotate-180 text-primary" : "text-[#F2F0E9]/20"}` })
              ]
            }
          ),
          /* @__PURE__ */ jsx(AnimatePresence, { children: openIndex === i && /* @__PURE__ */ jsx(
            motion.div,
            {
              initial: { height: 0, opacity: 0 },
              animate: { height: "auto", opacity: 1 },
              exit: { height: 0, opacity: 0 },
              transition: { duration: 0.4, ease: "circOut" },
              children: /* @__PURE__ */ jsx("div", { className: "px-6 pb-6 text-[#F2F0E9]/85 text-base font-sans font-light italic border-t border-white/5 pt-4 whitespace-pre-wrap", children: item.a })
            }
          ) })
        ]
      },
      i
    )) })
  ] }) });
};
const Privacy = () => {
  return /* @__PURE__ */ jsxs("div", { className: "pt-40 md:pt-56 pb-20 md:pb-32 bg-[#0A0A0A] min-h-screen relative overflow-hidden", children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "Privacyverklaring",
        description: "Privacyverklaring van Merlign. Ontdek hoe ik zorgvuldig omga met jouw persoonsgegevens.",
        path: "/privacy"
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "content-max-width section-px relative z-10", children: /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        className: "max-w-5xl space-y-12",
        children: [
          /* @__PURE__ */ jsx(SectionLabel, { children: "Juridisch" }),
          /* @__PURE__ */ jsx("h1", { className: "font-sans font-bold text-[#F2F0E9] text-h1 uppercase tracking-tighter", children: "Privacyverklaring" }),
          /* @__PURE__ */ jsxs("div", { className: "prose prose-invert max-w-4xl font-sans text-[#F2F0E9]/80 space-y-12 leading-relaxed", children: [
            /* @__PURE__ */ jsxs("section", { className: "space-y-6", children: [
              /* @__PURE__ */ jsxs("p", { className: "text-xl md:text-2xl font-light italic leading-relaxed border-l-2 border-primary/30 pl-6", children: [
                "Zodra je mijn website ",
                /* @__PURE__ */ jsx("span", { className: "text-primary underline", children: "www.merlign.com" }),
                " bezoekt of contact met mij opneemt, ontvang ik informatie over jou. In deze privacyverklaring leg ik uit wat ik met deze informatie doe. Ik ga altijd zorgvuldig met je informatie om en sla die veilig op. Heb je vragen of wil je weten welke informatie ik van je heb, neem dan contact op met mij."
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-sm opacity-60 italic", children: "Ik kan deze privacyverklaring aanpassen als ik dat nodig vind. Ik raad je daarom aan om deze regelmatig te bekijken. Deze privacyverklaring is voor het laatst gewijzigd op 09 maart 2026." })
            ] }),
            /* @__PURE__ */ jsxs("section", { className: "space-y-8 pt-8", children: [
              /* @__PURE__ */ jsx("h2", { className: "text-2xl md:text-3xl font-bold text-[#F2F0E9] border-b border-white/5 pb-4", children: "Inhoudsopgave" }),
              /* @__PURE__ */ jsxs("ol", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 text-sm md:text-base list-decimal pl-5", children: [
                /* @__PURE__ */ jsx("li", { children: "Wanneer pas je deze privacyverklaring toe?" }),
                /* @__PURE__ */ jsx("li", { children: "Wie gebruikt je gegevens?" }),
                /* @__PURE__ */ jsx("li", { children: "Van wie gebruiken we gegevens?" }),
                /* @__PURE__ */ jsx("li", { children: "Hoe komen we aan je gegevens?" }),
                /* @__PURE__ */ jsx("li", { children: "Welke gegevens van je gebruiken we?" }),
                /* @__PURE__ */ jsx("li", { children: "Waarvoor gebruiken we de gegevens?" }),
                /* @__PURE__ */ jsx("li", { children: "Hoelang bewaren we je gegevens?" }),
                /* @__PURE__ */ jsx("li", { children: "Met wie delen we je gegevens?" }),
                /* @__PURE__ */ jsx("li", { children: "Waar slaan we je gegevens op?" }),
                /* @__PURE__ */ jsx("li", { children: "Hoe veilig zijn je gegevens bij ons?" }),
                /* @__PURE__ */ jsx("li", { children: "Wat mag je van ons vragen?" }),
                /* @__PURE__ */ jsx("li", { children: "Welke regels gelden voor deze privacyverklaring?" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("section", { className: "space-y-12 pt-20", children: [
              /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-primary italic", children: "1. Wanneer pas je deze privacyverklaring toe?" }),
                /* @__PURE__ */ jsx("p", { children: "Deze privacyverklaring is van toepassing op alle persoonsgegevens die ik verwerk en op alle domeinen die aan Merlign gerelateerd zijn. Het gaat hier om de persoonsgegevens van iedereen die weleens contact met mij heeft gehad of mijn website heeft bezocht, zoals bezoekers, klanten en zakelijke contactpersonen." }),
                /* @__PURE__ */ jsx("p", { children: "Persoonsgegevens zijn alle gegevens die herleidbaar zijn tot jou als individu, zoals je naam, telefoonnummer, IP-adres, klantnummer of surfgedrag." })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-primary italic", children: "2. Wie gebruikt je gegevens?" }),
                /* @__PURE__ */ jsxs("p", { children: [
                  "Merlign is verantwoordelijk voor de website ",
                  /* @__PURE__ */ jsx("span", { className: "text-primary", children: "www.merlign.com" }),
                  " en daarmee de verantwoordelijke organisatie voor het gebruik van je persoonsgegevens. De volledige gegevens zijn:"
                ] }),
                /* @__PURE__ */ jsxs("ul", { className: "list-none space-y-1 font-bold text-[#F2F0E9]", children: [
                  /* @__PURE__ */ jsx("li", { children: "Merlign" }),
                  /* @__PURE__ */ jsx("li", { children: "Dennendreef 5-111" }),
                  /* @__PURE__ */ jsx("li", { children: "5282 HK Boxtel" }),
                  /* @__PURE__ */ jsx("li", { className: "font-mono text-sm tracking-widest text-[#F2F0E9]/60 uppercase pt-2", children: "KVK: 75629887" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-primary italic", children: "3. Van wie gebruiken we gegevens?" }),
                /* @__PURE__ */ jsx("p", { children: "Ik verwerk de persoonsgegevens van iedereen die contact met mij heeft gehad of mijn website heeft bezocht. Dit zijn onder meer bezoekers, particuliere klanten, zakelijke klanten en contactpersonen van partners." })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-primary italic", children: "4. Hoe komen we aan je gegevens?" }),
                /* @__PURE__ */ jsx("p", { children: "Ik krijg de gegevens rechtstreeks van jou zodra je:" }),
                /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-5 space-y-2", children: [
                  /* @__PURE__ */ jsx("li", { children: "mijn website bezoekt" }),
                  /* @__PURE__ */ jsx("li", { children: "gegevens invult op mijn website" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-primary italic", children: "5. Welke gegevens gebruiken we van je?" }),
                /* @__PURE__ */ jsx("p", { children: "Ik maak gebruik van de volgende gegevens:" }),
                /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-5 space-y-2", children: [
                  /* @__PURE__ */ jsx("li", { children: "Naam" }),
                  /* @__PURE__ */ jsx("li", { children: "E-mailadres" }),
                  /* @__PURE__ */ jsx("li", { children: "Telefoonnummer" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-primary italic", children: "6. Waarvoor gebruiken we je gegevens?" }),
                /* @__PURE__ */ jsx("p", { children: "Ik gebruik je persoonsgegevens alleen voor het doel waar ik die voor mag gebruiken:" }),
                /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-5 space-y-2", children: [
                  /* @__PURE__ */ jsx("li", { children: "Je hebt mij toestemming gegeven om je persoonsgegevens te gebruiken." }),
                  /* @__PURE__ */ jsx("li", { children: "Ik gebruik je gegevens omdat ik je als klant de beste service wil geven en ik dat zonder die informatie niet kan doen." })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-primary italic", children: "7. Hoelang bewaren we je gegevens?" }),
                /* @__PURE__ */ jsx("p", { children: "Ik bewaar je persoonsgegevens zo lang als ik dat volgens de wet moet doen en zo lang als nodig is voor het doel waarvoor ik je gegevens gebruik. Zolang je bijvoorbeeld klant bij mij bent, bewaar ik je gegevens volgens de wettelijke bewaartermijn van zeven jaar (belastingdienst). Daarna bewaar ik je gegevens alleen voor statistische doeleinden en om eventuele klachten af te handelen." })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-primary italic", children: "8. Met wie delen we je gegevens?" }),
                /* @__PURE__ */ jsx("p", { children: "Je persoonsgegevens worden alleen door mij persoonlijk gebruikt. Ik zal je persoonsgegevens **nooit** met anderen delen of verkopen." })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-primary italic", children: "9. Waar slaan we je gegevens op?" }),
                /* @__PURE__ */ jsx("p", { children: "Ik verwerk je gegevens binnen de Europese Economische Ruimte (EER). Dit houdt in dat ik je gegevens ook binnen de EER opsla." })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-primary italic", children: "10. Hoe veilig zijn je gegevens bij ons?" }),
                /* @__PURE__ */ jsx("p", { children: "Ik heb er veel aan gedaan om je gegevens zowel organisatorisch als technisch zo goed mogelijk te beveiligen. Mijn systemen en communicatiemiddelen zijn beveiligd om ervoor te zorgen dat je gegevens niet in de verkeerde handen terechtkomen. Ook zorg ik ervoor dat je gegevens alleen worden gebruikt door mensen die daar toestemming voor hebben." })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-primary italic", children: "11. Wat mag je van ons vragen?" }),
                /* @__PURE__ */ jsx("p", { children: "Omdat ik persoonsgegevens van je gebruik, heb je verschillende rechten:" }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-6 bg-white/[0.02] p-8 rounded-[2rem] border border-white/5", children: [
                  /* @__PURE__ */ jsx("h4", { className: "font-bold text-[#F2F0E9]", children: "Recht op informatie" }),
                  /* @__PURE__ */ jsx("p", { className: "text-sm", children: "Ik moet op een begrijpelijke en heldere manier uitleggen wat ik met je gegevens doe en welke controle je daarover hebt. Dat doe ik via deze privacyverklaring." }),
                  /* @__PURE__ */ jsx("h4", { className: "font-bold text-[#F2F0E9] pt-4", children: "Recht op inzage" }),
                  /* @__PURE__ */ jsx("p", { className: "text-sm", children: "Je mag mij altijd vragen om je gegevens die ik van je heb in te zien." }),
                  /* @__PURE__ */ jsx("h4", { className: "font-bold text-[#F2F0E9] pt-4", children: "Recht op correctie" }),
                  /* @__PURE__ */ jsx("p", { className: "text-sm", children: "Je mag mij vragen om je gegevens te laten corrigeren als deze niet juist of onvolledig zijn." }),
                  /* @__PURE__ */ jsx("h4", { className: "font-bold text-[#F2F0E9] pt-4", children: "Recht om bezwaar te maken" }),
                  /* @__PURE__ */ jsx("p", { className: "text-sm", children: "Je mag bezwaar maken tegen de verwerking van je gegevens. Bijvoorbeeld als je niet langer mail van mij wilt ontvangen." }),
                  /* @__PURE__ */ jsx("h4", { className: "font-bold text-[#F2F0E9] pt-4", children: "Recht om vergeten te worden" }),
                  /* @__PURE__ */ jsx("p", { className: "text-sm", children: "Je mag mij vragen om alle gegevens die ik van je heb te verwijderen. In sommige gevallen (zoals de belastingdienst) moet ik bepaalde gegevens wel 7 jaar bewaren." })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4 bg-primary/10 p-8 rounded-[2rem] border border-primary/20", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-primary italic", children: "Hoe dien je een aanvraag of klacht in?" }),
                /* @__PURE__ */ jsxs("p", { children: [
                  "Stuur je aanvraag of klacht naar mij via ",
                  /* @__PURE__ */ jsx("span", { className: "font-bold text-primary italic", children: "contact@merlign.com" }),
                  ". Ik verwerk je aanvraag binnen 30 dagen. Je hebt ook het recht om een klacht in te dienen bij de Autoriteit Persoonsgegevens."
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4 pb-20", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-primary italic", children: "12. Welke regels gelden voor deze privacyverklaring?" }),
                /* @__PURE__ */ jsx("p", { children: "Deze privacyverklaring voldoet aan de voorwaarden van de Algemene Verordening Gegevensbescherming (AVG). Daarnaast zijn de algemene regels die volgens de Nederlandse wet gelden van toepassing." })
              ] })
            ] })
          ] })
        ]
      }
    ) })
  ] });
};
const Terms = () => {
  return /* @__PURE__ */ jsxs("div", { className: "pt-40 md:pt-56 pb-20 md:pb-32 bg-[#0A0A0A] min-h-screen relative overflow-hidden", children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "Algemene Voorwaarden",
        description: "Algemene Voorwaarden van Merlign. De juridische basis voor onze samenwerking.",
        path: "/terms"
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "content-max-width section-px relative z-10", children: /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        className: "max-w-5xl space-y-12",
        children: [
          /* @__PURE__ */ jsx(SectionLabel, { children: "Juridisch" }),
          /* @__PURE__ */ jsx("h1", { className: "font-sans font-bold text-[#F2F0E9] text-h1 uppercase tracking-tighter", children: "Algemene Voorwaarden" }),
          /* @__PURE__ */ jsxs("div", { className: "prose prose-invert max-w-4xl font-sans text-[#F2F0E9]/80 space-y-12 leading-relaxed", children: [
            /* @__PURE__ */ jsxs("section", { className: "bg-white/[0.02] p-8 rounded-[2rem] border border-white/5 space-y-4", children: [
              /* @__PURE__ */ jsx("p", { className: "text-xl font-bold text-primary italic lowercase tracking-tight", children: "Merlign" }),
              /* @__PURE__ */ jsxs("p", { className: "font-mono text-sm uppercase tracking-widest text-[#F2F0E9]/60", children: [
                "E-MAIL: contact@merlign.com",
                /* @__PURE__ */ jsx("br", {}),
                "WEBSITE: www.merlign.com"
              ] })
            ] }),
            /* @__PURE__ */ jsxs("section", { className: "space-y-12 pt-10", children: [
              /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-primary italic", children: "Artikel 1 - Definities" }),
                /* @__PURE__ */ jsxs("ol", { className: "list-decimal pl-5 space-y-2", children: [
                  /* @__PURE__ */ jsxs("li", { children: [
                    /* @__PURE__ */ jsx("span", { className: "text-[#F2F0E9] font-bold", children: "Merlign" }),
                    ": Merlign, gevestigd te Boxtel, KvK-nummer 75629887."
                  ] }),
                  /* @__PURE__ */ jsxs("li", { children: [
                    /* @__PURE__ */ jsx("span", { className: "text-[#F2F0E9] font-bold", children: "Klant" }),
                    ": degene met wie Merlign een overeenkomst is aangegaan."
                  ] }),
                  /* @__PURE__ */ jsxs("li", { children: [
                    /* @__PURE__ */ jsx("span", { className: "text-[#F2F0E9] font-bold", children: "Partijen" }),
                    ": Merlign en de Klant samen."
                  ] }),
                  /* @__PURE__ */ jsxs("li", { children: [
                    /* @__PURE__ */ jsx("span", { className: "text-[#F2F0E9] font-bold", children: "Consument" }),
                    ": een Klant die tevens een individu is en die als privépersoon handelt."
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-primary italic", children: "Artikel 2 - Toepasselijkheid" }),
                /* @__PURE__ */ jsxs("ol", { className: "list-decimal pl-5 space-y-2", children: [
                  /* @__PURE__ */ jsx("li", { children: "Deze voorwaarden zijn van toepassing op alle offertes, aanbiedingen, werkzaamheden, bestellingen, overeenkomsten en leveringen van diensten of producten door of namens Merlign." }),
                  /* @__PURE__ */ jsx("li", { children: "Merlign en de Klant kunnen alleen afwijken van deze voorwaarden als dat schriftelijk is afgesproken." }),
                  /* @__PURE__ */ jsx("li", { children: "Merlign en de Klant sluiten de toepasselijkheid van de algemene voorwaarden van de Klant of van anderen uitdrukkelijk uit." })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-primary italic", children: "Artikel 3 - Aanbiedingen en offertes" }),
                /* @__PURE__ */ jsxs("ol", { className: "list-decimal pl-5 space-y-2", children: [
                  /* @__PURE__ */ jsx("li", { children: "Aanbiedingen en offertes van Merlign zijn vrijblijvend, tenzij daarin uitdrukkelijk anders vermeld." }),
                  /* @__PURE__ */ jsx("li", { children: "Een aanbod of offerte is maximaal 2 weken geldig, tenzij er een andere termijn in het aanbod of de offerte staat." }),
                  /* @__PURE__ */ jsx("li", { children: "Aanvaardt de Klant een aanbod of offerte niet binnen de geldende termijn, dan vervalt het aanbod of de offerte." }),
                  /* @__PURE__ */ jsx("li", { children: "Aanbiedingen en offertes gelden niet voor nabestellingen, tenzij Merlign en de Klant dit schriftelijk afspreken." })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-primary italic", children: "Artikel 4 - Aanvaarding" }),
                /* @__PURE__ */ jsxs("ol", { className: "list-decimal pl-5 space-y-2", children: [
                  /* @__PURE__ */ jsx("li", { children: "Bij aanvaarding van een vrijblijvende offerte of aanbieding, mag Merlign de offerte of het aanbod alsnog binnen 3 dagen na ontvangst van de aanvaarding intrekken, zonder dat de Klant hieraan enige rechten kan ontlenen." }),
                  /* @__PURE__ */ jsx("li", { children: "Mondelinge aanvaarding van de Klant verbindt Merlign slechts nadat de Klant deze schriftelijk of elektronisch heeft bevestigd." })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-primary italic", children: "Artikel 5 - Prijzen" }),
                /* @__PURE__ */ jsxs("ol", { className: "list-decimal pl-5 space-y-2", children: [
                  /* @__PURE__ */ jsx("li", { children: "Merlign hanteert prijzen in euro's, exclusief btw en exclusief eventuele overige kosten zoals administratie- of verzendkosten, tenzij schriftelijk anders is afgesproken." }),
                  /* @__PURE__ */ jsx("li", { children: "Merlign mag de prijzen van zijn diensten en producten op zijn website en in andere uitingen altijd wijzigen." }),
                  /* @__PURE__ */ jsx("li", { children: "Merlign en de Klant spreken voor een dienstverlening een totaalbedrag als richtprijs af, tenzij schriftelijk anders wordt afgesproken." }),
                  /* @__PURE__ */ jsx("li", { children: "Merlign mag tot 10% van de richtprijs afwijken." }),
                  /* @__PURE__ */ jsx("li", { children: "Merlign moet de Klant op tijd laten weten waarom een hogere prijs gerechtvaardigd is, wanneer de richtprijs meer dan 10% hoger uit gaat vallen." }),
                  /* @__PURE__ */ jsx("li", { children: "De Klant mag het deel van de opdracht dat boven de richtprijs (vermeerderd met 10%) uitkomt laten vervallen, wanneer de richtprijs meer dan 10% hoger uit gaat vallen." }),
                  /* @__PURE__ */ jsx("li", { children: "Merlign zal prijsaanpassingen meedelen aan de Klant voorafgaand aan de ingang ervan." }),
                  /* @__PURE__ */ jsx("li", { children: "Een consument mag de overeenkomst met Merlign opzeggen wanneer hij het niet eens is met de prijsverhoging." })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-primary italic", children: "Artikel 6 - Betalingen en betalingstermijn" }),
                /* @__PURE__ */ jsxs("ol", { className: "list-decimal pl-5 space-y-2", children: [
                  /* @__PURE__ */ jsx("li", { children: "Merlign mag bij het aangaan van de overeenkomst een aanbetaling tot 50% van het afgesproken bedrag verlangen." }),
                  /* @__PURE__ */ jsx("li", { children: "De Klant moet een betaling achteraf binnen 14 dagen na levering hebben voldaan." }),
                  /* @__PURE__ */ jsx("li", { children: "De betalingstermijnen die Merlign hanteert, zijn fatale betalingstermijnen. Dat betekent dat indien de Klant het afgesproken bedrag niet uiterlijk op de laatste dag van de betalingstermijn heeft betaald, hij automatisch in verzuim en in gebreke is, zonder dat Merlign aan de Klant een aanmaning hoeft te sturen of in gebreke hoeft te stellen." }),
                  /* @__PURE__ */ jsx("li", { children: "Merlign mag een levering afhankelijk stellen van onmiddellijke betaling dan wel een zekerheidstelling eisen voor het totale bedrag van de diensten of producten." })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-primary italic", children: "Artikel 7 - Gevolgen te late betaling" }),
                /* @__PURE__ */ jsxs("ol", { className: "list-decimal pl-5 space-y-2", children: [
                  /* @__PURE__ */ jsx("li", { children: "Betaalt de Klant niet binnen de afgesproken termijn, dan mag Merlign de wettelijke rente per maand voor handelstransacties in rekening brengen vanaf de dag dat de Klant in verzuim is." }),
                  /* @__PURE__ */ jsx("li", { children: "Wanneer de Klant in verzuim is, moet hij bovendien buitengerechtelijke incassokosten en eventuele schadevergoeding betalen aan Merlign." }),
                  /* @__PURE__ */ jsx("li", { children: "De incassokosten worden berekend aan de hand van het Besluit vergoeding voor buitengerechtelijke incassokosten." }),
                  /* @__PURE__ */ jsx("li", { children: "Wanneer de Klant niet op tijd betaalt, mag Merlign zijn verplichtingen opschorten totdat de Klant heeft betaald." }),
                  /* @__PURE__ */ jsx("li", { children: "In geval van liquidatie, faillissement, beslag of surseance van betaling aan de zijde van de Klant, zijn de vorderingen van Merlign op de Klant onmiddellijk opeisbaar." }),
                  /* @__PURE__ */ jsx("li", { children: "Weigert de Klant zijn medewerking aan de uitvoering van de overeenkomst door Merlign, dan moet hij nog steeds de afgesproken prijs betalen." })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-primary italic", children: "Artikel 8 - Opschortingsrecht" }),
                /* @__PURE__ */ jsx("p", { children: "De Klant doet hierbij afstand van het recht om de nakoming van enige uit deze overeenkomst voortvloeiende verbintenis op te schorten." })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-primary italic", children: "Artikel 9 - Verrekening" }),
                /* @__PURE__ */ jsx("p", { children: "De Klant doet afstand van zijn recht om een schuld aan Merlign te verrekenen met een vordering op Merlign." })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-primary italic", children: "Artikel 10 - Verzekering" }),
                /* @__PURE__ */ jsxs("ol", { className: "list-decimal pl-5 space-y-2", children: [
                  /* @__PURE__ */ jsxs("li", { children: [
                    "De Klant moet de volgende zaken voldoende verzekeren en verzekerd houden tegen onder andere brand, ontploffings- en waterschade, en diefstal:",
                    /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-5 mt-2 space-y-1 opacity-80", children: [
                      /* @__PURE__ */ jsx("li", { children: "geleverde zaken die noodzakelijk zijn voor de uitvoering van de onderliggende overeenkomst" }),
                      /* @__PURE__ */ jsx("li", { children: "zaken van Merlign die bij de Klant aanwezig zijn" }),
                      /* @__PURE__ */ jsx("li", { children: "zaken die onder eigendomsvoorbehoud zijn geleverd" })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsx("li", { children: "De Klant geeft op eerste verzoek van Merlign de polis van deze verzekeringen ter inzage." })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-primary italic", children: "Artikel 11 - Intrekking opdracht" }),
                /* @__PURE__ */ jsxs("ol", { className: "list-decimal pl-5 space-y-2", children: [
                  /* @__PURE__ */ jsx("li", { children: "Het staat de Klant vrij om de opdracht aan Merlign op elk gewenst moment te beëindigen." }),
                  /* @__PURE__ */ jsx("li", { children: "Wanneer de Klant de opdracht intrekt, is de Klant verplicht de verschuldigde vergoeding en de gemaakte onkosten van Merlign te betalen." })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-primary italic", children: "Artikel 12 - Klachtplicht" }),
                /* @__PURE__ */ jsxs("ol", { className: "list-decimal pl-5 space-y-2", children: [
                  /* @__PURE__ */ jsx("li", { children: "De Klant is verplicht klachten over de verrichte werkzaamheden direct schriftelijk te melden aan Merlign. De klacht bevat een zo gedetailleerd mogelijke omschrijving van de tekortkoming, zodat Merlign in staat wordt gesteld hierop adequaat te reageren." }),
                  /* @__PURE__ */ jsx("li", { children: "Een klacht kan er in ieder geval niet toe leiden dat Merlign gehouden kan worden om andere werkzaamheden te verrichten dan zijn overeengekomen." })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-primary italic", children: "Artikel 13 - Garantie" }),
                /* @__PURE__ */ jsx("p", { children: "Wanneer de Klant en Merlign een overeenkomst met een dienstverlenend karakter zijn aangegaan, bevat deze voor Merlign slechts een inspanningsverplichting en dus geen resultaatsverplichting." })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-primary italic", children: "Artikel 14 - Uitvoering van de overeenkomst" }),
                /* @__PURE__ */ jsxs("ol", { className: "list-decimal pl-5 space-y-2", children: [
                  /* @__PURE__ */ jsx("li", { children: "Merlign voert de overeenkomst naar beste inzicht en vermogen en volgens de eisen van goed vakmanschap uit." }),
                  /* @__PURE__ */ jsx("li", { children: "Merlign mag de afgesproken dienstverlening in zijn geheel of deels laten uitvoeren door anderen." }),
                  /* @__PURE__ */ jsx("li", { children: "De uitvoering van de overeenkomst gebeurt in overleg en na een schriftelijk akkoord en betaling van een eventueel voorschot door de Klant." }),
                  /* @__PURE__ */ jsx("li", { children: "De Klant moet ervoor zorgen dat Merlign op tijd kan beginnen aan de uitvoering van de overeenkomst." }),
                  /* @__PURE__ */ jsx("li", { children: "Zorgt de Klant er niet voor dat Merlign tijdig kan beginnen, dan komen de daaruit voortvloeiende extra kosten voor rekening van de Klant." })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-primary italic", children: "Artikel 15 - Informatieverstrekking door de Klant" }),
                /* @__PURE__ */ jsxs("ol", { className: "list-decimal pl-5 space-y-2", children: [
                  /* @__PURE__ */ jsx("li", { children: "De Klant stelt alle informatie, gegevens en bescheiden die relevant zijn voor de correcte uitvoering van de overeenkomst tijdig en in gewenste vorm en op gewenste wijze beschikbaar aan Merlign." }),
                  /* @__PURE__ */ jsx("li", { children: "De Klant staat in voor de juistheid en volledigheid van de ter beschikking gestelde informatie, gegevens en bescheiden, ook indien deze van derden afkomstig zijn, voor zover uit de aard van de overeenkomst niet anders voortvloeit." }),
                  /* @__PURE__ */ jsx("li", { children: "Wanneer en voor zover de Klant dit verzoekt, retourneert Merlign de betreffende bescheiden." }),
                  /* @__PURE__ */ jsx("li", { children: "Stelt de Klant niet, niet tijdig of niet behoorlijk de door Merlign redelijkerwijs verlangde informatie, gegevens of bescheiden beschikbaar en loopt de uitvoering van de overeenkomst hierdoor vertraging op, dan komen de daaruit voortvloeiende extra kosten en extra uren voor rekening van de Klant." })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-primary italic", children: "Artikel 16 - Duur overeenkomst dienst" }),
                /* @__PURE__ */ jsxs("ol", { className: "list-decimal pl-5 space-y-2", children: [
                  /* @__PURE__ */ jsx("li", { children: "De overeenkomst tussen Merlign en de Klant betreffende een dienst of diensten wordt aangegaan voor onbepaalde tijd, tenzij uit de aard van de overeenkomst iets anders voortvloeit of anders wordt afgesproken." }),
                  /* @__PURE__ */ jsx("li", { children: "Wanneer de Klant een overeenkomst voor bepaalde tijd aangaat, dan wordt deze na afloop van de termijn stilzwijgend omgezet in een overeenkomst voor onbepaalde tijd, tenzij 1 van de partijen de overeenkomst opzegt met inachtneming van een opzegtermijn van 2 maanden, of een consument de overeenkomst opzegt met inachtneming van een opzegtermijn van 1 maand, waardoor de overeenkomst automatisch eindigt." })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-primary italic", children: "Artikel 17 - Opzeggen dienst voor onbepaalde tijd" }),
                /* @__PURE__ */ jsxs("ol", { className: "list-decimal pl-5 space-y-2", children: [
                  /* @__PURE__ */ jsx("li", { children: "De Klant kan een overeenkomst voor een dienst voor onbepaalde tijd opzeggen met een opzegtermijn van 2 maanden." }),
                  /* @__PURE__ */ jsx("li", { children: "Een consument mag een overeenkomst voor een dienst voor onbepaalde tijd opzeggen met een opzegtermijn van 1 maand." })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4 pb-20", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-primary italic", children: "Artikel 18 - Intellectueel eigendom" }),
                /* @__PURE__ */ jsxs("ol", { className: "list-decimal pl-5 space-y-2", children: [
                  /* @__PURE__ */ jsx("li", { children: "Merlign behoudt alle intellectuele eigendomsrechten op alle ontwerpen, tekeningen, geschriften, dragers met gegevens of andere informatie, offertes, afbeeldingen, schetsen, modellen en maquettes, tenzij anders is afgesproken." }),
                  /* @__PURE__ */ jsx("li", { children: "De Klant mag de intellectuele eigendomsrechten in lid 1 niet zonder voorafgaande schriftelijke toestemming van Merlign aan anderen tonen, ter beschikking stellen of op een andere manier gebruiken." })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "pt-12 text-sm opacity-40 italic border-t border-white/5", children: "Laatst bijgewerkt: 9 maart 2026" })
          ] })
        ]
      }
    ) })
  ] });
};
function App() {
  return /* @__PURE__ */ jsx(BrowserRouter, { children: /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsxs(Routes, { children: [
    /* @__PURE__ */ jsx(Route, { path: "/", element: /* @__PURE__ */ jsx(Home, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/over-mij", element: /* @__PURE__ */ jsx(About, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/cases", element: /* @__PURE__ */ jsx(Cases, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/contact", element: /* @__PURE__ */ jsx(ContactPage, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/website", element: /* @__PURE__ */ jsx(WebsiteService, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/dashboard", element: /* @__PURE__ */ jsx(DashboardService, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/automatisering", element: /* @__PURE__ */ jsx(AutomationService, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/privacy", element: /* @__PURE__ */ jsx(Privacy, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/terms", element: /* @__PURE__ */ jsx(Terms, {}) })
  ] }) }) });
}
if ("scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}
ReactDOM.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsx(React.StrictMode, { children: /* @__PURE__ */ jsx(HelmetProvider, { children: /* @__PURE__ */ jsx(App, {}) }) })
);
