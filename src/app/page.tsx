import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Credentials } from "@/components/sections/Credentials";
import { Contact } from "@/components/sections/Contact";
import { PointerSpotlight } from "@/components/ui/PointerSpotlight";
import { profile } from "@/data/profile";
import { experience } from "@/data/experience";
import { education } from "@/data/education";

export default function Home() {
  const siteUrl = "https://vijayvenkateshjayaraj.github.io";
  const profileImageUrl = `${siteUrl}/vijay-jayaraj-profile.jpg`;
  const profilePageJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: siteUrl,
    primaryImageOfPage: {
      "@type": "ImageObject",
      contentUrl: profileImageUrl,
      width: 768,
      height: 1024,
      caption: profile.name
    },
    mainEntity: {
      "@type": "Person",
      "@id": `${siteUrl}/#vijayvenkatesh-jayaraj`,
      name: profile.name,
      alternateName: ["Vijay Venkatesh Jayaraj", profile.shortName],
      url: siteUrl,
      image: profileImageUrl,
      email: `mailto:${profile.email}`,
      jobTitle: profile.title,
      worksFor: {
        "@type": "Organization",
        name: experience[0].company
      },
      alumniOf: education.map((entry) => ({
        "@type": "CollegeOrUniversity",
        name: entry.school
      })),
      address: {
        "@type": "PostalAddress",
        addressLocality: "Princeton",
        addressRegion: "NJ",
        addressCountry: "US"
      },
      sameAs: [profile.links.linkedin, profile.links.github],
      knowsAbout: [
        "AI agents",
        "Large language models",
        "Tool calling",
        "Document intelligence",
        "Microsoft Graph",
        "Azure",
        "Enterprise automation",
        "Data engineering",
        "Local LLMs",
        "Document AI",
        "AI evaluation"
      ]
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageJsonLd) }}
      />
      <a className="skip-link" href="#main">Skip to content</a>
      <div className="bg-fx" aria-hidden="true"><i /><i /><i /></div>
      <PointerSpotlight />
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Skills />
        <Credentials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
