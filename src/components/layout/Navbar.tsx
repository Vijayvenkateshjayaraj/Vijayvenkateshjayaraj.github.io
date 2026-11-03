"use client";
import { useEffect, useRef, useState } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import { navigation, profile } from "@/data/profile";

function toggleTheme() {
  const root = document.documentElement;
  // Dark is the default look; light is an opt-in theme.
  const next = root.dataset.theme === "light" ? "dark" : "light";
  root.dataset.theme = next;
  try {
    localStorage.setItem("theme", next);
  } catch {
    // Storage can be unavailable (private mode); the choice still applies for this visit.
  }
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState("");
  const progressRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      // Written straight to the element so scrolling never re-renders the nav.
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${scrollable > 0 ? window.scrollY / scrollable : 0})`;
      // Back at the hero, no section link should stay highlighted.
      if (window.scrollY < window.innerHeight * 0.4) setActiveHref("");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries.find((entry) => entry.isIntersecting);
        if (visibleSection) setActiveHref(`#${visibleSection.target.id}`);
      },
      { rootMargin: "-35% 0px -60%", threshold: 0 }
    );

    navigation.forEach(([, href]) => {
      const section = document.querySelector(href);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header className={`nav${scrolled ? " is-scrolled" : ""}${open ? " is-open" : ""}`}>
      <nav className="wrap nav-inner" aria-label="Primary navigation">
        <a className="brand" href="#top" aria-label={`${profile.shortName}, back to top`} onClick={() => setOpen(false)}>
          <span className="brand-mark" aria-hidden="true">vj<i>_</i></span>
          <span className="brand-name">{profile.shortName}</span>
        </a>

        <div id="nav-links" className="nav-links">
          {navigation.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className={activeHref === href ? "active" : undefined}
              aria-current={activeHref === href ? "true" : undefined}
              onClick={() => setOpen(false)}
            >
              {label}
            </a>
          ))}
          <a className="nav-links-resume" href={profile.resume} download onClick={() => setOpen(false)}>Download résumé</a>
        </div>

        <div className="nav-actions">
          <button className="icon-btn theme-toggle" type="button" onClick={toggleTheme} aria-label="Toggle light and dark theme">
            <Sun className="icon-sun" size={17} />
            <Moon className="icon-moon" size={17} />
          </button>
          <a className="btn btn-primary btn-sm nav-resume" href={profile.resume} download>Résumé</a>
          <button
            className="icon-btn nav-toggle"
            type="button"
            onClick={() => setOpen((current) => !current)}
            aria-expanded={open}
            aria-controls="nav-links"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
        <span className="nav-progress" ref={progressRef} aria-hidden="true" />
      </nav>
    </header>
  );
}
