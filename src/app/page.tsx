import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Credentials } from "@/components/sections/Credentials";
import { Contact } from "@/components/sections/Contact";
import { profile } from "@/data/profile";

export default function Home() {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    alternateName: ["Vijay Venkatesh Jayaraj", profile.shortName],
    url: "https://vijayvenkateshjayaraj.github.io",
    email: `mailto:${profile.email}`,
    jobTitle: profile.title,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Plainsboro",
      addressRegion: "NJ",
      addressCountry: "US"
    },
    sameAs: [profile.links.linkedin, profile.links.github],
    knowsAbout: [
      "Data analysis",
      "Business intelligence",
      "ETL automation",
      "Healthcare analytics",
      "Enterprise systems",
      "AI automation"
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <Navbar/>
      <main><Hero/><About/><Experience/><Skills/><Projects/><Credentials/><Contact/></main>
      <Footer/>
    </>
  );
}
