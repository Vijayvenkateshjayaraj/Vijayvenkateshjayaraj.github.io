"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { navigation, profile } from "@/data/profile";
export function Navbar() {
  const [open, setOpen] = useState(false);
  return <header className="nav-wrap"><nav className="container nav" aria-label="Primary navigation"><a className="brand" href="#home" aria-label="Home"><span>VJ</span><strong>{profile.shortName}</strong></a><button className="nav-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle navigation">{open ? <X /> : <Menu />}</button><div className={`nav-links ${open ? "open" : ""}`}>{navigation.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}<a className="nav-resume" href={profile.resume} download>Resume</a></div></nav></header>;
}
