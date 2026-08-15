"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, CalendarCheck } from "lucide-react";
import { navLinks, site } from "@/lib/data";

// Primary items stay inline; the rest live in a "More" dropdown so the bar
// never overflows, no matter how many pages get added later.
const PRIMARY_COUNT = 7;
const primaryLinks = navLinks.slice(0, PRIMARY_COUNT);
const moreLinks = navLinks.slice(PRIMARY_COUNT);

export default function Header() {
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const moreRef = useRef<HTMLDivElement>(null);
  // Portals need the DOM, which doesn't exist during server rendering.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setMoreOpen(false);
  }, [pathname]);

  // Prevent the page behind the drawer from scrolling, while leaving the
  // scroll POSITION untouched so closing the menu returns you exactly where
  // you were. (Setting overflow only — not `position: fixed` on body, which
  // is the trick that jumps you back to the top.)
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) setMoreOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const isMoreActive = moreLinks.some((l) => l.href === pathname);

  return (
    <header
      className={`sticky top-0 z-50 transition-shadow duration-300 backdrop-blur-xl bg-frame-950/85 border-b border-white/10 ${
        scrolled ? "shadow-soft" : ""
      }`}
    >
      <div className="mx-auto w-full max-w-[1680px] px-4 sm:px-6 flex items-center justify-between h-20">
        <Link href="/" className="flex items-center gap-3 group shrink-0 mr-6 2xl:mr-10">
          <span className="w-11 h-11 rounded-full overflow-hidden bg-white shrink-0 ring-1 ring-gold-500/30">
            <Image
              src="/logo.png"
              alt="Tamil Trading Education logo"
              width={88}
              height={88}
              className="w-full h-full object-cover object-top scale-125"
              priority
            />
          </span>
          <span className="font-heading font-bold leading-tight">
            <span className="block text-[15px] text-white whitespace-nowrap">{site.name}</span>
            <span className="hidden 2xl:block text-[10px] font-mono tracking-[0.16em] uppercase text-gold-300 font-normal whitespace-nowrap">
              {site.tagline}
            </span>
          </span>
        </Link>

        <nav className="hidden 2xl:flex items-center gap-1 2xl:gap-2" style={{ perspective: 800 }}>
          {primaryLinks.map((link) => (
            <motion.div
              key={link.href}
              whileHover={{ y: -3, rotateX: -14, scale: 1.04 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              style={{ transformStyle: "preserve-3d" }}
              className="relative"
            >
              <Link
                href={link.href}
                className={`relative block px-3 py-1.5 rounded-lg text-[13px] 2xl:text-sm font-heading font-medium whitespace-nowrap transition-colors hover:bg-white/10 ${
                  pathname === link.href ? "text-gold-300" : "text-white/70 hover:text-white"
                }`}
              >
                {link.label}
                {pathname === link.href && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute left-3 right-3 -bottom-0.5 h-px bg-gold-500"
                  />
                )}
              </Link>
            </motion.div>
          ))}

          {moreLinks.length > 0 && (
            <div className="relative" ref={moreRef}>
              <button
                onClick={() => setMoreOpen((v) => !v)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-[13px] 2xl:text-sm font-heading font-medium whitespace-nowrap transition-colors hover:bg-white/10 ${
                  isMoreActive ? "text-gold-300" : "text-white/70 hover:text-white"
                }`}
              >
                More
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${moreOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {moreOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.18 }}
                    className="absolute top-full right-0 mt-3 w-44 rounded-xl border border-white/10 bg-frame-900/95 backdrop-blur-xl shadow-soft py-2 z-50"
                  >
                    {moreLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`block px-4 py-2.5 text-sm font-heading transition-colors ${
                          pathname === link.href ? "text-gold-300" : "text-white/75 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </nav>

        <div className="hidden 2xl:flex items-center gap-3 shrink-0 ml-6">
          <Link
            href="/contact"
            className="btn-gold relative text-sm py-3 px-5 whitespace-nowrap shadow-[0_0_0_0_rgba(201,162,75,0.55)] animate-[pulseGlow_2.4s_ease-in-out_infinite] hover:scale-105"
          >
            <CalendarCheck className="w-4 h-4" />
            Book Free Consultation
          </Link>
        </div>

        {/* Explicit text-white: the icon previously inherited the page's dark
            ink colour, making it near-invisible on the dark header bar. */}
        <button
          className="2xl:hidden w-11 h-11 flex items-center justify-center rounded-lg border border-white/25 bg-white/10 text-white shrink-0 active:scale-95 transition-transform duration-100"
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setOpen((v) => !v);
          }}
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          {open ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
        </button>
      </div>

      {/*
        ROOT CAUSE FIX — the drawer is now PORTALLED to document.body.

        It previously lived inside <header>, which carries `backdrop-blur-xl`.
        A backdrop-filter (like filter, transform and will-change) on an
        ancestor creates a CONTAINING BLOCK for position:fixed descendants.
        That meant `fixed top-20 right-0 bottom-0` resolved against the 80px
        header box instead of the viewport, so the drawer rendered as an
        invisible sliver — the menu state was toggling correctly all along,
        there was simply nothing visible to see.

        Rendering through a portal takes the drawer out of the header's
        subtree entirely, so no ancestor filter can affect it. It also stays
        outside the document flow, so opening it cannot move, remount, or
        re-render page content — scroll position, hero animation, carousel
        index and 3D state are all preserved.
      */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <>
                <motion.button
                  key="scrim"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="2xl:hidden fixed inset-0 z-[90] bg-ink/50 backdrop-blur-[2px]"
                />
                <motion.nav
                  key="drawer"
                  id="mobile-nav"
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", stiffness: 420, damping: 38, mass: 0.7 }}
                  style={{ willChange: "transform" }}
                  className="2xl:hidden fixed top-0 right-0 bottom-0 z-[100] w-[82vw] max-w-xs bg-frame-950 border-l border-white/10 shadow-soft overflow-y-auto overscroll-contain"
                >
                  <div className="flex items-center justify-between px-5 h-20 border-b border-white/10">
                    <span className="font-heading font-semibold text-white text-sm">Menu</span>
                    <button
                      onClick={() => setOpen(false)}
                      aria-label="Close menu"
                      className="w-10 h-10 flex items-center justify-center rounded-lg border border-white/25 bg-white/10 text-white"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex flex-col gap-1 px-5 py-5 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className={`py-3 text-base font-heading font-medium border-b border-white/5 ${
                          pathname === link.href ? "text-gold-300" : "text-white/80"
                        }`}
                      >
                        {link.label}
                      </Link>
                    ))}
                    <Link
                      href="/contact"
                      onClick={() => setOpen(false)}
                      className="btn-gold w-full mt-5"
                    >
                      <CalendarCheck className="w-4 h-4" />
                      Book Free Consultation
                    </Link>
                  </div>
                </motion.nav>
              </>
            )}
          </AnimatePresence>,
          document.body
        )}

    </header>
  );
}
