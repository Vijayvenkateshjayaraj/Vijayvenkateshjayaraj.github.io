"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu } from "lucide-react";
import { navigation, profile } from "@/data/profile";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeHref, setActiveHref] = useState("#home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries.find((entry) => entry.isIntersecting);
        if (visibleSection) setActiveHref(`#${visibleSection.target.id}`);
      },
      { rootMargin: "-30% 0px -60%", threshold: 0 }
    );

    navigation.forEach(([, href]) => {
      const section = document.querySelector(href);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const replayHero = () => window.dispatchEvent(new CustomEvent("hero-replay"));
  const handleNavigation = (href: string) => {
    setOpen(false);
    setActiveHref(href);
    if (href === "#home") replayHero();
  };

  return (
    <header className="nav-wrap">
      <nav className="container nav" aria-label="Primary navigation">
        <a className="brand" href="#home" aria-label="Home" onClick={() => handleNavigation("#home")}>
          <span>VJ</span>
          <strong>{profile.shortName}</strong>
        </a>

        <button
          className="nav-toggle"
          type="button"
          onClick={() => setOpen((current) => !current)}
          aria-expanded={open}
          aria-controls="primary-navigation-links"
          aria-label="Toggle navigation"
        >
          {open ? <Image src="/sidebar-left.svg" width={22} height={22} alt="" /> : <Menu />}
        </button>

        <div id="primary-navigation-links" className={`nav-links ${open ? "open" : ""}`}>
          {navigation.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className={activeHref === href ? "active" : undefined}
              aria-current={activeHref === href ? "page" : undefined}
              onClick={() => handleNavigation(href)}
            >
              {label}
            </a>
          ))}
          <a className="nav-resume" href={profile.resume} download>Resume</a>
        </div>
      </nav>
    </header>
  );
}
