import type { ReactNode } from "react";
export function ButtonLink({ href, children, variant = "primary", download, external }: { href: string; children: ReactNode; variant?: "primary" | "secondary" | "text"; download?: boolean; external?: boolean }) {
  return <a className={`button button-${variant}`} href={href} download={download} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined}>{children}</a>;
}
